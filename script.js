let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let score = 100; // Starting score
let timeLeft = 30; // 30 seconds time limit
let timer;

// Grab necessary elements
const submitButton = document.getElementById('submitGuess');
const feedback = document.getElementById('feedback');
const attemptsDisplay = document.getElementById('attempts');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restartGame');

// Start the timer
function startTimer() {
  timer = setInterval(function() {
    timeLeft--;
    timerDisplay.textContent = `Time left: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      feedback.textContent = `Time's up! The correct number was ${secretNumber}.`;
      feedback.style.color = 'red';
      restartButton.style.display = 'block';
    }
  }, 1000);
}

// Function to reset the game
function resetGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  score = 100;
  timeLeft = 30;
  document.getElementById('userGuess').value = '';
  feedback.textContent = '';
  attemptsDisplay.textContent = '';
  scoreDisplay.textContent = `Score: ${score}`;
  restartButton.style.display = 'none';
  startTimer();
}

// When the submit button is clicked, check the user's guess
submitButton.addEventListener('click', function() {
  const userGuess = parseInt(document.getElementById('userGuess').value);
  attempts++;
  score -= 5; // Deduct points with each attempt

  // Check if the guess is correct
  if (userGuess === secretNumber) {
    feedback.textContent = `Congratulations! You guessed it right. The number was ${secretNumber}.`;
    feedback.style.color = 'green';
    feedback.classList.add('victory'); // Add victory animation
    attemptsDisplay.textContent = `It took you ${attempts} attempts.`;
    scoreDisplay.textContent = `Final Score: ${score}`;
    clearInterval(timer); // Stop the timer
    restartButton.style.display = 'block';
  } 
  // If the guess is too high
  else if (userGuess > secretNumber) {
    feedback.textContent = 'Too high! Try again.';
    feedback.style.color = 'red';
  } 
  // If the guess is too low
  else {
    feedback.textContent = 'Too low! Try again.';
    feedback.style.color = 'red';
  }

  attemptsDisplay.textContent = `Attempts: ${attempts}`;
  scoreDisplay.textContent = `Score: ${score}`;
});

// Restart the game when the restart button is clicked
restartButton.addEventListener('click', resetGame);

// Start the game by initializing the timer and other game settings
resetGame();
