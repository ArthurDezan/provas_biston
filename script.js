// Banco de Dados de Questões
const todasQuestoes = {
    frontend: [
        { q: "O que significa CSS?", options: ["Cascading Style Sheets", "Color Style System", "Creative Shell Script"], correct: 0 },
        { q: "Qual tag define um item de lista?", options: ["<list>", "<li>", "<ul>"], correct: 1 },
        { q: "Qual comando JS exibe algo no console?", options: ["print()", "log.console()", "console.log()"], correct: 2 },
        // ... Adicionaria as outras 7 aqui
    ],
    backend: [
        { q: "O que é o Node.js?", options: ["Uma base de dados", "Um ambiente de execução JS", "Um framework CSS"], correct: 1 },
        { q: "Qual método HTTP é usado para criar dados?", options: ["GET", "POST", "DELETE"], correct: 1 },
        { q: "O que significa SQL?", options: ["Structured Query Language", "Simple Queue List", "System Quality Log"], correct: 0 },
    ]
};

let questoesAtuais = [];
let indiceAtual = 0;
let respostasUsuario = {};

function irPara(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function iniciarProva() {
    const tema = document.getElementById('tema-selecionado').value;
    // Baralhar e pegar 10 questões (aqui simulo com as que temos)
    questoesAtuais = [...todasQuestoes[tema]].sort(() => Math.random() - 0.5).slice(0, 10);
    indiceAtual = 0;
    respostasUsuario = {};
    mostrarQuestao();
    irPara('prova');
}

function mostrarQuestao() {
    const questao = questoesAtuais[indiceAtual];
    document.getElementById('progresso').innerText = `Questão ${indiceAtual + 1} de ${questoesAtuais.length}`;
    
    let html = `<div class="questao-box">
                    <p><strong>${questao.q}</strong></p>
                    <div class="opcoes">`;
    
    questao.options.forEach((opt, i) => {
        const checked = respostasUsuario[indiceAtual] === i ? 'checked' : '';
        html += `<label><input type="radio" name="tempQ" onclick="salvarResposta(${i})" ${checked}> ${opt}</label>`;
    });
    
    html += `</div></div>`;
    document.getElementById('conteudo-questao').innerHTML = html;
    
    // Ajustar botões
    document.getElementById('btn-voltar').style.visibility = indiceAtual === 0 ? 'hidden' : 'visible';
    document.getElementById('btn-proximo').innerText = indiceAtual === questoesAtuais.length - 1 ? 'Finalizar' : 'Próxima →';
}

function salvarResposta(index) {
    respostasUsuario[indiceAtual] = index;
}

function proximaQuestao() {
    if (indiceAtual < questoesAtuais.length - 1) {
        indiceAtual++;
        mostrarQuestao();
    } else {
        mostrarResultado();
    }
}

function anteriorQuestao() {
    if (indiceAtual > 0) {
        indiceAtual--;
        mostrarQuestao();
    }
}

function mostrarResultado() {
    let acertos = 0;
    let htmlDetalhes = "";

    questoesAtuais.forEach((q, i) => {
        const acertou = respostasUsuario[i] === q.correct;
        if (acertou) acertos++;
        
        htmlDetalhes += `
            <div class="resumo-item ${acertou ? 'certo' : 'errado'}">
                <p><strong>Q${i+1}:</strong> ${acertou ? '✅ Acertou' : '❌ Errou'}<br>
                <small>Resposta correta: ${q.options[q.correct]}</small></p>
            </div>`;
    });

    document.getElementById('resumo-resultado').innerHTML = `<h3>Acertaste ${acertos} de ${questoesAtuais.length}</h3>`;
    document.getElementById('detalhes-correcao').innerHTML = htmlDetalhes;
    irPara('resultado');
}