let firstNumber = 0;
let secondNumber = 0;
let operator = "+";

function addition(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

// 👇 Cleaned: No calculation inside this function
function operate(operator, a, b) {
  if (operator === "+") {
    return addition(a, b);
  } else if (operator === "-") {
    return subtract(a, b);
  } else if (operator === "*") {
    return multiply(a, b);
  } else {
    return divide(a, b);
  }
}

// 👇 All display logic goes here
function populateTheDisplay(first, second, op) {
  let firstNumber = Number(first);
  let secondNumber = Number(second);
  let result = operate(op, firstNumber, secondNumber);
  console.log(result);
}
