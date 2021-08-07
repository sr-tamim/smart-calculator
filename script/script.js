
// little message for new users
if (localStorage.getItem('newUser') == null) {
    if (window.innerWidth > 768) {
        window.alert('You can use your computer keyboard for giving input to this calculator');
    } else {
        window.alert('I guess you are new here. At last you are in the right place!')
    }
    localStorage.setItem('newUser', false);
}



// white and dark theme function

let savedTheme = (localStorage.getItem('themeDark') === 'true');
if (savedTheme == null) { localStorage.setItem('themeDark', 'false') };
let themeDark = false;
document.getElementById('toggle').addEventListener('click', () => {
    document.body.style.transition = 'background 1s ease-in-out';
    document.querySelector('.toggler').style.transition = '500ms ease-in-out';
    document.documentElement.classList.toggle('dark');
    themeDark = !themeDark;
    savedTheme = !savedTheme;
    localStorage.setItem('themeDark', themeDark.toString());
    themeIcon();
})
if (savedTheme != themeDark) {
    document.documentElement.classList.toggle('dark');
    themeDark = !themeDark;
    themeIcon();
}
function themeIcon() {
    if (themeDark === false) {
        document.getElementsByClassName('toggler')[0].innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M17 12c0 2.762-2.238 5-5 5s-5-2.238-5-5 2.238-5 5-5 5 2.238 5 5zm-9.184-5.599l-3.594-3.594-1.414 1.414 3.594 3.595c.402-.537.878-1.013 1.414-1.415zm4.184-1.401c.34 0 .672.033 1 .08v-5.08h-2v5.08c.328-.047.66-.08 1-.08zm5.598 2.815l3.594-3.595-1.414-1.414-3.594 3.595c.536.402 1.012.878 1.414 1.414zm-12.598 4.185c0-.34.033-.672.08-1h-5.08v2h5.08c-.047-.328-.08-.66-.08-1zm11.185 5.598l3.594 3.593 1.415-1.414-3.594-3.594c-.403.537-.879 1.013-1.415 1.415zm-9.784-1.414l-3.593 3.593 1.414 1.414 3.593-3.593c-.536-.402-1.011-.877-1.414-1.414zm12.519-5.184c.047.328.08.66.08 1s-.033.672-.08 1h5.08v-2h-5.08zm-6.92 8c-.34 0-.672-.033-1-.08v5.08h2v-5.08c-.328.047-.66.08-1 .08z"/></svg>';
    } else {
        document.getElementsByClassName('toggler')[0].innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M12 10.999c1.437.438 2.562 1.564 2.999 3.001.44-1.437 1.565-2.562 3.001-3-1.436-.439-2.561-1.563-3.001-3-.437 1.436-1.562 2.561-2.999 2.999zm8.001.001c.958.293 1.707 1.042 2 2.001.291-.959 1.042-1.709 1.999-2.001-.957-.292-1.707-1.042-2-2-.293.958-1.042 1.708-1.999 2zm-1-9c-.437 1.437-1.563 2.562-2.998 3.001 1.438.44 2.561 1.564 3.001 3.002.437-1.438 1.563-2.563 2.996-3.002-1.433-.437-2.559-1.564-2.999-3.001zm-7.001 22c-6.617 0-12-5.383-12-12s5.383-12 12-12c1.894 0 3.63.497 5.37 1.179-2.948.504-9.37 3.266-9.37 10.821 0 7.454 5.917 10.208 9.37 10.821-1.5.846-3.476 1.179-5.37 1.179z"/></svg>';
    }
}
themeIcon();



// select elements of the html file
const screen = document.getElementById('display');
const topScreen = document.getElementById('topDisplay');
const inputButtons = document.querySelectorAll('.input-button');
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

// how many numbers will not overflow the calculator screen
var maxLettersCanShow = parseInt(screen.offsetWidth / 30);

// add button animation on click
inputButtons.forEach(element => {
    element.addEventListener('mousedown', () => {
        element.classList.add('clicked');
    })
    element.addEventListener('mouseup', () => {
        element.classList.remove('clicked');
    })
})

// clear all when reload
window.addEventListener('load', acFunc);

// defining some necessary variables
var clickedBut = null, firstValue = null, secondValue = null, operator = null;



// all clear function adding
acBut.addEventListener('click', acFunc);
function acFunc() {
    topScreen.value = '';
    screen.value = '0';
    firstValue = null;
    secondValue = null;
}

// delete button function adding
delBut.addEventListener('click', () => {
    screen.value = screen.value.slice(0, (screen.value.length - 1));
})

// dot(.) button function adding
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

// function of all number buttons
numBut.forEach(element => {
    element.addEventListener('click', numButFunc);
})

function numButFunc(event) {
    if (screen.value === '0') { screen.value = ''; }
    if (screen.value.length < maxLettersCanShow) {
        clickedBut = event.target.innerText;
        screen.value += clickedBut;
    }
}


