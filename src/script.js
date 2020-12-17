const URL = "https://api.quotable.io/random";
const QuoteDisplayElement = document.getElementById("QuoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const buttonElement = document.getElementById("button");
const timerElement = document.getElementById("timer");

if (quoteInputElement.innerText != "") {
  quoteInputElement.addEventListener("input", () => {
    const QuoteArray = QuoteDisplayElement.querySelectorAll("span");
    const ValueArray = quoteInputElement.value.split("");
    let correct = true;
    QuoteArray.forEach((CharacterSpan, index) => {
      const character = ValueArray[index];
      if (character == null) {
        CharacterSpan.classList.remove("correct");
        CharacterSpan.classList.remove("incorrect");
        correct = false;
      } else if (character === CharacterSpan.innerText) {
        CharacterSpan.classList.add("correct");
        CharacterSpan.classList.remove("incorrect");
      } else {
        CharacterSpan.classList.remove("correct");
        CharacterSpan.classList.add("incorrect");
        correct = false;
      }
    });
    if (correct) RenderQuote();
  });
}

buttonElement.addEventListener("click", () => RenderQuote());

function GetQuote() {
  return fetch(URL)
    .then((response) => response.json())
    .then((data) => data.content);
}

async function RenderQuote() {
  const quote = await GetQuote();
  QuoteDisplayElement.innerText = "";
  quote.split("").forEach((character) => {
    const CharacterSpan = document.createElement("span");
    CharacterSpan.innerText = character;
    QuoteDisplayElement.appendChild(CharacterSpan);
  });
  quoteInputElement.value = null;
  startTimer();
}
function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}
let startTime;
function startTimer() {
  timerElement.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timer.innerText = getTimerTime();
  }, 1000);
}
