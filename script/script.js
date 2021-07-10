const screen = document.getElementById('display');
const topScreen = document.getElementById('topDisplay');
const buttonValue = document.querySelectorAll('.input-button')
const numBut = document.querySelectorAll('.numberButton');
const operationBut = document.querySelectorAll('.operationBut');
const squareBut = document.querySelector('#squareBut');
const sqrtBut = document.querySelector('#sqrtBut');
const oneDividedBut = document.querySelector('#oneDivided');
const percentBut = document.querySelector('#percentBut');
const posNegToggler = document.querySelector('#posNegToggle');
const equalBut = document.querySelector('#equalBut');
const acBut = document.querySelector('#ac');
const delBut = document.querySelector('#del');
const dotBut = document.getElementById('dot');

window.addEventListener('load', acFunc);

var clickedBut = null, firstValue = null, secondValue = null, operator = null;




acBut.addEventListener('click', acFunc);

function acFunc() {
    topScreen.value = '';
    screen.value = '0';
    firstValue = null;
    secondValue = null;
}

delBut.addEventListener('click', () => {
    screen.value = screen.value.slice(0, (screen.value.length - 1));
})


dotBut.addEventListener('click', dotFunc);
function dotFunc(event) {

    let anyDot = null;

    if (screen.value != '') {
        for (let i = 0; i < screen.value.toString().length; i++) {
            k = screen.value.toString().slice(i, (i + 1));

            if (k == '.') { anyDot = true; }
        }
        if (anyDot != true) {
            clickedBut = event.target.innerText;
            screen.value += clickedBut;
        }
    } else {
        clickedBut = event.target.innerText;
        screen.value = '0' + clickedBut;
    }
}




numBut.forEach(element => {
    element.addEventListener('click', numButFunc);
})

function numButFunc(event) {
    if (screen.value === '0') { screen.value = ''; }
    if (screen.value.length < 20) {
        clickedBut = event.target.innerText;
        screen.value += clickedBut;
    }
}



operationBut.forEach(element => {
    element.addEventListener('click', operation);
})
function operation(event) {
    if (screen.value != '' && topScreen.value == '') {
        firstValue = parseFloat(screen.value);
        operator = event.target.innerText;
        topScreen.value = screen.value + " " + event.target.innerText;

        screen.value = '';


    } else if (screen.value == '' && topScreen.value != '') {
        operator = event.target.innerText;
        topScreen.value = topScreen.value.slice(0, topScreen.value.length - 1) + event.target.innerText;

    } else if (screen.value != '' && topScreen.value != '') {
        equalFunc();
        firstValue = parseFloat(screen.value);
        operator = event.target.innerText;
        topScreen.value = screen.value + " " + event.target.innerText;

        screen.value = '';
    }

}



squareBut.addEventListener('click', squareFunc);

function squareFunc() {
    if (screen.value != '') {
        screen.value = Math.pow(parseFloat(screen.value), 2);
        if (screen.value.toString().length > 18) {
            screen.value = (parseFloat(screen.value).toPrecision(16)).toString();
        }

        // clear the screen if any number button clicked
        numBut.forEach(element => {
            element.addEventListener('click', removeAns);
        })
    }
}


sqrtBut.addEventListener('click', sqrtFunc);

function sqrtFunc() {
    if (screen.value != '') {
        if (parseFloat(screen.value) >= 0) {
            screen.value = Math.pow(parseFloat(screen.value), 0.5);
            if (screen.value.toString().length > 18) {
                screen.value = (parseFloat(screen.value).toPrecision(16)).toString();
            }
        } else {
            screen.value = 'Invalid Input';
        }

        // Remove "Invalid Input" of screen when any number button clicked
        numBut.forEach(element => {
            element.addEventListener('click', removeAns);
        })
    }
}


oneDividedBut.addEventListener('click', () => {
    if (screen.value != '') {
        screen.value = (1 / parseFloat(screen.value));
        if (screen.value.toString().length > 18) {
            screen.value = (parseFloat(screen.value).toPrecision(16)).toString();
        }

        // clear the screen if any number button clicked
        numBut.forEach(element => {
            element.addEventListener('click', removeAns);
        })
    }
})



posNegToggler.addEventListener('click', () => {
    if (screen.value != '') {
        if (parseFloat(screen.value) < 0) {
            screen.value = screen.value.slice(1, screen.value.length);
        } else if (parseFloat(screen.value) > 0) {
            screen.value = '-' + screen.value;
        }
    }
})








percentBut.addEventListener('click', percentFunc);

function percentFunc() {
    if (screen.value != '') {
        if (operator == '+' || operator == '−') {
            screen.value = (firstValue * parseFloat(screen.value) * 0.01);
        } else {
            screen.value = (firstValue * parseFloat(screen.value) * 0.01);
            topScreen.value = '';
            firstValue = '';
        }

        // clear the screen if any number button clicked
        numBut.forEach(element => {
            element.addEventListener('click', removeAns);
        })
    }
}





equalBut.addEventListener('click', equalFunc);

function equalFunc() {
    if (screen.value != '') {
        secondValue = parseFloat(screen.value);

        var calced = 0;

        if (operator == '+') {
            calced = firstValue + secondValue;
        } else if (operator == '−') {
            calced = firstValue - secondValue;
        } else if (operator == '×') {
            calced = firstValue * secondValue;
        } else if (operator == '÷') {
            calced = firstValue / secondValue;
        }


        if (calced.toString().length > 18) {
            calced = calced.toPrecision(15);
        }

        screen.value = calced;
        topScreen.value = '';
        firstValue = '';
        secondValue = '';


        // clear answer when number button clicked
        numBut.forEach(element => {
            element.addEventListener('click', removeAns);
        })
        dotBut.addEventListener('click', removeAns);
    }
}

function removeAns(event) {
    screen.value = '';
    clickedBut = event.target.innerText;
    screen.value = clickedBut;
    numBut.forEach(element => {
        element.removeEventListener('click', removeAns);
    })
    dotBut.removeEventListener('click', removeAns);
}
