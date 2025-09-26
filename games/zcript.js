// Game Modal Functionality
function openGameModal(gameId) {
    const modal = document.getElementById('gameModal');
    const gameContainers = document.querySelectorAll('.game-container');
    
    // Hide all game containers
    gameContainers.forEach(container => {
        container.classList.remove('active');
    });
    
    // Show the selected game
    const selectedGame = document.getElementById(gameId);
    selectedGame.classList.add('active');
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Initialize the selected game
    initializeGame(gameId);
}

function closeGameModal() {
    const modal = document.getElementById('gameModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Reset all games
    resetAllGames();
}

function initializeGame(gameId) {
    // Reset the specific game when opening modal
    switch(gameId) {
        case 'memoryMatch':
            resetMemoryMatch();
            break;
        case 'digitalDetective':
            resetDigitalDetective();
            break;
        // Other games are reset when starting
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('gameModal');
    if (event.target === modal) {
        closeGameModal();
    }
}

// Keyboard Ninja Game
let keyboardNinjaInterval;
let keyboardNinjaTimeLeft = 30;
let keyboardNinjaScore = 0;
let keyboardNinjaTotal = 0;
let keyboardNinjaCorrect = 0;

function startKeyboardNinja() {
    resetKeyboardNinja();
    document.querySelector('#keyboardNinja .start-btn').style.display = 'none';
    document.querySelector('#keyboardNinja .reset-btn').style.display = 'inline-block';
    
    keyboardNinjaInterval = setInterval(updateKeyboardNinja, 1000);
    generateNewKey();
    
    // Listen for keyboard input
    document.addEventListener('keydown', handleKeyboardInput);
}

function resetKeyboardNinja() {
    clearInterval(keyboardNinjaInterval);
    keyboardNinjaTimeLeft = 30;
    keyboardNinjaScore = 0;
    keyboardNinjaTotal = 0;
    keyboardNinjaCorrect = 0;
    
    document.getElementById('timeLeft').textContent = keyboardNinjaTimeLeft;
    document.getElementById('score').textContent = keyboardNinjaScore;
    document.getElementById('accuracy').textContent = '100%';
    document.getElementById('keyboardFeedback').textContent = '';
    document.getElementById('keyboardFeedback').className = 'feedback';
    
    document.querySelector('#keyboardNinja .start-btn').style.display = 'inline-block';
    document.querySelector('#keyboardNinja .reset-btn').style.display = 'none';
    
    document.removeEventListener('keydown', handleKeyboardInput);
}

function updateKeyboardNinja() {
    keyboardNinjaTimeLeft--;
    document.getElementById('timeLeft').textContent = keyboardNinjaTimeLeft;
    
    if (keyboardNinjaTimeLeft <= 0) {
        endKeyboardNinja();
    }
}

function generateNewKey() {
    const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    document.getElementById('currentKey').textContent = randomKey;
}

function handleKeyboardInput(event) {
    const targetKey = document.getElementById('currentKey').textContent;
    keyboardNinjaTotal++;
    
    if (event.key.toUpperCase() === targetKey) {
        keyboardNinjaScore += 10;
        keyboardNinjaCorrect++;
        document.getElementById('keyboardFeedback').textContent = 'Correct! +10 points';
        document.getElementById('keyboardFeedback').className = 'feedback correct';
    } else {
        document.getElementById('keyboardFeedback').textContent = `Wrong! Expected: ${targetKey}`;
        document.getElementById('keyboardFeedback').className = 'feedback incorrect';
    }
    
    document.getElementById('score').textContent = keyboardNinjaScore;
    const accuracy = Math.round((keyboardNinjaCorrect / keyboardNinjaTotal) * 100);
    document.getElementById('accuracy').textContent = `${accuracy}%`;
    
    generateNewKey();
}

function endKeyboardNinja() {
    clearInterval(keyboardNinjaInterval);
    document.removeEventListener('keydown', handleKeyboardInput);
    
    const accuracy = Math.round((keyboardNinjaCorrect / keyboardNinjaTotal) * 100);
    document.getElementById('keyboardFeedback').textContent = `Game Over! Final Score: ${keyboardNinjaScore}, Accuracy: ${accuracy}%`;
    document.getElementById('keyboardFeedback').className = 'feedback info';
}

// Shortcut Master Game
let shortcutInterval;
let shortcutTimeLeft = 30;
let shortcutScore = 0;
const shortcuts = [
    { action: 'Copy', key: 'c' },
    { action: 'Paste', key: 'v' },
    { action: 'Cut', key: 'x' },
    { action: 'Undo', key: 'z' },
    { action: 'Save', key: 's' },
    { action: 'Print', key: 'p' },
    { action: 'Bold', key: 'b' },
    { action: 'Italic', key: 'i' },
    { action: 'Underline', key: 'u' },
    { action: 'Find', key: 'f' }
];

function startShortcutMaster() {
    resetShortcutMaster();
    document.querySelector('#shortcutMaster .start-btn').style.display = 'none';
    document.querySelector('#shortcutMaster .reset-btn').style.display = 'inline-block';
    
    shortcutInterval = setInterval(updateShortcutMaster, 1000);
    generateNewShortcut();
    
    document.addEventListener('keydown', handleShortcutInput);
}

function resetShortcutMaster() {
    clearInterval(shortcutInterval);
    shortcutTimeLeft = 30;
    shortcutScore = 0;
    
    document.getElementById('shortcutTime').textContent = shortcutTimeLeft;
    document.getElementById('shortcutScore').textContent = shortcutScore;
    document.getElementById('shortcutFeedback').textContent = '';
    document.getElementById('shortcutFeedback').className = 'feedback';
    
    document.querySelector('#shortcutMaster .start-btn').style.display = 'inline-block';
    document.querySelector('#shortcutMaster .reset-btn').style.display = 'none';
    
    document.removeEventListener('keydown', handleShortcutInput);
}

function updateShortcutMaster() {
    shortcutTimeLeft--;
    document.getElementById('shortcutTime').textContent = shortcutTimeLeft;
    
    if (shortcutTimeLeft <= 0) {
        endShortcutMaster();
    }
}

function generateNewShortcut() {
    const randomShortcut = shortcuts[Math.floor(Math.random() * shortcuts.length)];
    document.getElementById('currentAction').textContent = randomShortcut.action;
}

function handleShortcutInput(event) {
    if (event.ctrlKey || event.metaKey) {
        const currentAction = document.getElementById('currentAction').textContent;
        const shortcut = shortcuts.find(s => s.action === currentAction);
        
        if (shortcut && event.key.toLowerCase() === shortcut.key) {
            shortcutScore += 15;
            document.getElementById('shortcutFeedback').textContent = 'Correct! +15 points';
            document.getElementById('shortcutFeedback').className = 'feedback correct';
        } else {
            document.getElementById('shortcutFeedback').textContent = 'Wrong shortcut!';
            document.getElementById('shortcutFeedback').className = 'feedback incorrect';
        }
        
        document.getElementById('shortcutScore').textContent = shortcutScore;
        generateNewShortcut();
    }
}

function endShortcutMaster() {
    clearInterval(shortcutInterval);
    document.removeEventListener('keydown', handleShortcutInput);
    
    document.getElementById('shortcutFeedback').textContent = `Game Over! Final Score: ${shortcutScore}`;
    document.getElementById('shortcutFeedback').className = 'feedback info';
}

// Digital Detective Game
let currentQuestionIndex = 0;
let detectiveScore = 0;
const questions = [
    {
        question: "What makes a strong password?",
        options: ["Your name", "123456", "Mix of letters, numbers, symbols", "Password"],
        correct: 2
    },
    {
        question: "What should you do if you receive a suspicious email?",
        options: ["Click all links", "Delete it immediately", "Forward to friends", "Reply with personal info"],
        correct: 1
    },
    {
        question: "What is phishing?",
        options: ["A fishing hobby", "A cyber attack to steal information", "A type of computer virus", "A programming language"],
        correct: 1
    },
    {
        question: "Why should you use two-factor authentication?",
        options: ["It's trendy", "It makes logging in faster", "It adds extra security", "It's required by law"],
        correct: 2
    },
    {
        question: "What information should you never share online?",
        options: ["Your favorite color", "Your social security number", "Your favorite movie", "Your food preferences"],
        correct: 1
    }
];

function startDigitalDetective() {
    resetDigitalDetective();
    document.querySelector('#digitalDetective .start-btn').style.display = 'none';
    document.querySelector('#digitalDetective .next-btn').style.display = 'inline-block';
    showQuestion();
}

function resetDigitalDetective() {
    currentQuestionIndex = 0;
    detectiveScore = 0;
    document.getElementById('detectiveScore').textContent = detectiveScore;
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('detectiveFeedback').textContent = '';
    document.getElementById('detectiveFeedback').className = 'feedback';
    
    // Reset option buttons
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(btn => {
        btn.className = 'option-btn';
        btn.disabled = false;
    });
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question').textContent = question.question;
    
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach((btn, index) => {
        btn.textContent = `${String.fromCharCode(65 + index)}. ${question.options[index]}`;
        btn.className = 'option-btn';
        btn.disabled = false;
    });
    
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('detectiveFeedback').textContent = '';
}

function checkAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];
    const optionButtons = document.querySelectorAll('.option-btn');
    
    // Disable all buttons
    optionButtons.forEach(btn => btn.disabled = true);
    
    // Show correct answer
    optionButtons[question.correct].className = 'option-btn correct';
    
    if (selectedIndex === question.correct) {
        detectiveScore++;
        document.getElementById('detectiveScore').textContent = detectiveScore;
        document.getElementById('detectiveFeedback').textContent = 'Correct!';
        document.getElementById('detectiveFeedback').className = 'feedback correct';
    } else {
        optionButtons[selectedIndex].className = 'option-btn incorrect';
        document.getElementById('detectiveFeedback').textContent = 'Incorrect!';
        document.getElementById('detectiveFeedback').className = 'feedback incorrect';
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endDigitalDetective();
    }
}

