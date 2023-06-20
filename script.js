//? Operators

const operators = {
  "+": (item1, item2) => item1 + item2,
  "-": (item1, item2) => item1 - item2,
  "*": (item1, item2) => item1 * item2,
  "/": (item1, item2) => item1 / item2,
};

//* User Choices

const user = {
  previousValue: ``,
  previousSign: ``,
  currentValue: `0`,
  operate() {
    if (this.previousSign && operators[this.previousSign]) {
      this.process();
    }
  },
  operateResult() {
    if (this.previousSign && operators[this.previousSign]) {
      this.process();
      this.currentValue = this.previousValue;
      this.previousValue = ``;
      this.previousSign = ``;
    }
  },
  process() {
    let temporaryCur = Number(this.currentValue);
    let temporaryPre = Number(this.previousValue);
    let result = `${operators[this.previousSign](temporaryPre, temporaryCur)}`;
    result = this.checkFraction(result);
    this.previousValue = ``;
    this.previousSign = ``;
    this.currentValue = result;
  },
  checkFraction(value) {
    const decimalIndex = value.indexOf(".");
    if (decimalIndex === -1 || value.length - decimalIndex - 1 < 6) {
      return value;
    }
    value = `${Number(value).toFixed(1)}`;
    return value;
  },
};

//! DOM Section

const DOMResult = {
  previousDOM: document.querySelector(".result-previous"),
  currentDOM: document.querySelector(".result-number"),
  previousSignDOM: document.querySelector(".result-sign"),
  renderDOM() {
    this.currentDOM.innerText = user.currentValue;
    this.previousDOM.innerText = user.previousValue;
    this.previousSignDOM.innerText = user.previousSign;
  },
  renderResult() {
    this.currentDOM.innerText = user.currentValue;
    this.previousDOM.innerText = ``;
    this.previousSignDOM.innerText = ``;
  },
};

const DOMButtons = {
  numbers: [
    document.querySelector('[data-number="1"]'),
    document.querySelector('[data-number="2"]'),
    document.querySelector('[data-number="3"]'),
    document.querySelector('[data-number="4"]'),
    document.querySelector('[data-number="5"]'),
    document.querySelector('[data-number="6"]'),
    document.querySelector('[data-number="7"]'),
    document.querySelector('[data-number="8"]'),
    document.querySelector('[data-number="9"]'),
    document.querySelector('[data-number="0"]'),
  ],
  operators: [
    document.querySelector('[data-sign="divide"]'),
    document.querySelector('[data-sign="multiply"]'),
    document.querySelector('[data-sign="subtract"]'),
    document.querySelector('[data-sign="add"]'),
  ],
  equalsDOM: document.querySelector('[data-sign="equals"]'),
  dotDOM: document.querySelector('[data-sign="dot"'),
  clearDOM: document.querySelector('[data-deletion="clear"'),
  deleteDOM: document.querySelector('[data-deletion="delete"'),
};

//TODO\\ Event Listener Section

const eventHandlers = {
  addFunc() {
    if (user.currentValue !== "" && user.currentValue !== "0") {
      user.operate();
      DOMResult.renderResult();
    }
    if (user.previousValue === "") {
      user.previousValue = user.currentValue;
      user.currentValue = `0`;
      user.previousSign = `+`;
      DOMResult.renderDOM();
      return;
    }
    if (
      user.currentValue !== "" &&
      user.currentValue === "0" &&
      !user.previousValue.includes(".")
    ) {
      user.previousSign = `+`;
      DOMResult.renderDOM();
    }
  },
  subtractFunc() {
    if (user.currentValue !== "" && user.currentValue !== "0") {
      user.operate();
      DOMResult.renderResult();
    }
    if (user.previousValue === "") {
      user.previousValue = user.currentValue;
      user.currentValue = `0`;
      user.previousSign = `-`;
      DOMResult.renderDOM();
      return;
    }
    if (user.currentValue !== "" && user.currentValue === "0") {
      user.previousSign = `-`;
      DOMResult.renderDOM();
    }
  },
  divideFunc() {
    if (user.currentValue !== "" && user.currentValue !== "0") {
      user.operate();
      DOMResult.renderResult();
    }
    if (user.previousValue === "") {
      user.previousValue = user.currentValue;
      user.currentValue = `0`;
      user.previousSign = `/`;
      DOMResult.renderDOM();
      return;
    }
    if (user.currentValue !== "" && user.currentValue === "0") {
      user.previousSign = `/`;
      DOMResult.renderDOM();
    }
  },
  multiplyFunc() {
    if (user.currentValue !== "" && user.currentValue !== "0") {
      user.operate();
      DOMResult.renderResult();
    }
    if (user.previousValue === "") {
      user.previousValue = user.currentValue;
      user.currentValue = `0`;
      user.previousSign = `*`;
      DOMResult.renderDOM();
      return;
    }
    if (user.currentValue !== "" && user.currentValue === "0") {
      user.previousSign = `*`;
      DOMResult.renderDOM();
    }
  },
  equalsFunc() {
    user.operate();
    DOMResult.renderDOM();
  },
  dotFunc() {
    if (!user.currentValue.includes(".")) {
      user.currentValue += `.`;
      DOMResult.renderDOM();
    }
  },
  clearFunc() {
    user.previousValue = ``;
    user.previousSign = ``;
    user.currentValue = `0`;
    DOMResult.renderDOM();
  },
  deleteFunc() {
    if (
      user.currentValue &&
      user.currentValue !== "0" &&
      user.currentValue.length !== 1
    ) {
      user.currentValue = user.currentValue.slice(
        0,
        user.currentValue.length - 1
      );
      DOMResult.renderDOM();
    } else {
      user.currentValue = `0`;
      DOMResult.renderDOM();
    }
  },
  numberFunc(item) {
    let thisNumber = item.target.getAttribute("data-number");
    if (!user.currentValue || user.currentValue === "0") {
      user.currentValue = thisNumber;
    } else {
      user.currentValue += thisNumber;
    }
    DOMResult.renderDOM();
  },
};

function renderFunction() {
  DOMResult.renderDOM();
  DOMButtons.clearDOM.addEventListener("click", eventHandlers.clearFunc);
  DOMButtons.deleteDOM.addEventListener("click", eventHandlers.deleteFunc);
  DOMButtons.numbers.forEach((number) => {
    number.addEventListener("click", eventHandlers.numberFunc);
  });
  DOMButtons.operators[0].addEventListener("click", eventHandlers.divideFunc);
  DOMButtons.operators[1].addEventListener("click", eventHandlers.multiplyFunc);
  DOMButtons.operators[2].addEventListener("click", eventHandlers.subtractFunc);
  DOMButtons.operators[3].addEventListener("click", eventHandlers.addFunc);
  DOMButtons.equalsDOM.addEventListener("click", eventHandlers.equalsFunc);
  DOMButtons.dotDOM.addEventListener("click", eventHandlers.dotFunc);
}

renderFunction();
