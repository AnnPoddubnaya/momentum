
//data ana time------1----------

const timeBlock = document.querySelector('.time');

function showTime(){
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    timeBlock.textContent = currentTime;
    setTimeout(showTime, 1000);
    showDate();
    getTimeOfDay()
}
showTime();


// console.log(date);

function showDate(){
    const dateBlock = document.querySelector('.date');
    const date = new Date();
    const options = {month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString('en-En', options);
    // console.log(currentDate);
    dateBlock.textContent = currentDate;
    // console.log(date);
}


//greeting-------2-------

const greeting = document.querySelector('.greeting');

function getTimeOfDay(){

const date = new Date();
const hours = date.getHours();
// console.log(hours);

    if(hours >= 6 && hours < 12){
        return 'morning';
    } 
    if(hours >= 12 && hours < 18){
        return 'afternoon';
    } 
    if(hours >= 18 && hours < 24){
        return 'evening';
    } 
    if(hours >= 0 && hours < 5){
       return 'night'; 
    } else{
        return 'FACK'
    }
}

const timeOfDay = getTimeOfDay();
const greetingText = `Good ${timeOfDay}`;

greeting.textContent = greetingText;

//userName ====================================================================================================

const user = document.querySelector('.name');

function setLocalStorage() {
  localStorage.setItem('name', user.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    user.value = localStorage.getItem('name');
  };
}

window.addEventListener('load', getLocalStorage);


  //bacgrounImage-----3-----

 const body = document.getElementsByTagName('body')[0];
 //   console.log(body);

 function getRandomNum(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
 }

let randomNum;
let bgNum;
let bgNum2;

// function setBg(){
//     let timeOfDay = getTimeOfDay();
//     let bgNum = getRandomNum(1, 20);
//     let bgNum2 = bgNum.toString().padStart( 2, "0");
//     body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum2}.jpg')`;
// }

function setBg() {  
    let timeOfDay = getTimeOfDay();
    let bgNum = getRandomNum(1, 20);
    let bgNum2 = bgNum.toString().padStart( 2, "0");
    const img = new Image();
    const url =  `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum2}.jpg`;
    img.src = url;
    img.onload = () => {      
     return body.style.backgroundImage = `url(${url})`;
    }; 
  }
  setBg();

//slider==================================================================================

const buttonRight = document.querySelector('.slide-next');
// console.log(buttonRight);

function getSlideNext(){
  setBg();
let current = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum2}.jpg')`;
for ( let i = 1; i <= 20; i++){
  current++;
  // console.log(current);
  if ( current === 20){
    return current = 1;
  }
}
}
buttonRight.addEventListener('click', getSlideNext);

//=========================================//

const buttonLeft = document.querySelector('.slide-prev');
// console.log(buttonLeft);

function getSlidePrev(){
  setBg();
let current = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum2}.jpg')`;
for ( let i = 20; i <= 1; i++){
  current--;
  // console.log(current);
  if ( current === 1){
    return current = 20;
  }
}
}
buttonLeft.addEventListener('click', getSlidePrev);

//weather------4--------
const weather = document.querySelector('.weather');
const weatherIcon = document.querySelector('.weather-icon'); 
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
city.value = 'Санкт-Петербург';

async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=f5020f72bbf9dc540d62747a839345c9&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
  // console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
  weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
}
  function setCity(event) {
        if (event === 'Enter') {
          getWeather();
          city.blur();
        }     
}

getWeather();
document.addEventListener('change', getWeather);
city.addEventListener('keypress', setCity);


//quotes--------5-------

const quoteChange = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');


async function getQuotes() {  
  const quotes = 'data.json';
  const res = await fetch(quotes);
  const data = await res.json(); 

  let rand = (Math.floor(Math.random() * (data.length) - 0)) + 0;

quote.textContent = data[rand].text;
author.textContent = data[rand].author;
 
}
getQuotes();

changeQuote.addEventListener('click',  getQuotes);

//player---------6--------
const audio = document.querySelector('audio');
const button = document.querySelector('.play');
let currentTime = 0;
let playNum = 0;
let isPlay = false;

import playList from "./playList.js";
function loadAudio(){
  audio.src = playList[playNum].src;
}
loadAudio();

function playAudio() {
  if(!isPlay){
    audio.play();
    isPlay = true;
  }
  else{
    audio.pause();
    isPlay = false;
  }
}

function toggleBtn(){
  button.classList.toggle('pause');
}
button.addEventListener('click', toggleBtn);
button.addEventListener('click', playAudio);



const buttonNext = document.querySelector('.play-next');
const buttonPrev = document.querySelector('.play-prev');

function nextAudio(){
  if(playNum === playList.length - 1){
    playNum = 0;
  }
  else{
    playNum++;
  }
  loadAudio();

  if(isPlay){
    isPlay = false;
    playAudio();
  }
  currentAudio();
}
function prevAudio(){
  if(playNum === 0){
    playNum = playList.length - 1;
  }
  else{
    playNum--;
  }
  loadAudio();

  if(isPlay){
    isPlay = false;
    playAudio();
  }
  currentAudio();
}
buttonNext.addEventListener('click', nextAudio);
buttonPrev.addEventListener('click', prevAudio);


const playListAudio = document.querySelector(".play-list");


playList.forEach((el, index) => {
    const li = document.createElement('li');
    li.classList.add('play-list__item');
    li.textContent = el.title;
    playListAudio.append(li);
    if (index === playNum) {
        li.classList.add('play-list__item_active');
    
    }
})

const playListItems = document.querySelectorAll('.play-list__item');

function currentAudio() {
    playListItems.forEach((el, index) => {
        el.classList.remove('play-list__item_active');
        if (index === playNum) {
            el.classList.add('play-list__item_active');
        }
    })
    
}
