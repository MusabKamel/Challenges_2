const currentDate = new Date();
const dayInputElement = document.getElementById("dayInput");
const monthInputElement = document.getElementById(" monthInput");
const yearInputElement = document.getElementById("yearInput");
const buttonElement = document.getElementById("button");
const yearErorElement = document.getElementById("yearEror");
const monthErorElement = document.getElementById("monthEror");
const dayErorElement = document.getElementById("dayEror");
const resultYearsElement = document.getElementById("resultYears");
const resultMonthsElement = document.getElementById("resultMonths");
const resultDaysElement = document.getElementById("resultDays");
const labelsErorElement = document.getElementsByTagName("label");
let result;

function isEmpty(value) {
  return value.length == 0;
}
function isValedyear(yearInput) {
  if (isEmpty(yearInput)) {
    return { isSuccess: false, error: "Year is required" };
  }
  if (yearInput > currentDate.getFullYear || yearInput < 0) {
    return { isSuccess: false, error: "Must be in the post" };
  }
  return { isSuccess: true };
}

function isValedmonth(monthInput) {
  if (isEmpty(monthInput)) {
    return { isSuccess: false, error: "Month is required" };
  }
  if (monthInput > 31 || monthInput < 0) {
    return { isSuccess: false, error: "Must be a valid month" };
  }
  return { isSuccess: true };
}

function isleapYear(yearInput) {
  return (
    (yearInput.value % 4 == 0 && yearInput.value % 100 != 0) ||
    yearInput.value % 400 == 0
  );
}

function deyOfmonth() {
  switch (parseInt(monthInputElement.value)) {
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    case 2:
      if (isleapYear(yearInputElement.value)) {
        return 28;
      } else return 29;
    default:
      return 31;
  }
}
function isValedday(dayInput) {
  if (isEmpty(dayInput)) {
    return { isSuccess: false, error: "Day is required" };
  }
  if (dayInput < 0 || dayInput > deyOfmonth()) {
    return { isSuccess: false, error: "Must be a valid day" };
  }
  return { isSuccess: true };
}

function addArore(errorElement, labelEror, inputElement, valid) {
  errorElement.innerText = valid.error;
  inputElement.classList.add("eror_input");
  labelEror.classList.add("eror_label");
}

function removeArore(errorElement, labelEror, inputElement) {
  errorElement.innerText = "";
  inputElement.classList.remove("eror_input");
  labelEror.classList.remove("eror_label");
}

function calcAge(day, month, year) {
  let userAge = year + "/" + month + "/" + day;

  let userDate = new Date(userAge).getTime();
  result = currentDate.getTime() - userDate;
  let newDate = new Date(result);
  return {
    day: newDate.getDate(),
    month: newDate.getMonth(),
    year: newDate.getFullYear() - 1970,
  };
}

// event function
buttonElement.onclick = function (e) {
  const validYear = isValedyear(yearInputElement.value);
  const validMonth = isValedmonth(monthInputElement.value);
  const validDay = isValedday(dayInputElement.value);

  if (validYear.isSuccess) {
    removeArore(yearErorElement, labelsErorElement[2], yearInputElement);
  } else {
    addArore(
      yearErorElement,
      labelsErorElement[2],
      yearInputElement,
      validYear
    );
  }
  if (validMonth.isSuccess) {
    removeArore(monthErorElement, labelsErorElement[1], monthInputElement);
  } else {
    addArore(
      monthErorElement,
      labelsErorElement[1],
      monthInputElement,
      validMonth
    );
  }
  if (validDay.isSuccess) {
    removeArore(dayErorElement, labelsErorElement[0], dayInputElement);
  } else {
    addArore(dayErorElement, labelsErorElement[0], dayInputElement, validDay);
  }

  if (validDay.isSuccess && validMonth.isSuccess && validYear.isSuccess) {
    let userAge = calcAge(
      dayInputElement.value,
      monthInputElement.value,
      yearInputElement.value
    );

    resultYearsElement.innerText = userAge.year;
    resultMonthsElement.innerText = userAge.month;
    resultDaysElement.innerText = userAge.day;
  }
};
