const changeTh = document.getElementById('changeTheme');
const displayTimeLeft = document.querySelector('.displayTimeLeft');
const displayTimeEnds = document.querySelector('.displayTimeEnds');
const buttons = document.querySelectorAll('[data-time]');

let isLight = false;
let countdown;

function changeTheme() {
  if (isLight) {
    isLight = false;
    changeTh.innerHTML = '🌞 Light Theme';
    document.body.style.background = 'rgb(27, 27, 27)';
    displayTimeLeft.classList = 'displayTimeLeft timeLeftDark';
    displayTimeEnds.classList = 'displayTimeEnds timeEndsDark';
  } else {
    isLight = true;
    changeTh.innerHTML = '🌚 Dark Theme';
    document.body.style.background = 'rgb(245,245,245)';
    displayTimeLeft.classList = 'displayTimeLeft timeLeftLight';
    displayTimeEnds.classList = 'displayTimeEnds timeEndsLight';
  }
}

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayLeft(seconds);
  displayEnd(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it!
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // display it
    displayLeft(secondsLeft);
  }, 1000);
}

function displayLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`;
  if (remainderSeconds === 0) {
    console.log('boom');
  }
  document.title = display;
  displayTimeLeft.textContent = display;
}

function displayEnd(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  displayTimeEnds.textContent = `Be Back At ${adjustedHour}:${
    minutes < 10 ? '0' : ''
  }${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach((button) => button.addEventListener('click', startTimer));
document.customInput.addEventListener('submit', function (e) {
  e.preventDefault();
  const mins = this.miutes.value;
  timer(mins * 60);
  this.reset();
});
