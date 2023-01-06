const clickBtn = document.querySelectorAll(".btn");
const calculate = document.querySelector(".calculate");
const expressionInput = document.querySelector(".expression-input");
const calculationInput = document.querySelector(".calculation-input");
const addOpr = document.querySelector(".addOpr");
const subtractOpr = document.querySelector(".subtractOpr");
const divideOpr = document.querySelector(".divideOpr");
const multiplyOpr = document.querySelector(".multiplyOpr");
const clear = document.querySelector(".clear");

let expression = [];
let strExpression = "";
let calculationVal = "";
let controlCalcInput = false;

clickBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let clickedBtn = e.target.innerText;
    let lastIdxExp = expression.length - 1;
    let lastExpNum = expression[lastIdxExp];
    if (
      lastExpNum === clickedBtn ||
      (expression.length === 0 &&
        (clickedBtn === "+" ||
          clickedBtn === "-" ||
          clickedBtn === "x" ||
          clickedBtn === "/"))
    ) {
      alert("Please provide correct operators!");
      return;
    }

    if (calculationVal && controlCalcInput) {
      controlCalcInput = false;
      strExpression = calculationVal;
    }
    if (lastIdxExp === -1) {
      expression.push(clickedBtn);
      strExpression += clickedBtn;
    } else if (
      clickedBtn === "+" ||
      clickedBtn === "-" ||
      clickedBtn === "x" ||
      clickedBtn === "/"
    ) {
      expression.push(clickedBtn);
      strExpression += clickedBtn;
    } else {
      if (
        lastExpNum === "+" ||
        lastExpNum === "-" ||
        lastExpNum === "x" ||
        lastExpNum === "/"
      ) {
        expression.push(clickedBtn);
        strExpression += clickedBtn;
      } else {
        lastExpNum += clickedBtn;
        expression[lastIdxExp] = lastExpNum;
        strExpression += clickedBtn;
      }
    }
    calculationInput.innerText = strExpression;
  });
});

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(num1, num2, operator) {
  let convertNum1 = Number(num1);
  let convertNum2 = Number(num2);

  switch (operator) {
    case "+":
      return add(convertNum1, convertNum2);
    case "-":
      return subtract(convertNum1, convertNum2);
    case "x":
      return multiply(convertNum1, convertNum2);
    case "/":
      return divide(convertNum1, convertNum2);
  }
}

function calculateExpression(exp) {
  let operators = [];
  let operands = [];
  for (let val of exp) {
    if (val === "x" || val === "+" || val === "-" || val === "/") {
      operands.push(val);
    } else {
      operators.push(val);
    }
  }
  if (operands.length + 1 !== operators.length) {
    alert("Please provide correct numbers!");
    return;
  }

  let total = operators[0];

  for (let i = 0; i < operands.length; i++) {
    for (let j = 1; j < operators.length; j++) {
      total = operate(total, operators[j], operands[i]);
      i++;
    }
  }
  return total;
}

calculate.addEventListener("click", () => {
  if (expression.length < 3) {
    alert("Please provide the operator or number to perform the calculation");
  } else {
    controlCalcInput = true;
    let result = calculateExpression(expression);
    if (result - Math.floor(result) !== 0) {
      result = result.toFixed(2);
    }
    calculationVal = result;

    expressionInput.innerText = strExpression;
    calculationInput.innerText = calculationVal;
  }
});

clear.addEventListener("click", () => {
  expression = [];
  strExpression = "";
  calculationVal = "";
  expressionInput.innerText = "";
  calculationInput.innerText = "";
});
