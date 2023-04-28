"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const dice = document.querySelector(".dice");
const btnroll = document.querySelector(".btn--roll");
const btnhold = document.querySelector(".btn--hold");
const btnnew = document.querySelector(".btn--new");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const score = [0, 0];
let currentScore, activePlayer, playing;

const init = () => {
  score0El.textContent = "0";
  score1El.textContent = "0";

  dice.classList.add("hidden");
  current0El.textContent = "0";
  current1El.textContent = "0";

  currentScore = 0;
  activePlayer = 0;
  playing = true;

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const nextPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
};

btnroll.addEventListener("click", () => {
  if (playing) {
    //1 random number generation
    const rand = Math.trunc(Math.random() * 6) + 1;

    //2 Display Dice
    dice.src = `dice-${rand}.png`;
    dice.classList.remove("hidden");

    //3 if 1 next player turn
    if (rand === 1) {
      nextPlayer();
    } else {
      currentScore += rand;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

btnhold.addEventListener("click", () => {
  if (playing) {
    //1 Add current score to active Player score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    //2 if score greater than 20 , win game or next player
    if (score[activePlayer] >= 20) {
      playing = false;
      dice.classList.add("hidden");

      //end game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //next player
      nextPlayer();
    }
  }
});

btnnew.addEventListener("click", () => {
  init();
});
