let firstNumber = "";
let secondNumber = "";
let operator = null;

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
  return b !== 0 ? a / b : "Error";
}

function operate(operator, a, b) {
  if (operator === "+") return addition(a, b);
  if (operator === "-") return subtract(a, b);
  if (operator === "*") return multiply(a, b);
  if (operator === "/") return divide(a, b);
  return "Invalid";
}

function updateDisplay(content = null) {
  const display = document.getElementById("display");
  if (content !== null) {
    display.textContent = content;  // Direct result or error
    return;
  }

  if (operator === null) {
    display.textContent = firstNumber;
  } else if (secondNumber === "") {
    display.textContent = firstNumber + " " + operator;
  } else {
    display.textContent = firstNumber + " " + operator + " " + secondNumber;
  }
}

function handleNumberInput(digit) {
  if (operator === null) {
    firstNumber += digit;
  } else {
    secondNumber += digit;
  }
  updateDisplay();
}

function handleOperatorInput(selectedOperator) {
  if (firstNumber !== "") {
    operator = selectedOperator;
    updateDisplay();
  }
}

function handleEqualInput() {
  if (firstNumber !== "" && secondNumber !== "" && operator !== null) {
    const result = operate(operator, Number(firstNumber), Number(secondNumber));
    updateDisplay(result);
    firstNumber = result.toString();
    secondNumber = "";
    operator = null;
  } else {
    updateDisplay("Incomplete");
  }
}

function handleClear() {
  firstNumber = "";
  secondNumber = "";
  operator = null;
  updateDisplay("");
}

const buttons = document.querySelectorAll(".button");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (!isNaN(value)) {
      handleNumberInput(value);
    } else if (value === "+" || value === "-" || value === "*" || value === "/") {
      handleOperatorInput(value);
    } else if (value === "=") {
      handleEqualInput();
    } else if (value === "Clear") {
      handleClear();
    }
  });
});
