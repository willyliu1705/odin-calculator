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
let operandOneFilled = false;
let operatorSelected = false;

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

    if (!operandOneFilled) {
      operand1 += Number(buttonContent);
    } else if (operatorSelected) {
      operand2 += Number(buttonContent);
    }
  })
})

operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener("click", (event) => {
    operandOneFilled = true;
    operatorSelected = operatorSelected ? false : true;
    let buttonContent = event.target.textContent;

    if (buttonContent === "=") {
      operand1 = operate(operand1, operand2, operator);
      displayDiv.textContent = operand1;
      operand2 = "";
      operatorSelected = false;
      return;
    }
    else {
      operator = buttonContent;
    }

    switch (operator) {
      case "AC":
        displayDiv.textContent = "";
        operand1 = "";
        operand2 = "";
        operator = "";
        operandOneFilled = false;
        operatorSelected = false;
        break;
      default:
        displayDiv.textContent += " " + operator + " "
        break;
    }
  })
})

