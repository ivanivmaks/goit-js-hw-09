const startBtn = document.querySelector('.start-btn');
const stopBtn = document.querySelector('.stop-btn');
let timerId = null;

stopBtn.disabled = true;

function start() {
  startBtn.disabled = true;
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  stopBtn.disabled = false;
}

startBtn.addEventListener('click', start);

function stop() {
  clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

stopBtn.addEventListener('click', stop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
