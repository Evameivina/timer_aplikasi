let timer;
let isRunning = false;
let elapsed = 0;
let mode = "stopwatch"; // stopwatch / countdown
let countdownTime = 0;

const display = document.getElementById("display");
const laps = document.getElementById("laps");
const modeTitle = document.getElementById("modeTitle");
const countdownInput = document.getElementById("countdownInput");

function updateDisplay() {
  let time = mode === "stopwatch" ? elapsed : countdownTime;
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  let seconds = time % 60;
  display.textContent =
    String(hours).padStart(2, "0") + ":" +
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0");
}

function start() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      if (mode === "stopwatch") {
        elapsed++;
      } else {
        if (countdownTime > 0) {
          countdownTime--;
          if (countdownTime === 0) {
            alert("⏰ Time’s up!");
            pause();
          }
        }
      }
      updateDisplay();
    }, 1000);
  }
}

function pause() {
  clearInterval(timer);
  isRunning = false;
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  if (mode === "stopwatch") elapsed = 0;
  else countdownTime = 0;
  laps.innerHTML = "";
  updateDisplay();
}

function lap() {
  if (isRunning) {
    let li = document.createElement("li");
    li.textContent = display.textContent;
    laps.appendChild(li);
  }
}

function switchMode() {
  reset();
  if (mode === "stopwatch") {
    mode = "countdown";
    modeTitle.textContent = "Countdown Mode";
    countdownInput.style.display = "flex";
  } else {
    mode = "stopwatch";
    modeTitle.textContent = "Stopwatch Mode";
    countdownInput.style.display = "none";
  }
}

function setCountdown() {
  let mins = parseInt(document.getElementById("minutes").value) || 0;
  let secs = parseInt(document.getElementById("seconds").value) || 0;
  countdownTime = mins * 60 + secs;
  updateDisplay();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

updateDisplay();
