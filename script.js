// ===== QUIZ DATA FOR KIDS (7-12 YEARS) =====
const quizQuestions = [
    {
        question: "I have cities, but no houses. I have mountains, but no trees. What am I?",
        options: ["A Map", "A Painting", "A Dream", "A Book"],
        correct: 0,
        emoji: "🗺️",
        hint: "You use this when you're lost"
    },
    {
        question: "The more you take, the more you leave behind. What am I?",
        options: ["Money", "Footsteps", "Time", "Toys"],
        correct: 1,
        emoji: "👣",
        hint: "You leave these in the sand at the beach"
    },
    {
        question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
        options: ["A Ghost", "An Echo", "A Bird", "A Rainbow"],
        correct: 1,
        emoji: "🔊",
        hint: "Make sound in a cave or canyon"
    },
    {
        question: "What has keys but no locks? Space but no room? And you can enter but can't go outside?",
        options: ["A Computer", "A Piano", "A Door", "A Box"],
        correct: 1,
        emoji: "🎹",
        hint: "Musicians play this"
    },
    {
        question: "I have a head and a tail, but no body. What am I?",
        options: ["A Kite", "A Coin", "A Snake", "A Rocket"],
        correct: 1,
        emoji: "🪙",
        hint: "You flip me to make decisions"
    },
    {
        question: "What can travel around the world while staying in a corner?",
        options: ["A Bird", "A Stamp", "A Plane", "A Fish"],
        correct: 1,
        emoji: "📮",
        hint: "You stick this on letters"
    },
    {
        question: "I'm light as a feather, yet the strongest person can't hold me for five minutes. What am I?",
        options: ["Air", "Your Breath", "Smoke", "A Cloud"],
        correct: 1,
        emoji: "💨",
        hint: "You do this all day to stay alive"
    },
    {
        question: "What has a neck but no head?",
        options: ["A Giraffe", "A Bottle", "A Snake", "A Swan"],
        correct: 1,
        emoji: "🍾",
        hint: "You drink water from this"
    },
    {
        question: "What gets wetter the more it dries?",
        options: ["A Sponge", "A Towel", "A Mop", "A Cloth"],
        correct: 1,
        emoji: "🏖️",
        hint: "You use this after taking a bath"
    },
    {
        question: "I have hands but cannot clap. What am I?",
        options: ["A Clock", "A Monkey", "A Robot", "A Person"],
        correct: 0,
        emoji: "⏰",
        hint: "It tells you what time it is"
    }
];

// ===== GLOBAL VARIABLES =====
let currentQuestion = 0;
let score = 0;
let stars = 0;
let answers = [];
let answered = false;

// ===== INIT FUNCTION =====
function init() {
    document.getElementById('startBtn').addEventListener('click', startQuiz);
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);
    document.getElementById('prevBtn').addEventListener('click', previousQuestion);
    document.getElementById('restartBtn').addEventListener('click', restartQuiz);
    document.getElementById('reviewBtn').addEventListener('click', showReview);
    document.getElementById('backToResultsBtn').addEventListener('click', backToResults);
}

// ===== START QUIZ =====
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    stars = 0;
    answers = [];
    answered = false;
    
    // Hide welcome, show quiz
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('quizScreen').style.display = 'block';
    document.getElementById('resultsScreen').style.display = 'none';
    document.getElementById('reviewScreen').style.display = 'none';
    
    document.getElementById('totalQuestions').textContent = quizQuestions.length;
    displayQuestion();
}

// ===== DISPLAY QUESTION =====
function displayQuestion() {
    const question = quizQuestions[currentQuestion];
    
    // Update question number and emoji
    document.getElementById('questionNumber').textContent = currentQuestion + 1;
    document.getElementById('questionEmoji').textContent = question.emoji;
    document.getElementById('question').textContent = question.question;
    
    // Update progress bar
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    // Clear options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    // Display options
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectOption(index);
        
        // If answered, show correct/incorrect
        if (answered) {
            if (index === question.correct) {
                optionDiv.classList.add('correct');
            } else if (index === answers[currentQuestion]) {
                optionDiv.classList.add('incorrect');
            }
            optionDiv.style.pointerEvents = 'none';
        } else if (answers[currentQuestion] === index) {
            optionDiv.classList.add('selected');
        }
        
        optionsContainer.appendChild(optionDiv);
    });
    
    // Update button states
    document.getElementById('prevBtn').disabled = currentQuestion === 0;
    document.getElementById('nextBtn').disabled = answers[currentQuestion] === undefined;
    document.getElementById('nextBtn').textContent = currentQuestion === quizQuestions.length - 1 ? '🏁 Finish' : 'Next →';
    
    answered = false;
}

