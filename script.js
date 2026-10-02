// ===== Configuração da loja =====
const LOJA = {
  whatsapp: "5511940826653",
  whatsappFmt: "(11) 94082-6653",
  telefone: "(11) 4661-1694",
  telefoneLink: "tel:+551146611694",
  endereco: "R. Cel. Luiz Tenório de Brito, 320 - Centro, Embu-Guaçu - SP",
  mapa: "https://www.google.com/maps/search/?api=1&query=R.+Cel.+Luiz+Ten%C3%B3rio+de+Brito%2C+320+Embu-Gua%C3%A7u+SP",
  instagram: "https://www.instagram.com/emanuel.materiais/",
  fundacao: 1989,
  // [abre, fecha] em minutos desde 00:00, indexado por dia da semana (0 = domingo)
  horarios: {
    0: [7 * 60, 13 * 60],
    1: [7 * 60 + 30, 18 * 60],
    2: [7 * 60 + 30, 18 * 60],
    3: [7 * 60 + 30, 18 * 60],
    4: [7 * 60 + 30, 18 * 60],
    5: [7 * 60 + 30, 18 * 60],
    6: [7 * 60, 16 * 60],
  },
};

const waLink = (texto) => `https://wa.me/${LOJA.whatsapp}?text=${encodeURIComponent(texto)}`;
const fmtHora = (min) => `${Math.floor(min / 60)}h${min % 60 ? String(min % 60).padStart(2, "0") : ""}`;

// Hora atual em São Paulo, independente do fuso do visitante
function agoraSP() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t).value;
  const dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { dia, min: Number(get("hour")) * 60 + Number(get("minute")) };
}

function statusLoja() {
  const { dia, min } = agoraSP();
  const [abre, fecha] = LOJA.horarios[dia];
  if (min >= abre && min < fecha) return { aberto: true, dia, texto: `Aberto agora · fecha às ${fmtHora(fecha)}` };
  if (min < abre) return { aberto: false, dia, texto: `Fechado · abre hoje às ${fmtHora(abre)}` };
  const amanha = (dia + 1) % 7;
  return { aberto: false, dia, texto: `Fechado · abre amanhã às ${fmtHora(LOJA.horarios[amanha][0])}` };
}

// ===== Página =====
document.getElementById("ano").textContent = new Date().getFullYear();
document.getElementById("anos").textContent = new Date().getFullYear() - LOJA.fundacao;

function atualizarStatus() {
  const s = statusLoja();
  const pill = document.getElementById("openPill");
  pill.textContent = s.aberto ? "Aberto agora" : "Fechado agora";
  pill.className = `pill ${s.aberto ? "is-open" : "is-closed"}`;
  document.getElementById("heroStatus").textContent = s.texto;
  document.getElementById("heroDot").className = `status-dot ${s.aberto ? "is-open" : "is-closed"}`;
  document.querySelectorAll("#hoursList li").forEach((li) => {
    li.classList.toggle("is-today", li.dataset.days.split(",").map(Number).includes(s.dia));
  });
  document.getElementById("chatStatus").textContent = s.aberto
    ? "Online · loja aberta agora"
    : "Online · loja fechada, responderemos assim que abrir";
}
atualizarStatus();
setInterval(atualizarStatus, 60_000);

// Menu mobile
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
navToggle.addEventListener("click", () => {
  const aberto = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", aberto);
});
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
  nav.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}));

// Formulário -> WhatsApp
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const d = new FormData(e.target);
  const linhas = [
    "Olá! Vim pelo site e gostaria de um orçamento.",
    `*Nome:* ${d.get("nome").trim()}`,
    d.get("local").trim() && `*Local:* ${d.get("local").trim()}`,
    `*Preciso de:* ${d.get("msg").trim()}`,
  ].filter(Boolean);
  window.open(waLink(linhas.join("\n")), "_blank", "noopener");
});

// Animação de entrada
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".section__head, .product, .steps li, .gallery a, .about__media, .about__content, .contact__info, .contact__side")
  .forEach((el) => { el.classList.add("reveal"); io.observe(el); });

// ===== Chatbot =====
const chatBody = document.getElementById("chatBody");
const chatQuick = document.getElementById("chatQuick");
const chatForm = document.getElementById("chatForm");
const chatText = document.getElementById("chatText");
let iniciado = false;
let fluxo = null; // { etapa, dados } durante o orçamento guiado

const QUICK_INICIO = ["Fazer orçamento", "Horários", "Endereço", "Produtos", "Falar com atendente"];

function toggleChat(abrir) {
  const aberto = document.body.classList.toggle("chat-open", abrir);
  document.getElementById("chat").setAttribute("aria-hidden", !aberto);
  document.getElementById("chatPing").hidden = true;
  if (aberto && !iniciado) {
    iniciado = true;
    const s = statusLoja();
    bot(`Olá! 👋 Eu sou o assistente virtual da <strong>Emanuel Materiais de Construção</strong>.\n${s.aberto ? "A loja está aberta agora!" : "No momento a loja está fechada, mas posso adiantar seu atendimento."}\n\nComo posso te ajudar?`, QUICK_INICIO);
  }
  if (aberto) setTimeout(() => chatText.focus(), 250);
}
document.getElementById("chatFab").addEventListener("click", () => toggleChat());
document.getElementById("chatClose").addEventListener("click", () => toggleChat(false));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") toggleChat(false); });

