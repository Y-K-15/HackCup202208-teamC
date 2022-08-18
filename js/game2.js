'use strict';

const questions = [
  {
    word: '７つの習慣',
    alphabet: 'nanatunosyuukann'
  },
  {
    word: 'パラダイム',
    alphabet: 'paradaimu'
  },
  {
    word: 'インサイドアウト',
    alphabet: 'insaidoauto'
  },
  {
    word: 'ガチョウの卵',
    alphabet: 'gatyounotamago'
  },
  {
    word: '影響の輪',
    alphabet: 'eikyounowa'
  },
  {
    word: '相互依存',
    alphabet: 'sougoizonn'
  },
  {
    word: 'パーソナルマネジメント',
    alphabet: 'pa-sonarumanezimento'
  },
]

const RANDOM_SENTENCE_URL_API = 'https://api.quotable.io/random';
const typeDisplay = document.getElementById('type-display');
const typeInput = document.getElementById('type-input');
const timer = document.getElementById('timer');
const resultDisplay = document.getElementById('result-display');
const defaultQuestionLength = questions.length;
let correctCount = 0;
let sentence;


// inputテキスト入力。正誤判定
typeInput.addEventListener('input', () => {
  const sentenceArray = document.querySelectorAll("span");
  const arrayValue = typeInput.value.split("");

  sentenceArray.forEach((characterSpan, index) => {
    if ((arrayValue[index] == null)) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
    } else if(characterSpan.innerHTML == arrayValue[index]) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.add("incorrect");
      characterSpan.classList.remove("correct");
    }
  })

  if (typeInput.value == sentence) {
    console.log(sentence);
    correctCount++;
    if (questions.length != 0) {
      RenderNextSentence();
    } else {
      showResults();
    }
  }
})

// ランダムな文章を取得して、表示する
async function RenderNextSentence() {
  const randomIndex = Math.floor(Math.random() * questions.length);
  sentence = questions[randomIndex].alphabet;
  typeDisplay.innerHTML = questions[randomIndex].word + "<br>";

  // 文章を1文字ずつ分解して、spanタグを生成する
  let oneText = sentence.split("");
  oneText.forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerHTML = character;
    typeDisplay.appendChild(characterSpan);
  });

  // 配列から問題を消す
  questions.splice(randomIndex, 1)

  // テキストボックスの中身を消す
  typeInput.value = "";
  startTimer();
}

let startTime;
let originTime = 5;
function startTimer() {
  timer.innerHTML = originTime;
  startTime = new Date();
  setInterval(() => {
    if(questions.length == 0 && timer.innerHTML <= 0){
      clearInterval();
    } else {
      timer.innerHTML = originTime - getTimerTime();
      if(timer.innerHTML <= 0) timeUp();
    }
  }, 1000);
}

function getTimerTime() {
  return Math.floor(((new Date() - startTime) / 1000));
}

function timeUp() {
  if(questions.length != 0){
    typeDisplay.innerHTML = "";
    RenderNextSentence();
  } else {
    console.log("finish");
    showResults();
  }
}

function showResults() {
  timer.classList.add("js-off");
  typeDisplay.classList.add("js-off");
  typeInput.classList.add("js-off");

  resultDisplay.innerHTML = correctCount + "/" + defaultQuestionLength;
  resultDisplay.classList.remove("js-off");
}

RenderNextSentence();

