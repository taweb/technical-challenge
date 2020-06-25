//Toggles sentence colour
function colorToggle() {
    sentence.classList.toggle('colored');
}

function getResult(first, second, operation) {
    let result = 0;
    if (operation === "add") {
        result = first + second;
    }
    if (operation === "subtract") {
        result = first - second;
    }
    if (operation === "multiply") {
        result = first * second;
    }
    if (operation === "divide") {
        result = first / second;
    }    
    return Math.round(result*100)/100;
}

let lastError = false;

//Calculates simple maths
function calc(e) {
    e.preventDefault();
    calcError.classList.add('invisible');    
    calcError.innerText = "";
    answer.classList.add('invisible');
    answer.innerText = "";

    if (!firstNum.value || !secondNum.value) {
        calcError.classList.remove('invisible');
        calcError.innerText = "Please enter both numbers above to get this calculator started!"
        return;
    }

    const operation = radios.find(radio => radio.checked).id;
    answer.classList.remove('invisible');
    answer.innerText = `= ${getResult(+firstNum.value, +secondNum.value, operation)}`
}

const toggleButton = document.querySelector('.toggle');
const sentence = document.getElementById('sentence');

const answer = document.getElementById('answer');
const firstNum = document.getElementById('firstNum');
const secondNum = document.getElementById('secondNum');
const radios = [...document.querySelectorAll('[name="calculator"]')]
const calcError = document.querySelector('.error');


toggleButton.addEventListener('click', colorToggle);

document.calculator.addEventListener('submit', calc);