function addMsg(html, quem) {
  const el = document.createElement("div");
  el.className = `msg msg--${quem}`;
  if (quem === "user") el.textContent = html; else el.innerHTML = html;
  chatBody.appendChild(el);
  chatBody.scrollTop = chatBody.scrollHeight;
  return el;
}

function setQuick(opcoes = []) {
  chatQuick.innerHTML = "";
  opcoes.forEach((op) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = op;
    b.addEventListener("click", () => enviar(op));
    chatQuick.appendChild(b);
  });
}

function bot(html, quick) {
  setQuick([]);
  const t = addMsg('<span class="typing"><i></i><i></i><i></i></span>', "bot");
  const delay = Math.min(1200, 400 + html.length * 6);
  setTimeout(() => {
    t.innerHTML = html;
    chatBody.scrollTop = chatBody.scrollHeight;
    setQuick(quick);
  }, delay);
}

const botaoWa = (texto, rotulo = "Abrir WhatsApp") =>
  `<a class="btn btn--wa" href="${waLink(texto)}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><use href="#i-wa"/></svg> ${rotulo}</a>`;

const normalizar = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const tem = (txt, ...palavras) => palavras.some((p) => txt.includes(p));

const PRODUTOS = [
  { chaves: ["cimento", "areia", "pedra", "brita", "bloco", "tijolo", "cal", "argamassa", "concreto"], nome: "básicos de obra (cimento, areia, pedra, blocos, argamassa)" },
  { chaves: ["cano", "tubo", "conexao", "registro", "caixa d", "hidraul", "torneira", "aquecedor", "chuveiro"], nome: "hidráulica (tubos, conexões, registros, caixas d'água)" },
  { chaves: ["fio", "cabo", "disjuntor", "tomada", "interruptor", "eletric", "lampada", "luz"], nome: "elétrica (fios, cabos, disjuntores, tomadas)" },
  { chaves: ["tinta", "massa", "rolo", "pincel", "impermeab", "selador", "verniz"], nome: "tintas e acabamento" },
  { chaves: ["ferramenta", "martelo", "escada", "carrinho", "pa ", "enxada", "epi", "luva", "bota"], nome: "ferramentas e EPIs" },
  { chaves: ["telha", "prego", "parafuso", "vergalh", "ferro", "arame", "cumeeira"], nome: "ferragens e telhado" },
];

