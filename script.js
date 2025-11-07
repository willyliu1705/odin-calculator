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
let resultOfEarlierOperation = false;

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

      // this is a weird edge case where we can get -0 and +0
      // which should just functionally be 0
      if (result === 0) {
        result = 0;
      }
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
let deleteButton = document.querySelector(".delete-button");

function resetCalculator() {
  displayDiv.textContent = "";
  operand1 = "";
  operand2 = "";
  operator = "";
  firstOperatorSelected = false;
  resultOfEarlierOperation = false;
}

clearButton.addEventListener("click", (event) => {
  resetCalculator();
})

function processDeleteInput() {
  if (resultOfEarlierOperation) {
    resetCalculator();
    return;
  }

  if (operand2 !== "") {
    operand2 = operand2.substring(0, operand2.length - 1);
  } else if (operator !== "") {
    operator = "";
    firstOperatorSelected = false;
  } else if (operand1 !== "") {
    operand1 = operand1.substring(0, operand1.length - 1);
  } else {
    displayDiv.textContent = "";
    return;
  }
  displayDiv.textContent = operand1 + " " + operator + " " + operand2;
}

deleteButton.addEventListener("click", (event) => {
  processDeleteInput();
})

document.addEventListener("keydown", (event) => {
  if (event.key === "Backspace") {
    processDeleteInput();
  }
});

function checkDecimalInOperand(string) {
  if (string.includes(".")) {
    return true;
  }
  return false;
}

function processDigitInput(buttonContent) {
  if (resultOfEarlierOperation && !operator) {
    operand1 = buttonContent;
    displayDiv.textContent = buttonContent;
    resultOfEarlierOperation = false;
    return;
  } else if (buttonContent === "." && checkDecimalInOperand(String(operand1)) && !firstOperatorSelected) {
    return;
  } else if (buttonContent === "." && checkDecimalInOperand(String(operand2)) && firstOperatorSelected) {
    return;
  }
  displayDiv.textContent += buttonContent;

  if (!firstOperatorSelected) {
    operand1 += buttonContent;
  } else if (firstOperatorSelected) {
    operand2 += buttonContent;
  }
}

digitButtons.forEach((digitButton) => {
  digitButton.addEventListener("click", (event) => {
    if (displayDiv.textContent === divideByZeroErrorMessage) {
      return;
    }

    let buttonContent = event.target.textContent;
    processDigitInput(buttonContent);
  });
});

document.addEventListener("keydown", (event) => {
  if (displayDiv.textContent === divideByZeroErrorMessage) {
    return;
  }

  let validDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
  if (validDigits.includes(event.key)) {
    processDigitInput(event.key);
  }
});

function processOperatorInput(buttonContent) {
  // need separate case for '=' since operator variable would be incorrectly overridden
  if (buttonContent === "=" || buttonContent === "Enter") {
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
    resultOfEarlierOperation = true;
    return;
  }
  else {
    if ((operand1 || operand1 === 0) && (operand2 || operand2 === 0) && operator) {
      operand1 = operate(operand1, operand2, operator);
      displayDiv.textContent = operand1;
      if (operand1 === divideByZeroErrorMessage) {
        operand1 = "";
      }
      operand2 = "";
      resultOfEarlierOperation = true;
    } else if (operator && !operand2) {
      if (operator === buttonContent) {
        return;
      } else {
        firstOperatorSelected = true;
        operator = buttonContent;
        // remove previous operator and replace with newly selected one
        let originalString = displayDiv.textContent;
        let modifiedArrayOfOriginalString = [];
        modifiedArrayOfOriginalString.push(originalString.split(" ")[0])
        modifiedArrayOfOriginalString.push(operator);
        displayDiv.textContent = modifiedArrayOfOriginalString.join(" ") + " "
        return;
      }
    }

    firstOperatorSelected = true;
    operator = buttonContent;
  }

  displayDiv.textContent += " " + operator + " ";
}

operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener("click", (event) => {
    if (operand1 === "") {
      return;
    }
    resultOfEarlierOperation = false;

    let buttonContent = event.target.textContent;
    processOperatorInput(buttonContent);
  });
});

document.addEventListener("keydown", (event) => {
  if (operand1 === "") {
    return;
  }
  resultOfEarlierOperation = false;

  let validOperators = ["+", "-", "*", "/", "=", "Enter"];
  if (validOperators.includes(event.key)) {
    processOperatorInput(event.key);
  }
});

