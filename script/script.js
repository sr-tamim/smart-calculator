const screen = document.getElementById('display');
const topScreen = document.getElementById('topDisplay');
const buttonValue = document.querySelectorAll('.input-button')
const numBut = document.querySelectorAll('.numberButton');
const operationBut = document.querySelectorAll('.operationBut');
const equalBut = document.querySelector('#equalBut');
const acBut = document.querySelector('#ac');
const delBut = document.querySelector('#del');
const dotBut = document.getElementById('dot');

window.addEventListener('load', acFunc);

let clickedBut, firstValue, secondValue, operator;

dotBut.addEventListener('click', dotFunc);

function dotFunc(){
    if(screen.value === '0'){screen.value='';}
    clickedBut = event.target.innerText;
    screen.value += clickedBut;
    
    dotBut.removeEventListener('click', dotFunc);
}

acBut.addEventListener('click', acFunc);

function acFunc(){
    topScreen.value = '';
    screen.value = '0';
    firstValue = '';
    secondValue = '';

    dotBut.addEventListener('click', dotFunc);

    operationBut.forEach(element => {
        element.addEventListener('click', operation);
    })
    operationBut.forEach(element => {
        element.removeEventListener('click', equalFunc);
    })
}

delBut.addEventListener('click', () => {
    screen.value = screen.value.slice(0, (screen.value.length-1));
})

numBut.forEach(element => {
    element.addEventListener('click', numButFunc);
})

function numButFunc(event){
    if(screen.value === '0'){screen.value='';}
    clickedBut = event.target.innerText;
    screen.value += clickedBut;
    
    if(screen.value.length > 25){
        numBut.forEach(element => {
            element.removeEventListener('click', numButFunc);
        })
    }
}



operationBut.forEach(element => {
    element.addEventListener('click', operation);
})
function operation(event){
    firstValue = parseFloat(screen.value);
    operator = event.target.innerText;
    topScreen.value = screen.value + " " + event.target.innerText;
    operationBut.forEach(element => {
        element.removeEventListener('click', operation);
    })
    operationBut.forEach(element => {
        element.addEventListener('click', equalFunc);
    })
    screen.value = '';

    dotBut.addEventListener('click', dotFunc);
    
    numBut.forEach(element => {
        element.addEventListener('click', numButFunc);
    })
}


equalBut.addEventListener('click', equalFunc);

function equalFunc(){
    secondValue = parseFloat(screen.value);

    if(operator == '+'){
        var calced = firstValue + secondValue;
    } else if(operator == '−'){
        var calced = firstValue - secondValue;
    } else if(operator == '×'){
        var calced = firstValue * secondValue;
    } else if(operator == '÷'){
        var calced = firstValue / secondValue;
    }

    screen.value = calced;
    topScreen.value = '';
    firstValue = '';
    secondValue = '';

    dotBut.addEventListener('click', dotFunc);

    operationBut.forEach(element => {
        element.addEventListener('click', operation);
    })
    operationBut.forEach(element => {
        element.removeEventListener('click', equalFunc);
    })


    // clear answer when number button clicked
    numBut.forEach(element => {
        element.addEventListener('click', removeAns);
    })
    function removeAns(event){
        screen.value = '';
        clickedBut = event.target.innerText;
        screen.value += clickedBut;
        numBut.forEach(element => {
            element.removeEventListener('click', removeAns);
        })
    }
}