// function for four [+, -, *, /] operation
operationBut.forEach(element => {
    element.addEventListener('click', operation);
})
function operation(event) {
    if (screen.value != '' && topScreen.value == '') {
        firstValue = Number(screen.value);
        operator = event.target.innerText;
        topScreen.value = screen.value + " " + event.target.innerText;

        screen.value = '';


    } else if (screen.value == '' && topScreen.value != '') {
        operator = event.target.innerText;
        topScreen.value = topScreen.value.slice(0, topScreen.value.length - 1) + event.target.innerText;

    } else if (screen.value != '' && topScreen.value != '') {
        equalFunc();
        firstValue = Number(screen.value);
        operator = event.target.innerText;
        topScreen.value = screen.value + " " + event.target.innerText;

        screen.value = '';
    }

}

// function for square ^(2) button
squareBut.addEventListener('click', squareFunc);
function squareFunc() {
    if (screen.value != '') {
        screen.value = preventOverflow(Math.pow(Number(screen.value), 2));

        // save answer
        localStorage.setItem('ans', calced);

        // clear the screen if any number button clicked
        numBut.forEach(element => {
            element.addEventListener('click', removeAns);
        })
    }
}

// square root(√) function adding
sqrtBut.addEventListener('click', sqrtFunc);
function sqrtFunc() {
    if (screen.value != '') {
        if (Number(screen.value) >= 0) {
            screen.value = preventOverflow(Math.pow(Number(screen.value), 0.5));
        } else {
            screen.value = 'Invalid Input';
        }

        // save answer
        localStorage.setItem('ans', calced);

        // Remove "Invalid Input" of screen when any number button clicked
        numBut.forEach(element => {
            element.addEventListener('click', removeAns);
        })
    }
}

// function for 1 dividing by a number
oneDividedBut.addEventListener('click', () => {
    if (screen.value != '') {

        screen.value = preventOverflow(1 / Number(screen.value));

        // clear the screen if any number button clicked
        numBut.forEach(element => {
            element.addEventListener('click', removeAns);
        })
    }
})

// change the number to positive or negative
posNegToggler.addEventListener('click', () => {
    if (screen.value != '') {
        if (Number(screen.value) < 0) {
            screen.value = screen.value.slice(1, screen.value.length);
        } else if (Number(screen.value) > 0) {
            screen.value = '-' + screen.value;
        }
    }
})


// percentage (%) button function
percentBut.addEventListener('click', percentFunc);
function percentFunc() {
    if (screen.value != '') {
        if (operator == '+' || operator == '−') {
            screen.value = (firstValue * Number(screen.value) * 0.01);
        } else {
            screen.value = (firstValue * Number(screen.value) * 0.01);
            topScreen.value = '';
            firstValue = '';
        }

        // clear the screen if any number button clicked
        numBut.forEach(element => {
            element.addEventListener('click', removeAns);
        })
    }
}


// get saved answer
document.getElementById('ansBut').addEventListener('click', () => {
    screen.value = localStorage.getItem('ans');
})


// calculation (=) button function
equalBut.addEventListener('click', equalFunc);

function equalFunc() {
    if (screen.value != '') {
        secondValue = Number(screen.value);

        var calced = 0;

        switch (operator) {
            case '+':
                calced = firstValue + secondValue;
                break;
            case '−':
                calced = firstValue - secondValue;
                break;
            case '×':
                calced = firstValue * secondValue;
                break;
            case '÷':
                calced = firstValue / secondValue;
                break;
        }


        // prevent answer from overflowing the display
        screen.value = preventOverflow(calced);

        topScreen.value = '';
        firstValue = '';
        secondValue = '';


        // clear answer when number button clicked
        numBut.forEach(element => {
            element.addEventListener('click', removeAns);
        })
        dotBut.addEventListener('click', removeAns);


        // save answer
        localStorage.setItem('ans', calced);
    }
}

// prevent numbers from overflowing the calculator screen
function preventOverflow(answer) {
    let i = answer.toString().length;
    while (answer.toString().length > maxLettersCanShow) {
        answer = Number(answer).toExponential(i);
        i--;
    }
    return answer;
}

// remove the answer when any number button clicked
function removeAns(event) {
    screen.value = '';
    clickedBut = event.target.innerText;
    screen.value = clickedBut;
    numBut.forEach(element => {
        element.removeEventListener('click', removeAns);
    })
    dotBut.removeEventListener('click', removeAns);
}


// add keyboard functionality for computers
document.addEventListener('keydown', event => {
    event.preventDefault();

    switch (event.key) {
        case 'Enter':
            equalBut.click();
            break;
        case 'Delete':
            delBut.click();
            break;
        case 'Backspace':
            acBut.click();
            break;
        default:
            inputButtons.forEach(element => {
                switch (event.key) {
                    case '-':
                        operationBut.forEach(element => {
                            if (element.innerHTML == '−') { element.click() }
                        });
                        break;
                    case '*':
                        operationBut.forEach(element => {
                            if (element.innerHTML == '×') { element.click() }
                        });
                        break;
                    case '/':
                        event.preventDefault();
                        operationBut.forEach(element => {
                            if (element.innerHTML == '÷') { element.click() }
                        });
                        break;
                    case element.innerHTML:
                        element.click();
                        break;
                }
            })
    }
})
