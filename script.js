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

let operand1;
let operand2;
let operator;
let operandOneFilled = false;
// TODO: need to also add operandTwFilled so I know when to evaluate the pair of numbers

function operate(operand1, operand2, operator) {
  let result;
  switch (operator) {
    case "+":
      result = add(operand1, operand2);
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
      operand1 = Number(buttonContent);
    } else {
      operand2 = Number(buttonContent);
    }
  })
})

operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener("click", (event) => {
    let buttonContent = event.target.textContent;
    switch (buttonContent) {
      case "AC":
        // TODO
        break;
      case "=":
        // TODO
        break;
      default:
        operator = buttonContent;
    }
  })
})