function endDigitalDetective() {
    document.getElementById('detectiveFeedback').textContent = `Quiz Complete! Score: ${detectiveScore}/${questions.length}`;
    document.getElementById('detectiveFeedback').className = 'feedback info';
    document.querySelector('#digitalDetective .next-btn').style.display = 'none';
    document.querySelector('#digitalDetective .start-btn').style.display = 'inline-block';
}

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
    // Create pairs of symbols
    let gameSymbols = [];
    symbols.forEach(symbol => {
        gameSymbols.push(symbol, symbol);
    });
    
    // Shuffle symbols
    gameSymbols = gameSymbols.sort(() => Math.random() - 0.5);
    
    // Create cards
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
    
    // Create result message
    const resultDiv = document.createElement('div');
    resultDiv.className = 'game-results';
    resultDiv.innerHTML = `
        <h3>${isWin ? 'Congratulations!' : 'Time\'s Up!'}</h3>
        <div class="final-score">${memoryScore}/8 Pairs</div>
        <p>Moves: ${moves} | Time Left: ${memoryTimeLeft}s</p>
    `;
    
    document.querySelector('#memoryMatch .game-area').appendChild(resultDiv);
}

// Reaction Test Game
let reactionStartTime;
let reactionTimes = [];
let reactionAttempts = 0;
let reactionTimeout;
let isWaiting = false;

