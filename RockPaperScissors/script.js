

var myChoice;
var botChoice;

function pickRandom(min,max){
  var value = Math.floor(Math.random() * (max - min + 1)) + min;
  return value;
}

function determineWinner(myChoice,botChoice){
  var verdict = calculateScore(myChoice,botChoice);
  return verdict;
}


function calculateScore(myChoice,botChoice){
  var result;
  if(myChoice === "rock"){
    if(botChoice === "rock"){
       result = "draw";
    }
    else if(botChoice === "paper"){
        result = "bot";
    }
    else if(botChoice === "scissors"){
        result = "human";
    }
  }
  else if(myChoice === "paper"){
    if(botChoice === "rock"){
        result = "human";
    }
    else if(botChoice === "paper"){
       result = "draw";
    }
    else if(botChoice === "scissors"){
       result = "bot";
    }
  }
  else if(myChoice === "scissors"){
    if(botChoice === "rock"){
        result = "bot";
    }
    else if(botChoice === "paper"){
        result = "human";
    }
    else if(botChoice === "scissors"){
        result = "draw";
    }
  }
  return result;
}


function deleteChoiceBox(){
  var div = document.getElementById('choiceBox');
  div.remove();
}


function showResult(myChoice,botChoice,outcome){

  var humanPicked = new Image();
  var botPicked = new Image();
  humanPicked.src = document.getElementById(myChoice).src;
  botPicked.src = document.getElementById(botChoice).src;
  deleteChoiceBox();

  humanPicked.className = "humanImage";
  botPicked.className = "botImage";



  var div1 = document.createElement('div');

  div1.className = 'col-md-12';

  div1.appendChild(humanPicked);

  var div2 = document.createElement('div');

  div2.className = 'col-md-12';

  div2.appendChild(botPicked);

  var message = document.createElement('h1');

  if(outcome === 'human'){
    message.innerHTML = 'You Win!';
    message.style.color = 'green';
  }

  else if(outcome === 'bot'){
    message.innerHTML = 'Bot Wins..';
    message.style.color = 'red';
  }

  else if(outcome === 'draw'){
    message.innerHTML = "It's a draw!";
    message.style.color = 'yellow';
  }

  var div3 = document.createElement('div');
  div3.className = 'col-md-12';
  div3.style.textAlign = 'center';

  div3.append(message);



  var div = document.getElementById('resultBox');

  div.appendChild(div1);
  div.appendChild(div3);
  div.appendChild(div2);
  document.getElementById('resetButton').style.display = 'block';
}



function humanChoice(choice){
  if(choice.id == 'rock'){
    myChoice = "rock";
  }
  else if(choice.id == 'paper' ){
    myChoice = "paper";
  }
  else if(choice.id == 'scissors'){
    myChoice = "scissors";
  }

  var randomValue = pickRandom(1,3);
  if(randomValue === 1){
    botChoice = "rock";
  }
  else if(randomValue === 2){
    botChoice = "paper";
  }
  else if(randomValue === 3){
    botChoice = "scissors";
  }
//  console.log(myChoice + " " + botChoice);

// delete choiceBox

  var outcome = determineWinner(myChoice,botChoice);

//  console.log(myChoice + " " + botChoice + " " + outcome);
  showResult(myChoice,botChoice,outcome);

}
