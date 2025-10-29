function add(a, b) {
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

let operand1 = "";
let operand2 = "";
let operator = "";
let firstOperatorSelected = false;
let divideByZeroErrorMessage = "ERROR: Divide by zero";

function operate(operand1, operand2, operator) {
  let result;
  switch (operator) {
    case "+":
      result = add(Number(operand1), Number(operand2));
      break;
    case "-":
      result = subtract(operand1, operand2);
      break;
    case "*":
      result = multiply(operand1, operand2);
      break;
    case "/":
      if (operand2 === "0") {
        return divideByZeroErrorMessage;
      }
      result = divide(operand1, operand2);
      break;
    default:
      result = NaN;
  }
  return Math.round(result * 1000) / 1000;
}

let displayDiv = document.querySelector("#display div");
let digitButtons = document.querySelectorAll(".digits");
let operatorButtons = document.querySelectorAll(".operator");
let clearButton = document.querySelector(".clear-button");

clearButton.addEventListener("click", (event) => {
  displayDiv.textContent = "";
  operand1 = "";
  operand2 = "";
  operator = "";
  firstOperatorSelected = false;
})

digitButtons.forEach((digitButton) => {
  digitButton.addEventListener("click", (event) => {
    if (displayDiv.textContent === divideByZeroErrorMessage) {
      return;
    }

    let buttonContent = event.target.textContent;
    displayDiv.textContent += buttonContent;

    if (!firstOperatorSelected) {
      operand1 += buttonContent;
    } else if (firstOperatorSelected) {
      operand2 += buttonContent;
    }
  })
})

operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener("click", (event) => {
    if (!operand1) {
      return;
    }

    let buttonContent = event.target.textContent;
    // need separate case for '=' since operator variable would be incorrectly overridden
    if (buttonContent === "=") {
      if (!(operand1 && operand2 && operator)) {
        return;
      }
      operand1 = operate(operand1, operand2, operator);
      displayDiv.textContent = operand1;
      if (operand1 === divideByZeroErrorMessage) {
        operand1 = "";
      }
      operand2 = "";
      operator = "";
      firstOperatorSelected = false;
      return;
    }
    else {
      if (operand1 && operand2 && operator) {
        operand1 = operate(operand1, operand2, operator);
        displayDiv.textContent = operand1;
        if (operand1 === divideByZeroErrorMessage) {
          operand1 = "";
        }
        operand2 = "";
      } else if (operator && !operand2) {
        return;
      }

      firstOperatorSelected = true;
      operator = buttonContent;
    }

    displayDiv.textContent += " " + operator + " ";
  })
})

