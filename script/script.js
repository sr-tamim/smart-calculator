const screen = document.getElementById('display');
const topScreen = document.getElementById('topDisplay');
const buttonValue = document.querySelectorAll('.input-button')
const numBut = document.querySelectorAll('.numberButton');
const operationBut = document.querySelectorAll('.operationBut');
const squareBut = document.querySelector('#squareBut');
const sqrtBut = document.querySelector('#sqrtBut');
const oneDividedBut = document.querySelector('#oneDivided');
const percentBut = document.querySelector('#percentBut');
const equalBut = document.querySelector('#equalBut');
const acBut = document.querySelector('#ac');
const delBut = document.querySelector('#del');
const dotBut = document.getElementById('dot');

window.addEventListener('load', acFunc);

var clickedBut = null, firstValue = null, secondValue = null, operator = null;




acBut.addEventListener('click', acFunc);

function acFunc(){
    topScreen.value = '';
    screen.value = '0';
    firstValue = null;
    secondValue = null;

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


dotBut.addEventListener('click', dotFunc);
function dotFunc(){
    if(screen.value === '0'){screen.value='';}
    clickedBut = event.target.innerText;
    screen.value += clickedBut;
    
    dotBut.removeEventListener('click', dotFunc);
}




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
    if(screen.value != ''){
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
}



squareBut.addEventListener('click', squareFunc);

function squareFunc(){
    if(screen.value != ''){
        screen.value = Math.pow(parseFloat(screen.value), 2);
    }
}


sqrtBut.addEventListener('click', sqrtFunc);

function sqrtFunc(){
    if(screen.value != ''){
        screen.value = Math.pow(parseFloat(screen.value), 0.5);
    }
}


oneDividedBut.addEventListener('click', () => {
    if(screen.value != ''){
        screen.value = (1 / parseFloat(screen.value));
    }
})







percentBut.addEventListener('click', percentFunc);

function percentFunc(){
    if(screen.value!=''){
        if(operator == '+' || operator == '−'){
            screen.value = (firstValue * parseFloat(screen.value) * 0.01);
        } else{
            screen.value = (firstValue * parseFloat(screen.value) * 0.01);
            topScreen.value = '';
            firstValue = '';
            operationBut.forEach(element => {
                element.addEventListener('click', operation);
            })
            operationBut.forEach(element => {
                element.removeEventListener('click', equalFunc);
            })
        }
    }
}





equalBut.addEventListener('click', equalFunc);

function equalFunc(){
    if(screen.value != ''){
        secondValue = parseFloat(screen.value);

        var calced = 0;

        if(operator == '+'){
            calced = firstValue + secondValue;
        } else if(operator == '−'){
            calced = firstValue - secondValue;
        } else if(operator == '×'){
            calced = firstValue * secondValue;
        } else if(operator == '÷'){
            calced = firstValue / secondValue;
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
}
