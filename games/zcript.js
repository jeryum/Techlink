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
            if (typeof resetMemoryMatch === 'function') resetMemoryMatch();
            break;
        case 'digitalDetective':
            if (typeof resetDigitalDetective === 'function') resetDigitalDetective();
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

// Reset all games when closing modal
function resetAllGames() {
    if (typeof resetKeyboardNinja === 'function') resetKeyboardNinja();
    if (typeof resetShortcutMaster === 'function') resetShortcutMaster();
    if (typeof resetDigitalDetective === 'function') resetDigitalDetective();
    if (typeof resetMemoryMatch === 'function') resetMemoryMatch();
    if (typeof resetReactionTest === 'function') resetReactionTest();
    if (typeof resetMathSprint === 'function') resetMathSprint();
}

// Init AOS
AOS.init();

// Theme toggle and mobile menu code
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
const closeMenu = document.getElementById("closeMenu");

function toggleMobileMenu() {
  mobileMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
}

hamburger.addEventListener("click", toggleMobileMenu);
if (closeMenu) closeMenu.addEventListener("click", toggleMobileMenu);

// Close menu when clicking on a link
const mobileLinks = document.querySelectorAll(".mobile-nav-links a");
mobileLinks.forEach(link => {
  link.addEventListener("click", toggleMobileMenu);
});