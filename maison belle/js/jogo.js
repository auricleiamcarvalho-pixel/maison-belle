
"use strict";

const CHAVE_MOEDAS = "maisonBelleMoedas";

const perguntas = [
    {
        pergunta: "Qual é o maior planeta do Sistema Solar?",
        alternativas: ["Terra", "Marte", "Júpiter", "Vênus"],
        correta: 2,
        dificuldade: "Fácil",
        moedas: 10
    },
    {
        pergunta: "Quantos lados tem um hexágono?",
        alternativas: ["Cinco", "Seis", "Sete", "Oito"],
        correta: 1,
        dificuldade: "Fácil",
        moedas: 10
    },
    {
        pergunta: "Qual é a capital do Brasil?",
        alternativas: ["São Paulo", "Salvador", "Rio de Janeiro", "Brasília"],
        correta: 3,
        dificuldade: "Fácil",
        moedas: 10
    },
    {
        pergunta: "Qual é o resultado de 9 × 8?",
        alternativas: ["64", "72", "81", "74"],
        correta: 1,
        dificuldade: "Fácil",
        moedas: 10
    },
    {
        pergunta: "Qual destes animais é um mamífero?",
        alternativas: ["Tubarão", "Sapo", "Golfinho", "Tartaruga"],
        correta: 2,
        dificuldade: "Fácil",
        moedas: 10
    },
    {
        pergunta: "Qual é a fórmula química da água?",
        alternativas: ["CO₂", "O₂", "H₂O", "NaCl"],
        correta: 2,
        dificuldade: "Média",
        moedas: 20
    },
    {
        pergunta: "Quem escreveu o livro Dom Casmurro?",
        alternativas: [
            "Machado de Assis",
            "José de Alencar",
            "Clarice Lispector",
            "Carlos Drummond de Andrade"
        ],
        correta: 0,
        dificuldade: "Média",
        moedas: 20
    },
    {
        pergunta: "Em qual continente fica o Egito?",
        alternativas: ["Europa", "África", "Ásia", "Oceania"],
        correta: 1,
        dificuldade: "Média",
        moedas: 20
    },
    {
        pergunta: "Qual é o maior oceano do planeta?",
        alternativas: ["Atlântico", "Índico", "Ártico", "Pacífico"],
        correta: 3,
        dificuldade: "Média",
        moedas: 20
    },
    {
        pergunta: "Qual órgão do corpo humano bombeia o sangue?",
        alternativas: ["Pulmão", "Coração", "Fígado", "Rim"],
        correta: 1,
        dificuldade: "Fácil",
        moedas: 10
    },
    {
        pergunta: "Qual é a raiz quadrada de 144?",
        alternativas: ["10", "11", "12", "14"],
        correta: 2,
        dificuldade: "Média",
        moedas: 20
    },
    {
        pergunta: "Qual destes países tem o japonês como língua oficial?",
        alternativas: ["Japão", "México", "Portugal", "Egito"],
        correta: 0,
        dificuldade: "Fácil",
        moedas: 10
    },
    {
        pergunta: "Como se chama o processo pelo qual as plantas produzem seu alimento?",
        alternativas: [
            "Respiração",
            "Fotossíntese",
            "Evaporação",
            "Fermentação"
        ],
        correta: 1,
        dificuldade: "Média",
        moedas: 20
    },
    {
        pergunta: "Qual é o resultado de 15²?",
        alternativas: ["125", "200", "225", "250"],
        correta: 2,
        dificuldade: "Difícil",
        moedas: 30
    },
    {
        pergunta: "Qual camada da atmosfera contém a maior parte do ozônio?",
        alternativas: ["Troposfera", "Estratosfera", "Mesosfera", "Exosfera"],
        correta: 1,
        dificuldade: "Difícil",
        moedas: 30
    },
    {
        pergunta: "Qual é o menor número primo?",
        alternativas: ["0", "1", "2", "3"],
        correta: 2,
        dificuldade: "Média",
        moedas: 20
    },
    {
        pergunta: "Qual é a unidade básica da vida?",
        alternativas: ["Átomo", "Célula", "Órgão", "Tecido"],
        correta: 1,
        dificuldade: "Média",
        moedas: 20
    },
    {
        pergunta: "Em qual continente fica a Argentina?",
        alternativas: ["Europa", "América do Sul", "Ásia", "África"],
        correta: 1,
        dificuldade: "Fácil",
        moedas: 10
    }
];

const inicioJogo = document.getElementById("inicioJogo");
const areaPergunta = document.getElementById("areaPergunta");
const resultadoJogo = document.getElementById("resultadoJogo");

const saldoMoedas = document.getElementById("saldoMoedas");
const botaoComecar = document.getElementById("botaoComecar");
const botaoProxima = document.getElementById("botaoProxima");
const botaoJogarNovamente =
    document.getElementById("botaoJogarNovamente");

const numeroPergunta = document.getElementById("numeroPergunta");
const valorPergunta = document.getElementById("valorPergunta");
const barraPreenchida = document.getElementById("barraPreenchida");
const progressoRodada = document.getElementById("progressoRodada");
const textoPergunta = document.getElementById("textoPergunta");
const alternativas = document.getElementById("alternativas");
const mensagemResposta = document.getElementById("mensagemResposta");

