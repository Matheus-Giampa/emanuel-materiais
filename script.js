// ===== Dados da loja =====
const LOJA = {
  whatsapp: "5511940826653",
  telefone: "11 4661-1694",
  telefoneLink: "tel:+551146611694",
  email: "contato@depositoemanuel.com.br",
  endereco: "Rua Coronel Luiz Tenório de Brito, 320 - Centro, Embu-Guaçu/SP",
  mapa: "https://www.google.com/maps/search/?api=1&query=Rua+Coronel+Luiz+Ten%C3%B3rio+de+Brito%2C+320+Embu-Gua%C3%A7u+SP",
  // [abre, fecha] em minutos, por dia da semana (0 = domingo)
  horarios: {
    0: [420, 780],
    1: [450, 1080], 2: [450, 1080], 3: [450, 1080], 4: [450, 1080], 5: [450, 1080],
    6: [420, 960],
  },
};

// Departamentos (quantidade = itens no catálogo de depositoemanuel.com.br), palavras do chat e itens do menu
const DEPARTAMENTOS = [
  ["Materiais básicos de obra", 200, ["areia", "pedra", "brita", "bloco", "tijolo", "concreto", "lona"], [
    "Areia média (m³)", "Areia fina (m³)", "Pedra britada nº 1 (m³)", "Pedrisco (m³)", "Bloco de concreto 14x19x39", "Bloco de concreto 9x19x39",
    "Bloco cerâmico (baiano)", "Tijolo maciço", "Concreto pronto ensacado", "Lona plástica preta (m)"]],
  ["Cimento, cal e gesso", 7, ["cimento", "cal ", "gesso"], [
    "Cimento CP-II 50kg", "Cimento CP-III 50kg", "Cal hidratada 20kg", "Cal virgem Cristal", "Gesso em pó"]],
  ["Argamassa", 16, ["argamassa", "cimentcola", "ac1", "ac2", "ac3", "ac-"], [
    "Argamassa AC-I 20kg", "Argamassa AC-II 20kg", "Argamassa AC-III 20kg", "Argamassa de assentamento", "Argamassa para reboco", "Rejunte flexível"]],
  ["Vigas, colunas e ferro", 7, ["viga", "coluna", "trelica", "ferro", "vergalh", "estribo"], [
    "Vergalhão CA-50 1/4\" (barra)", "Vergalhão CA-50 5/16\" (barra)", "Vergalhão CA-50 3/8\" (barra)", "Coluna armada pronta", "Viga armada pronta",
    "Treliça", "Estribo pronto", "Arame recozido (kg)"]],
  ["Arames", 7, ["arame"], ["Arame farpado (rolo)", "Arame torcido", "Arame liso galvanizado", "Arame recozido (kg)"]],
  ["Telhas e forros", 5, ["telha", "forro", "cumeeira", "calha", "rufo"], [
    "Telha de fibrocimento", "Telha cerâmica", "Cumeeira", "Forro de PVC (m²)", "Calha", "Rufo", "Parafuso para telha"]],
  ["Pisos e revestimentos", 169, ["piso", "revestimento", "porcelanato", "azulejo", "ceramica", "rejunte", "soleira"], [
    "Piso cerâmico (m²)", "Porcelanato Savane Perla (m²)", "Revestimento Savane Pedra Ferro (m²)", "Revestimento Savane Oásis Tulum (m²)",
    "Revestimento Savane Oásis Ravena (m²)", "Revestimento Savane Abstrate Branco (m²)", "Soleira de granito", "Rodapé", "Espaçador / nivelador de piso"]],
  ["Hidráulica", null, ["cano", "tubo", "conexao", "registro", "hidraul", "caixa d", "bomba", "poco", "agua"], [
    "Tubo PVC soldável 25mm (barra 6m)", "Tubo PVC soldável 32mm (barra 6m)", "Tubo esgoto 40mm (barra 6m)", "Tubo esgoto 100mm (barra 6m)",
    "Joelho 90º", "Tê", "Luva", "Registro de gaveta", "Registro de pressão", "Cola para PVC", "Fita veda-rosca",
    "Caixa d'água Fortlev 500L", "Caixa d'água Fortlev 1000L", "Caixa d'água Fortlev 2000L", "Bomba submersa Anauger 800", "Conduíte Tigre/Fortlev (rolo)"]],
  ["Elétrica e iluminação", null, ["fio", "cabo", "disjuntor", "tomada", "interruptor", "eletric", "lampada", "luminaria", "refletor", "sensor"], [
    "Cabo flexível 1,5mm (rolo 100m)", "Cabo flexível 2,5mm (rolo 100m)", "Cabo flexível 4mm (rolo 100m)", "Cabo flexível 6mm (rolo 100m)",
    "Disjuntor", "Quadro de distribuição", "Tomada", "Interruptor", "Caixinha 4x2", "Lâmpada LED", "Luminária", "Refletor LED",
    "Sensor de presença Qualitronix", "Extensão / filtro de linha", "Campainha"]],
  ["Banheiro", 55, ["banheiro", "vaso", "bacia", "caixa acoplada", "assento", "chuveiro", "ducha"], [
    "Bacia com caixa acoplada", "Assento sanitário oval almofadado", "Assento redutor infantil Astra", "Anel de vedação para vaso", "Boia para caixa acoplada",
    "Kit banheiro 5 peças Japi", "Chuveiro elétrico", "Ducha higiênica", "Lavatório / cuba", "Sifão", "Engate flexível"]],
  ["Cozinha e lavanderia", 24, ["cozinha", "pia", "cuba", "tanque", "torneira"], [
    "Pia de cozinha inox", "Cuba inox", "Torneira de cozinha", "Torneira flexível", "Tanque azulejado Lave Mais", "Tanquinho Lave Mais", "Válvula de escoamento"]],
  ["Portas e janelas", 41, ["porta", "janela", "batente", "fechadura", "vitro", "dobradica"], [
    "Porta de madeira", "Porta de alumínio", "Janela de alumínio", "Janela de madeira", "Vitrô", "Batente / guarnição", "Fechadura",
    "Dobradiça", "Espuma expansiva PU 500ml"]],
  ["Tintas", 30, ["tinta", "latex", "rolo", "pincel", "broxa", "esmalte", "spray", "pintura"], [
    "Tinta látex 18L", "Tinta látex 3,6L", "Esmalte sintético", "Tinta para piso", "Tinta spray", "Corante líquido 50ml",
    "Kit pintura rolo + bandeja Castor", "Rolo de lã", "Bandeja de pintura", "Broxa retangular Atlas", "Pincel", "Fita crepe", "Lixa", "Thinner / aguarrás"]],
  ["Massas e texturas", 13, ["massa", "textura", "selador"], [
    "Massa corrida PVA", "Massa acrílica", "Selador acrílico", "Textura acrílica", "Massa plástica com catalisador"]],
  ["Verniz", 5, ["verniz", "stain"], ["Verniz marítimo", "Verniz copal", "Seladora para madeira", "Stain para madeira"]],
  ["Impermeabilizantes e vedação", 16, ["impermeab", "vedacit", "manta", "aditivo", "silicone", "pu 40"], [
    "Aditivo impermeabilizante Vedacit 18L", "Aditivo impermeabilizante Vedacit 3,6L", "Aditivo impermeabilizante Imperplus 18L",
    "Adesivo de alto desempenho Vedacit", "Adesivo de aderência Superfix 18L", "Manta asfáltica", "Silicone PU 40", "Silicone veda calha Bautech"]],
  ["Ferramentas", 77, ["ferramenta", "martelo", "serrote", "cavadeira", "enxada", "pa ", "colher de pedreiro", "nivel", "alicate", "chave", "broca", "trena", "disco"], [
    "Carrinho de mão", "Pá", "Enxada", "Cavadeira articulada", "Colher de pedreiro", "Desempenadeira", "Nível", "Martelo", "Trena",
    "Serrote costa 12\" Ramada", "Alicate universal isolado", "Jogo de chaves de fenda/philips", "Jogo de chaves combinadas 6–22mm",
    "Brocas", "Discos de corte", "Serra copo diamantada", "Aparador de grama Tramontina"]],
  ["Equipamentos de segurança", 5, ["epi", "luva", "bota", "capacete", "oculos", "seguranca", "mascara"], [
    "Óculos de proteção", "Luva", "Capacete", "Botina", "Protetor auricular", "Máscara", "Cinta com catraca Starfer"]],
  ["Jardim e piscina", 8, ["jardim", "mangueira", "piscina", "correio"], [
    "Mangueira de jardim", "Esguicho", "Tesoura de poda", "Serrote para poda", "Caixa de correio", "Produtos para piscina"]],
];

