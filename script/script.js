
// white and dark theme function

let savedTheme = (localStorage.getItem('themeDark') === 'true');
if (savedTheme == null) { localStorage.setItem('themeDark', 'false') };
let themeDark = false;
document.getElementById('toggle').addEventListener('click', () => {
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

// add button animation on click
inputButtons.forEach(element => {
    element.addEventListener('click', () => {
        element.classList.add('clicked');

        setTimeout(() => {
            element.classList.remove('clicked');
        }, 600)
    })
})


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





// add keyboard functionality
document.addEventListener('keydown', event => {
    event.preventDefault();
    if (event.key == "Enter") { equalFunc() }
    else if (event.key == "Delete") { delBut.click() }
    else if (event.key == "Backspace") { acFunc() }
    else {
        inputButtons.forEach(element => {
            if (element.innerHTML == event.key) {
                element.click();
            } else if (event.key == "-") {
                operationBut.forEach(element => {
                    if (element.innerHTML == '−') { element.click() }
                })
            } else if (event.key == "*") {
                operationBut.forEach(element => {
                    if (element.innerHTML == '×') { element.click() }
                })
            } else if (event.key == "/") {
                event.preventDefault();
                operationBut.forEach(element => {
                    if (element.innerHTML == '÷') { element.click() }
                })
            }
        })
    }
})
