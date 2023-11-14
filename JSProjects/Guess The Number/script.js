'use strict';

let secretNum = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

console.log('Secret Number (For DEVS): ' + secretNum); //delete later
//document.querySelector('.number').textContent = secretNum; this is the div with the question mark

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  //console.log(guess, typeof guess);
  if (score > 0) {
    if (!guess) {
      displayMessage('No Number!');
    } else if (guess === secretNum) {
      document.querySelector('.number').textContent = secretNum;
      displayMessage('Correct Number!');
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.backgroundColor = '#222426';
      document.querySelector('.number').style.width = '30rem';
      if (score > highscore) {
        document.querySelector('.highscore').textContent = score;
        highscore = score;
      }
    } else if (guess !== secretNum) {
      score--;
      document.querySelector('.score').textContent = score;
      if (guess > secretNum) {
        displayMessage('Too High!📈');
        document.querySelector('.number').style.backgroundColor = '#EA6515';
      } else if (guess < secretNum) {
        displayMessage('Too Low!📉');
        document.querySelector('.number').style.backgroundColor = '#159AEA';
      }
      if (score < 1) {
        displayMessage('You Lost the Game!❌');
        document.querySelector('.score').textContent = 0;
        document.querySelector('body').style.backgroundColor = '#e51a27';
        document.querySelector('.number').style.backgroundColor = '#222';
      }
    }
  }
});
//selects check button, listens for event "click"
document.querySelector('.again').addEventListener('click', function () {
  document.querySelector('body').style.backgroundColor = '#222';
  score = 20;
  document.querySelector('.score').textContent = score;
  secretNum = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.guess').value = '';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').style.backgroundColor = '#333';
  displayMessage('Start guessing');
  //document.querySelector('.message').textContent = 'Start guessing...';
});
