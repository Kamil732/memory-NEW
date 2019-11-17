const cards = document.querySelectorAll(".memory-card");
const timer = document.getElementById('timer');

let hasFllippedCard = false;
let lockBoard = false;
let countFllippedCard = 0;
let firstCard, secondCard;
let miuntes = '00';
let seconds = 0;
let isGameOver = false;
let isPermissionOnMinutes = false;
let isStart = false;

function flipCard() {
    gameTimer();
    // !isStart ? gameTimer() : null;
    if(lockBoard) return;
    if(this === firstCard) return;
    this.classList.add('flip');
    
    if(!hasFllippedCard && !lockBoard) {
        // first card
        firstCard = this;
        hasFllippedCard = true;
        
        return;
    }
    // second card
    hasFllippedCard = false;
    secondCard = this;

    chcekForMatch();
}

function chcekForMatch() {
    firstCard.dataset.framework === secondCard.dataset.framework ? disableCards() : unFlipCards();
}

function disableCards() {
    countFllippedCard+=2;
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
    if(countFllippedCard == 12) isGameOver = true;
}

function unFlipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFllippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function gameTimer() {
    isStart = true;
    seconds < 10 ? seconds = '0'+seconds : null;
    if(seconds > 59) {
        seconds = '00';
        miuntes++;
        isPermissionOnMinutes = true;
        miuntes < 10 && isPermissionOnMinutes ? miuntes = '0'+miuntes : null;
    }
    if(miuntes > 59) alert('GOŚCIU CO TY TYLE ROBISZ? AŻ ZEGAR WYRĄBAŁO :D xD');
    timer.innerHTML = `${miuntes}:${seconds}`;

    !isGameOver ? setTimeout(gameTimer, 1000) : alert(`GAME OVER YOU HAVE DONE IT IN ${miuntes} MINUTES AND ${seconds} SECONDS`);

    isPermissionOnMinutes = false;
    seconds++;
}

(function suffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random()* 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));