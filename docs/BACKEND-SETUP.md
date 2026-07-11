# Mundi Fruta — Backend Architecture (Auth · CRM · Admin · Coupons)

This document specifies the **deferred** phases of the brief that **cannot run on the
current static GitHub Pages site** without external accounts and secret keys:

- **Phase 4** — Customer login (Google / Apple / Microsoft / email magic‑link / guest)
- **Phase 5** — CRM customer database
- **Phase 11** — Admin dashboard foundation
- **Enforceable coupon** (one use per customer) backing the frontend Phase 3/7 popup

The site today is 100% static (HTML/CSS/JS). The frontend already ships a **consent‑gated
analytics layer** (`js/extras.js`) and a **frontend‑only** welcome coupon that is *indicative*
only. Everything below is what turns those into real, secure, GDPR‑compliant features.

> **Nothing here is live yet.** No secrets are committed. You (the owner) must create the
> accounts and paste keys as noted. Do not paste secret/service keys into any file in this repo.

---

## 1. Recommended platform: **Supabase**

Chosen after inspecting the stack (static site, no server, WhatsApp checkout):

| Need | Supabase feature | Why it fits |
|---|---|---|
| Login (Google/Apple/email magic‑link) | **Supabase Auth** (GoTrue) | OAuth + passwordless out of the box; works from a static site via the JS SDK using only the *public anon key*. |
| Customer database (CRM) | **Postgres** | Real relational DB, not localStorage; SQL, views, triggers for CRM metrics. |
| Security | **Row Level Security (RLS)** | Each customer can read/write only their own row; admin via a role claim. |
| No server to run | Managed | Free tier is enough to start; upgrade later. |
| Future integrations | **Edge Functions / webhooks** | Push to HubSpot/Airtable/Sheets/Zoho, send email/WhatsApp marketing (with consent). |

**Firebase** is a valid alternative (Auth + Firestore). Prefer it only if you already live in
Google Cloud. The schema below maps cleanly to Firestore collections if you switch.

Microsoft login → enable the **Azure (Microsoft) provider** in Supabase.
**Yahoo** → no separate provider; Yahoo users use the **email magic‑link**. Do **not** add a fake
"Continue with Yahoo" button.
**Facebook** → prepare later only; needs a Meta app + privacy review before enabling.

---

## 2. Database schema (Postgres / Supabase SQL)

```sql
-- ── CUSTOMERS ─────────────────────────────────────────────
create table public.customers (
  id                uuid primary key default gen_random_uuid(),
  auth_user_id      uuid unique references auth.users(id) on delete cascade,
  full_name         text,
  email             text unique not null,
  login_provider    text,                       -- google | apple | azure | email
  registered_at     timestamptz not null default now(),
  last_login_at     timestamptz,
  first_visit_at    timestamptz,
  last_visit_at     timestamptz,
  marketing_consent boolean not null default false,
  consent_at        timestamptz,
  preferred_lang    text default 'pt',
  referral_source   text,
  loyalty_status    text default 'novo',        -- novo | recorrente | vip
  notes             text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- ── COUPONS (one per customer, enforceable) ───────────────
create table public.coupons (
  id            uuid primary key default gen_random_uuid(),
  customer_id   uuid not null references public.customers(id) on delete cascade,
  code          text not null default 'MUNDI10',
  discount_eur  numeric(6,2) not null default 10.00,
  min_basket_eur numeric(6,2) not null default 30.00,
  status        text not null default 'available',  -- available | used | expired | cancelled
  issued_at     timestamptz not null default now(),
  expires_at    timestamptz not null default (now() + interval '30 days'),
  used_at       timestamptz,
  unique (customer_id, code)                    -- ← prevents endless reuse
);

-- ── ORDERS (optional; WhatsApp is source of truth today) ──
create table public.orders (
  id            uuid primary key default gen_random_uuid(),
  customer_id   uuid references public.customers(id) on delete set null,
  total_eur     numeric(8,2),
  coupon_id     uuid references public.coupons(id),
  placed_at     timestamptz not null default now(),
  channel       text default 'whatsapp'
);
```

CRM aggregates (order count, last order, lifetime spend, average order value) are best served
as a **view** so they can never drift:

