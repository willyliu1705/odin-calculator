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
let secondOperatorSelected = false;

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
      result = divide(operand1, operand2);
      break;
    default:
      result = NaN;
  }
  return result;
}

let displayDiv = document.querySelector("#display div");
let digitButtons = document.querySelectorAll(".digits");
let operatorButtons = document.querySelectorAll(".operator");

digitButtons.forEach((digitButton) => {
  digitButton.addEventListener("click", (event) => {
    let buttonContent = event.target.textContent;
    displayDiv.textContent += buttonContent;

    if (!firstOperatorSelected) {
      operand1 += Number(buttonContent);
    } else if (firstOperatorSelected && !secondOperatorSelected) {
      operand2 += Number(buttonContent);
    }
  })
})

operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener("click", (event) => {
    let buttonContent = event.target.textContent;
    // need separate case for '=' since operator variable would be incorrectly overridden
    if (buttonContent === "=") {
      if (!(operand1 && operand2 && operator)) {
        return;
      }
      operand1 = operate(operand1, operand2, operator);
      displayDiv.textContent = operand1;
      operand2 = "";
      operator = "";
      firstOperatorSelected = false;
      secondOperatorSelected = false;
      return;
    }
    else {
      if (firstOperatorSelected) {
        /* 
        TODO: remove secondOperatorSelected and just check if 
        operand1 && operand2 && operator are all filled in.
        This will make writing the logic for consecutive operator clicks easier.
        */
        secondOperatorSelected = true;
      }
      firstOperatorSelected = true;
      operator = buttonContent;
    }

    switch (operator) {
      case "Clear":
        displayDiv.textContent = "";
        operand1 = "";
        operand2 = "";
        operator = "";
        firstOperatorSelected = false;
        secondOperatorSelected = false;
        break;
      default:
        if (secondOperatorSelected) {
          operand1 = operate(operand1, operand2, operator);
          displayDiv.textContent = operand1 + " " + operator + " ";
          operand2 = "";
          firstOperatorSelected = true;
          secondOperatorSelected = false;
        } else {
          displayDiv.textContent += " " + operator + " "
        }
        break;
    }
  })
})

