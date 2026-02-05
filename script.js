const questoes = {
    frontend: [
        { 
            q: "O que significa HTML?", 
            o: ["Hyperlinks and Text Markup Language", "Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks Tool Machine Language"], 
            c: 1 
        },
        { 
            q: "Qual seletor CSS é usado para selecionar um elemento por ID?", 
            o: ["Ponto (.)", "Hashtag (#)", "Asterisco (*)", "Arroba (@)"], 
            c: 1 
        },
        { 
            q: "Qual tag HTML é usada para criar uma quebra de linha?", 
            o: ["<break>", "<lb>", "<br>", "<line>"], 
            c: 2 
        },
        { 
            q: "Qual propriedade CSS é usada para alterar a cor do texto?", 
            o: ["text-color", "font-color", "color", "text-style"], 
            c: 2 
        },
        { 
            q: "Como você declara uma variável em JavaScript (ES6)?", 
            o: ["variable x = 5", "let x = 5", "v x = 5", "int x = 5"], 
            c: 1 
        },
        { 
            q: "Qual tag HTML é usada para criar um link?", 
            o: ["<link>", "<a>", "<href>", "<url>"], 
            c: 1 
        },
        { 
            q: "Qual propriedade CSS define o espaço interno de um elemento?", 
            o: ["spacing", "margin", "padding", "gap"], 
            c: 2 
        },
        { 
            q: "Qual método JavaScript seleciona um elemento pelo ID?", 
            o: ["getElement()", "getElementById()", "selectId()", "querySelector()"], 
            c: 1 
        },
        { 
            q: "Qual é o valor padrão da propriedade 'position' em CSS?", 
            o: ["absolute", "relative", "static", "fixed"], 
            c: 2 
        },
        { 
            q: "Como você adiciona um comentário em HTML?", 
            o: ["// comentário", "/* comentário */", "<!-- comentário -->", "# comentário"], 
            c: 2 
        }
    ],
    backend: [
        { 
            q: "O que é Node.js?", 
            o: ["Uma linguagem de programação", "Um ambiente de execução JavaScript", "Um banco de dados NoSQL", "Um framework CSS"], 
            c: 1 
        },
        { 
            q: "Qual comando é usado para instalar pacotes no Node.js?", 
            o: ["node install", "npm install", "get package", "install npm"], 
            c: 1 
        },
        { 
            q: "O que é uma API REST?", 
            o: ["Um tipo de banco de dados", "Interface de programação que usa HTTP", "Uma linguagem de programação", "Um servidor web Apache"], 
            c: 1 
        },
        { 
            q: "Qual método HTTP é usado para criar um novo recurso?", 
            o: ["GET", "POST", "PUT", "DELETE"], 
            c: 1 
        },
        { 
            q: "O que significa a sigla JSON?", 
            o: ["JavaScript Object Notation", "Java Standard Object Network", "JavaScript Oriented Notation", "Java Syntax Object Notation"], 
            c: 0 
        },
        { 
            q: "Qual destes é um banco de dados NoSQL?", 
            o: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"], 
            c: 2 
        },
        { 
            q: "O que significa CRUD nas operações de banco de dados?", 
            o: ["Create, Read, Update, Delete", "Connect, Run, Update, Deploy", "Create, Remove, Upload, Download", "Copy, Read, Update, Drop"], 
            c: 0 
        },
        { 
            q: "Qual é a porta padrão do protocolo HTTP?", 
            o: ["443", "8080", "80", "3000"], 
            c: 2 
        },
        { 
            q: "O que é Express.js?", 
            o: ["Um banco de dados relacional", "Um framework web para Node.js", "Uma linguagem de programação", "Um editor de código"], 
            c: 1 
        },
        { 
            q: "Qual código de status HTTP indica sucesso?", 
            o: ["404", "500", "200", "301"], 
            c: 2 
        }
    ]
};

let prova = [];
let idx = 0;
let respostas = {};
let nomeUsuario = "";
let instituicao = "";

// Função de Login
function salvarLogin() {
    const nome = document.getElementById('nome-input').value.trim();
    const inst = document.getElementById('inst-input').value.trim();
    
    if(!nome) {
        alert("⚠️ Por favor, digite seu nome completo");
        document.getElementById('nome-input').focus();
        return;
    }
    
    if(!inst) {
        alert("⚠️ Por favor, digite sua escola/instituição");
        document.getElementById('inst-input').focus();
        return;
    }
    
    nomeUsuario = nome;
    instituicao = inst;
    document.getElementById('user-info').innerText = nome;
    irPara('selecao');
}