const textoResultado = document.getElementById("textoResultado");
const moedasRodada = document.getElementById("moedasRodada");

let perguntasRodada = [];
let indicePergunta = 0;
let acertosRodada = 0;
let ganhoRodada = 0;
let respostaSelecionada = false;

function lerSaldo() {
    try {
        const valor = Number(localStorage.getItem(CHAVE_MOEDAS) || 0);

        if (!Number.isSafeInteger(valor) || valor < 0) {
            return 0;
        }

        return valor;
    } catch (erro) {
        console.error("Não foi possível ler o saldo:", erro);
        return 0;
    }
}

function atualizarSaldo() {
    saldoMoedas.textContent = lerSaldo();
}

function sortearPerguntas() {
    const copia = [...perguntas];

    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia.slice(0, 10);
}

function comecarJogo() {
    perguntasRodada = sortearPerguntas();
    indicePergunta = 0;
    acertosRodada = 0;
    ganhoRodada = 0;
    respostaSelecionada = false;

    textoResultado.textContent = "";
    moedasRodada.textContent = "0";

    inicioJogo.hidden = true;
    resultadoJogo.hidden = true;
    areaPergunta.hidden = false;

    mostrarPergunta();
}

function mostrarPergunta() {
    const perguntaAtual = perguntasRodada[indicePergunta];

    respostaSelecionada = false;

    numeroPergunta.textContent =
        `Pergunta ${indicePergunta + 1} de 10`;

    valorPergunta.textContent =
        `${perguntaAtual.moedas} moedas · ${perguntaAtual.dificuldade}`;

    const progresso = (indicePergunta / 10) * 100;

    barraPreenchida.style.width = `${progresso}%`;

    progressoRodada.setAttribute(
        "aria-valuenow",
        String(indicePergunta)
    );

    textoPergunta.textContent = perguntaAtual.pergunta;

    mensagemResposta.textContent = "";
    mensagemResposta.className = "mensagem";

    alternativas.replaceChildren();

    botaoProxima.hidden = true;

    perguntaAtual.alternativas.forEach((alternativa, indice) => {
        const botao = document.createElement("button");

        botao.type = "button";
        botao.className = "alternativa";
        botao.textContent = alternativa;

        botao.addEventListener("click", () => {
            responderPergunta(indice);
        });

        alternativas.appendChild(botao);
    });
}

function responderPergunta(indiceEscolhido) {
    if (respostaSelecionada) {
        return;
    }

    respostaSelecionada = true;

    const perguntaAtual = perguntasRodada[indicePergunta];
    const botoes = alternativas.querySelectorAll("button");

    const acertou = indiceEscolhido === perguntaAtual.correta;

    botoes.forEach((botao, indice) => {
        botao.disabled = true;

        if (indice === perguntaAtual.correta) {
            botao.classList.add("correta");
        } else if (indice === indiceEscolhido) {
            botao.classList.add("errada");
        }
    });

    if (acertou) {
        acertosRodada++;
        ganhoRodada += perguntaAtual.moedas;

        mensagemResposta.textContent =
            `Muito bem! Você ganhou ${perguntaAtual.moedas} moedas!`;

        mensagemResposta.classList.add("acerto");
    } else {
        mensagemResposta.textContent =
            `Não foi dessa vez! A resposta correta é: ${perguntaAtual.alternativas[perguntaAtual.correta]}.`;

        mensagemResposta.classList.add("erro");
    }

    botaoProxima.textContent =
        indicePergunta === 9 ? "Ver resultado" : "Próxima pergunta";

    botaoProxima.hidden = false;
}

function proximaPergunta() {
    if (!respostaSelecionada) {
        return;
    }

    indicePergunta++;

    if (indicePergunta < 10) {
        mostrarPergunta();
    } else {
        finalizarJogo();
    }
}

function finalizarJogo() {
    let saldoSalvo = false;

    try {
        const saldoAtual = lerSaldo();
        const novoSaldo = saldoAtual + ganhoRodada;

        localStorage.setItem(CHAVE_MOEDAS, String(novoSaldo));

        saldoSalvo = true;
    } catch (erro) {
        console.error("Não foi possível salvar as moedas:", erro);
    }

    areaPergunta.hidden = true;
    inicioJogo.hidden = true;
    resultadoJogo.hidden = false;

    barraPreenchida.style.width = "100%";

    progressoRodada.setAttribute("aria-valuenow", "10");

    textoResultado.textContent =
        `Você acertou ${acertosRodada} de 10 perguntas. ` +
        (saldoSalvo
            ? "Continue jogando para acumular moedas!"
            : "Não foi possível salvar seu saldo neste navegador.");

    moedasRodada.textContent =
        saldoSalvo ? `+${ganhoRodada}` : "Não salvo";

    atualizarSaldo();
}

botaoComecar.addEventListener("click", comecarJogo);

botaoProxima.addEventListener("click", proximaPergunta);

botaoJogarNovamente.addEventListener("click", comecarJogo);

atualizarSaldo();
