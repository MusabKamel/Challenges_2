const currentYear = new Date().getFullYear();
const currentDate = new Date().getTime();
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

function isValedyear(yearInput) {
  if (yearInput > currentYear || yearInput <= 0) {
    return { isSuccess: false, error: "Must be in the post" };
  } else {
    return { isSuccess: true };
  }
}

function isValedmonth(monthInput) {
  if (monthInput > 31 || monthInput <= 0) {
    return { isSuccess: false, error: "Must be a valid month" };
  } else {
    return { isSuccess: true };
  }
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
  if (dayInput <= 0 || dayInput > deyOfmonth()) {
    return { isSuccess: false, error: "Must be a valid day" };
  } else {
    return { isSuccess: true };
  }
}

function reualt() {
  let userAge =
    yearInputElement.value +
    "/" +
    monthInputElement.value +
    "/" +
    dayInputElement.value;

  let userDate = new Date(userAge);
  let result = currentDate - userDate;

  let ageUserYear = new Date(result).getFullYear();
  let ageUserMonth = new Date(result).getMonth();
  let ageUserDay = new Date(result).getDate();

  resultYearsElement.innerText = ageUserYear - 1970;
  resultMonthsElement.innerText = ageUserMonth;
  resultDaysElement.innerText = ageUserDay;
}

buttonElement.onclick = function (e) {
  let validYear = isValedyear(yearInputElement.value);
  let validMonth = isValedmonth(monthInputElement.value);
  let validDay = isValedday(dayInputElement.value);

  function addArore(span, labelsErorElement, yearInputElement, valid) {
    span.innerText = valid.error;
    span.classList.add("span");
    yearInputElement.classList.add("eror_input");
    labelsErorElement.classList.add("eror_label");
  }

  function removeArore(span, labelsErorElement, yearInputElement) {
    span.innerText = "";
    span.classList.remove("span");
    yearInputElement.classList.remove("eror_input");
    labelsErorElement.classList.remove("eror_label");
  }

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
    reualt();
  }
};
