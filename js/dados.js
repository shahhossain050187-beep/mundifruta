/* ═══════════════════════════════════════════════════════════
   DADOS DO SITE — produtos, cabazes, preços e fotos

   Cada produto tem 4 campos importantes:
     nome  → nome mostrado
     peso  → peso/quantidade (ex: "1 kg", "±500 g", "Caixa 250 g")
     preco → preço para essa quantidade (ex: "1,90 €")
     foto  → chave de FOTOS (a imagem)

   COMO ATUALIZAR UM PREÇO:
     substituir  preco:P  por  preco:"1,90 €"
   `P` é o texto mostrado enquanto o preço não está definido.
   Também pode ajustar `peso` para o peso real de cada produto.
   ═══════════════════════════════════════════════════════════ */
  const P = "A consultar";

  const FOTOS = {
    bananas:      "fotos/foto_8_1.jpeg",
    laranjas:     "fotos/foto_7_1.jpeg",
    morangos:     "fotos/foto_10_1.jpeg",
    melancia:     "fotos/foto_3_1.jpeg",
    ananas:       "fotos/foto_12_1.jpeg",
    pessegos:     "fotos/foto_6_1.jpeg",
    melao_verde:  "fotos/foto_4_1.jpeg",
    melao_branco: "fotos/foto_2_1.jpeg",
    melao_am:     "fotos/foto_5_1.jpeg",
    figos:        "fotos/foto_1_1.jpeg",
    roma:         "fotos/foto_9_1.jpeg",
    tangerina:    "fotos/foto_11_1.jpeg",
    macas:      "fotos/macas.jpeg",
    uvas:       "fotos/uvas.jpeg",
    manga:      "fotos/manga.jpeg",
    peras:      "fotos/peras.jpeg",
    limoes:     "fotos/limoes.jpeg",
    cerejas:    "fotos/cerejas.jpeg",
    kiwi:       "fotos/kiwi.jpeg",
    abacate:    "fotos/abacate.jpeg",
    coco:       "fotos/coco.jpeg",
    ameixa:     "fotos/ameixa.jpeg",
    tomates:    "fotos/tomates.jpeg",
    cenouras:   "fotos/cenouras.jpeg",
    brocoulos:  "fotos/brocolos.jpeg",
    alface:     "fotos/alface.jpeg",
    pepino:     "fotos/pepino.jpeg",
    pimentos:   "fotos/pimentos.jpeg",
    cebolas:    "fotos/cebolas.jpeg",
    alho:       "fotos/alho.jpeg",
    batatas:    "fotos/batatas.jpeg",
    milho:      "fotos/milho.jpeg",
    espinafres: "fotos/espinafres.jpeg",
    beringela:  "fotos/beringela.jpeg",
    curgete:    "fotos/curgete.jpeg",
    cogumelos:  "fotos/cogumelos.jpeg",
    couve:      "fotos/couve.jpeg",
    batatadoce: "fotos/batatadoce.jpeg",
    salsa:        "fotos/salsa.jpeg",
    coentros:     "fotos/coentros.jpeg",
    hortela:      "fotos/hortela.jpeg",
    abobora:      "fotos/abobora.jpeg",
    alho_frances: "fotos/alho_frances.jpeg",
    couveflor:    "fotos/couveflor.jpeg",
    feijao_verde: "fotos/feijao_verde.jpeg",
    nabo:         "fotos/nabo.jpeg",
    cabaz_frutas:  "fotos/cabaz_frutas.jpeg",
    cabaz_legumes: "fotos/cabaz_legumes.jpeg",
    cabaz_mix:     "fotos/cabaz_mix.jpeg",
    cabaz_verao:   "fotos/cabaz_verao.jpeg",
  };
  const SFX = "?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop";

  function urlFoto(u) { return u.startsWith('fotos/') ? u : u + SFX; }

  const produtos = {
    // FRUTAS — frutos de verão primeiro, depois os regulares. Preço por kg.
    frutas: [
      // ── Frutos de Verão ──
      { nome:"Melancia",             emoji:"🍉", peso:"1 kg", preco:P, foto:FOTOS.melancia,     badge:"🌞 Verão",    badgeClass:"" },
      { nome:"Melancia sem Sementes",emoji:"🍉", peso:"1 kg", preco:P, foto:FOTOS.melancia,     badge:"🌞 Verão",    badgeClass:"" },
      { nome:"Melão Branco",         emoji:"🍈", peso:"1 kg", preco:P, foto:FOTOS.melao_branco, badge:"🌞 Verão",    badgeClass:"" },
      { nome:"Meloa Nacional",       emoji:"🍈", peso:"1 kg", preco:P, foto:FOTOS.melao_am,     badge:"🌞 Verão",    badgeClass:"" },
      { nome:"Morangos",             emoji:"🍓", peso:"1 kg", preco:P, foto:FOTOS.morangos,     badge:"🔥 Popular",  badgeClass:"badge-hot" },
      { nome:"Pêssego Amarelo",      emoji:"🍑", peso:"1 kg", preco:P, foto:FOTOS.pessegos,     badge:"🌞 Verão",    badgeClass:"" },
      { nome:"Pêssego Vermelho",     emoji:"🍑", peso:"1 kg", preco:P, foto:FOTOS.pessegos,     badge:null },
      { nome:"Pêssego Rosa",         emoji:"🍑", peso:"1 kg", preco:P, foto:FOTOS.pessegos,     badge:null },
      { nome:"Pêssego Paraguaio",    emoji:"🍑", peso:"1 kg", preco:P, foto:FOTOS.pessegos,     badge:null },
      { nome:"Nectarina",           emoji:"🍑", peso:"1 kg", preco:P, foto:FOTOS.pessegos,     badge:null },
      { nome:"Ameixa Vermelha",     emoji:"🍑", peso:"1 kg", preco:P, foto:FOTOS.ameixa,       badge:null },
      { nome:"Cereja de Fundão",    emoji:"🍒", peso:"1 kg", preco:P, foto:FOTOS.cerejas,      badge:"💎 Premium",  badgeClass:"badge-hot" },
      { nome:"Cereja Gardunha",     emoji:"🍒", peso:"1 kg", preco:P, foto:FOTOS.cerejas,      badge:null },
      { nome:"Figos",               emoji:"🫐", peso:"1 kg", preco:P, foto:FOTOS.figos,        badge:"🌞 Verão",    badgeClass:"" },
      { nome:"Uva sem Grainha",     emoji:"🍇", peso:"1 kg", preco:P, foto:FOTOS.uvas,         badge:null },
      { nome:"Uva Red Globe",       emoji:"🍇", peso:"1 kg", preco:P, foto:FOTOS.uvas,         badge:"⭐ Destaque", badgeClass:"" },
      { nome:"Manga",               emoji:"🥭", peso:"1 kg", preco:P, foto:FOTOS.manga,        badge:"🌴 Tropical", badgeClass:"badge-new" },
      { nome:"Ananás",              emoji:"🍍", peso:"1 kg", preco:P, foto:FOTOS.ananas,       badge:"🌴 Tropical", badgeClass:"badge-new" },
      // ── Frutas regulares ──
      { nome:"Maçã Golden",         emoji:"🍎", peso:"1 kg", preco:P, foto:FOTOS.macas,        badge:null },
      { nome:"Maçã Reineta",        emoji:"🍏", peso:"1 kg", preco:P, foto:FOTOS.macas,        badge:null },
      { nome:"Bananas",             emoji:"🍌", peso:"1 kg", preco:P, foto:FOTOS.bananas,      badge:null },
      { nome:"Laranjas",            emoji:"🍊", peso:"1 kg", preco:P, foto:FOTOS.laranjas,     badge:null },
      { nome:"Tangerina",           emoji:"🍊", peso:"1 kg", preco:P, foto:FOTOS.tangerina,    badge:null },
      { nome:"Pêras",               emoji:"🍐", peso:"1 kg", preco:P, foto:FOTOS.peras,        badge:null },
      { nome:"Limões",              emoji:"🍋", peso:"1 kg", preco:P, foto:FOTOS.limoes,       badge:null },
      { nome:"Kiwi",                emoji:"🥝", peso:"1 kg", preco:P, foto:FOTOS.kiwi,         badge:null },
      { nome:"Abacate",             emoji:"🥑", peso:"1 kg", preco:P, foto:FOTOS.abacate,      badge:null },
      { nome:"Romã",                emoji:"🔴", peso:"1 kg", preco:P, foto:FOTOS.roma,         badge:null },
      { nome:"Coco",                emoji:"🥥", peso:"1 kg", preco:P, foto:FOTOS.coco,         badge:null },
    ],
    // LEGUMES — ordem alfabética. Preço por kg (ervas por molho).
    legumes: [
      { nome:"Abóbora",       emoji:"🎃", peso:"1 kg",   preco:P, foto:FOTOS.abobora,      badge:null },
      { nome:"Alface",        emoji:"🥬", peso:"1 kg",   preco:P, foto:FOTOS.alface,       badge:null },
      { nome:"Alho",          emoji:"🧄", peso:"1 kg",   preco:P, foto:FOTOS.alho,         badge:null },
      { nome:"Alho Francês",  emoji:"🥬", peso:"1 kg",   preco:P, foto:FOTOS.alho_frances, badge:null },
      { nome:"Batata-doce",   emoji:"🍠", peso:"1 kg",   preco:P, foto:FOTOS.batatadoce,   badge:null },
      { nome:"Batatas",       emoji:"🥔", peso:"1 kg",   preco:P, foto:FOTOS.batatas,      badge:null },
      { nome:"Beringela",     emoji:"🍆", peso:"1 kg",   preco:P, foto:FOTOS.beringela,    badge:null },
      { nome:"Brócolos",      emoji:"🥦", peso:"1 kg",   preco:P, foto:FOTOS.brocoulos,    badge:"🌱 Bio",  badgeClass:"badge-bio" },
      { nome:"Cebolas",       emoji:"🧅", peso:"1 kg",   preco:P, foto:FOTOS.cebolas,      badge:null },
      { nome:"Cenouras",      emoji:"🥕", peso:"1 kg",   preco:P, foto:FOTOS.cenouras,     badge:null },
      { nome:"Coentros",      emoji:"🌿", peso:"Molho",  preco:P, foto:FOTOS.coentros,     badge:null },
      { nome:"Cogumelos",     emoji:"🍄", peso:"1 kg",   preco:P, foto:FOTOS.cogumelos,    badge:null },
      { nome:"Couve",         emoji:"🥬", peso:"1 kg",   preco:P, foto:FOTOS.couve,        badge:null },
      { nome:"Couve-flor",    emoji:"🥦", peso:"1 kg",   preco:P, foto:FOTOS.couveflor,    badge:null },
      { nome:"Curgete",       emoji:"🥒", peso:"1 kg",   preco:P, foto:FOTOS.curgete,      badge:null },
      { nome:"Espinafres",    emoji:"🥬", peso:"1 kg",   preco:P, foto:FOTOS.espinafres,   badge:"🌱 Bio",  badgeClass:"badge-bio" },
      { nome:"Feijão Verde",  emoji:"🫛", peso:"1 kg",   preco:P, foto:FOTOS.feijao_verde, badge:null },
      { nome:"Hortelã",       emoji:"🌿", peso:"Molho",  preco:P, foto:FOTOS.hortela,      badge:null },
      { nome:"Milho",         emoji:"🌽", peso:"1 kg",   preco:P, foto:FOTOS.milho,        badge:null },
      { nome:"Nabo",          emoji:"🥬", peso:"1 kg",   preco:P, foto:FOTOS.nabo,         badge:null },
      { nome:"Pepino",        emoji:"🥒", peso:"1 kg",   preco:P, foto:FOTOS.pepino,       badge:null },
      { nome:"Pimentos",      emoji:"🫑", peso:"1 kg",   preco:P, foto:FOTOS.pimentos,     badge:null },
      { nome:"Salsa",         emoji:"🌿", peso:"Molho",  preco:P, foto:FOTOS.salsa,        badge:null },
      { nome:"Tomates",       emoji:"🍅", peso:"1 kg",   preco:P, foto:FOTOS.tomates,      badge:"🔥 Popular", badgeClass:"badge-hot" },
    ],
    // CABAZES — cestos prontos de frutas e/ou legumes.
    // Ajuste nomes, descrições (peso), preços e a lista `itens` conforme desejar.
    // `itens` é opcional; se existir, o cartão mostra "Ver o que leva" (abre janela com a lista).
    cabazes: [
      { nome:"Cabaz Semanal",      emoji:"🧺", peso:"Frutas & legumes variados", preco:P, foto:FOTOS.cabaz_mix,     badge:"⭐ Popular",  badgeClass:"badge-hot" },
      { nome:"Cabaz Familiar",     emoji:"🧺", peso:"Para toda a família",       preco:P, foto:FOTOS.cabaz_frutas,  badge:null },
      { nome:"Cabaz de Verão",     emoji:"🍉", peso:"Frutos da época",           preco:P, foto:FOTOS.cabaz_verao,   badge:"🌞 Verão",   badgeClass:"",
        itens: [
          { q:"1",      nome:"Melão" },
          { q:"1",      nome:"Melancia" },
          { q:"1",      nome:"Abacaxi" },
          { q:"1",      nome:"Manga" },
          { q:"1",      nome:"Papaia" },
          { q:"500 g",  nome:"Pêssego" },
          { q:"500 g",  nome:"Ameixas" },
          { q:"500 g",  nome:"Alperce" },
          { q:"125 g",  nome:"Mirtilo" },
          { q:"125 g",  nome:"Framboesas" },
          { q:"1 kg",   nome:"Banana" },
          { q:"1 kg",   nome:"Laranja" },
          { q:"1 kg",   nome:"Maçã" },
        ] },
      { nome:"Cabaz de Legumes",   emoji:"🥦", peso:"Legumes frescos p/ sopa",   preco:P, foto:FOTOS.cabaz_legumes, badge:null },
    ],
  };

  /* ═══════════════════════════════════════════════════════════
     AVALIAÇÕES — nota real do Google Business (4,9 ★ · 107 avaliações).
     Os textos abaixo são PLACEHOLDER. Substitua por avaliações reais
     copiadas do Google (nome do cliente + texto), mantendo em português.
     ═══════════════════════════════════════════════════════════ */
  const avaliacoesInfo = {
    nota: "4,9",
    total: 107,
    link: "https://maps.app.goo.gl/1gHGqMac4ahTtfxf8?g_st=ac",
    // Temas que os clientes mais destacam (tags reais do Google):
    temas: ["Frescura", "Qualidade da fruta", "Limpeza", "Variedade", "Simpatia"],
  };

  const avaliacoes = [
    { nome:"[Nome do cliente]", estrelas:5, texto:"[Cole aqui uma avaliação real do Google, em português.]" },
    { nome:"[Nome do cliente]", estrelas:5, texto:"[Cole aqui uma avaliação real do Google, em português.]" },
    { nome:"[Nome do cliente]", estrelas:5, texto:"[Cole aqui uma avaliação real do Google, em português.]" },
  ];
