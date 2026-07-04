const carrinho = {};
  const produtos_map = {};
  let catAtual = 'frutas';

  /* ══ IMAGE FALLBACKS ══ */
  function erroImagem(img) {
    const wrap = img.closest('.photo-wrap');
    if (wrap) {
      wrap.innerHTML = `<div class="photo-fallback">${img.dataset.emoji}</div>`;
    } else {
      const fb = document.createElement('div');
      fb.className = 'sc-fallback'; fb.textContent = img.dataset.emoji;
      img.replaceWith(fb);
    }
  }

  /* ══ SUMMER SPECIALS ══ */
  function renderSummer() {
    const grid = document.getElementById('summer-grid');
    const items = [
      { idx:0,  tag:'Verão',    sub:'Marrocos • Por kg' },
      { idx:4,  tag:'Popular',  sub:'Nacional • Por kg' },
      { idx:5,  tag:'Sazonal',  sub:'Nacional • Por kg' },
      { idx:11, tag:'Premium',  sub:'Fundão • Por kg' },
      { idx:13, tag:'Sazonal',  sub:'Chile • Por kg' },
      { idx:14, tag:'Tropical', sub:'Brasil • Por kg' },
      { idx:15, tag:'Premium',  sub:'Costa Rica • Por kg' },
      { idx:45, tag:'Verão',    sub:'Cuvete 130 g' },
    ];
    items.forEach(({ idx, tag, sub }) => {
      const item = produtos.frutas[idx];
      if (!item) return;
      const card = document.createElement('div');
      card.className = 'sc';
      card.innerHTML = `
        <img src="${urlFoto(item.foto)}" alt="${item.nome}" data-emoji="${item.emoji}" onerror="erroImagem(this)" loading="lazy"/>
        <div class="sc-overlay"></div>
        <div class="sc-tag">${tag}</div>
        <div class="sc-body">
          <span class="sc-emoji">${item.emoji}</span>
          <div class="sc-name">${item.nome}</div>
          <div class="sc-sub">${sub}</div>
        </div>`;
      card.addEventListener('click', () => {
        mostrarCategoria('frutas', document.getElementById('tab-frutas'));
        setTimeout(() => {
          document.getElementById('produtos').scrollIntoView({ behavior:'smooth' });
          const id = `fruta-${idx}`;
          const c  = document.getElementById(`card-${id}`);
          if (c) { c.scrollIntoView({ behavior:'smooth', block:'center' }); toggleProduto(id, item); }
        }, 200);
      });
      grid.appendChild(card);
    });

    // Drag-to-scroll
    let down = false, startX, sl;
    grid.addEventListener('mousedown', e => { down=true; grid.classList.add('grabbing'); startX=e.pageX-grid.offsetLeft; sl=grid.scrollLeft; });
    grid.addEventListener('mouseleave', () => { down=false; grid.classList.remove('grabbing'); });
    grid.addEventListener('mouseup',    () => { down=false; grid.classList.remove('grabbing'); });
    grid.addEventListener('mousemove',  e  => { if(!down) return; e.preventDefault(); grid.scrollLeft = sl - (e.pageX - grid.offsetLeft - startX) * 1.4; });
  }

  /* ══ PRODUCT CARDS ══ */
  function criarCard(item, id) {
    const badge = item.badge ? `<div class="product-badge ${item.badgeClass||''}">${item.badge}</div>` : '';
    const card  = document.createElement('div');
    card.className = 'product-card'; card.id = `card-${id}`;
    card.innerHTML = `
      ${badge}
      <div class="sel-check">✓</div>
      <div class="photo-wrap">
        <img src="${urlFoto(item.foto)}" alt="${item.nome}" data-emoji="${item.emoji}" onerror="erroImagem(this)" loading="lazy"/>
      </div>
      <div class="card-body">
        <div class="product-name">${item.nome}</div>
        ${item.peso ? `<div class="product-peso">${item.peso}</div>` : ''}
        <div class="product-price">${item.preco}</div>
        ${item.origem ? `<div class="product-origem">🌍 ${item.origem}</div>` : '<div class="product-fresh">✓ Fresco Diário</div>'}
        <button class="add-btn" onclick="event.stopPropagation(); toggleProduto('${id}', produtos_map['${id}'])">＋ Adicionar</button>
        <div class="qty-controls">
          <button class="qty-btn" onclick="alterarQtd('${id}',-1,event)">−</button>
          <span class="qty-num" id="qty-${id}">1</span>
          <button class="qty-btn" onclick="alterarQtd('${id}',1,event)">+</button>
        </div>
      </div>`;
    card.addEventListener('click', () => toggleProduto(id, item));
    return card;
  }

  function renderGrid(itens, gridId, prefix, cat) {
    const grid = document.getElementById(gridId);
    itens.forEach((item, i) => {
      const id = `${prefix}-${i}`;
      item._cat = cat; item._id = id;
      produtos_map[id] = item;
      grid.appendChild(criarCard(item, id));
    });
    // Staggered reveal via IntersectionObserver
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 55);
          obs.unobserve(e.target);
        }
      });
    }, { threshold:0.08 });
    grid.querySelectorAll('.product-card').forEach(c => obs.observe(c));
  }

  /* ══ CABAZES ══ */
  function renderCabazes() {
    const grid = document.getElementById('grid-cabazes');
    produtos.cabazes.forEach((item, i) => {
      const id = `cabaz-${i}`;
      item._cat = 'cabazes'; item._id = id;
      produtos_map[id] = item;
      const temItens = item.itens && item.itens.length;
      const badge = item.badge ? `<div class="product-badge ${item.badgeClass||''}">${item.badge}</div>` : '';
      const verBtn = temItens ? `<button class="cabaz-ver" onclick="event.stopPropagation(); abrirCabaz('${id}')">👁 Ver o que leva</button>` : '';
      const card = document.createElement('div');
      card.className = 'product-card'; card.id = `card-${id}`;
      card.innerHTML = `
        ${badge}
        <div class="sel-check">✓</div>
        <div class="photo-wrap">
          <img src="${urlFoto(item.foto)}" alt="${item.nome}" data-emoji="${item.emoji}" onerror="erroImagem(this)" loading="lazy"/>
        </div>
        <div class="card-body">
          <div class="product-name">${item.nome}</div>
          ${item.peso ? `<div class="product-peso">${item.peso}</div>` : ''}
          <div class="product-price">${item.preco}</div>
          ${verBtn}
          <button class="add-btn" onclick="event.stopPropagation(); toggleProduto('${id}', produtos_map['${id}'])">＋ Adicionar</button>
          <div class="qty-controls">
            <button class="qty-btn" onclick="alterarQtd('${id}',-1,event)">−</button>
            <span class="qty-num" id="qty-${id}">1</span>
            <button class="qty-btn" onclick="alterarQtd('${id}',1,event)">+</button>
          </div>
        </div>`;
      card.addEventListener('click', () => { if (temItens) abrirCabaz(id); else toggleProduto(id, item); });
      grid.appendChild(card);
      requestAnimationFrame(() => card.classList.add('visible'));
    });
  }

  function abrirCabaz(id) {
    const item = produtos_map[id];
    if (!item || !item.itens) return;
    document.getElementById('cabaz-modal-title').textContent = item.nome;
    document.getElementById('cabaz-modal-price').textContent = item.preco;
    document.getElementById('cabaz-modal-list').innerHTML = item.itens.map(it =>
      `<li><span class="ci-q">${it.q}</span><span class="ci-nome">${it.nome}</span></li>`
    ).join('');
    const addBtn = document.getElementById('cabaz-modal-add');
    addBtn.onclick = () => {
      if (!carrinho[id]) toggleProduto(id, item);
      fecharCabaz();
      document.getElementById('encomenda').scrollIntoView({ behavior:'smooth' });
    };
    document.getElementById('cabaz-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function fecharCabaz() {
    document.getElementById('cabaz-modal').classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ══ CART ══ */
  function toggleProduto(id, item) {
    const card = document.getElementById(`card-${id}`);
    if (!card) return;
    if (carrinho[id]) {
      delete carrinho[id];
      card.classList.remove('selected');
      document.getElementById(`qty-${id}`).textContent = '1';
      mostrarToast(`${item.emoji} ${item.nome} removido`);
    } else {
      carrinho[id] = { ...item, qtd:1 };
      card.classList.add('selected');
      mostrarToast(`✓ ${item.nome} adicionado`);
    }
    atualizarResumo(); atualizarBadge();
  }

  function alterarQtd(id, delta, e) {
    e.stopPropagation();
    if (!carrinho[id]) return;
    carrinho[id].qtd = Math.max(1, carrinho[id].qtd + delta);
    document.getElementById(`qty-${id}`).textContent = carrinho[id].qtd;
    atualizarResumo();
  }

  function atualizarBadge() {
    document.getElementById('cart-count').textContent = Object.keys(carrinho).length;
  }

  function atualizarResumo() {
    const lista = document.getElementById('order-list');
    const itens = Object.values(carrinho);
    if (!itens.length) { lista.innerHTML = '<li class="empty-msg">Sem artigos ainda. Selecione produtos acima para começar.</li>'; return; }
    lista.innerHTML = itens.map(i =>
      `<li class="order-item"><span>${i.emoji} ${i.nome}${i.peso ? ` <small>(${i.peso})</small>` : ''}</span><span class="order-item-price">×${i.qtd} &nbsp;${i.preco}</span></li>`
    ).join('');
  }

  /* ══ SEARCH ══ */
  function pesquisar() {
    const q = document.getElementById('search-input').value.toLowerCase().trim();
    document.getElementById('search-clear').classList.toggle('visible', q.length > 0);
    ['frutas','legumes'].forEach(cat => {
      let n = 0;
      document.querySelectorAll(`#grid-${cat} .product-card`).forEach(card => {
        const match = !q || card.querySelector('.product-name').textContent.toLowerCase().includes(q);
        card.style.display = match ? '' : 'none';
        if (match) n++;
      });
      document.getElementById(`no-${cat}`).style.display = n === 0 ? 'block' : 'none';
    });
    if (q) {
      for (const cat of ['frutas','legumes']) {
        if (document.querySelectorAll(`#grid-${cat} .product-card:not([style*="none"])`).length > 0) {
          mostrarCategoria(cat, document.getElementById(`tab-${cat}`)); break;
        }
      }
    }
  }

  function limparPesquisa() { document.getElementById('search-input').value = ''; pesquisar(); }

  /* ══ CATEGORY ══ */
  function mostrarCategoria(cat, btn) {
    document.querySelectorAll('.cat-section').forEach(s => s.classList.remove('visible'));
    document.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
    document.getElementById(`cat-${cat}`).classList.add('visible');
    if (btn) btn.classList.add('active');
    catAtual = cat;
  }

  /* ══ ORDER ══ */
  function obterTextoEncomenda() {
    const nome   = document.getElementById('cust-nome').value.trim();
    const tel    = document.getElementById('cust-telemovel').value.trim();
    const hora   = document.getElementById('cust-levantamento').value.trim();
    const notas  = document.getElementById('cust-notas').value.trim();
    const itens  = Object.values(carrinho);
    if (!itens.length) { alert('Por favor selecione pelo menos um produto!'); return null; }
    if (!nome || !tel) { alert('Por favor preencha o seu nome e número de telemóvel!'); return null; }
    let t = `Olá MUNDIFRUTA! Gostaria de fazer uma encomenda para levantamento na loja:\n\n👤 Nome: ${nome}\n📞 Telemóvel: ${tel}\n`;
    if (hora) t += `🕐 Levantamento: ${hora}\n`;
    t += `\n🛒 Encomenda:\n`;
    itens.forEach(i => { t += `• ${i.nome}${i.peso ? ` ${i.peso}` : ''} ×${i.qtd} (${i.preco})\n`; });
    if (notas) t += `\n📝 Notas: ${notas}`;
    return t;
  }

  function enviarWhatsApp(e) {
    e.preventDefault();
    const t = obterTextoEncomenda(); if (!t) return;
    window.open(`https://wa.me/351932699850?text=${encodeURIComponent(t)}`, '_blank');
  }

  function enviarEmail() {
    const t = obterTextoEncomenda(); if (!t) return;
    window.location.href = `mailto:shahhossain87@gmail.com?subject=${encodeURIComponent('Encomenda MUNDIFRUTA')}&body=${encodeURIComponent(t)}`;
  }

  /* ══ UI ══ */
  function toggleMenu() { document.getElementById('mobile-menu').classList.toggle('open'); }

  let toastTimer;
  function mostrarToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2500);
  }

  /* ══ SCROLL ══ */
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    document.getElementById('main-nav').classList.toggle('scrolled', y > 60);
    document.getElementById('scroll-top').classList.toggle('visible', y > 400);
  }, { passive:true });

  /* ══ FADE-IN ══ */
  const fiObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); fiObs.unobserve(e.target); } });
  }, { threshold:0.1 });
  document.querySelectorAll('.fi').forEach(el => fiObs.observe(el));

  /* ══ AVALIAÇÕES ══ */
  function renderAvaliacoes() {
    document.getElementById('gb-nota').textContent = avaliacoesInfo.nota;
    document.getElementById('gb-total').textContent = `${avaliacoesInfo.total} avaliações no Google`;
    document.getElementById('google-badge').href = avaliacoesInfo.link;
    document.getElementById('reviews-cta').href = avaliacoesInfo.link;
    document.getElementById('temas-row').innerHTML = avaliacoesInfo.temas
      .map(t => `<span class="tema-chip">✓ ${t}</span>`).join('');
    document.getElementById('reviews-grid').innerHTML = avaliacoes.map(a => {
      const stars = '★★★★★'.slice(0, a.estrelas) + '☆☆☆☆☆'.slice(0, 5 - a.estrelas);
      return `<div class="review-card">
        <div class="review-stars">${stars}</div>
        <p class="review-text">${a.texto}</p>
        <div class="review-author"><span class="review-avatar">${(a.nome[0]||'?').replace('[','C')}</span>${a.nome}</div>
      </div>`;
    }).join('');
  }

  /* ══ INIT ══ */
  renderSummer();
  renderGrid(produtos.frutas,  'grid-frutas',  'fruta',  'frutas');
  renderGrid(produtos.legumes, 'grid-legumes', 'legume', 'legumes');
  renderCabazes();
  renderAvaliacoes();
  document.getElementById('count-frutas').textContent  = produtos.frutas.length;
  document.getElementById('count-legumes').textContent = produtos.legumes.length;
