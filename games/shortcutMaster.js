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
