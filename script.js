/* OPTYMALIZE FOR MOBILE */

const settings = document.querySelector('.settings');
const title = document.querySelector('.event');
const image = document.querySelector('.image-section');
const daysCount = document.querySelector('.days-count');
const hoursCount = document.querySelector('.hours-count');
const minCount = document.querySelector('.minutes-count');
const secCount = document.querySelector('.seconds-count');

const eventName = document.querySelector('#event-name');
const eventDay = document.querySelector('#event-day');
const eventMonth = document.querySelector('#event-month');
const eventYear = document.querySelector('#event-year');
const eventImage = document.querySelector('#event-image');
const err = document.querySelector('.error');

const settingBtn = document.querySelector('.settings-btn');
const saveBtn = document.querySelector('.save');

let interval;

const showSettings = () => {
  settings.classList.toggle('active');
}

const errInfo = (display, text) => {
  err.style.display = `${display}`;
  err.textContent = `${text}` || '';
}

function daysInMonth (month, year) {
  return new Date(year, month, 0).getDate();
}

const errHandler = () => {
  if (eventName.value !== '') {
    if((eventDay.value <= daysInMonth(eventMonth.value, eventYear.value) && eventDay.value !== 0)
    && (eventMonth.value > 0 && eventMonth.value <= 12 && eventMonth.value !== 0)
    && (eventYear.value >= new Date().getFullYear() && eventYear.value !== 0)) {
      errInfo('none');
      newSettings();
    } else {
      errInfo('block','Nie ma takiej daty');
    }
  } else {
    errInfo('block','Uzupełnij nazwę wydarzenia');
  }
}

const newSettings = () => {
  clearInterval(interval); 
  title.textContent = eventName.value;
  image.style.backgroundImage = `url(${eventImage.value})`;
  const day = eventDay.value;
  const month = eventMonth.value - 1;
  const year = eventYear.value;

  
  let currentTime = (new Date());
  let eventDate = new Date(year,month,day);
  const time = Math.floor((eventDate - currentTime) / 1000);

  if(time >= 0) {
    interval = setInterval(function () {
      calcTime(day, month, year);
    }, 1000);
    showSettings();
  } else {
    errInfo('block', 'Nie ma takiej daty');
  }
}

const calcTime = (day, month, year) => {
  currentTime = (new Date());
  eventDate = new Date(year,month,day);
  let secTo = 0;
  let minTo = 0;
  let hoursTo = 0;
  let daysTo = 0;
  secTo = Math.floor((eventDate - currentTime) / 1000);

  if(secTo === 0) {
    clearInterval(interval);
  }

  minTo = Math.floor(secTo / 60);
  hoursTo = Math.floor(minTo / 60);
  daysTo = Math.floor(hoursTo / 24);
  
  hoursTo = hoursTo - (daysTo * 24);
  minTo = minTo - (daysTo * 24 * 60) - (hoursTo * 60);
  secTo = secTo - (daysTo*24*60*60)-(hoursTo*60*60)-(minTo*60);

  daysCount.textContent = daysTo;
  hoursCount.textContent = hoursTo;
  minCount.textContent = minTo;
  secCount.textContent = secTo;
}


settingBtn.addEventListener('click', showSettings);
saveBtn.addEventListener('click', errHandler);