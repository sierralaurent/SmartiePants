document.addEventListener('DOMContentLoaded', () => {
    const scoreData = JSON.parse(sessionStorage.getItem('score'));
    const quizData = JSON.parse(sessionStorage.getItem('quizData'));

    const scoreText = document.getElementById('score');
    const summaryText = document.getElementById('summary');
    const wrongAnswersList = document.getElementById('wrongAnswersList');
    const correctAnswersList = document.getElementById('correctAnswersList');

    let totalScore = 0;
    let wrongAnswers = 0;
    let correctAnswers = 0;

    for (let i = 0; i < scoreData.length; i++) {
        totalScore += scoreData[i];
        if (scoreData[i] === 0) {
            wrongAnswers++;
        } else {
            correctAnswers++;
        }
    }

    scoreText.innerText = `Score: ${totalScore} / ${scoreData.length}`;

    if (totalScore === scoreData.length) {
        summaryText.innerText = "Congratulations! You got all the answers correct.";
    } else if (totalScore === 0) {
        summaryText.innerText = "Oops! You got all the answers wrong.";
    } else {
        summaryText.innerText = `You got ${totalScore} out of ${scoreData.length} answers correct.`;
    }

    for (let i = 0; i < quizData.results.length; i++) {
        const question = quizData.results[i].question;
        const correctAnswer = quizData.results[i].correct_answer;
        const selectedAnswer = JSON.parse(sessionStorage.getItem(`selectedAnswer${i}`));

        const listItem = document.createElement('li');
        if (scoreData[i] === 0) {
            listItem.innerText = `Q${i + 1}. ${question} \n Your answer: ${selectedAnswer} / Correct answer: ${correctAnswer} `;
            wrongAnswersList.appendChild(listItem);
        } else {
            listItem.innerText = `Q${i + 1}. ${question} \n Your answer: ${selectedAnswer} / Correct answer: ${correctAnswer}`;
            correctAnswersList.appendChild(listItem);
        }
    }       
});