function startReactionTest() {
    resetReactionTest();
    document.querySelector('#reactionTest .start-btn').style.display = 'none';
    document.querySelector('#reactionTest .reset-btn').style.display = 'inline-block';
    
    startReactionRound();
}

function resetReactionTest() {
    clearTimeout(reactionTimeout);
    reactionTimes = [];
    reactionAttempts = 0;
    isWaiting = false;
    
    document.getElementById('reactionTime').textContent = '0';
    document.getElementById('attempts').textContent = '0';
    document.getElementById('averageTime').textContent = '0';
    document.getElementById('reactionFeedback').textContent = '';
    document.getElementById('reactionFeedback').className = 'feedback';
    
    const reactionBox = document.getElementById('reactionBox');
    reactionBox.textContent = 'Wait for green...';
    reactionBox.className = 'reaction-box waiting';
    reactionBox.onclick = null;
    
    document.querySelector('#reactionTest .start-btn').style.display = 'inline-block';
    document.querySelector('#reactionTest .reset-btn').style.display = 'none';
}

function startReactionRound() {
    if (reactionAttempts >= 5) {
        endReactionTest();
        return;
    }
    
    const reactionBox = document.getElementById('reactionBox');
    reactionBox.textContent = 'Wait for green...';
    reactionBox.className = 'reaction-box waiting';
    reactionBox.onclick = null;
    
    const waitTime = Math.random() * 3000 + 2000; // 2-5 seconds
    
    reactionTimeout = setTimeout(() => {
        reactionBox.textContent = 'CLICK NOW!';
        reactionBox.className = 'reaction-box ready';
        reactionBox.onclick = reactionClick;
        reactionStartTime = Date.now();
        isWaiting = true;
    }, waitTime);
}

function reactionClick() {
    if (!isWaiting) return;
    
    const reactionTime = Date.now() - reactionStartTime;
    reactionTimes.push(reactionTime);
    reactionAttempts++;
    
    document.getElementById('reactionTime').textContent = reactionTime;
    document.getElementById('attempts').textContent = reactionAttempts;
    
    const average = Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length);
    document.getElementById('averageTime').textContent = average;
    
    document.getElementById('reactionFeedback').textContent = `Reaction time: ${reactionTime}ms`;
    document.getElementById('reactionFeedback').className = 'feedback info';
    
    isWaiting = false;
    
    if (reactionAttempts < 5) {
        setTimeout(startReactionRound, 1500);
    } else {
        endReactionTest();
    }
}

function endReactionTest() {
    const average = Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length);
    document.getElementById('reactionFeedback').textContent = `Test Complete! Average: ${average}ms`;
    document.getElementById('reactionFeedback').className = 'feedback info';
}

