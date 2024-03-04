let currentSymbol = 'X';
let board; 
const validations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

restart();


function restart(){
    document.querySelectorAll(".square")
        .forEach(s => s.textContent = '');
    
    addEventListeners();

    board = Array(9).fill(''); 
}

function addEventListeners(){
    document.querySelectorAll(".square")
        .forEach(s =>  s.addEventListener("click", play, { once: true }));
}

function play(evt){
    let btn = evt.target;
    
    fillButton(btn); 

    if(validateVictory(btn.id)){
        alert(`Winner ${currentSymbol}`);
        restart();
        return;
    }

    if(validateDraw()){
        alert("Draw");
        restart();
        return;
    }

    changeSymbol();
}

function fillButton(btn){
    let value = getValue(btn.id);
    board[value] = currentSymbol;
    btn.textContent = currentSymbol;
} 

const getValue = (id) => Number(id.replace('square', ''));
const validateDraw = () => board.every(square => square); // validates that all elements are filled

function validateVictory(id){
    let value = getValue(id);
    let result = false;

    for (const group of validations){
        if(!group.includes(value)){
            continue;
        }

        if(group.every(x => board[x] == currentSymbol)){
            result = true;
            break;
        }
    }

    return result;
}

const changeSymbol = () => currentSymbol = currentSymbol == 'X' ? 'O' : 'X';
           