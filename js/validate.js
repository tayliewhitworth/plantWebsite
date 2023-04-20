let phoneRegex = /^\+?[1-9]\d{1,14}$/;
let emailRegex = /[\w]*@[\w]*.{1}(com|gov|edu|io|net){1}/;
let zipCodeRegex = /(?<zip1>\d{5})([-]?(?<zip2>\d{4}))?(?<ERROR>.+)?/;

const stateAbbreviations = [
  "AL",
  "AK",
  "AS",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FM",
  "FL",
  "GA",
  "GU",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MH",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "MP",
  "OH",
  "OK",
  "OR",
  "PW",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VI",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

let form = null;
let successMsg = null;
function initValidation(formId, successId) {
  form = document.getElementById(formId);
  successMsg = document.getElementById(successId);

  let inputs = document.querySelectorAll("input");
  for (let input of inputs) {
    input.addEventListener("change", inputChanged);
  }
  form.addEventListener("submit", submitForm);
}

function inputChanged(e) {
  let element = e.currentTarget;
  validateForm();
  element.classList.add("was-validated");
}

function submitForm(e) {
  console.log("submitting");
  let form = e.currentTarget;
  e.preventDefault();
  e.stopPropagation();

  validateForm();

  if (!form.checkValidity()) {
    let inputs = form.querySelectorAll("input");
    inputs.forEach((input) => input.classList.add("was-validated"));
  } else {
    form.style.display = "none";
    let successMsg = document.getElementById("success");
    successMsg.style.display = "block";
  }
}

function validateForm() {
  checkRequired("firstName", "First Name is Required");
  checkRequired("lastName", "Last Name is Required");
  checkRequired("address", "Address is Required");
  checkRequired("city", "City is Required");

  if (checkRequired("state", "State is Required")) {
    validateState("state", "Not a valid State, enter two digit code e.g., UT");
  }

  if (checkRequired("email", "Email Address is required")) {
    checkFormat("email", "email format is bad", emailRegex);
  }
  if (checkRequired("zip", "Zip Code is Required")) {
    checkFormat(
      "zip",
      `malformed zip-code, please use either "#####", or "#####-#### format.`,
      zipCodeRegex
    );
  }
  if (checkRequired("phone", "Phone is required")) {
    checkFormat("phone", "phone format is bad", phoneRegex);
  }
  checkRequired("newspaper", "you must select at least one!");
}

function validateState(id, msg) {
  let el = document.getElementById(id);
  let valid = false;
  //TODO
  //get value from el, and convert to upper case
  //check whether the value is in the stateAbbreviations array
  let value = el.value.toUpperCase();

  if (stateAbbreviations.includes(value)) {
    valid = true;
  }

  setElementValidity(id, valid, msg);
}

function checkFormat(id, msg, regex) {
  //this function applies a regex to determine if element is valid
  //TODO-get element value and test it against the regex that was passed in
  let el = document.getElementById(id);
  let value = el.value;

  let valid = regex.test(value);

  setElementValidity(id, valid, msg);
  return valid;
}

function checkRequired(id, message) {
  let el = document.getElementById(id);
  let valid = false;
  let type = el.type;
  switch (type) {
    case "text":
      // case "password":
      //TODO-check if input has a 'value', set valid to true if so, false if not
      if (el.value.trim() !== "") {
        valid = true;
      } else {
        valid = false;
      }
      break;

    case "checkbox":
      // case "radio":
      let checks = document.querySelectorAll(`input[name="${el.name}"]`);
      checks.forEach((check) => {
        if (check.checked) {
          valid = true;
        }
      });
      break;
  }
  setElementValidity(id, valid, message);

  return valid;
}

function setElementValidity(id, valid, message) {
  let el = document.getElementById(id);
  let errMsg = el.nextElementSibling

  if (valid) {
    //it has a value

    el.setCustomValidity(""); //sets to no error message and field is valid
    errMsg.innerText = ''
    
  } else {
    el.setCustomValidity(message); //sets error message and field gets 'invalid' stat

    //TODO  insert or remove message in error div for element
    errMsg.innerText = message

  }
}
