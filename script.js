//? Operators
let audioPlay = () => {
  let audioY = new Audio("assets/audioY.wav");
  audioY.currentTime = 0;
  audioY.play();
};
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
      this.currentValue = this.previousValue;
      this.previousValue = ``;
      this.previousSign = ``;
    }
  },
  process() {
    let temporaryCur = Number(this.currentValue);
    let temporaryPre = Number(this.previousValue);
    let result = `${operators[this.previousSign](temporaryPre, temporaryCur)}`;
    result = this.fixFraction(result);
    if (!isFinite(result)) {
      this.currentValue = this.previousValue;
      this.previousValue = ``;
      this.previousSign = ``;
      DOMResult.renderDOM();
      return;
    }
    this.previousValue = ``;
    this.previousSign = ``;
    this.currentValue = result;
  },
  fixFraction(value) {
    const decimalIndex = value.indexOf(".");
    if (decimalIndex === -1 || value.length - decimalIndex - 1 < 6) {
      return value;
    }
    value = `${Number(value).toFixed(3)}`;
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
    audioPlay();
    if (user.currentValue === "-0" && user.previousValue !== "") {
      user.previousSign = `+`;
      DOMResult.renderDOM();
      return;
    }
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
    audioPlay();

    if (
      user.currentValue !== "" &&
      user.currentValue !== "0" &&
      user.currentValue !== "-0"
    ) {
      user.operate();
      DOMResult.renderDOM();
    }
    if (user.previousValue === "") {
      user.previousValue = user.currentValue;
      user.currentValue = `0`;
      user.previousSign = `-`;
      DOMResult.renderDOM();
      return;
    }
    if (user.currentValue === "0" && user.previousSign === "-") {
      user.currentValue = `-${user.currentValue}`;
      user.previousSign = `-`;

      DOMResult.renderDOM();
      return;
    }

    if (user.currentValue === "0") {
      user.previousSign = `-`;

      DOMResult.renderDOM();
      return;
    }

    if (user.currentValue === "-0") {
      user.currentValue = `0`;

      DOMResult.renderDOM();
      return;
    }
  },
  divideFunc() {
    audioPlay();
    if (user.currentValue === "-0" && user.previousValue !== "") {
      user.previousSign = `/`;
      DOMResult.renderDOM();
      return;
    }
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
    audioPlay();
    if (user.currentValue === "-0" && user.previousValue !== "") {
      user.previousSign = `*`;
      DOMResult.renderDOM();
      return;
    }
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
    audioPlay();

    if (user.currentValue === "0" || user.currentValue === "0.") {
      user.operateResult();
      DOMResult.renderDOM();
    } else {
      user.operate();
      DOMResult.renderDOM();
    }
  },
  dotFunc() {
    audioPlay();

    if (!user.currentValue.includes(".")) {
      user.currentValue += `.`;
      DOMResult.renderDOM();
    }
  },
  clearFunc() {
    audioPlay();

    user.previousValue = ``;
    user.previousSign = ``;
    user.currentValue = `0`;
    DOMResult.renderDOM();
  },
  deleteFunc() {
    audioPlay();

    const decimalIndex = user.currentValue.indexOf(".");
    if (
      user.currentValue &&
      user.currentValue !== "0" &&
      user.currentValue.length !== 1
    ) {
      if (
        decimalIndex !== -1 &&
        user.currentValue.length - decimalIndex - 1 == 1
      ) {
        user.currentValue = user.currentValue.slice(
          0,
          user.currentValue.length - 2
        );
        DOMResult.renderDOM();

        return;
      } else {
        user.currentValue = user.currentValue.slice(
          0,
          user.currentValue.length - 1
        );
        DOMResult.renderDOM();
      }
    } else {
      user.currentValue = `0`;
      DOMResult.renderDOM();
    }
  },
  numberFunc(item) {
    audioPlay();

    let thisNumber = item.target.getAttribute("data-number");
    if (!user.currentValue || user.currentValue === "0") {
      user.currentValue = thisNumber;
      DOMResult.renderDOM();
      return;
    }

    if (!user.currentValue || user.currentValue === "-0") {
      user.currentValue = `-${thisNumber}`;
      DOMResult.renderDOM();
      return;
    } else {
      user.currentValue += thisNumber;
      DOMResult.renderDOM();
      return;
    }
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

document.addEventListener("keydown", (e) => {
  if (!isNaN(Number(e.key)) && e.key !== " ") {
    audioPlay();

    let thisNumber = e.key;
    if (!user.currentValue || user.currentValue === "0") {
      user.currentValue = thisNumber;
      DOMResult.renderDOM();
      return;
    }

    if (!user.currentValue || user.currentValue === "-0") {
      user.currentValue = `-${thisNumber}`;
      DOMResult.renderDOM();
      return;
    } else {
      user.currentValue += thisNumber;
      DOMResult.renderDOM();
      return;
    }
  }
  if (e.key === "=" || e.key === "Enter") {
    eventHandlers.equalsFunc();
  }
  if (e.key === "Backspace") {
    eventHandlers.deleteFunc();
  }
  if (e.key === "*") {
    eventHandlers.multiplyFunc();
  }
  if (e.key === "/") {
    eventHandlers.divideFunc();
  }
  if (e.key === "+") {
    eventHandlers.addFunc();
  }
  if (e.key === "-") {
    eventHandlers.subtractFunc();
  }
  if (e.key === "." || e.key === ",") {
    eventHandlers.dotFunc();
  }
  if (e.key === "Delete") {
    eventHandlers.clearFunc();
  }
});

renderFunction();
