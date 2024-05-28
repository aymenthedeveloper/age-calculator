const inputDay = document.getElementById('day');
const inputMonth = document.getElementById('month');
const inputYear = document.getElementById('year');

const today = new Date();
const [currentDay, currentMonth, currentYear] = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
const getInput = () => [inputDay.value, inputMonth.value, inputYear.value].map(Number);

function checkDays() {
  let [day, month, year] = getInput();
  inputDay.nextElementSibling.innerHTML = '';
  if (!inputDay.value) inputDay.nextElementSibling.innerHTML = 'This field is required';
  else if (isNaN(day) || day <= 0 || day > 31) inputDay.nextElementSibling.innerHTML = 'Must be a valid day';
  else if (day > currentDay && month == currentMonth && year == currentYear) inputDay.nextElementSibling.innerHTML = 'Must be in the past';
}
function checkMonths() {
  let [month, year] = getInput().slice(1,2);
  inputMonth.nextElementSibling.innerHTML = '';
  if (!inputMonth.value) inputMonth.nextElementSibling.innerHTML = 'This field is required';
  else if (isNaN(month) || month <= 0 || month > 12) inputMonth.nextElementSibling.innerHTML = 'Must be a valid month';
  else if (month > currentMonth && year == currentYear) inputMonth.nextElementSibling.innerHTML = 'Must be in the past';
}
function checkYears() {
  let year = getInput()[2];
  inputYear.nextElementSibling.innerHTML = '';
  if (!inputYear.value) inputYear.nextElementSibling.innerHTML = 'This field is required';
  else if (isNaN(year) || year <= 0) inputYear.nextElementSibling.innerHTML = 'Must be a valid year';
  else if (year > currentYear) inputYear.nextElementSibling.innerHTML = 'Must be in the past';
}

document.querySelector('button').addEventListener('click', () => {
  checkDays()
  checkMonths()
  checkYears()
  const errorSpan = document.querySelectorAll('.container .input-fields .input-group span');
  const errors = Array(3).fill(0).reduce((count,v,i) => errorSpan[i].innerHTML !== ''? ++count: count, 0);
  if (errors == 0) {
    const birth = new Date(`${Number(inputYear.value)}-${Number(inputMonth.value)}-${Number(inputDay.value)}`)
    let diff =  Math.floor((today.getTime() - birth.getTime()) / (1000 * 3600 * 24));
    document.getElementById('years').innerHTML = Math.floor(diff / 365.25);
    document.getElementById('months').innerHTML = Math.floor((diff % 365.25) / 30.416);
    document.getElementById('days').innerHTML = Math.floor((diff % 365.25) % 30.416);
  }
});

