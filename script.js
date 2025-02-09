let hours = 0;
let minutes = 0;
let seconds = 0;
let lapTimes = [];
let stopwatchInterval = null;
let isRunning = false;

const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const lapButton = document.getElementById('lap-button');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const lapTimesList = document.getElementById('lap-times-list');

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);

function startStopwatch() {
    if (!isRunning) {
        stopwatchInterval = setInterval(updateStopwatch, 1000);
        isRunning = true;
        startButton.disabled = true;
        pauseButton.disabled = false;
        lapButton.disabled = false;
    }
}

function pauseStopwatch() {
    if (isRunning) {
        clearInterval(stopwatchInterval);
        isRunning = false;
        startButton.disabled = false;
        pauseButton.disabled = true;
    }
}

function resetStopwatch() {
    hours = 0;
    minutes = 0;
    seconds = 0;
    lapTimes = [];
    clearInterval(stopwatchInterval);
    isRunning = false;
    startButton.disabled = false;
    pauseButton.disabled = true;
    lapButton.disabled = true;
    hoursElement.textContent = '00';
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';
    lapTimesList.innerHTML = '';
}

function updateStopwatch() {
    seconds++;
    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }
    if (minutes === 60) {
        hours++;
        minutes = 0;
    }
    hoursElement.textContent = padZero(hours);
    minutesElement.textContent = padZero(minutes);
    secondsElement.textContent = padZero(seconds);
}

function recordLap() {
    const lapTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    lapTimes.push(lapTime);
    const lapListItem = document.createElement('LI');
    lapListItem.textContent = `Lap ${lapTimes.length}: ${lapTime}`;
    lapTimesList.appendChild(lapListItem);
}

function padZero(time) {
    return (time < 10 ? '0' : '') + time;
}
