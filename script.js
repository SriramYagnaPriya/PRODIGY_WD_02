// script.js
let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

startStopBtn.addEventListener('click', () => {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateTime, 10);
        startStopBtn.textContent = 'Stop';
        running = true;
    } else {
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime;
        startStopBtn.textContent = 'Start';
        running = false;
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    display.textContent = '00:00:00.000';
    startStopBtn.textContent = 'Start';
    running = false;
    difference = 0;
    laps = [];
    lapsContainer.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
    if (running) {
        const lapTime = display.textContent;
        laps.push(lapTime);
        const lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${laps.length}: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
    }
});

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    display.textContent = 
        (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" +
        (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
        (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") + "." +
        (milliseconds > 9 ? milliseconds : "0" + milliseconds);
}
