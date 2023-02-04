"use strict";

// Players QS
const player0QS = document.querySelector(".player--0");
const player1QS = document.querySelector(".player--1");

// Main scores QS
const score0QS = document.getElementById("score--0");
const score1QS = document.getElementById("score--1");

// Current scores QS
const currentScore0QS = document.getElementById("current--0");
const currentScore1QS = document.getElementById("current--1");

// Buttons QS
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold= document.querySelector(".btn--hold");

// Dice QS
const diceQS = document.querySelector(".dice");

let playing,scores,currentScore,activePlayer;

const init = function(){
    // Start playing
    playing = true;

    // Set all scores to 0
    scores = [0,0];
    currentScore = 0;

    // Set active player to 0
    activePlayer = 0;

    // Hide the dice
    diceQS.classList.add("hidden");

    // Remove winner's background if any
    player0QS.classList.remove("player--winner");
    player1QS.classList.remove("player--winner");

    // Show active player as set previously
    player0QS.classList.add("player--active");
    player1QS.classList.remove("player--active");

    // Show the scores set previously
    score0QS.textContent = 0;
    score1QS.textContent = 0;
    currentScore0QS.textContent = 0;
    currentScore1QS.textContent = 0;
    
};
// Call the init method to actually start the game
init();


// Function to switch the active player
const switchPlayer = function (){
    // Show active player's current score as 0
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    // The below code toggles the active player
    // i.e. it adds/removes the active player theme accordingly
    player0QS.classList.toggle("player--active");
    player1QS.classList.toggle("player--active");
    
    // Change the active player
    activePlayer = activePlayer === 0 ? 1 : 0;

    // Set current score of new active player as 0
    currentScore = 0;
};


// Rolling dice functionality
btnRoll.addEventListener("click",function(){
    if(playing){
        // 1. Generate a random dice roll
        const dice = Math.trunc(Math.random()*6)+1;

        // 2. Display dice
        diceQS.classList.remove("hidden"); 

        // The below line selects dice img acc to dice value 
        diceQS.src = `dice-${dice}.png`;

        // 3. Check for the rolled value of dice
        if(dice !== 1){
            // Add dice value to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else { 
            // Switch to next player
            switchPlayer();
        }
    }
});


// Hold button functionality
btnHold.addEventListener("click",function(){
    if(playing){
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        // eg scores[0] += currentScore  or scores[1] += currentScore

        // 2. Display active player's score
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if(scores[activePlayer]>=100){
            // Finish the game
            playing = false;
            // Set active player's background to winner's background
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            // Hide the dice
            diceQS.classList.add("hidden");
        }
        else{
            // Switch to next player
            switchPlayer();
        }
    }
});


// New game button functionality
// set all the initial conditions of the game
btnNew.addEventListener("click",init);


