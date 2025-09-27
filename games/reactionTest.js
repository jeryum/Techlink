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
