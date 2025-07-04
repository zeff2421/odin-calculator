let first_operand = '';
let second_operand = '';
let operator = null;
let answer = '';


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
    if (b === 0) {
        alert("Can't divide by zero");
        return;
    }
    return a / b
}

function operate(oper, a, b) {
    a = Number(a);
    b = Number(b);

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
        if (operator == null && first_operand.includes('.')) return;
        if (operator != null && second_operand.includes('.')) return;
    }

    if (operator === null || operator === '') {
        // Ensure maximum digits on screen are 13
        if (first_operand.length === 13) return;

        if (display.textContent === '0') {
            first_operand = key;
        } else {
            first_operand += key;
        }
        display.textContent = first_operand;
    } else {
        // Ensure maximum digits on screen are 13
        if (second_operand.length === 13) return;
        
        if (display.textContent === '0') {
            second_operand = key;
        } else {
            second_operand += key;
        }
        display.textContent += key;
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
        for (const op of operateButtons) {
            if (display.textContent.includes(op.textContent) && first_operand != '' && second_operand != '') {
                first_operand = operate(operator, first_operand, second_operand);
                if (typeof(first_operand) === "number") {
                    first_operand = first_operand.toString();
                }
                display.textContent = first_operand;
                second_operand = '';
            }
        }
        
        // Convert the button NodeList to an array
        let opButtArrays = Array.from(operateButtons);
        let operatorList = []
        let lastCharOnScreen = display.textContent[display.textContent.length -1];

        for (let i = 0; i < opButtArrays.length; i++) {
            operatorList.push(opButtArrays[i].textContent)
        }

        if (operatorList.includes(lastCharOnScreen) && first_operand !== '') {
            operator = clicked;
            display.textContent = display.textContent.slice(0, -1);
            display.textContent += button.textContent;
        } else if (!operatorList.includes(lastCharOnScreen) && first_operand !== '') {
            operator = clicked;
            display.textContent += button.textContent
        }
    })
});

let equalButton = document.getElementById("equal");
equalButton.addEventListener('click', () => {
    if (operator === null || first_operand === '' || second_operand === '') return;
    answer = operate(operator, first_operand, second_operand);
    if (answer === undefined) {
        display.textContent = '0';
        first_operand = '';
        second_operand = '';
        operator = null;
        answer = '';
        return;
    }
    if (typeof(answer) === "number") {
        answer = answer.toString();
    }
    if (answer.length > 13) {
        answer = Number(answer).toExponential(2).toString();
    }
    display.textContent = answer;

    // Update variables
    first_operand = answer;
    second_operand = '';
    operator = '';
    answer = '';
});

let clear = document.getElementById("clear");
clear.addEventListener('click', () => {
    first_operand = '';
    second_operand = '';
    operator =  null;
    display.textContent = 0;
});

let del = document.getElementById("del");
del.addEventListener('click', () => {
    let hasOperator = false;

    if (display.textContent !== '0' && answer === '') {
        if (operator === null) {
            first_operand = first_operand.slice(0, -1);
        } else {
            second_operand = second_operand.slice(0, -1);
        }
    } else if (display.textContent !== '0' && answer !== '') {
        answer = answer.slice(0, -1);
    }

    display.textContent = display.textContent.slice(0, -1);

    // Checks if there is an operator in the display
    for (const op of operateButtons) {
        if (display.textContent.includes(op.textContent)) {
            hasOperator = true;
            break;
        }
    }
    
    if (!hasOperator)
        operator = null;

    if (display.textContent === '') {
        display.textContent = '0';
    }
});