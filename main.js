let editBtn = document.getElementById("edit-btn");
let edit = document.getElementById("edit");
let parent = document.querySelector(".parent");
let closeBtn = document.querySelector(".close");
let doneBtn = document.querySelector(".done");

let inputHours = document.getElementById("hours");
let inputMinutes = document.getElementById("minutes");
let inputSeconds = document.getElementById("seconds");
let hours = document.getElementById("hrs");
let minutes = document.getElementById("mnts");
let seconds = document.getElementById("scnds");

let startStop = document.querySelector(".start-stop");
let reset = document.querySelector(".reset");

let test = false;

alarm = new Audio("alarm.wav");
editBtn.onclick = function () {
  if (startStop.textContent == "Start") {
    edit.style.display = "grid";
    parent.style.opacity = 0.5;
  }
};

closeBtn.onclick = function () {
  edit.style.display = "none";
  parent.style.opacity = 1;
};

doneBtn.onclick = function () {
  test = true;
  if (
    isDigits(inputHours.value) &&
    isDigits(inputMinutes.value) &&
    isDigits(inputSeconds.value)
  ) {
    hours.textContent =
      inputHours.value > 9 ? inputHours.value : `0${inputHours.value}`;
    minutes.textContent =
      inputMinutes.value > 9 ? inputMinutes.value : `0${inputMinutes.value}`;
    seconds.textContent =
      inputSeconds.value > 9 ? inputSeconds.value : `0${inputSeconds.value}`;
    edit.style.display = "none";
    parent.style.opacity = 1;
  }
};
function isDigits(string) {
  for (let i = 0; i < string.length; i++) {
    if (!("0" <= string[i] <= "9")) {
      return false;
    }
    return true;
  }
}

startStop.onclick = function () {
  if (this.textContent == "Start") {
    reset.style.cursor = "not-allowed";
    reset.style.opacity = 0.5;
    editBtn.style.cursor = "not-allowed";
    editBtn.style.opacity = 0.5;
    this.textContent = "Stop";
    let time =
      Number.parseInt(hours.textContent) * 3600 +
      Number.parseInt(minutes.textContent) * 60 +
      Number.parseInt(seconds.textContent) +
      1;
    let stopTime = new Date();
    stopTime.setSeconds(stopTime.getSeconds() + time, 0);
    interval = setInterval(function () {
      let now = new Date();
      difference = (stopTime - now.getTime()) / 1000;
      if (difference <= 0) {
        clearInterval(interval);
        alarm.play();
        this.textContent = "Start";
        reset.style.cursor = "pointer";
        reset.style.opacity = 1;
      }
      let h = Number.parseInt(difference / 3600);
      let m = Number.parseInt((difference % 3600) / 60);
      let s = Number.parseInt((difference % 3600) % 60);
      hours.textContent = h > 9 ? h : `0${h}`;
      minutes.textContent = m > 9 ? m : `0${m}`;
      seconds.textContent = s > 9 ? s : `0${s}`;
    }, 1000);
  } else {
    this.textContent = "Start";
    clearInterval(interval);
    reset.style.cursor = "pointer";
    reset.style.opacity = 1;
  }
};
reset.onclick = function () {
  if (startStop.textContent == "Start") {
    hours.textContent =
      inputHours.value > 9 ? inputHours.value : `0${inputHours.value}`;
    minutes.textContent =
      inputMinutes.value > 9 ? inputMinutes.value : `0${inputMinutes.value}`;
    seconds.textContent =
      inputSeconds.value > 9 ? inputSeconds.value : `0${inputSeconds.value}`;
  }
};
