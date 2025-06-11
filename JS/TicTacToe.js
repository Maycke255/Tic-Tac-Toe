// EFEITOS VISUAIS PARA O CSS

document.querySelectorAll('.add-players').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
        const rect = e.target.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        e.target.style.setProperty('--glow-x', `${x}%`);
        e.target.style.setProperty('--glow-y', `${y}%`);
    });
    
    btn.addEventListener('mouseleave',function () {
        btn.style.setProperty('--glow-x', '50%');
        btn.style.setProperty('--glow-y', '50%');
    });
});

document.querySelectorAll(`.reset-btn`).forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
        const rect = e.target.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        e.target.style.setProperty('--glow-x', `${x}%`);
        e.target.style.setProperty('--glow-y', `${y}%`);
    });
    
    btn.addEventListener('mouseleave',function () {
        btn.style.setProperty('--glow-x', '50%');
        btn.style.setProperty('--glow-y', '50%');
    });
});
document.querySelectorAll(`.new-player`).forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
        const rect = e.target.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        e.target.style.setProperty('--glow-x', `${x}%`);
        e.target.style.setProperty('--glow-y', `${y}%`);
    });
    
    btn.addEventListener('mouseleave',function () {
        btn.style.setProperty('--glow-x', '50%');
        btn.style.setProperty('--glow-y', '50%');
    });
});

document.querySelectorAll(`.reset-score`).forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
        const rect = e.target.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        e.target.style.setProperty('--glow-x', `${x}%`);
        e.target.style.setProperty('--glow-y', `${y}%`);
    });
    
    btn.addEventListener('mouseleave',function () {
        btn.style.setProperty('--glow-x', '50%');
        btn.style.setProperty('--glow-y', '50%');
    });
});

// ==============================================
// 1. SELEÇÃO DE ELEMENTOS E VARIÁVEIS GLOBAIS
// ==============================================

// Elementos do DOM
const playerXName = document.getElementById('name-player-one'); // Pegando o input de inserir os nomes
const playerOName = document.getElementById('name-player-two');
const nameX = document.querySelector('.player-one'); // Pegando os inputs dos nomes que aparecem no score
const nameO = document.querySelector('.player-two');
const scorePlayerX = document.querySelector('.score-player-one'); // Pegando os score de pontuação
const scorePlayerO = document.querySelector('.score-player-two');
const cells = document.querySelectorAll('.cell'); // Pegamos todas as celulas do tabuleiro
const display = document.querySelector('.display'); // Onde iremos exibir a mensagem
const resetBtn = document.getElementById('reset-game-btn');

// Configurações do jogo
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
    [0, 4, 8], [2, 4, 6]             // diagonais
];

// Estado do jogo
let gameState = ['', '', '', '', '', '', '', '', '']; // Essa array e responsavel por representar as celulas vazias do tabuleiro
let currentPlayer = 'X'; // Primeiro iniciamos dizendo que o player que começa e jogador X
let gameActive = true; // Ativa o game automaticamente

// ==============================================
// 2. FUNÇÕES PRINCIPAIS DO JOGO
// ==============================================

function initializeGame() {
    // Inicializa/Reenicia o estado do jogo
    // Primeiro vimos a mesma coisa de antes, apenas zeramos as celulas do tabuleiro e tudo mais
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    
    // Limpa o tabuleiro visualmente, tiramos a classe do ganhador e tiramos tudo
    cells.forEach(function (cell) {
        cell.textContent = '';
        cell.classList.remove('winning-cell');
    });
    
    // Atualiza o display
    updateDisplay();
}

/* Função de click para as celulas, pegamos o evento disparado ao clicar na celula usando o target, e nesse evento, pegamos o atributo que colocamos
ma celula no HTML, o data-cell, que representa a celula em si */
function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell'));

    /* Fazemos uma verificação inline rapida, caso a celula já foi preenchida (gameState na posição do evento de clique da celula for diferente da string
    vazia) ou o game esta inativo, não faz nada, apenas retorna */
    if (gameState[clickedCellIndex] !== '' || !gameActive) return;
    
    /* Aqui atualizamos o estado do jogo e a interface, dizemos que o gameState que e o estado do tabuleiro na posição do evento da celula clicada vai
    ser reatribuida para o jogador inicial, no caso o X ou O. Em seguida, dizemos que a posição do evento da celula clicada vai ter um conteudo de texto
    que e a propria string representando o jogador, X ou O. */
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.setAttribute(`data-value`, currentPlayer)
    clickedCell.textContent = currentPlayer;
    
    //Chamamos a função para verificar se houve algum resultado ou empate
    checkResult();
}

