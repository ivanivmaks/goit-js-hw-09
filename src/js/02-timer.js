import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const picker = document.querySelector('#datetime-picker');
const start = document.querySelector('[data-start]');
const dateDays = document.querySelector('[data-days]');
const dateHours = document.querySelector('[data-hours]');
const dateMinutes = document.querySelector('[data-minutes]');
const dateSeconds = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      start.disabled = true;
    } else {
      start.disabled = false;
    }
  },
};

function update(target) {
  const interval = setInterval(() => {
    const date = new Date().getTime();
    const delta = target - date;

    if (delta <= 0) {
      clearInterval(interval);
      dateDays.textContent = '00';
      dateHours.textContent = '00';
      dateMinutes.textContent = '00';
      dateSeconds.textContent = '00';
    } else {
      const { days, hours, minutes, seconds } = convertMs(delta);
      dateDays.textContent = addLeadingZero(days);
      dateHours.textContent = addLeadingZero(hours);
      dateMinutes.textContent = addLeadingZero(minutes);
      dateSeconds.textContent = addLeadingZero(seconds);
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => {
  return value.toString().padStart(2, '0');
};

flatpickr(picker, options);

start.addEventListener('click', () => {
  const selectedDate = picker._flatpickr.selectedDates[0];
  if (selectedDate) {
    update(selectedDate.getTime());
  }
});
