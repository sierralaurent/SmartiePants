
const categoryDropdown = document.getElementById("category-dropdown");
let display = '';

fetch("https://opentdb.com/api_category.php")
  .then(response => response.json())
  .then(data => {

    const categories = data.trivia_categories;

    categories.sort((a, b) => a.name.localeCompare(b.name));
    categories.forEach(category => {

      const option = document.createElement("option");
      option.value = category.id;
      option.text = category.name;
      categoryDropdown.add(option);
    });
  })

  .catch(error => console.error(error));

const startButton = document.getElementById("start-button");
const difficultyRadios = document.getElementsByName("difficulty");
let url = '';
let userResponses = []; 


startButton.addEventListener("click", startQuiz);

userResponses = []

function startQuiz() {
  const category = categoryDropdown.value;

  const difficulty = getSelectedRadioValue(difficultyRadios);

  url = `https://opentdb.com/api.php?amount=10&type=multiple${category ? `&category=${category}` : ""}${difficulty ? `&difficulty=${difficulty}` : ""}`;

  const quizContainer = document.getElementById("quizContainer");
  const settingsContainer = document.getElementById("settingsContainer")

  if (quizContainer.style.display === 'none') {
    settingsContainer.style.display = 'none'
    quizContainer.style.display = 'flex';
  } else {
    quizContainer.style.display === 'none';
    settingsContainer.style.display = 'flex'
  }

  const question = document.getElementById('question');
  const choices = Array.from(document.getElementsByClassName('choice-text'));
  const progressText = document.getElementById('progressText');
  const scoreText = document.getElementById('score');
  const progressBarFull = document.getElementById('progressBarFull');
  let currentQuestion = {};
  let acceptingAnswers = false;
  let score = 0;
  let questionCounter = 0;
  let availableQuesions = [];
  let questions = [];

  fetch(
    `${url}`
  )
    .then((res) => {
      return res.json();
    })
    .then((loadedQuestions) => {
      questions = loadedQuestions.results.map((loadedQuestion) => {
        const formattedQuestion = {
          question: decodeHTML(loadedQuestion.question),
        };

        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
        answerChoices.splice(
          formattedQuestion.answer - 1,
          0,
          loadedQuestion.correct_answer
        );

        answerChoices.forEach((choice, index) => {
          formattedQuestion['choice' + (index + 1)] = decodeHTML(choice);;
        });

        return formattedQuestion;
      });
      startGame();
    })
    .catch((err) => {
      console.error(err);
    });


  const CORRECT_BONUS = 10;
  const MAX_QUESTIONS = 10;

  startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
  };

  getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
      localStorage.setItem('mostRecentScore', score);
      localStorage.setItem('userResponses', JSON.stringify(userResponses)); 

      return window.location.assign('/SmartiePants/results.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
      const number = choice.dataset['number'];
      choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
  };

  choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
      if (!acceptingAnswers) return;

      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset['number'];

      const classToApply =
        selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

      if (classToApply === 'correct') {
        incrementScore(CORRECT_BONUS);
      }

      selectedChoice.parentElement.classList.add(classToApply);


      userResponses.push({
        question: currentQuestion.question,
        answer: currentQuestion['choice' + selectedAnswer],
        correct_answer: currentQuestion['choice' + currentQuestion.answer]
      });
      

      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 1000);
    });
  });

  incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
  };


  console.log(url);
}

function getSelectedRadioValue(radios) {
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }
  return null;
}

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}
