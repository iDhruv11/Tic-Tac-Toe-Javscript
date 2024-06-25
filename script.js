
// <-- Variable declaration section starts --> 
const byMe = document.querySelector('.by-me');
const start = document.querySelector('.start');
const footer = document.querySelector('footer');    
const hero = document.querySelector('.hero');
const playerSec = document.querySelector('.player-section');
const header = document.querySelector('header');
const container = document.querySelector('.container');
const inputBox = document.querySelectorAll('.input-box');
const playerName = document.querySelectorAll('.player-name');
const restartBtn = document.querySelector('.restart');
let intervalId;
let symbol = 'X';
let posArr = [];
let winnerFound = false;
let counter = 0;
// <-- Variable Declaration Section ends -->


// <-- Initial styling to display game menu -->
function initStyling(){
    hero.style.display = 'none';
    playerSec.style.display = 'none';
    footer.style.display = 'none';
    header.style.marginTop = '300px';
    header.style.marginBottom = '10px';
    start.style.marginTop = '20px';
}

// <-- JS styling to display the game onclicking 'start' -->
function showGame(){
    start.style.display = 'none';
    byMe.style.display = 'none';
    footer.style.display = 'none';
    playerSec.style.display = 'flex';
    hero.style.display = 'flex';
    footer.style.display = 'inline-block'
    header.style.margin = 'auto 0 50px 0';
    playerSec.style.marginBottom = '30px';
    playerSec.children[0].style.backgroundColor = '#222222';
}


// <-- get player name -->
function getPlayerName(e){
    let currPlayer = prompt('Enter your Name: ');
    if(currPlayer.trim()){
        e.target.innerText = currPlayer;
    }
}

// <-- show Turn of player using color of player Card -->
function showTurn(e){
    if(e.target.innerText == 'X'){
        playerSec.children[0].style.backgroundColor = '#191919';
        playerSec.children[2].style.backgroundColor = '#222222';
    }else{
        playerSec.children[0].style.backgroundColor = '#222222';
        playerSec.children[2].style.backgroundColor = '#191919';
    }
}
// <-- insert the 'X' or 'O' in boxes --> 
function insertSymbol(e){
    counter = counter + 1;
    e.target.innerText = symbol;
    if(symbol == 'X'){
        symbol = 'O';
    }else{
        symbol = 'X';
    }
    e.target.removeEventListener('click', eventBundler)
    posArr[parseInt(e.target.id)] = e.target.innerText;    
}