function responder(entrada) {
  const txt = normalizar(entrada);

  // Orçamento guiado
  if (fluxo) {
    if (tem(txt, "cancelar", "sair", "voltar")) {
      fluxo = null;
      return bot("Tudo bem, cancelei o orçamento. Posso ajudar em algo mais?", QUICK_INICIO);
    }
    if (fluxo.etapa === "nome") {
      fluxo.dados.nome = entrada.trim();
      fluxo.etapa = "itens";
      return bot(`Prazer, <strong>${escapar(fluxo.dados.nome)}</strong>! 😊\nAgora me diga <strong>quais materiais e quantidades</strong> você precisa. Pode escrever tudo numa mensagem só.`);
    }
    if (fluxo.etapa === "itens") {
      fluxo.dados.itens = entrada.trim();
      fluxo.etapa = "entrega";
      return bot("Anotado! Você prefere <strong>retirar na loja</strong> ou precisa de <strong>entrega</strong>?", ["Retirar na loja", "Preciso de entrega"]);
    }
    if (fluxo.etapa === "entrega") {
      fluxo.dados.entrega = tem(txt, "entreg", "levar", "mandar") ? "Entrega" : "Retirada na loja";
      if (fluxo.dados.entrega === "Entrega") {
        fluxo.etapa = "local";
        return bot("Certo! Qual o <strong>bairro / endereço</strong> da entrega?");
      }
      return finalizarOrcamento();
    }
    if (fluxo.etapa === "local") {
      fluxo.dados.local = entrada.trim();
      return finalizarOrcamento();
    }
  }

  if (tem(txt, "orcamento", "orcar", "preco", "valor", "quanto custa", "quanto ta", "quanto e", "cotacao", "comprar", "pedido")) {
    fluxo = { etapa: "nome", dados: {} };
    return bot("Ótimo, vamos montar seu orçamento! 📝\nPrimeiro, <strong>qual é o seu nome?</strong>\n<small>(digite \"cancelar\" a qualquer momento para sair)</small>");
  }

  if (tem(txt, "atendente", "humano", "pessoa", "vendedor", "falar com", "whats", "zap")) {
    return bot(`Claro! Fale direto com a nossa equipe pelo WhatsApp <strong>${LOJA.whatsappFmt}</strong> ou ligue no fixo <a href="${LOJA.telefoneLink}">${LOJA.telefone}</a>.\n${botaoWa("Olá! Vim pelo site e gostaria de falar com um atendente.")}`, ["Fazer orçamento", "Horários"]);
  }

  if (tem(txt, "horario", "abre", "fecha", "funciona", "aberto", "domingo", "sabado", "feriado", "hora")) {
    const s = statusLoja();
    return bot(`🕒 <strong>Horário de atendimento</strong>\nSegunda a sexta: 7h30 às 18h\nSábado: 7h às 16h\nDomingo: 7h às 13h\n\n<strong>${s.texto}</strong>${tem(txt, "feriado") ? "\n\nEm feriados o horário pode mudar. Confirme pelo WhatsApp." : ""}`, ["Endereço", "Fazer orçamento"]);
  }

  if (tem(txt, "endereco", "onde", "localiza", "chegar", "mapa", "fica", "rua")) {
    return bot(`📍 Estamos em:\n<strong>${LOJA.endereco}</strong>\n\n<a href="${LOJA.mapa}" target="_blank" rel="noopener">Abrir no Google Maps</a>`, ["Horários", "Fazer orçamento"]);
  }

  if (tem(txt, "entrega", "frete", "entregam", "levam", "mandam")) {
    return bot(`🚚 Para entregas, envie seu endereço e a lista de materiais pelo WhatsApp que a equipe confirma disponibilidade, prazo e valor do frete.\n${botaoWa("Olá! Gostaria de saber sobre entrega de materiais. Meu endereço é: ")}`, ["Fazer orçamento"]);
  }

  if (tem(txt, "pagamento", "pagar", "cartao", "pix", "parcel", "boleto", "dinheiro", "credito", "debito")) {
    return bot(`💳 As formas de pagamento e condições de parcelamento são confirmadas pela nossa equipe no momento do orçamento.\n${botaoWa("Olá! Quais são as formas de pagamento?", "Perguntar no WhatsApp")}`, ["Fazer orçamento"]);
  }

  if (tem(txt, "telefone", "contato", "ligar", "numero", "instagram")) {
    return bot(`📞 Fixo: <a href="${LOJA.telefoneLink}">${LOJA.telefone}</a>\n💬 WhatsApp: <a href="${waLink("Olá! Vim pelo site.")}" target="_blank" rel="noopener">${LOJA.whatsappFmt}</a>\n📸 Instagram: <a href="${LOJA.instagram}" target="_blank" rel="noopener">@emanuel.materiais</a>`, ["Fazer orçamento", "Endereço"]);
  }

  const achados = PRODUTOS.filter((p) => p.chaves.some((c) => txt.includes(c)));
  if (achados.length) {
    return bot(`Trabalhamos com ${achados.map((p) => `<strong>${p.nome}</strong>`).join(" e ")}. 👍\nQuer que eu monte um orçamento com o que você precisa?`, ["Fazer orçamento", "Falar com atendente"]);
  }

  if (tem(txt, "produto", "vende", "voces tem", "tem ", "material", "materiais")) {
    return bot("Temos tudo para sua obra:\n🧱 Cimento, areia, pedra e blocos\n🚿 Hidráulica\n⚡ Elétrica\n🎨 Tintas e acabamento\n🔧 Ferramentas e EPIs\n🏠 Ferragens e telhado\n\nProcurando algo específico? É só escrever o nome do produto.", ["Fazer orçamento", "Falar com atendente"]);
  }

  if (tem(txt, "obrigad", "valeu", "agradec", "show", "beleza")) {
    return bot("Nós que agradecemos! 💙💛 Café, fé e foco! Precisando, é só chamar.", QUICK_INICIO);
  }

  if (/^(oi+|ola|opa|eai|e ai|bom dia|boa tarde|boa noite)\b/.test(txt.trim())) {
    return bot("Olá! Tudo bem? 😊 Em que posso te ajudar hoje?", QUICK_INICIO);
  }

  return bot(`Hmm, não tenho certeza se entendi. 🤔 Nossa equipe pode te ajudar melhor pelo WhatsApp:\n${botaoWa(`Olá! Vim pelo site. ${entrada}`, "Enviar minha dúvida")}`, QUICK_INICIO);
}

function finalizarOrcamento() {
  const d = fluxo.dados;
  fluxo = null;
  const mensagem = [
    "Olá! Vim pelo site e gostaria de um orçamento.",
    `*Nome:* ${d.nome}`,
    `*Materiais:* ${d.itens}`,
    `*Recebimento:* ${d.entrega}`,
    d.local && `*Endereço:* ${d.local}`,
  ].filter(Boolean).join("\n");
  bot(`Prontinho, ${escapar(d.nome)}! ✅ Seu pedido de orçamento está pronto:\n\n<strong>Materiais:</strong> ${escapar(d.itens)}\n<strong>Recebimento:</strong> ${d.entrega}${d.local ? `\n<strong>Endereço:</strong> ${escapar(d.local)}` : ""}\n\nToque no botão para enviar à nossa equipe:\n${botaoWa(mensagem, "Enviar orçamento")}`, ["Horários", "Endereço"]);
}

function escapar(s) {
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}

function enviar(texto) {
  if (!texto.trim()) return;
  addMsg(texto, "user");
  setQuick([]);
  responder(texto);
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  enviar(chatText.value);
  chatText.value = "";
});