// ===== SELECT OPTION =====
function selectOption(index) {
    if (answered) return;
    
    answers[currentQuestion] = index;
    const question = quizQuestions[currentQuestion];
    
    // Check if correct
    if (index === question.correct) {
        score++;
        stars++;
        showCorrectFeedback();
    } else {
        showIncorrectFeedback();
    }
    
    answered = true;
    document.getElementById('starCount').textContent = stars;
    
    // Re-display to show correct/incorrect
    setTimeout(() => {
        displayQuestion();
    }, 500);
}

// ===== FEEDBACK ANIMATIONS =====
function showCorrectFeedback() {
    playSound('correct');
    showCelebration();
}

function showIncorrectFeedback() {
    playSound('incorrect');
}

function showCelebration() {
    const confetti = document.getElementById('confetti');
    for (let i = 0; i < 30; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.top = '-10px';
        piece.style.background = ['#667eea', '#764ba2', '#f39c12', '#2ecc71', '#e74c3c'][Math.floor(Math.random() * 5)];
        piece.style.animation = `fall ${2 + Math.random() * 1}s linear`;
        
        confetti.appendChild(piece);
        setTimeout(() => piece.remove(), 3000);
    }
}

// Add CSS animation for falling confetti
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== SOUND EFFECTS (OPTIONAL) =====
function playSound(type) {
    // Using Web Audio API for simple beep sounds
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'correct') {
        oscillator.frequency.value = 800;
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } else if (type === 'incorrect') {
        oscillator.frequency.value = 300;
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    }
}

// ===== NAVIGATION =====
function nextQuestion() {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        finishQuiz();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        answered = true;
        displayQuestion();
    }
}

// ===== FINISH QUIZ =====
function finishQuiz() {
    document.getElementById('quizScreen').style.display = 'none';
    document.getElementById('resultsScreen').style.display = 'block';
    
    document.getElementById('finalScore').textContent = score;
    document.getElementById('finalTotal').textContent = quizQuestions.length;
    
    // Display stars
    const starsDisplay = '⭐'.repeat(stars);
    document.getElementById('starsEarned').textContent = starsDisplay;
    
    // Display personalized message and badge
    const percentage = (score / quizQuestions.length) * 100;
    let message = '';
    let badge = '';
    
    if (percentage === 100) {
        message = '🏆 PERFECT! You\'re a Brain Genius! 🧠';
        badge = '👑';
    } else if (percentage >= 80) {
        message = '🌟 Excellent! You\'re Super Smart! 🎉';
        badge = '🥇';
    } else if (percentage >= 60) {
        message = '😊 Great Job! Keep Practicing! 💪';
        badge = '🥈';
    } else if (percentage >= 40) {
        message = '👍 Good Try! You\'re Getting There! 📚';
        badge = '🥉';
    } else {
        message = '💫 Don\'t Give Up! Try Again! 🚀';
        badge = '🎯';
    }
    
    document.getElementById('resultMessage').textContent = message;
    document.getElementById('badge').textContent = badge;
    
    // Show celebration
    showCelebration();
}

// ===== RESTART QUIZ =====
function restartQuiz() {
    document.getElementById('resultsScreen').style.display = 'none';
    document.getElementById('reviewScreen').style.display = 'none';
    document.getElementById('welcomeScreen').style.display = 'flex';
}

// ===== REVIEW ANSWERS =====
function showReview() {
    document.getElementById('resultsScreen').style.display = 'none';
    document.getElementById('reviewScreen').style.display = 'block';
    
    const reviewContainer = document.getElementById('reviewContainer');
    reviewContainer.innerHTML = '';
    
    quizQuestions.forEach((question, index) => {
        const userAnswer = answers[index];
        const isCorrect = userAnswer === question.correct;
        
        const reviewItem = document.createElement('div');
        reviewItem.className = `review-item ${isCorrect ? 'correct' : 'incorrect'}`;
        
        const questionDiv = document.createElement('div');
        questionDiv.className = 'review-question';
        questionDiv.innerHTML = `<strong>${index + 1}. ${question.emoji} ${question.question}</strong>`;
        reviewItem.appendChild(questionDiv);
        
        const yourAnswerDiv = document.createElement('div');
        yourAnswerDiv.className = `review-answer ${isCorrect ? 'correct' : 'incorrect'}`;
        yourAnswerDiv.innerHTML = `<strong>Your Answer:</strong> ${question.options[userAnswer] || 'Not answered'} ${isCorrect ? '✓' : '✗'}`;
        reviewItem.appendChild(yourAnswerDiv);
        
        if (!isCorrect) {
            const correctAnswerDiv = document.createElement('div');
            correctAnswerDiv.className = 'review-answer correct';
            correctAnswerDiv.innerHTML = `<strong>Correct Answer:</strong> ${question.options[question.correct]}`;
            reviewItem.appendChild(correctAnswerDiv);
        }
        
        reviewContainer.appendChild(reviewItem);
    });
}

function backToResults() {
    document.getElementById('reviewScreen').style.display = 'none';
    document.getElementById('resultsScreen').style.display = 'block';
}

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', init);