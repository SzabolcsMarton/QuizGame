const questionContainer = document.getElementById("question-container");
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const answerContainer = document.getElementById("answer-container");
const gameOverPanel = document.getElementById("showGameOver");
const scoreDisplay = document.getElementById("showScores");

let randomOrderedQuestions, currentQuestionIndex, scores;
let questions;
let roundOfGame = 10;

async function fetchQuestions() {
  let res = await fetch("http://localhost:3000/questions");
  let result = await res.json();
  return result;
}

fetchQuestions().then((question) => (questions = question));

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  gameOverPanel.classList.add("hide");
  randomOrderedQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  scores = 0;
  questionContainer.classList.remove("hide");
  answerContainer.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(randomOrderedQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionContainer.innerText = question.question;
  question.answers.forEach((answer) => {
    let button = document.createElement("button");
    button.classList.add("btn");
    button.innerText = answer.text;
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerContainer.appendChild(button);
  });
}

function selectAnswer(e) {
  checkIfCorrect(e.target);
}

function checkIfCorrect(button) {
  if (button.dataset.correct) {
    scores++;
    showResult(true);
  } else {
    showResult(false);
  }
  if (currentQuestionIndex + 1 < roundOfGame) {
    nextButton.classList.remove("hide");
  } else {
    setTimeout(gameOver(), 1000);
  }
}

function showResult(correct) {
  if (correct) {
    answerContainer.classList.add("good");
  } else {
    answerContainer.classList.add("wrong");
  }
}

function resetState() {
  nextButton.classList.add("hide");
  answerContainer.classList.remove("good");
  answerContainer.classList.remove("wrong");
  while (answerContainer.firstChild) {
    answerContainer.removeChild(answerContainer.firstChild);
  }
}

function gameOver() {
  questionContainer.classList.add("hide");
  answerContainer.classList.add("hide");
  startButton.innerText = "Új játék";
  startButton.classList.remove("hide");
  gameOverPanel.classList.remove("hide");
  scoreDisplay.innerText = `Elért pontok : ${roundOfGame}/${scores}`;
}
