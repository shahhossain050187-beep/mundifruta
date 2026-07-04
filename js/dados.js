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
    cabaz_frutas:  "fotos/cabaz_frutas.jpeg",
    cabaz_legumes: "fotos/cabaz_legumes.jpeg",
    cabaz_mix:     "fotos/cabaz_mix.jpeg",
    cabaz_verao:   "fotos/cabaz_verao.jpeg",
  };
  const SFX = "?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop";

  function urlFoto(u) { return u.startsWith('fotos/') ? u : u + SFX; }

  const produtos = {
    frutas: [
      { nome:"Maçã Golden",         emoji:"🍎", peso:"1 kg",       preco:P, foto:FOTOS.macas,        badge:null },
      { nome:"Maçã Reineta",        emoji:"🍏", peso:"1 kg",       preco:P, foto:FOTOS.macas,        badge:null },
      { nome:"Bananas",             emoji:"🍌", peso:"1 kg",       preco:P, foto:FOTOS.bananas,      badge:null },
      { nome:"Laranjas",            emoji:"🍊", peso:"1 kg",       preco:P, foto:FOTOS.laranjas,     badge:null },
      { nome:"Tangerina",           emoji:"🍊", peso:"±500 g",     preco:P, foto:FOTOS.tangerina,    badge:null },
      { nome:"Uva sem Grainha",     emoji:"🍇", peso:"±500 g",     preco:P, foto:FOTOS.uvas,         badge:null },
      { nome:"Uva Red Globe",       emoji:"🍇", peso:"±500 g",     preco:P, foto:FOTOS.uvas,         badge:"⭐ Destaque", badgeClass:"" },
      { nome:"Morangos",            emoji:"🍓", peso:"Caixa 250 g", preco:P, foto:FOTOS.morangos,    badge:"🔥 Popular",  badgeClass:"badge-hot" },
      { nome:"Melancia",            emoji:"🍉", peso:"±3 kg",      preco:P, foto:FOTOS.melancia,     badge:"🌞 Verão",    badgeClass:"" },
      { nome:"Manga",               emoji:"🥭", peso:"±500 g",     preco:P, foto:FOTOS.manga,        badge:"🌴 Tropical", badgeClass:"badge-new" },
      { nome:"Ananás",              emoji:"🍍", peso:"±1,7 kg",    preco:P, foto:FOTOS.ananas,       badge:null },
      { nome:"Pêras",               emoji:"🍐", peso:"1 kg",       preco:P, foto:FOTOS.peras,        badge:null },
      { nome:"Limões",              emoji:"🍋", peso:"500 g",      preco:P, foto:FOTOS.limoes,       badge:null },
      { nome:"Pêssego Amarelo",     emoji:"🍑", peso:"±500 g",     preco:P, foto:FOTOS.pessegos,     badge:null },
      { nome:"Pêssego Vermelho",    emoji:"🍑", peso:"±500 g",     preco:P, foto:FOTOS.pessegos,     badge:null },
      { nome:"Pêssego Paraguaio",   emoji:"🍑", peso:"±500 g",     preco:P, foto:FOTOS.pessegos,     badge:null },
      { nome:"Nectarina",           emoji:"🍑", peso:"±500 g",     preco:P, foto:FOTOS.pessegos,     badge:null },
      { nome:"Cereja de Fundão",    emoji:"🍒", peso:"500 g",      preco:P, foto:FOTOS.cerejas,      badge:"💎 Premium",  badgeClass:"badge-hot" },
      { nome:"Cereja Gardunha",     emoji:"🍒", peso:"Caixa 2 kg", preco:P, foto:FOTOS.cerejas,      badge:"📦 Caixa",    badgeClass:"" },
      { nome:"Figos",               emoji:"🫐", peso:"±500 g",     preco:P, foto:FOTOS.figos,        badge:"🌞 Verão",    badgeClass:"" },
      { nome:"Romã",                emoji:"🔴", peso:"±500 g",     preco:P, foto:FOTOS.roma,         badge:null },
      { nome:"Kiwi",                emoji:"🥝", peso:"±500 g",     preco:P, foto:FOTOS.kiwi,         badge:null },
      { nome:"Abacate",             emoji:"🥑", peso:"±750 g",     preco:P, foto:FOTOS.abacate,      badge:null },
      { nome:"Coco",                emoji:"🥥", peso:"1 un",       preco:P, foto:FOTOS.coco,         badge:null },
      { nome:"Melão Verde",         emoji:"🍈", peso:"±3 kg",      preco:P, foto:FOTOS.melao_verde,  badge:null },
      { nome:"Melão Branco",        emoji:"🍈", peso:"±3 kg",      preco:P, foto:FOTOS.melao_branco, badge:null },
      { nome:"Melão Amarelo",       emoji:"🍈", peso:"±3 kg",      preco:P, foto:FOTOS.melao_am,     badge:"🌞 Verão",    badgeClass:"" },
      { nome:"Ameixa Vermelha",     emoji:"🍇", peso:"±500 g",     preco:P, foto:FOTOS.ameixa,       badge:null },
    ],
    legumes: [
      { nome:"Tomates",     emoji:"🍅", peso:"1 kg",    preco:P, foto:FOTOS.tomates,    badge:"🔥 Popular", badgeClass:"badge-hot" },
      { nome:"Cenouras",    emoji:"🥕", peso:"1 kg",    preco:P, foto:FOTOS.cenouras,   badge:null },
      { nome:"Brócolos",    emoji:"🥦", peso:"±900 g",  preco:P, foto:FOTOS.brocoulos,  badge:"🌱 Bio",     badgeClass:"badge-bio" },
      { nome:"Alface",      emoji:"🥬", peso:"±300 g",  preco:P, foto:FOTOS.alface,     badge:null },
      { nome:"Pepino",      emoji:"🥒", peso:"±400 g",  preco:P, foto:FOTOS.pepino,     badge:null },
      { nome:"Pimentos",    emoji:"🫑", peso:"±500 g",  preco:P, foto:FOTOS.pimentos,   badge:null },
      { nome:"Cebolas",     emoji:"🧅", peso:"±500 g",  preco:P, foto:FOTOS.cebolas,    badge:null },
      { nome:"Alho",        emoji:"🧄", peso:"±250 g",  preco:P, foto:FOTOS.alho,       badge:null },
      { nome:"Batatas",     emoji:"🥔", peso:"±3 kg",   preco:P, foto:FOTOS.batatas,    badge:null },
      { nome:"Milho",       emoji:"🌽", peso:"1 un",    preco:P, foto:FOTOS.milho,      badge:null },
      { nome:"Espinafres",  emoji:"🥬", peso:"±500 g",  preco:P, foto:FOTOS.espinafres, badge:"🌱 Bio",     badgeClass:"badge-bio" },
      { nome:"Beringela",   emoji:"🍆", peso:"±450 g",  preco:P, foto:FOTOS.beringela,  badge:null },
      { nome:"Curgete",     emoji:"🥒", peso:"±500 g",  preco:P, foto:FOTOS.curgete,    badge:null },
      { nome:"Cogumelos",   emoji:"🍄", peso:"300 g",   preco:P, foto:FOTOS.cogumelos,  badge:null },
      { nome:"Couve",       emoji:"🥬", peso:"±900 g",  preco:P, foto:FOTOS.couve,      badge:null },
      { nome:"Batata-doce", emoji:"🍠", peso:"±1 kg",   preco:P, foto:FOTOS.batatadoce, badge:null },
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
