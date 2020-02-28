let gameCard = document.querySelectorAll('.card');
let restart = document.getElementsByClassName('restart');
let numOfCards = gameCard.length;
let cardImg = document.querySelectorAll('card-img');
let moveCount = 0;
let start = document.querySelector('#start');
let cardFlipped = false;
let clickedCards = [];
let matchedCards = 0;
let lock =false;
let firstCard = null;
let secondCard = null;
let lowScore = localStorage.getItem("low-score");

if (lowScore) {
  document.getElementById("top-score").innerText = lowScore;
}

restart[0].addEventListener('click', function () {
  location.reload();
})


//flip card
function flipCard (){
 if(lock) return;
 if(this === firstCard) return;

  this.classList.add('flip');
  
  if (!cardFlipped) {
    cardFlipped = true;
    firstCard = this;
    clickedCards.push(this);

    let countMoves = document.getElementById('moves');

    moveCount++;
    countMoves.innerHTML = moveCount;
    console.log(countMoves);
    if(moveCount === 1){
      startTime();
    }

    return;
  }

  secondCard = this;
  clickedCards.push(this);
  lock = true;
  
  matches();
  if(matchedCards === numOfCards) {
    stopTime();
    endGame();
  }
}

//check for matches
function matches() {
  let isMatch = firstCard.dataset.character === secondCard.dataset.character;
  if(isMatch){
    disableCards();
    matchedCards +=2;
  } else {
    unflipCards();
  } 
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  reset();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    reset();
  }, 1200);
}
//listen for event on each card
gameCard.forEach(card => card.addEventListener('click', flipCard));

function reset() {
  [cardFlipped, lock] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// shuffle cards()
function shuffle (){
  for(let card of gameCard){
      let randomCards = Math.floor(Math.random() * 16);
      card.style.order = randomCards;
  }
}
// Stopwatch initialization
let stopWatch = document.getElementById('timer');
  time = 0;
  seconds = 0

// start time
function startTime() {
  time = setInterval(function () {
    seconds++;
    stopWatch.innerHTML = seconds + ' s';
  }, 1000);
}

// stop the time function
function stopTime() {
  clearInterval(time);
}

if (matchedCards.length === 16) {
  // stopping stopwatch 
  stopTime();
  alert('game over');
}
function endGame() {
  let end = document.getElementById("end");
  let scoreHeader = end.children[1];
  console.log('gameover')
  scoreHeader.innerText = "Your score: " + moveCount;
  let lowScore = +localStorage.getItem("low-score") || Infinity;
  if (moveCount < lowScore) {
    scoreHeader.innerText += " - NEW BEST SCORE!!";
    localStorage.setItem("low-score", moveCount);
  }
  document.getElementById("end").classList.add("game-over");
}
//
window.onload = shuffle();