function checkResult() {
    let roundWon = false;
    
    /* Esse loop for e responsavel por verificar cada condição de vitoria, fazemos isso a cada clique na celula para verificar todo o tabuleiro */
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i]; /* Desestruturação dos indices, isso e chamado de desestruturação de array, onde queremos atribuir letras
        aos elementos dentro da array, nesse caso a winConditions[i] retorna uma array com 8 elementos, e dentro desses 8 elementos existem mais 3
        elementos, e cada um desses elementos representa as letras, por exemplo no caso do primeiro elemento: [0, 1, 2] fica -> 0 = a, 1 = b, 2 = c  */
        
        /* Como Funciona gameState[a], gameState[b], gameState[c]
        gameState é um array que representa o tabuleiro. Por exemplo:
        gameState = ['X', 'O', '', 'X', '', '', 'O', '', '']
        gameState[0] → 'X'
        gameState[1] → 'O'
        gameState[2] → '' */
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') continue;

        /*A verificação gameState[a] === gameState[b] && gameState[b] === gameState[c] checa se:
        - Todas as três posições têm valores (não estão vazias)
        - Todos os valores são iguais (X ou O) */
        if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            /* Exemplo completo:
            gameState = ['X', 'X', 'X', 'O', '', '', '', 'O', '']
            Estamos verificando winConditions[0] que é [0, 1, 2]
            const [a, b, c] = [0, 1, 2] → a=0, b=1, c=2
            Verifica:
            gameState[0] → 'X'
            gameState[1] → 'X'
            gameState[2] → 'X'
            Como todos são 'X', é uma vitória
            Chama highlightWinningCells([0, 1, 2])
            Adiciona a classe winning-cell às células 0, 1 e 2 */
            roundWon = true;
            highlightWinningCells(winConditions[i]);
            break;
        }
    }
    
    /* Aqui atualizamos o display para exibir o jogador vencedor, veridicamos a condição no inicio que determina o ganhador, caso haja algum o display
    atualiza o score chamando a função com o nome do jogador e jogo e parado */
    if (roundWon) {
        display.textContent = `Jogador ${currentPlayer} venceu!`;
        updateScore(currentPlayer);
        gameActive = false;
        return;
    }
    
    /* Função para verificar se há empate, a função verifica se há alguma celula vazia no gameState, caso tenha, atualiza o display e para o jogo */
    if (!gameState.includes('')) {
        display.textContent = 'Empate!';
        gameActive = false;
        return;
    }
    
    /* Uma das funções mais importantes, atualiza a vez do jogador se o jogo continuar, caso o currentPlayer esteja igual a X, se for X
    ele muda para O, e caso esteja O ele muda para X, no caso, se for false muda para O, um loop. */
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    // Atualiza o display
    updateDisplay();
}

function updateDisplay() {
    // Verifica se os nomes dos jogadores foram definidos
    if (nameX.value && nameO.value) {
        /* Ao mesmo tempo que atribui uma variavel, verifica qual e o jogador da vez, caso X, recebe o nome do jogador X, caso seja false, caso não seja a
        vez do jogador X recebe a vez do jogador O. */
        const playerName = currentPlayer === 'X' ? nameX.value : nameO.value;
        display.textContent = `Vez de ${playerName} (${currentPlayer})`;
    } else {
        // Caso contrario mostra apenas o simbolo
        display.textContent = `Vez do jogador ${currentPlayer}`;
    }
}

/* Função simples para atualizar o score dos jogadores, caso haja um ganhador */
function updateScore(winner) {
    const scoreElement = winner === 'X' ? scorePlayerX : scorePlayerO;
    const currentScore = parseInt(scoreElement.value) || 0;
    scoreElement.value = currentScore + 1;
}

function resetGame() {
    cells.forEach(function (cell) {
        cell.classList.remove('winning-cell');
        cell.style.zIndex = '';
    });

    initializeGame();
}

/* Aqui esta a função para adicionar uma cor as celulas do ganhador
    Recebe um array de índices (como [0, 1, 2])
    Adiciona a classe CSS winning-cell a cada célula vencedora
    Permite estilizar essas células de forma diferente (como mudar a cor) */
function highlightWinningCells (cellsIndexes) {
    cellsIndexes.forEach(function (index) {
        cells[index].classList.add('winning-cell');
        cells[index].style.zIndex = '1';
    });
}

// ==============================================
// 3. FUNÇÕES DE GERENCIAMENTO DE JOGADORES
// ==============================================

function addPlayers() {
    if (playerXName.value === '' && playerOName.value === '') {
        playerOName.classList.add('error');
        playerXName.classList.add('error');
        playerXName.focus();

        setTimeout(function () {
            playerOName.classList.remove('error');
            playerXName.classList.remove('error');
        }, 1100);
        return;
    }

    nameX.value = playerXName.value;
    nameO.value = playerOName.value;

    playerXName.value = '';
    playerOName.value = '';
    
    updateDisplay();
}

function resetScoreboard() {
    scorePlayerX.value = '';
    scorePlayerO.value = '';
}

function chooseNewPlayers() {
    nameX.value = '';
    nameO.value = '';
    playerXName.focus();
}

// ==============================================
// 4. EVENT LISTENERS
// ==============================================

// Eventos do jogo
cells.forEach(function (cell){ 
    cell.addEventListener('click', handleCellClick)
})
resetBtn.addEventListener('click', resetGame);

// Eventos de gerenciamento de jogadores, ativa as funções acima, quando o jogador clica em algum desses botões
document.getElementById('add-players-btn').addEventListener('click', addPlayers);
document.getElementById('reset-scoreboard-btn').addEventListener('click', resetScoreboard);
document.getElementById('choose-new-players').addEventListener('click', chooseNewPlayers);

// ==============================================
// 5. INICIALIZAÇÃO DO JOGO
// ==============================================

initializeGame();