// Math Sprint Game
let mathInterval;
let mathTimeLeft = 30;
let mathScore = 0;
let problemsSolved = 0;
let currentProblem = {};

function startMathSprint() {
    resetMathSprint();
    document.querySelector('#mathSprint .start-btn').style.display = 'none';
    document.querySelector('#mathSprint .reset-btn').style.display = 'inline-block';
    
    generateMathProblem();
    mathInterval = setInterval(updateMathTimer, 1000);
    
    document.getElementById('mathAnswer').focus();
    document.getElementById('mathAnswer').addEventListener('keydown', handleMathInput);
}

function resetMathSprint() {
    clearInterval(mathInterval);
    mathTimeLeft = 30;
    mathScore = 0;
    problemsSolved = 0;
    
    document.getElementById('mathTime').textContent = mathTimeLeft;
    document.getElementById('mathScore').textContent = mathScore;
    document.getElementById('problemsSolved').textContent = problemsSolved;
    document.getElementById('mathFeedback').textContent = '';
    document.getElementById('mathFeedback').className = 'feedback';
    document.getElementById('mathAnswer').value = '';
    
    document.querySelector('#mathSprint .start-btn').style.display = 'inline-block';
    document.querySelector('#mathSprint .reset-btn').style.display = 'none';
    
    document.getElementById('mathAnswer').removeEventListener('keydown', handleMathInput);
}

function updateMathTimer() {
    mathTimeLeft--;
    document.getElementById('mathTime').textContent = mathTimeLeft;
    
    if (mathTimeLeft <= 0) {
        endMathSprint();
    }
}

function generateMathProblem() {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2;
    
    switch(operation) {
        case '+':
            num1 = Math.floor(Math.random() * 50) + 1;
            num2 = Math.floor(Math.random() * 50) + 1;
            break;
        case '-':
            num1 = Math.floor(Math.random() * 100) + 1;
            num2 = Math.floor(Math.random() * num1) + 1;
            break;
        case '*':
            num1 = Math.floor(Math.random() * 12) + 1;
            num2 = Math.floor(Math.random() * 12) + 1;
            break;
    }
    
    currentProblem = { num1, num2, operation };
    document.getElementById('mathProblem').textContent = `${num1} ${operation} ${num2} = ?`;
}

function handleMathInput(event) {
    if (event.key === 'Enter') {
        const answer = parseInt(document.getElementById('mathAnswer').value);
        
        if (isNaN(answer)) {
            document.getElementById('mathFeedback').textContent = 'Please enter a valid number!';
            document.getElementById('mathFeedback').className = 'feedback incorrect';
            return;
        }
        
        let correctAnswer;
        switch(currentProblem.operation) {
            case '+': correctAnswer = currentProblem.num1 + currentProblem.num2; break;
            case '-': correctAnswer = currentProblem.num1 - currentProblem.num2; break;
            case '*': correctAnswer = currentProblem.num1 * currentProblem.num2; break;
        }
        
        if (answer === correctAnswer) {
            mathScore += 10;
            problemsSolved++;
            document.getElementById('mathFeedback').textContent = 'Correct! +10 points';
            document.getElementById('mathFeedback').className = 'feedback correct';
        } else {
            document.getElementById('mathFeedback').textContent = `Incorrect! Answer: ${correctAnswer}`;
            document.getElementById('mathFeedback').className = 'feedback incorrect';
        }
        
        document.getElementById('mathScore').textContent = mathScore;
        document.getElementById('problemsSolved').textContent = problemsSolved;
        document.getElementById('mathAnswer').value = '';
        
        generateMathProblem();
    }
}

function endMathSprint() {
    clearInterval(mathInterval);
    document.getElementById('mathAnswer').removeEventListener('keydown', handleMathInput);
    
    document.getElementById('mathFeedback').textContent = `Game Over! Solved ${problemsSolved} problems. Score: ${mathScore}`;
    document.getElementById('mathFeedback').className = 'feedback info';
}

// Reset all games when closing modal
function resetAllGames() {
    resetKeyboardNinja();
    resetShortcutMaster();
    resetDigitalDetective();
    resetMemoryMatch();
    resetReactionTest();
    resetMathSprint();
}

// Init AOS
AOS.init();

// Your existing theme toggle and mobile menu code
const themeToggle = document.getElementById("themeToggle");
const mobileThemeToggle = document.getElementById("mobileThemeToggle");
const body = document.body;

function toggleTheme() {
    body.classList.toggle("dark-mode");
}

themeToggle.addEventListener("click", toggleTheme);
mobileThemeToggle.addEventListener("click", toggleTheme);

// Mobile Menu
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
});