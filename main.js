const inputDay = document.getElementById('day');
const inputMonth = document.getElementById('month');
const inputYear = document.getElementById('year');

const today = new Date();
const currentDay = Number(today.getDate());
const currentMonth = Number(today.getMonth()) + 1;
const currentYear = Number(today.getFullYear());


function isEmpty(element){
  if (element.value == '') {
    element.nextElementSibling.innerHTML = 'This field is required';
    return true
  }
  return false
}

function checkDays() {
  day = Number(inputDay.value)
  month = Number(inputMonth.value)
  year = Number(inputYear.value)
  inputDay.nextElementSibling.innerHTML = '';
  var empty = isEmpty(inputDay)
  if ((isNaN(day) || day <= 0 || day > 31) && empty != true) {
    inputDay.nextElementSibling.innerHTML = 'Must be a valid day';
  } else if ((day > currentDay && month == currentMonth && year == currentYear) && empty != true) {
    inputDay.nextElementSibling.innerHTML = 'Must be in the past';
  }
}
function checkMonths() {
  month = Number(inputMonth.value)
  year = Number(inputYear.value)
  inputMonth.nextElementSibling.innerHTML = '';
  var empty = isEmpty(inputMonth)
  if ((isNaN(month) || month <= 0 || month > 12) && empty != true) {
    inputMonth.nextElementSibling.innerHTML = 'Must be a valid month';
  } else if ((month > currentMonth && year == currentYear) && empty != true) {
    inputMonth.nextElementSibling.innerHTML = 'Must be in the past';
  }
}
function checkYears() {
  year = Number(inputYear.value)
  inputYear.nextElementSibling.innerHTML = '';
  var empty = isEmpty(inputYear)
  if ((isNaN(year) || year <= 0) && empty != true) {
    inputYear.nextElementSibling.innerHTML = 'Must be a valid year';
  } else if ((year > currentYear) && empty != true) {
    inputYear.nextElementSibling.innerHTML = 'Must be in the past';
  } 
}

document.querySelector('button').addEventListener('click', () => {
  checkDays()
  checkMonths()
  checkYears()
  const errorSpan = document.querySelectorAll('.container .input-fields .input-group span');
  errors = 3
  for (let i = 0; i < errorSpan.length; i++) {
    if (errorSpan[i].innerHTML == ''){errors -= 1}
  }
  if (errors == 0) {
    const birth = new Date(`${Number(inputYear.value)}-${Number(inputMonth.value)}-${Number(inputDay.value)}`)
    let diff =  Math.floor((today.getTime() - birth.getTime()) / (1000 * 3600 * 24));
    document.getElementById('years').innerHTML = Math.floor(diff / 365.25);
    document.getElementById('months').innerHTML = Math.floor((diff % 365.25) / 30.416);
    document.getElementById('days').innerHTML = Math.floor((diff % 365.25) % 30.416);
  }
})

