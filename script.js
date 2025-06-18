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