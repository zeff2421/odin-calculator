first_operand = ''
second_operand = ''
operator = null

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function operate(oper, a, b) {
    if (oper === '+') {
        return add(a, b);
    } else if (oper === '-') {
        return subtract(a, b);
    } else if (oper === '*') {
        return multiply(a, b);
    } else if (oper === '/') {
        return divide(a, b);
    }
}

function populateDisplay(key, display) {
    // Ensure the decimal point comes in once
    if (key === '.') {
        if (first_operand.includes('.')) return;
        if (second_operand.includes('.')) return;
    }

    // Ensure maximum digits on screen are 13
    if (first_operand.length === 13 || second_operand.length === 13) return;

    if (operator === null) {
        if (display.textContent === '0') {
            first_operand = key;
        } else {
            first_operand += key;
        }
        display.textContent = first_operand;
    } else {
        if (display.textContent === '0') {
            second_operand = key;
        } else {
            second_operand += key;
        }
        display.textContent = second_operand;
    }
}



let digitButtons = document.querySelectorAll(".number");
let display = document.querySelector(".output");

digitButtons.forEach(button => {
    button.addEventListener('click', () => {
        let buttonClicked = button.textContent;
        populateDisplay(buttonClicked, display);
    })
});

let operateButtons = document.querySelectorAll(".operator");
operateButtons.forEach(button => {
    button.addEventListener('click', () => {
        let clicked = button.value;
        operator = clicked;

    })
});