// Navegação entre seções
function irPara(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Iniciar Prova
function iniciarProva(tema) {
    prova = [...questoes[tema]]; // Cópia para não alterar o original
    idx = 0;
    respostas = {};
    
    // Criar cartão resposta
    const grelha = document.getElementById('grelha');
    grelha.innerHTML = "";
    prova.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.id = `d-${i}`;
        dot.textContent = i + 1;
        dot.onclick = () => pular(i);
        grelha.appendChild(dot);
    });
    
    mostrar();
    irPara('prova');
}

// Exibir questão atual
function mostrar() {
    const q = prova[idx];
    document.getElementById('label-questao').innerText = `Questão ${String(idx + 1).padStart(2, '0')}`;
    
    let html = `<p>${q.q}</p>`;
    q.o.forEach((opt, i) => {
        const checked = respostas[idx] === i ? 'checked' : '';
        const opcaoTexto = opt || `Opção ${i + 1}`; // Garantir que sempre tenha texto
        html += `
            <label class="opcao-item">
                <input type="radio" name="resposta" value="${i}" onclick="gravar(${i})" ${checked}>
                <span>${opcaoTexto}</span>
            </label>
        `;
    });
    
    document.getElementById('conteudo-questao').innerHTML = html;
    
    // Atualizar estado visual do cartão
    document.querySelectorAll('.dot').forEach(d => d.classList.remove('atual'));
    document.getElementById(`d-${idx}`).classList.add('atual');
    
    // Controlar visibilidade dos botões
    document.getElementById('btn-voltar').style.display = idx === 0 ? 'none' : 'inline-block';
    document.getElementById('btn-proximo').textContent = idx === prova.length - 1 ? 'Última →' : 'Próxima →';
}

// Gravar resposta
function gravar(i) {
    respostas[idx] = i;
    document.getElementById(`d-${idx}`).classList.add('respondida');
}

// Navegação entre questões
function pular(i) {
    idx = i;
    mostrar();
}

function proxima() {
    if (idx < prova.length - 1) {
        idx++;
        mostrar();
    }
}

function anterior() {
    if (idx > 0) {
        idx--;
        mostrar();
    }
}

// Finalizar prova
function finalizar() {
    // Verificar se todas as questões foram respondidas
    const naoRespondidas = prova.length - Object.keys(respostas).length;
    
    if (naoRespondidas > 0) {
        const confirmar = confirm(
            `⚠️ Você tem ${naoRespondidas} questão(ões) não respondida(s).\n\nDeseja realmente finalizar a prova?`
        );
        if (!confirmar) return;
    }
    
    // Calcular resultado
    let acertos = 0;
    prova.forEach((q, i) => {
        if (respostas[i] === q.c) acertos++;
    });
    
    const percentual = Math.round((acertos / prova.length) * 100);
    
    // Exibir resultado
    document.getElementById('nota').innerHTML = `
        <span class="nota-valor">${acertos}</span>
        <span class="nota-total">/${prova.length}</span>
    `;
    
    document.getElementById('percentual').innerText = `${percentual}% de aproveitamento`;
    
    // Adicionar classe de cor baseada no desempenho
    const notaElement = document.getElementById('nota');
    if (percentual >= 70) {
        notaElement.style.color = '#FF6B35'; // Laranja para bom desempenho
    } else if (percentual >= 50) {
        notaElement.style.color = '#6C757D'; // Cinza para desempenho médio
    } else {
        notaElement.style.color = '#495057'; // Cinza escuro para desempenho baixo
    }
    
    irPara('resultado');
}

// Prevenir recarregamento acidental durante a prova
window.addEventListener('beforeunload', function (e) {
    const provaSection = document.getElementById('prova');
    if (provaSection && provaSection.classList.contains('active')) {
        e.preventDefault();
        e.returnValue = '';
        return '';
    }
});

// Atalhos de teclado
document.addEventListener('keydown', function(e) {
    const provaSection = document.getElementById('prova');
    if (!provaSection || !provaSection.classList.contains('active')) return;
    
    // Setas esquerda/direita para navegar
    if (e.key === 'ArrowRight') {
        proxima();
    } else if (e.key === 'ArrowLeft') {
        anterior();
    }
    // Números 1-4 para selecionar opções
    else if (e.key >= '1' && e.key <= '4') {
        const opcaoIndex = parseInt(e.key) - 1;
        const opcoes = document.querySelectorAll('input[name="resposta"]');
        if (opcoes[opcaoIndex]) {
            opcoes[opcaoIndex].click();
        }
    }
});