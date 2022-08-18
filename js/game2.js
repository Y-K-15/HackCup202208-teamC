'use strict';

const RANDOM_SENTENCE_URL_API = 'https://api.quotable.io/random';
const typeDisplay = document.getElementById('type-display');
const typeInput = document.getElementById('type-input');
const timer = document.getElementById('timer');


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
})

// 非同期処理でランダムな文章を取得する
function GetRandomSentence() {
  return fetch(RANDOM_SENTENCE_URL_API)
  .then((response) => response.json())
  .then((data) => data.content);
}

// ランダムな文章を取得して、表示する
async function RenderNextSentence() {
  const sentence = await GetRandomSentence();

  // 文章を1文字ずつ分解して、spanタグを生成する
  let oneText = sentence.split("");
  oneText.forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerHTML = character;
    typeDisplay.appendChild(characterSpan);
  });

  // テキストボックスの中身を消す
  typeInput.value = "";
  startTimer();
}

let startTime;
let originTime = 30;
function startTimer() {
  timer.innerHTML = originTime;
  startTime = new Date();
  setInterval(() => {
    timer.innerHTML = originTime - getTimerTime();
    if(timer.innerHTML <= 0) timeUp();
  }, 1000);
}

function getTimerTime() {
  return Math.floor(((new Date() - startTime) / 1000));
}

function timeUp() {
  typeDisplay.innerHTML = "";
  RenderNextSentence();
}

RenderNextSentence();