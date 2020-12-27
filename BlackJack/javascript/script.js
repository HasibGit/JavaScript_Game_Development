

var blackJackGame = {
    'you' : {'div' : '#yourBox', 'scoreSpan' : '#yourScore', 'score' : 0 },
    'dealer' : {'div' : '#dealerBox' , 'scoreSpan' : '#dealerScore', 'score' : 0},
    'cards' : ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
    'cardsMap' : {'2' : 2,'3' : 3,'4' : 4,'5' : 5,'6' : 6,'7' : 7,'8' : 8,'9' : 9,'10' : 10,'J' : 10,'Q' : 10,
    'K' : 10,'A' : [1,11]},
    'wins' : 0,
    'losses' : 0,
    'draws' : 0,
    'isHit' : true,
    'isStand' : false,
    'isDeal' : false,
};



document.querySelector('#hit-button').addEventListener('click',blackJackHit);
document.querySelector('#stand-button').addEventListener('click',blackJackStand);

document.querySelector('#deal-button').addEventListener('click',blackJackDeal);

var YOU = blackJackGame.you;

var DEALER = blackJackGame .dealer;

var hitSound = new Audio('audio/swish.m4a');
var winSound = new Audio('audio/cash.mp3');
var loseSound = new Audio('audio/aww.mp3');


function blackJackHit(){
   if(blackJackGame.isHit === true){
     play(YOU);
     blackJackGame.isStand = true;
   }
}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve,ms));
}

async function blackJackStand(){
  if(blackJackGame.isStand === true){
    blackJackGame.isHit = false;
    blackJackGame.isStand = false;
    while(DEALER.score <= 21){
      console.log("here");
       play(DEALER);
       if(DEALER.score === 21){
         break;
       }
       else{
         if(DEALER.score > YOU.score){
           break;
         }
         else if(DEALER.score < YOU.score && YOU.score > 21){
           break;
         }
       }
      await sleep(1000);
    }
    computeWinner();
  }

  blackJackGame.isDeal = true;
}

function play(activePlayer){
  var card = pickRandom();
  showCard(activePlayer,card);
  updateScore(activePlayer,card);
  showScore(activePlayer);
}

function pickRandom(){
  var min = 0;
  var max = 13;

  var randomIndex = Math.floor(Math.random() * 13);
  return blackJackGame.cards[randomIndex];
}

function blackJackDeal(){
  if(blackJackGame.isDeal === true){
    var yourImages = document.querySelector(YOU.div).querySelectorAll('img');
    var dealerImages = document.querySelector(DEALER.div).querySelectorAll('img');

    for(i = 0;i < yourImages.length;i++){
      yourImages[i].remove();
    }
    for(i = 0;i < dealerImages.length;i++){
      dealerImages[i].remove();
    }
    YOU.score = 0;
    DEALER.score = 0;
    document.querySelector(YOU.scoreSpan).textContent = YOU.score;
    document.querySelector(YOU.scoreSpan).style.color = 'white';

    document.querySelector(DEALER.scoreSpan).textContent = DEALER.score;
    document.querySelector(DEALER.scoreSpan).style.color = 'white';
    document.querySelector('#situation-span').textContent = "Let's Play";
    document.querySelector('#situation-span').style.color = 'black';
  }
  blackJackGame.isHit = true;
  blackJackGame.isStand = false;
  blackJackGame.isDeal = false;
}

function showCard(activePlayer,card){
  if(activePlayer.score <= 21){
    var image = new Image(120,150);
    image.src = `images/${card}.png`;
    document.querySelector(activePlayer.div).appendChild(image);
    hitSound.play();
  }
}

function updateScore(activePlayer,card){
  if(card === 'A'){
    if(activePlayer.score + blackJackGame.cardsMap[card][1] <= 21){
      activePlayer.score += blackJackGame.cardsMap[card][1];
    }
    else{
      activePlayer.score += blackJackGame.cardsMap[card][0];
    }
  }

  else{
    activePlayer.score += blackJackGame.cardsMap[card];
  }

}

function showScore(activePlayer){
  if(activePlayer.score <= 21){
    document.querySelector(activePlayer.scoreSpan).textContent = activePlayer.score;
  }
  else{
    document.querySelector(activePlayer.scoreSpan).textContent = 'BUST';
    document.querySelector(activePlayer.scoreSpan).style.color = 'red';
  }
}

function computeWinner(){
  var yourScore = YOU.score;
  var dealerScore = DEALER.score;
  var winner;

  if(yourScore <= 21){
    if(dealerScore > 21 || dealerScore < yourScore){
      console.log('you win');
      winner = 'you';
    }
    else if(yourScore === dealerScore){
      console.log('draw');
      winner = 'none';
    }
    else if(dealerScore > yourScore){
      console.log('dealer');
      winner = 'dealer';
    }
  }
  else{
     if(dealerScore > 21){
       console.log('draw');
       winner = 'none';
     }
     else{
       console.log('dealer win');
       winner = 'dealer';
     }
  }

  if(winner === 'none'){
   document.querySelector('#situation-span').textContent = "It's a draw!";
   blackJackGame.draws++;
  }
  else if(winner === 'you'){
    winSound.play();
    document.querySelector('#situation-span').textContent = 'You Win!';
    document.querySelector('#situation-span').style.color = 'green';
    blackJackGame.wins++;
  }
  else if(winner === 'dealer'){
    loseSound.play();
    document.querySelector('#situation-span').textContent = 'You lose.';
    document.querySelector('#situation-span').style.color = 'red';
    blackJackGame.losses++;
  }
  document.querySelector('#wins').textContent = blackJackGame.wins;
  document.querySelector('#losses').textContent = blackJackGame.losses;
  document.querySelector('#draws').textContent = blackJackGame.draws;
}
