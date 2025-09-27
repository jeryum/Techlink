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