// <-- verify win or tie -->
function verifyWin(e){
    let targetBox = parseInt(e.target.id);
    if(targetBox == 0 || targetBox == 1 || targetBox == 2){
        if(e.target.innerText == posArr[targetBox+3] && e.target.innerText == posArr[targetBox + 6]){
            console.log('found');
            displayGreen(e.target.id, targetBox+3, targetBox+6);
            displayWinner(e.target);
        }
    }   
    if(targetBox == 3 || targetBox == 4 || targetBox == 5){
        if(e.target.innerText == posArr[targetBox+3] && e.target.innerText == posArr[targetBox-3]){
            console.log('found');
            displayGreen(e.target.id, targetBox+3, targetBox-3);
            displayWinner(e.target);
        }
    }
    if(targetBox == 6 || targetBox == 7 || targetBox == 8){
        if(e.target.innerText == posArr[targetBox-3] && e.target.innerText == posArr[targetBox-6]){
            console.log('found');
            displayGreen(e.target.id, targetBox-3, targetBox-6);
            displayWinner(e.target);
        }
    }
    if(targetBox == 0 || targetBox == 3 || targetBox == 6){
        if(e.target.innerText == posArr[targetBox+1] && e.target.innerText == posArr[targetBox+2]){
            console.log('found');
            displayGreen(e.target.id, targetBox+1, targetBox+2);
            displayWinner(e.target);
        }
    }
    if(targetBox == 1 || targetBox == 4 || targetBox == 7){
        if(e.target.innerText == posArr[targetBox+1] && e.target.innerText == posArr[targetBox-1]){
            console.log('found');
            displayGreen(e.target.id, targetBox+1, targetBox-1);
            displayWinner(e.target);
        }
    }
    if(targetBox == 2 || targetBox == 5 || targetBox == 8){
        if(e.target.innerText == posArr[targetBox-1] && e.target.innerText == posArr[targetBox-2]){
            console.log('found bullshit');
            displayGreen(e.target.id, targetBox-1, targetBox-2);
            displayWinner(e.target);
        }
    }
    if(targetBox == 0 || targetBox == 2 || targetBox == 6 || targetBox == 8){
        if(e.target.innerText == posArr[targetBox+((4-targetBox)*1)] && e.target.innerText == posArr[targetBox+((4-targetBox)*2)]){
            console.log('found');
            displayGreen(e.target.id, targetBox+((4-targetBox)*1), targetBox+((4-targetBox)*2))
            displayWinner(e.target);
        }
    }
    if(targetBox == 4){
        if(e.target.innerText == posArr[targetBox-4] && e.target.innerText == posArr[targetBox+4]){
            console.log('fund');
            displayGreen(e.target.id, targetBox-4, targetBox+4)
            displayWinner(e.target);
        }
        if(e.target.innerText == posArr[targetBox-2] && e.target.innerText == posArr[targetBox+2]){
            console.log('found');
            displayGreen(e.target.id, targetBox-2, targetBox+2);
            displayWinner(e.target);
        }
    }
    if(counter == 9){
        if(!winnerFound){
            displayWinner(false);
        }
    }
}

// <-- display result dialogue -->
function displayWinner(winner){
    if(winner){
        winnerFound = true;
        let winnerName = document.getElementById(winner.innerText).innerText;
        document.querySelector('.winner-title').innerText = `${winnerName} has won!`;
    }else{
        document.querySelector('.winner-title').innerText = `It's a Tie!`;
    }
    inputBox.forEach(elem=>{
        elem.removeEventListener('click', eventBundler);
    })
    timeoutId = setTimeout(() => {
        document.querySelector('.winner-box').style.display = 'flex';
    }, 500);
}

// <-- green the matched boxes -->
function displayGreen(...greenBtns){
    winnerFound = true;
    greenBtns.forEach((elem)=>{
        elem = elem.toString();
        document.getElementById(elem).style.backgroundColor = '#1f2a1f';
        document.getElementById(elem).style.transform = 'scale(1.06)';
    })
}

// <-- start new Game -->
function startNewGame(){
    counter = 0;
    winnerFound = false;
    inputBox.forEach((elem)=>{
        elem.innerText = '';
        elem.style.backgroundColor = '#1f1f1f';
        posArr=[];
        clearTimeout(timeoutId);
        inputBox.forEach(elem=>{
            elem.addEventListener('click', eventBundler)
            elem.style.transform = 'scale(1.0)';
        })
    })
    document.querySelector('.winner-box').style.display = 'none';
}

// <-- load initial styling with document load -->
window.addEventListener('load', initStyling)
// <-- show game onclick on start -->
start.addEventListener('click', showGame);

// <-- hover effect for smooth UI ->>
inputBox.forEach(elem=>{
    elem.addEventListener('mouseover', (e)=>{
        e.target.style.transform = 'scale(1.07)';
    })
    elem.addEventListener('mouseout', (e)=>{
        e.target.style.transform = 'scale(1.0)';
    })
}) 

// <-- event listener to edit player name -->
playerName.forEach( (elem)=>{
    elem.addEventListener('click', (e)=>{
        getPlayerName(e);
    });
})

// <-- function bundler to bundle dependent unit function -->
function eventBundler(e){
    insertSymbol(e);
    verifyWin(e);
    showTurn(e);
}   

// <-- event listner for user symbol (X, O) input -->
inputBox.forEach((elem) => {
    elem.addEventListener('click', eventBundler)
});

// <-- event listner to restart the game -->
restartBtn.addEventListener('click', startNewGame);
