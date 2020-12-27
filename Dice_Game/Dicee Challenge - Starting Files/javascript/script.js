
var dices = {
   1 : "images/dice1.png",
   2 : "images/dice2.png",
   3 : "images/dice3.png",
   4 : "images/dice4.png",
   5 : "images/dice5.png",
   6 : "images/dice6.png"
};


function pickRandom(){
  return Math.floor(Math.random() * (6 - 0)) + 1;
}


var move1 = pickRandom();
var move2 = pickRandom();


document.querySelector('.img1').setAttribute('src',dices[move1]);
document.querySelector('.img2').setAttribute('src',dices[move2]);

if(move1 == move2){
  document.querySelector('h1').textContent = "Draw!";
}
else if(move1 > move2){
  document.querySelector('h1').textContent = "🚩 Player1 wins!";
}
else{
  document.querySelector('h1').textContent = "Player2 wins! 🚩";
}
