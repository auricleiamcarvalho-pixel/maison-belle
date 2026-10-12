
/* =====================================
   MAISON BELLE — JOGO DE PERGUNTAS
   ===================================== */

const perguntas = [
    {
        pergunta: "Qual é a capital do Brasil?",
        alternativas: ["São Paulo", "Brasília", "Rio de Janeiro", "Salvador"],
        correta: 1,
        moedas: 10
    },
    {
        pergunta: "Quantos dias tem uma semana?",
        alternativas: ["5 dias", "6 dias", "7 dias", "8 dias"],
        correta: 2,
        moedas: 10
    },
    {
        pergunta: "Qual planeta é conhecido como Planeta Vermelho?",
        alternativas: ["Vênus", "Marte", "Júpiter", "Saturno"],
        correta: 1,
        moedas: 10
    },
    {
        pergunta: "Quanto é 8 × 7?",
        alternativas: ["54", "56", "64", "48"],
        correta: 1,
        moedas: 10
    },
    {
        pergunta: "Qual destes animais é um mamífero?",
        alternativas: ["Tubarão", "Galinha", "Golfinho", "Tartaruga"],
        correta: 2,
        moedas: 20
    },
    {
        pergunta: "Qual é o maior oceano da Terra?",
        alternativas: ["Atlântico", "Índico", "Ártico", "Pacífico"],
        correta: 3,
        moedas: 20
    },
    {
        pergunta: "Qual é o resultado de 144 ÷ 12?",
        alternativas: ["10", "11", "12", "14"],
        correta: 2,
        moedas: 20
    },
    {
        pergunta: "Qual gás as plantas absorvem principalmente na fotossíntese?",
        alternativas: [
            "Oxigênio",
            "Gás carbônico",
            "Hidrogênio",
            "Hélio"
        ],
        correta: 1,
        moedas: 30
    },
    {
        pergunta: "Qual é o símbolo químico da água?",
        alternativas: ["CO₂", "O₂", "H₂O", "NaCl"],
        correta: 2,
        moedas: 30
    },
    {
        pergunta: "Quantos lados tem um hexágono?",
        alternativas: ["5", "6", "7", "8"],
        correta: 1,
        moedas: 30
    }
];

const elementoMoedas = document.getElementById("moedas");
const inicioJogo = document.getElementById("inicio-jogo");
const areaPergunta = document.getElementById("area-pergunta");
const resultado = document.getElementById("resultado");

const botaoComecar = document.getElementById("botao-comecar");
const botaoProximo = document.getElementById("botao-proximo");
const botaoReiniciar = document.getElementById("botao-reiniciar");

const elementoProgresso = document.getElementById("progresso");
const elementoPergunta = document.getElementById("pergunta");
const elementoAlternativas = document.getElementById("alternativas");
const elementoMensagem = document.getElementById("mensagem");
const resumoFinal = document.getElementById("resumo-final");

let indicePergunta = 0;
let acertos = 0;
let moedasDaRodada = 0;
let respondeu = false;

function carregarMoedas() {
    const valorSalvo = Number(localStorage.getItem("maisonBelleMoedas"));
    return Number.isFinite(valorSalvo) && valorSalvo >= 0
        ? valorSalvo
        : 0;
}

let totalMoedas = carregarMoedas();

function atualizarMoedas() {
    elementoMoedas.textContent = totalMoedas;
}

function comecarJogo() {
    indicePergunta = 0;
    acertos = 0;
    moedasDaRodada = 0;

    inicioJogo.hidden = true;
    resultado.hidden = true;
    areaPergunta.hidden = false;

    mostrarPergunta();
}

function mostrarPergunta() {
    respondeu = false;

    const atual = perguntas[indicePergunta];

    elementoProgresso.textContent =
        `Pergunta ${indicePergunta + 1} de ${perguntas.length}`;

    elementoPergunta.textContent = atual.pergunta;
    elementoAlternativas.replaceChildren();

    elementoMensagem.textContent = "";
    elementoMensagem.className = "";
    botaoProximo.hidden = true;

    atual.alternativas.forEach((alternativa, indice) => {
        const botao = document.createElement("button");

        botao.type = "button";
        botao.className = "alternativa";
        botao.textContent = alternativa;

        botao.addEventListener("click", () => {
            verificarResposta(indice);
        });

        elementoAlternativas.appendChild(botao);
    });
}

function verificarResposta(indiceEscolhido) {
    if (respondeu) return;

    respondeu = true;

    const atual = perguntas[indicePergunta];
    const botoes = elementoAlternativas.querySelectorAll("button");
    const acertou = indiceEscolhido === atual.correta;

    botoes.forEach((botao, indice) => {
        botao.disabled = true;

        if (indice === atual.correta) {
            botao.classList.add("correta");
        }

        if (indice === indiceEscolhido && !acertou) {
            botao.classList.add("errada");
        }
    });

    if (acertou) {
        acertos++;
        moedasDaRodada += atual.moedas;
        totalMoedas += atual.moedas;

        localStorage.setItem("maisonBelleMoedas", totalMoedas);

        elementoMensagem.textContent =
            `Resposta correta! Você ganhou ${atual.moedas} moedas.`;

        elementoMensagem.className = "sucesso";

        atualizarMoedas();
    } else {
        elementoMensagem.textContent =
            "Não foi dessa vez! Confira a alternativa correta em destaque.";
        elementoMensagem.className = "erro";
    }

    botaoProximo.textContent =
        indicePergunta === perguntas.length - 1
            ? "Ver resultado"
            : "Próxima pergunta";

    botaoProximo.hidden = false;
}

function proximaPergunta() {
    if (!respondeu) return;

    indicePergunta++;

    if (indicePergunta < perguntas.length) {
        mostrarPergunta();
    } else {
        finalizarJogo();
    }
}

function finalizarJogo() {
    areaPergunta.hidden = true;
    resultado.hidden = false;

    resumoFinal.textContent =
        `Você acertou ${acertos} de ${perguntas.length} perguntas e ganhou ` +
        `${moedasDaRodada} moedas nesta rodada. ` +
        `Seu saldo total é de ${totalMoedas} moedas.`;
}

function reiniciarJogo() {
    resultado.hidden = true;
    inicioJogo.hidden = false;
}

botaoComecar.addEventListener("click", comecarJogo);
botaoProximo.addEventListener("click", proximaPergunta);
botaoReiniciar.addEventListener("click", reiniciarJogo);

atualizarMoedas();