const wa = (texto) => `https://wa.me/${LOJA.whatsapp}?text=${encodeURIComponent(texto)}`;
const hora = (m) => `${Math.floor(m / 60)}h${m % 60 ? String(m % 60).padStart(2, "0") : ""}`;
const sem = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const esc = (s) => { const d = document.createElement("div"); d.textContent = s; return d.innerHTML; };

// Horário de São Paulo, independente do fuso de quem visita
function agora() {
  const p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Sao_Paulo", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(new Date());
  const g = (t) => p.find((x) => x.type === t).value;
  return { dia: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(g("weekday")), min: +g("hour") * 60 + +g("minute") };
}
function status() {
  const { dia, min } = agora();
  const [a, f] = LOJA.horarios[dia];
  if (min >= a && min < f) return { aberto: true, dia, texto: `Aberto agora, até ${hora(f)}` };
  if (min < a) return { aberto: false, dia, texto: `Fechado agora, abre hoje às ${hora(a)}` };
  return { aberto: false, dia, texto: `Fechado agora, abre amanhã às ${hora(LOJA.horarios[(dia + 1) % 7][0])}` };
}
function pintarStatus() {
  const s = status();
  document.getElementById("status").textContent = s.texto;
  document.getElementById("dot").className = `dot ${s.aberto ? "on" : "off"}`;
  document.querySelectorAll("#hours tr").forEach((tr) => tr.classList.toggle("today", tr.dataset.days.split(",").map(Number).includes(s.dia)));
  document.getElementById("chatStatus").textContent = s.aberto ? "Loja aberta agora" : "Loja fechada, respondemos ao abrir";
}
pintarStatus();
setInterval(pintarStatus, 60000);
document.getElementById("ano").textContent = new Date().getFullYear();

