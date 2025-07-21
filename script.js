// Prompt: Run this script only after the DOM has fully loaded
window.onload = () => {

    // Prompt: Declare variables for game state
    let score = 0;
    let currentHole = null;
    let timeLeft = 30;
    let gameInterval, moleInterval;

    // Prompt: Select DOM elements
    const scoreDisplay = document.getElementById('score');
    const timeDisplay = document.getElementById('time');
    const finalScoreDisplay = document.getElementById('finalScore');
    const holes = Array.from({ length: 9 }, (_, i) => document.getElementById(`hole${i}`));
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    const playAgainBtn = document.getElementById('playAgainBtn');

    // Prompt: Show mole in a random hole
    function showMole() {
        if (currentHole !== null) {
            holes[currentHole].textContent = '';
        }
        currentHole = Math.floor(Math.random() * holes.length);
        holes[currentHole].textContent = '🐹';
    }

    // Prompt: Start game logic
    function startGame() {
        resetGame();
        startBtn.disabled = true;

        moleInterval = setInterval(showMole, 700);

        gameInterval = setInterval(() => {
            timeLeft--;
            timeDisplay.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(gameInterval);
                clearInterval(moleInterval);
                if (currentHole !== null) holes[currentHole].textContent = '';
                finalScoreDisplay.textContent = score;
                startBtn.disabled = false;
            }
        }, 1000);
    }
    // Prompt: Handle whack event
    holes.forEach((hole, index) => {
        hole.addEventListener('click', () => {
            if (index === currentHole && timeLeft > 0) {
                score++;
                scoreDisplay.textContent = score;
                holes[index].textContent = '';
                currentHole = null;
            }
        });
    });

    // Prompt: Reset the game state
    function resetGame() {
        clearInterval(gameInterval);
        clearInterval(moleInterval);
        score = 0;
        timeLeft = 30;
        currentHole = null;
        scoreDisplay.textContent = score;
        timeDisplay.textContent = timeLeft;
        finalScoreDisplay.textContent = '';
        holes.forEach(hole => hole.textContent = '');
        startBtn.disabled = false;
    }

    // Prompt: Wire up buttons
    startBtn.addEventListener('click', startGame);
    resetBtn.addEventListener('click', resetGame);
    playAgainBtn.addEventListener('click', startGame);
};
