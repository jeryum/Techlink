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
    optionButtons.forEach(btn => btn.disabled = true);
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
