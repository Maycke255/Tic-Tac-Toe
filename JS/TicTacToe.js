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
const playerXName = document.getElementById('name-player-one');
const playerOName = document.getElementById('name-player-two');
const nameX = document.querySelector('.player-one');
const nameO = document.querySelector('.player-two');
const scorePlayerX = document.querySelector('.score-player-one');
const scorePlayerO = document.querySelector('.score-player-two');
const cells = document.querySelectorAll('.cell');
const display = document.querySelector('.display');
const resetBtn = document.getElementById('reset-game-btn');

// Configurações do jogo
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
    [0, 4, 8], [2, 4, 6]             // diagonais
];

// Estado do jogo
let gameState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// ==============================================
// 2. FUNÇÕES PRINCIPAIS DO JOGO
// ==============================================

function initializeGame() {
    // Inicializa o estado do jogo
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    
    // Limpa o tabuleiro visualmente
    cells.forEach(function (cell) {
        cell.textContent = '';
        cell.classList.remove('winning-cell');
    });
    
    // Atualiza o display
    updateDisplay();
}

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell'));
    
    if (gameState[clickedCellIndex] !== '' || !gameActive) return;
    
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    
    checkResult();
}

function checkResult() {
    let roundWon = false;
    
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') continue;
        
        if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            roundWon = true;
            highlightWinningCells(winConditions[i]);
            break;
        }
    }
    
    if (roundWon) {
        display.textContent = `Jogador ${currentPlayer} venceu!`;
        updateScore(currentPlayer);
        gameActive = false;
        return;
    }
    
    if (!gameState.includes('')) {
        display.textContent = 'Empate!';
        gameActive = false;
        return;
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateDisplay();
}

function updateDisplay() {
    if (nameX.value && nameO.value) {
        const playerName = currentPlayer === 'X' ? nameX.value : nameO.value;
        display.textContent = `Vez de ${playerName} (${currentPlayer})`;
    } else {
        display.textContent = `Vez do jogador ${currentPlayer}`;
    }
}

function updateScore(winner) {
    const scoreElement = winner === 'X' ? scorePlayerX : scorePlayerO;
    const currentScore = parseInt(scoreElement.value) || 0;
    scoreElement.value = currentScore + 1;
}

function resetGame() {
    initializeGame();
}

function highlightWinningCells(cellsIndexes) {
    cellsIndexes.forEach(function (index) {
        cells[index].classList.add('winning-cell');
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

// Eventos de gerenciamento de jogadores
document.getElementById('add-players-btn').addEventListener('click', addPlayers);
document.getElementById('reset-scoreboard-btn').addEventListener('click', resetScoreboard);
document.getElementById('choose-new-players').addEventListener('click', chooseNewPlayers);

// ==============================================
// 5. INICIALIZAÇÃO DO JOGO
// ==============================================

initializeGame();