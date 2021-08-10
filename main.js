const questionContainer = document.getElementById("question-container");
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const answerContainer = document.getElementById("answer-container");
const gameOverPanel = document.getElementById("showGameOver");
const scoreDisplay = document.getElementById("showScores");

let randomOrderedQuestions, currentQuestionIndex, scores;

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
  const selectedButton = e.target;
  checkIfCorrect(selectedButton);
}

function checkIfCorrect(button) {
  if (button.dataset.correct) {
    scores++;
    showResult(true);
  } else {
    showResult(false);
  }
  if (randomOrderedQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    gameOver();
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
  startButton.innerText = "Restart";
  startButton.classList.remove("hide");
  gameOverPanel.classList.remove("hide");
  scoreDisplay.innerText = `Elért pontok : ${questions.length}/${scores}`;
}

const questions = [
  {
    question: "Mennyi 2 x 2 ?",
    answers: [
      { text: "1", correct: false },
      { text: "3", correct: false },
      { text: "4", correct: true },
      { text: "6", correct: false },
    ],
  },
  {
    question: "Mennyire vagy Hujber Feri ?",
    answers: [
      { text: "Nem igazan.", correct: false },
      { text: "Teljesen persze.", correct: true },
      { text: "Az ki a tosz?", correct: false },
      { text: "Nem jellemző", correct: false },
    ],
  },
  {
    question: "Igaz hogy kuzemabatag ?",
    answers: [
      { text: "Jah", correct: false },
      { text: "Mitmivan?", correct: false },
      { text: "Az meg mi?", correct: false },
      { text: "Mikipikam", correct: true },
    ],
  },
  {
    question:
      "A nagyinál Tarkedlisütő volt a falra akasztva. Mi is ez a tarkedli?",
    answers: [
      {
        text: "Tojásból készült étel, az alakja miatt kellett a speciális edény.",
        correct: false,
      },
      {
        text: "A tarkedli egy tarhonya féle, jóval nagyobb, már-már nokedli méretű, különleges edényben sütötték.",
        correct: false,
      },
      {
        text: "A tarkedli reszelt burgonya és liszt keverékéből készült,speciális edényben sütötték.",
        correct: false,
      },
      {
        text: "A palacsintánál sűrűbb tésztaféle, zsiradékban sütötték, ehhez kellett a speciális edény.",
        correct: true,
      },
    ],
  },
  {
    question:
      "Nagyanyám konyhájában az asztal mellett egy pitli is volt. Mi ez a pitli?",
    answers: [
      { text: "Sótartó faedény", correct: false },
      { text: "Fűszertartó tálka", correct: false },
      { text: "Viztartó edény", correct: true },
      { text: "Ecet troló üveg kancsó", correct: false },
    ],
  },
];
