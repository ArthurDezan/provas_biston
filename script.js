const questoes = {
    frontend: [
        { q: "O que significa HTML?", o: ["Hyperlinks Tool", "Hyper Text Markup Language", "Home Tool Language"], c: 1 },
        { q: "Qual o seletor de ID no CSS?", o: [".", "#", "*"], c: 1 },
        { q: "Tag para quebra de linha?", o: ["<break>", "<lb>", "<br>"], c: 2 },
        // ... adicione mais conforme quiser
    ],
    backend: [
        { q: "Node.js é o quê?", o: ["Linguagem", "Ambiente JS", "Banco de dados"], c: 1 }
    ]
};

let prova = [];
let idx = 0;
let respostas = {};

function salvarLogin() {
    const nome = document.getElementById('nome-input').value;
    if(!nome) return alert("Digite seu nome");
    document.getElementById('user-info').innerText = nome;
    irPara('selecao');
}

function irPara(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function iniciarProva(tema) {
    prova = questoes[tema];
    idx = 0;
    respostas = {};
    const grelha = document.getElementById('grelha');
    grelha.innerHTML = "";
    prova.forEach((_, i) => grelha.innerHTML += `<div class="dot" id="d-${i}" onclick="pular(${i})">${i+1}</div>`);
    mostrar();
    irPara('prova');
}

function mostrar() {
    const q = prova[idx];
    document.getElementById('label-questao').innerText = `Questão ${idx+1}`;
    let h = `<p style="font-size:1.2rem; font-weight:bold">${q.q}</p>`;
    q.o.forEach((opt, i) => {
        const check = respostas[idx] === i ? 'checked' : '';
        h += `<label class="opcao-item"><input type="radio" name="r" onclick="gravar(${i})" ${check}>${opt}</label>`;
    });
    document.getElementById('conteudo-questao').innerHTML = h;
    document.querySelectorAll('.dot').forEach(d => d.classList.remove('atual'));
    document.getElementById(`d-${idx}`).classList.add('atual');
}

function gravar(i) {
    respostas[idx] = i;
    document.getElementById(`d-${idx}`).classList.add('respondida');
}

function pular(i) { idx = i; mostrar(); }
function proxima() { if(idx < prova.length -1) { idx++; mostrar(); } }
function anterior() { if(idx > 0) { idx--; mostrar(); } }

function finalizar() {
    let acertos = 0;
    prova.forEach((q, i) => { if(respostas[i] === q.c) acertos++; });
    document.getElementById('nota').innerText = `${acertos}/${prova.length}`;
    irPara('resultado');
}