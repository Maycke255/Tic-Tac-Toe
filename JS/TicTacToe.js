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

//VARIAVEIS QUE USAREMOS NO CÓDIGO:
// Inputs dinamicos dos nomes
const playerXName = document.getElementById(`name-player-one`)
const playerOName = document.getElementById(`name-player-two`)

//Inputs dos nomes na tabela de pontuação
const nameX = document.querySelector(`.player-one`);
const nameO = document.querySelector(`.player-two`);

//Placar de pontuação
const scorePlayerX = document.getElementById(`score-player-one`)
const scorePlayerO = document.getElementById(`score-player-two`)

//Celulas
const cells = document.querySelectorAll(`cell`)

//Display para exibir os eventos
const display = document.querySelector(`.display`)

//Botão para resetar o tabuleiro
const resetBtn = document.getElementById(`reset-game-btn`)

//Condições de vitoria
const winConditions = [
    //horizontais
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //verticais
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagonais
    [0, 4, 8],
    [2, 4, 6]
]

//Opções
let options = ["", "", "", "", "", "", "", "", ""] // Inicialmente o tabuleiro irá começar com as divs vazias
let currentPlayer = "X"; // Jogador X começa primeiro como na observação
let gameActive = true;

// Adicionando event listerns para as celulas
cells.forEach(function (cellClicked) {
    cellClicked.addEventListener(`click`, handleCellClick)
})

// Adicionando event listern para o reset-btn
resetBtn.addEventListener(`click`, resetGame)

// Função principal que lida com os cliques nas celulas
function handleCellClick (ev) {
    const clickedCell = ev.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute(`data-cell`));
}

initializeGame()

function initializeGame () {
    display.textContent = `Vez do jogador ${currentPlayer}.`
    display.classList.add(`text`)
}

document.getElementById(`add-players-btn`).addEventListener(`click`, function (){
    if (playerXName.value === `` && playerOName.value === ``) {
        playerOName.classList.add(`error`)
        playerXName.classList.add(`error`)

        playerXName.focus()

        setTimeout(function () { 
            playerOName.classList.remove('error');
            playerXName.classList.remove('error');
        }, 1100);
        return;
    }

    nameX.textContent += playerXName.value
    nameO.textContent += playerOName.value

    playerXName.value = ``;
    playerOName.value = ``;
})

document.getElementById(`reset-scoreboard-btn`).addEventListener(`click`, function () {
    scorePlayerX.value = ``
    scorePlayerO.value = ``
})

document.getElementById(`choose-new-players`).addEventListener(`click`, function () {
    nameX.value = ``;
    nameO.value = ``;

    scorePlayerX.value = ``;
    scorePlayerO.value = ``;

    playerXName.focus()  
    playerOName.focus() 
})