// Menu mobile
const menu = document.getElementById("menu");
const burger = document.getElementById("burger");
burger.addEventListener("click", () => burger.setAttribute("aria-expanded", menu.classList.toggle("open")));
menu.addEventListener("click", (e) => { if (e.target.tagName === "A") { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); } });

// ===== Lista de materiais =====
const store = {
  get() { try { return JSON.parse(localStorage.getItem("emanuel-lista")) || []; } catch { return []; } },
  set(v) { try { localStorage.setItem("emanuel-lista", JSON.stringify(v)); } catch { /* sem storage, segue em memória */ } },
};
let lista = store.get();
const padItems = document.getElementById("padItems");
const padEmpty = document.getElementById("padEmpty");

function desenharLista() {
  padItems.querySelectorAll("li:not(#padEmpty)").forEach((li) => li.remove());
  padEmpty.hidden = lista.length > 0;
  lista.forEach((it, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="q">${esc(it.q || "—")}</span><span>${esc(it.item)}</span><button type="button" class="x" aria-label="Remover ${esc(it.item)}">×</button>`;
    li.querySelector(".x").addEventListener("click", () => { lista.splice(i, 1); salvar(); });
    padItems.appendChild(li);
  });
  document.querySelectorAll(".prod").forEach((row) => {
    const it = lista.find((x) => x.item === row.dataset.item);
    const n = it ? parseInt(it.q, 10) || 1 : 0;
    row.querySelector(".prod__n").textContent = n;
    row.classList.toggle("on", n > 0);
  });
  document.querySelectorAll(".dept__box").forEach((box) => {
    const n = [...box.querySelectorAll(".prod.on")].length;
    box.querySelector(".dept__sel").textContent = n ? `${n} na lista` : "";
  });
}
function salvar() { store.set(lista); desenharLista(); }
function adicionar(q, item) {
  item = item.trim();
  if (!item) return false;
  lista.push({ q: q.trim(), item });
  salvar();
  return true;
}

document.getElementById("padDate").textContent = new Date().toLocaleDateString("pt-BR");
const qty = document.getElementById("qty");
const itemIn = document.getElementById("item");
function addDoCampo() {
  if (adicionar(qty.value, itemIn.value)) { qty.value = ""; itemIn.value = ""; qty.focus(); }
  else itemIn.focus();
}
document.getElementById("addBtn").addEventListener("click", addDoCampo);
[qty, itemIn].forEach((el) => el.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); addDoCampo(); } }));

const receber = document.getElementById("receber");
receber.addEventListener("change", () => { document.getElementById("endWrap").hidden = receber.selectedIndex === 0; });

document.getElementById("pad").addEventListener("submit", (e) => {
  e.preventDefault();
  if (itemIn.value.trim()) addDoCampo();
  const err = document.getElementById("padErr");
  if (!lista.length) { err.textContent = "Adicione pelo menos um item à lista."; itemIn.focus(); return; }
  err.textContent = "";
  const nome = document.getElementById("nome").value.trim();
  const end = document.getElementById("endereco").value.trim();
  const entrega = receber.selectedIndex === 1;
  const linhas = [
    nome ? `Olá! Sou ${nome} e vim pelo site. Gostaria de um orçamento:` : "Olá! Vim pelo site. Gostaria de um orçamento:",
    "",
    ...lista.map((it) => `• ${/^\d+$/.test(it.q) ? `${it.q}x ` : it.q ? `${it.q} ` : ""}${it.item}`),
    "",
    `Recebimento: ${entrega ? "entrega" : "retiro na loja"}`,
    entrega && end && `Endereço: ${end}`,
  ].filter((l) => l !== false && l !== undefined);
  window.open(wa(linhas.join("\n")), "_blank", "noopener");
});

// Departamentos: cada um abre com os itens e quantidade
function mudarQtd(item, delta) {
  const i = lista.findIndex((x) => x.item === item);
  const atual = i < 0 ? 0 : parseInt(lista[i].q, 10) || 1;
  const n = Math.max(0, atual + delta);
  if (n === 0 && i >= 0) lista.splice(i, 1);
  else if (n > 0 && i < 0) lista.push({ q: String(n), item });
  else if (n > 0) lista[i].q = String(n);
  salvar();
  if (atual === 0 && n === 1) aviso(`${item} na lista.`);
}

const deptEl = document.getElementById("dept");
DEPARTAMENTOS.forEach(([nome, qtd, , itens], i) => {
  const box = document.createElement("details");
  box.className = "dept__box";
  box.innerHTML = `<summary>
      <span class="dept__n">${String(i + 1).padStart(2, "0")}</span>
      <span class="dept__name">${esc(nome)}</span>
      <span class="dept__sel"></span>
      <span class="dept__count">${qtd ? `${qtd} no catálogo` : `${itens.length} itens`}</span>
      <span class="dept__arrow" aria-hidden="true"></span>
    </summary>
    <div class="dept__body">
      <ul class="prods">${itens.map((it) => `
        <li class="prod" data-item="${esc(it)}">
          <span class="prod__name">${esc(it)}</span>
          <span class="step">
            <button type="button" data-d="-1" aria-label="Menos ${esc(it)}">−</button>
            <span class="prod__n">0</span>
            <button type="button" data-d="1" aria-label="Mais ${esc(it)}">+</button>
          </span>
        </li>`).join("")}
      </ul>
      <form class="other">
        <input type="text" placeholder="Não achou? Escreva outro item de ${esc(nome.toLowerCase())}" aria-label="Outro item">
        <button type="submit">Adicionar</button>
      </form>
    </div>`;
  box.querySelectorAll(".step button").forEach((b) => b.addEventListener("click", () => mudarQtd(b.closest(".prod").dataset.item, +b.dataset.d)));
  box.querySelector(".other").addEventListener("submit", (e) => {
    e.preventDefault();
    const inp = e.target.querySelector("input");
    if (adicionar("", inp.value)) { aviso(`${inp.value.trim()} na lista.`); inp.value = ""; }
  });
  box.dataset.nome = nome;
  deptEl.appendChild(box);
});

function abrirDept(nome) {
  const box = [...document.querySelectorAll(".dept__box")].find((b) => b.dataset.nome === nome);
  if (!box) return;
  box.open = true;
  box.scrollIntoView({ behavior: "smooth", block: "start" });
}

let avisoT;
function aviso(texto) {
  let t = document.querySelector(".toast");
  if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
  t.innerHTML = `${esc(texto)} <a href="#lista">Ver lista</a>`;
  t.classList.add("show");
  clearTimeout(avisoT);
  avisoT = setTimeout(() => t.classList.remove("show"), 2600);
}
desenharLista();

// ===== Balcão online =====
const chatBody = document.getElementById("chatBody");
const chatQuick = document.getElementById("chatQuick");
const chatText = document.getElementById("chatText");
const talk = document.getElementById("talk");
const INICIO = ["Horário", "Endereço", "Entrega", "Montar orçamento", "Falar com vendedor"];
let comecou = false;

function abrirChat(abrir) {
  const aberto = document.body.classList.toggle("chat-open", abrir);
  talk.setAttribute("aria-expanded", aberto);
  document.getElementById("chat").setAttribute("aria-hidden", !aberto);
  if (aberto && !comecou) {
    comecou = true;
    const s = status();
    responderBot(`Oi! Aqui é o balcão do Depósito Emanuel. ${s.aberto ? "A loja está aberta agora." : "A loja está fechada agora, mas já dá pra adiantar."}\nSobre o que você quer saber?`, INICIO);
  }
  if (aberto) setTimeout(() => chatText.focus(), 200);
}
talk.addEventListener("click", () => abrirChat());
document.getElementById("chatX").addEventListener("click", () => abrirChat(false));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") abrirChat(false); });

function balao(html, quem) {
  const el = document.createElement("div");
  el.className = `msg msg--${quem}`;
  if (quem === "user") el.textContent = html; else el.innerHTML = html;
  chatBody.appendChild(el);
  chatBody.scrollTop = chatBody.scrollHeight;
  return el;
}
function opcoes(lista = []) {
  chatQuick.innerHTML = "";
  lista.forEach((o) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = o;
    b.addEventListener("click", () => enviar(o));
    chatQuick.appendChild(b);
  });
}
function responderBot(html, quick) {
  opcoes();
  const el = balao('<span class="typing">...</span>', "bot");
  setTimeout(() => { el.innerHTML = html; chatBody.scrollTop = chatBody.scrollHeight; opcoes(quick); }, Math.min(900, 300 + html.length * 4));
}
const botaoWa = (texto, rotulo) => `<a class="go" href="${wa(texto)}" target="_blank" rel="noopener">${rotulo}</a>`;
const tem = (t, ...p) => p.some((x) => t.includes(x));

function responder(entrada) {
  const t = sem(entrada);

  if (t === "ver os itens" && ultimoAssunto) {
    abrirChat(false);
    abrirDept(ultimoAssunto);
    return;
  }

  if (tem(t, "orcamento", "orcar", "lista", "preco", "valor", "quanto", "cotacao", "comprar", "pedido")) {
    return responderBot(`O jeito mais rápido é montar sua lista aqui no site: você anota os itens e ela vai pronta para o WhatsApp do vendedor.\n<a href="#lista" data-close>Ir para a lista de materiais</a>`, ["Falar com vendedor", "Entrega"]);
  }
  if (tem(t, "vendedor", "atendente", "humano", "pessoa", "falar", "whats", "zap", "ligar", "telefone", "contato", "email", "e-mail")) {
    return responderBot(`WhatsApp: 11 94082-6653\nTelefone: <a href="${LOJA.telefoneLink}">${LOJA.telefone}</a>\nE-mail: <a href="mailto:${LOJA.email}">${LOJA.email}</a>\n${botaoWa("Olá! Vim pelo site e queria falar com um vendedor.", "Abrir WhatsApp")}`, ["Horário", "Endereço"]);
  }
  if (tem(t, "horario", "abre", "fecha", "funciona", "aberto", "domingo", "sabado", "feriado", "hora")) {
    const s = status();
    return responderBot(`Segunda a sexta: 7h30 às 18h\nSábado: 7h às 16h\nDomingo: 7h às 13h\n\n<b>${s.texto}.</b>${tem(t, "feriado") ? "\nEm feriado o horário pode mudar, confirme no WhatsApp." : ""}`, ["Endereço", "Montar orçamento"]);
  }
  if (tem(t, "endereco", "onde", "localiza", "chegar", "mapa", "rua", "estacion")) {
    return responderBot(`${LOJA.endereco}\n<a href="${LOJA.mapa}" target="_blank" rel="noopener">Abrir rota no Google Maps</a>`, ["Horário", "Montar orçamento"]);
  }
  if (tem(t, "entrega", "frete", "entregam", "levam", "mandam", "caminhao")) {
    return responderBot(`Fazemos o orçamento com entrega: é só marcar "Preciso de entrega" na lista e colocar o endereço. O vendedor confirma prazo e frete pelo WhatsApp.`, ["Montar orçamento", "Falar com vendedor"]);
  }
  if (tem(t, "pagamento", "pagar", "cartao", "pix", "parcel", "boleto", "dinheiro", "credito", "debito")) {
    return responderBot(`Formas de pagamento e parcelamento são combinadas com o vendedor no orçamento.\n${botaoWa("Olá! Quais as formas de pagamento?", "Perguntar no WhatsApp")}`, ["Montar orçamento"]);
  }
  const achou = DEPARTAMENTOS.filter(([, , chaves]) => chaves.some((c) => t.includes(c)));
  if (achou.length) {
    const nomes = achou.map(([n]) => `<b>${esc(n)}</b>`).join(", ");
    return responderBot(`Temos sim, no departamento ${nomes}. Quer ver os itens e montar sua lista?`, ["Ver os itens", "Falar com vendedor"]);
  }
  if (tem(t, "obrigad", "valeu", "agradec")) return responderBot("Imagina. Precisando, é só chamar.", INICIO);
  if (/^(oi+|ola|opa|eai|e ai|bom dia|boa tarde|boa noite)\b/.test(t.trim())) return responderBot("Oi! Em que posso ajudar?", INICIO);

  return responderBot(`Essa eu prefiro passar para um vendedor, que te responde certinho.\n${botaoWa(`Olá! Vim pelo site. ${entrada}`, "Enviar pergunta no WhatsApp")}`, INICIO);
}

let ultimoAssunto = null;
function enviar(texto) {
  if (!texto.trim()) return;
  balao(texto, "user");
  opcoes();
  const t = sem(texto);
  const achou = DEPARTAMENTOS.find(([, , chaves]) => chaves.some((c) => t.includes(c)));
  if (achou && t !== "ver os itens") ultimoAssunto = achou[0];
  if (t === "montar orcamento") return responder("orcamento");
  responder(texto);
}
document.getElementById("chatForm").addEventListener("submit", (e) => { e.preventDefault(); enviar(chatText.value); chatText.value = ""; });
chatBody.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) abrirChat(false); });