```sql
create view public.customer_crm as
select c.*,
  count(o.id)                        as order_count,
  max(o.placed_at)                   as last_order_at,
  coalesce(sum(o.total_eur),0)       as lifetime_spend,
  coalesce(avg(o.total_eur),0)       as avg_order_value
from public.customers c
left join public.orders o on o.customer_id = c.id
group by c.id;
```

---

## 3. Row Level Security (RLS)

```sql
alter table public.customers enable row level security;
alter table public.coupons   enable row level security;
alter table public.orders    enable row level security;

-- A customer sees/edits only their own row
create policy "own customer row" on public.customers
  for all using (auth.uid() = auth_user_id) with check (auth.uid() = auth_user_id);

create policy "own coupons" on public.coupons
  for select using (customer_id in (select id from public.customers where auth_user_id = auth.uid()));

-- Admin (role claim) can read everything
create policy "admin read customers" on public.customers
  for select using (auth.jwt() ->> 'role' = 'admin');
```

Coupon **redemption** must be a **server‑side** `security definer` function (never trust the
browser) that flips `available → used` atomically and checks basket ≥ €30 and not expired.

```sql
create or replace function public.redeem_coupon(p_coupon uuid, p_basket numeric)
returns text language plpgsql security definer as $$
declare s text;
begin
  update public.coupons
    set status='used', used_at=now()
  where id=p_coupon and status='available'
    and now() < expires_at and p_basket >= min_basket_eur
  returning status into s;
  return coalesce(s, 'rejected');
end $$;
```

---

## 4. Environment variables (never commit secrets)

| Variable | Where used | Notes |
|---|---|---|
| `SUPABASE_URL` | frontend | public |
| `SUPABASE_ANON_KEY` | frontend | public (RLS protects data) |
| `SUPABASE_SERVICE_ROLE_KEY` | **server/Edge Function only** | **secret — never in the repo or browser** |
| `GA4_MEASUREMENT_ID` | frontend (`js/extras.js`) | set when GA4 is created; today empty |

Google Ads ID `AW-16771350041` is already wired (consent‑gated) in `js/extras.js`.

---

## 5. Provider setup you must do in external dashboards

1. **Supabase**: create project → copy `SUPABASE_URL` + anon key → run the SQL above.
2. **Google login**: Google Cloud → OAuth consent screen + OAuth client → add the client ID/secret
   in Supabase → Auth → Providers → Google. Authorized redirect: `https://<project>.supabase.co/auth/v1/callback`.
3. **Apple login**: Apple Developer → Services ID + key → configure Supabase Apple provider.
4. **Microsoft login**: Azure AD → app registration → client ID/secret → Supabase Azure provider.
5. **Email magic‑link**: enable in Supabase Auth (covers Yahoo and any email).
6. **GA4** (optional): create a GA4 property → put the `G-XXXX` id into `GA4_MEASUREMENT_ID`.

---

## 6. Frontend integration (when keys exist)

Add the Supabase JS SDK and a thin `js/auth.js`:

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```
```js
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// Login buttons:
sb.auth.signInWithOAuth({ provider: 'google' });          // apple | azure
sb.auth.signInWithOtp({ email });                          // magic link (Yahoo etc.)
// On sign-in: upsert into customers, issue coupon if first-time, set last_login.
```

Then replace the frontend coupon check in `js/extras.js` (`cupaoAtivo`, `descontoCentimos`)
with a call to `redeem_coupon` at checkout so reuse is impossible.

---

## 7. Admin dashboard (Phase 11 foundation)

Do **not** expose admin in the public site. Options, cheapest first:

1. **Supabase Studio** — already gives you table/SQL access for the owner (fastest).
2. A separate, auth‑gated `admin.html` (role = admin) reading the `customer_crm` view and coupon
   stats. Metrics available from the schema: total/new/returning customers, coupons
   generated/redeemed, conversion rate, order count, AOV, lifetime value, coupon revenue.

Keep it behind Supabase Auth with an `admin` role claim and RLS admin policies.

---

## 8. GDPR checklist (backend side)

- Store `marketing_consent` + `consent_at`; never pre‑checked (frontend already enforces).
- Provide **data access** and **deletion** on request — today via WhatsApp/email (see Privacy
  modal); with Supabase, add a self‑serve "delete my account" calling `auth.admin.deleteUser`.
- Do not send marketing without explicit opt‑in.
- Keep the service‑role key server‑side only.
