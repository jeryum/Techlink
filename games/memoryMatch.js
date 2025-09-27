// Memory Match Game
let memoryCards = [];
let flippedCards = [];
let memoryScore = 0;
let moves = 0;
let memoryTimeLeft = 60;
let memoryInterval;

const symbols = ['💻', '⌨️', '🖱️', '📱', '🖥️', '📀', '🔒', '🌐'];

function startMemoryMatch() {
    resetMemoryMatch();
    document.querySelector('#memoryMatch .start-btn').style.display = 'none';
    document.querySelector('#memoryMatch .reset-btn').style.display = 'inline-block';
    initializeMemoryGame();
    memoryInterval = setInterval(updateMemoryTimer, 1000);
}

function resetMemoryMatch() {
    clearInterval(memoryInterval);
    memoryCards = [];
    flippedCards = [];
    memoryScore = 0;
    moves = 0;
    memoryTimeLeft = 60;
    document.getElementById('memoryScore').textContent = memoryScore;
    document.getElementById('moves').textContent = moves;
    document.getElementById('memoryTime').textContent = memoryTimeLeft;
    document.getElementById('memoryGrid').innerHTML = '';
    document.querySelector('#memoryMatch .start-btn').style.display = 'inline-block';
    document.querySelector('#memoryMatch .reset-btn').style.display = 'none';
}

function initializeMemoryGame() {
    let gameSymbols = [];
    symbols.forEach(symbol => {
        gameSymbols.push(symbol, symbol);
    });
    gameSymbols = gameSymbols.sort(() => Math.random() - 0.5);
    const memoryGrid = document.getElementById('memoryGrid');
    memoryGrid.innerHTML = '';
    gameSymbols.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.textContent = '?';
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        memoryGrid.appendChild(card);
    });
    memoryCards = gameSymbols;
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
        this.textContent = this.dataset.symbol;
        this.classList.add('flipped');
        flippedCards.push(this);
        if (flippedCards.length === 2) {
            moves++;
            document.getElementById('moves').textContent = moves;
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        memoryScore++;
        document.getElementById('memoryScore').textContent = memoryScore;
        flippedCards = [];
        if (memoryScore === symbols.length) {
            endMemoryMatch(true);
        }
    } else {
        setTimeout(() => {
            card1.textContent = '?';
            card2.textContent = '?';
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function updateMemoryTimer() {
    memoryTimeLeft--;
    document.getElementById('memoryTime').textContent = memoryTimeLeft;
    if (memoryTimeLeft <= 0) {
        endMemoryMatch(false);
    }
}

function endMemoryMatch(isWin) {
    clearInterval(memoryInterval);
    const feedback = isWin ? 
        `You won! Completed in ${moves} moves with ${memoryTimeLeft}s remaining!` :
        `Game Over! You matched ${memoryScore} pairs.`;
    const resultDiv = document.createElement('div');
    resultDiv.className = 'game-results';
    resultDiv.innerHTML = `
        <h3>${isWin ? 'Congratulations!' : 'Time\'s Up!'}</h3>
        <div class="final-score">${memoryScore}/8 Pairs</div>
        <p>Moves: ${moves} | Time Left: ${memoryTimeLeft}s</p>
    `;
    document.querySelector('#memoryMatch .game-area').appendChild(resultDiv);
}
