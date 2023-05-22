const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');
};

const userResponses = JSON.parse(localStorage.getItem('userResponses')); // Retrieve user responses from local storage
const resultsContainer = document.getElementById('resultsContainer');

if (userResponses && userResponses.length > 0) {
  userResponses.forEach((response) => {
    const question = document.createElement('p');
    question.textContent = response.question;
    resultsContainer.appendChild(question);

    const userAnswer = document.createElement('p');
    userAnswer.textContent = `Your answer: ${response.answer}`;
    resultsContainer.appendChild(userAnswer);

    const correctAnswer = document.createElement('p');
    correctAnswer.textContent = `Correct answer: ${response.correct_answer}`;
    resultsContainer.appendChild(correctAnswer);

    const lineBreak = document.createElement('hr');
    resultsContainer.appendChild(lineBreak);
  });
} else {
  const noResults = document.createElement('p');
  noResults.textContent = 'No results available.';
  resultsContainer.appendChild(noResults);
}
