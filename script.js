'use strict';

//Selecting elements
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');
const playerOneScore = document.getElementById('score--0');
const playerTwoScore = document.getElementById('score--1');
const playerOneCurrentScore = document.getElementById('current--0');
const playerTwoCurrentScore = document.getElementById('current--1');

const diceImg = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//Starting conditions
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    playerOneScore.textContent = 0;
    playerTwoScore.textContent = 0;
    playerOneCurrentScore.textContent = 0;
    playerTwoCurrentScore.textContent = 0;

    diceImg.classList.add('hidden');

    playerOne.classList.remove('player--winner');
    playerTwo.classList.remove('player--winner');
    playerOne.classList.add('player--active');
    playerTwo.classList.remove('player--active');

    document.querySelector('#name--0').textContent = 'Player 1';
    document.querySelector('#name--1').textContent = 'Player 2';
};

init();

//Switching player
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    playerOne.classList.toggle('player--active');
    playerTwo.classList.toggle('player--active');
};

//Rolling dice logic
btnRoll.addEventListener('click', function () {
    if (playing) {
        const dice = Math.floor(Math.random() * 6) + 1;

        diceImg.classList.remove('hidden');

        diceImg.src = `dices/dice-${dice}.png`;

        //Checking dice roll
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            //Switching player
            switchPlayer();
        }
    }
});

//Hold logic
btnHold.addEventListener('click', function () {
    if (playing) {
        //Add current player score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //Winning the game
        if (scores[activePlayer] >= 100) {
            document.querySelector(`#name--${activePlayer}`).textContent = `Player ${activePlayer + 1} Won!`;
            playing = false;
            diceImg.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }

        //Switching player
        switchPlayer();
    }
});

//Reset the game
btnNew.addEventListener('click', init);