# MUNDIFRUTA — Website

Site oficial da MUNDIFRUTA, loja de frutas e legumes frescos em Carnaxide (Portugal).
Encomendas por WhatsApp/Email com **levantamento na loja** (pickup only).

**Developer:** Shah Hossain · shahhossain050187@gmail.com

---

## Estrutura do projeto

```
mundifruta/
├── index.html          ← página principal (só HTML)
├── css/
│   └── estilos.css     ← todos os estilos
├── js/
│   ├── dados.js        ← PRODUTOS, PREÇOS e FOTOS (editar aqui!)
│   └── app.js          ← lógica (carrinho, pesquisa, WhatsApp)
├── fotos/              ← fotografias próprias dos produtos
└── README.md
```

**Regra de ouro:** conteúdo que muda com frequência (produtos, preços) vive em
`js/dados.js`. Nunca é preciso tocar em `app.js` para mudar um preço.

## Estrutura de um produto

Cada produto (em `js/dados.js`) segue o estilo **nome + peso + preço fixo**:

```js
{ nome:"Bananas", emoji:"🍌", peso:"1 kg", preco:P, foto:FOTOS.bananas, badge:null },
```

| Campo | O que é | Exemplo |
|-------|---------|---------|
| `nome`  | nome mostrado          | `"Morangos"` |
| `emoji` | ícone de reserva       | `"🍓"` |
| `peso`  | peso/quantidade vendida | `"Caixa 250 g"`, `"1 kg"`, `"±500 g"` |
| `preco` | preço para essa quantidade | `"3,49 €"` (ou `P` = "A consultar") |
| `foto`  | chave de `FOTOS`        | `FOTOS.morangos` |
| `badge` | etiqueta opcional       | `"🔥 Popular"` |

## Como atualizar preços

Abrir `js/dados.js` e substituir `preco:P` pelo preço real. Ajustar também `peso`
se necessário:

```js
// antes:  { nome:"Morangos", ... peso:"Caixa 250 g", preco:P, ... }
// depois: { nome:"Morangos", ... peso:"Caixa 250 g", preco:"3,49 €", ... }
```

Guardar → recarregar a página. O preço e o peso aparecem no cartão do produto,
no carrinho e na mensagem de WhatsApp automaticamente.

## Como adicionar/remover produtos

Em `js/dados.js`, adicionar ou apagar uma linha nos arrays `produtos.frutas`,
`produtos.legumes` ou `produtos.cabazes` (cabazes = cestos prontos).

## Como testar localmente

Abrir `index.html` no browser (duplo clique) — não precisa de servidor.

## Deploy (grátis)

1. Criar repositório no GitHub e fazer push
2. [Netlify](https://netlify.com) → "Import from Git" → deploy automático a cada push
   (ou GitHub Pages: Settings → Pages → branch `master`)
3. Domínio próprio (ex: `mundifruta.pt`, ~10–15 €/ano) liga-se no painel do Netlify

## Contactos do site (se mudarem)

| O quê | Onde |
|---|---|
| Nº WhatsApp (351932699850) | `js/app.js` (função `enviarWhatsApp`) + links em `index.html` |
| Email de encomendas | `js/app.js` (função `enviarEmail`) + secção contacto em `index.html` |
| Horário / morada | `index.html` (info strip + secção contacto) |

## Handover — se mudar de developer

- Todo o histórico de alterações está no Git (`git log`)
- Não há build step, frameworks nem dependências — HTML/CSS/JS puro
- Não há backend: as encomendas vão direto para o WhatsApp/Email da loja
- **Pagamentos:** o site não processa pagamentos (paga-se na loja). Para adicionar
  pagamento online no futuro (MB Way, Stripe), o ponto de integração é a função
  `enviarWhatsApp` / o formulário `#order-form` em `index.html` — o resto do site
  não precisa de mudar.
- Contas a transferir para o cliente: domínio + hosting (Netlify/GitHub)
