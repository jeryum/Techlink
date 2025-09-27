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
