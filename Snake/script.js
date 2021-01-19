// jshint esversion : 6

document.addEventListener('DOMContentLoaded', () => {

  const squares = document.querySelectorAll('.grid div'); // get all the squares in grid as array
  const scoreDisplay = document.querySelector('span');
  const startBtn = document.querySelector('.start');

  const width = 10;  // every grid row has 10 divs
  let currentIndex = 0; // first div in our grid
  let appleIndex = 0; //  first div in our grid
  let currentSnake = [2,1,0]; //  2 defines head, 0 defines tail, all 1's define body

  let direction = 1;
  let score = 0;
  let speed = 0.9;
  let intervalTime = 0;
  let interval = 0;
  // initializing every necessary variable

// to start and restart game

function startGame(){
  currentSnake.forEach(index => squares[index].classList.remove('snake') ); // removing snake
  squares[appleIndex].classList.remove('apple'); // removing apple
  clearInterval(interval); // stops calling moveOutcomes
  score = 0;

  direction = 1;
  scoreDisplay.innerText = score;
  intervalTime = 600; // every 600ms, moveOutcomes will get called
  currentSnake = [2,1,0]; // reinitializing snake, 0-2 index is snake
  currentIndex = 0;
  currentSnake.forEach(index => squares[index].classList.add('snake')); // make snake
  randomApple(); // generate an apple
  interval = setInterval(moveOutcomes, intervalTime); // call moveoutcomes after every 600ms, we set this at variable interval
                                                      // so we can pass interval to clearInterval to stop moveOutcomes execution
}

// function that deals with all outcomes of the game

function moveOutcomes(){
  // snake hitting border or itself

  if(
    (currentSnake[0] + width >= (width * width) && direction === width) || // if snake hits bottom (if i add a row to the head of snake and it crosses)
                                                                            // bottom border
    (currentSnake[0] % width === width - 1 && direction === 1) || // if snake hits right, head is end of row and dir is right
    (currentSnake[0] % width === 0 && direction === -1 ) || // if snake hits left , head is at 0, dir is left
    (currentSnake[0] - width < 0 && direction === -width) || // if snake hits top, dir is up
    squares[currentSnake[0] + direction].classList.contains('snake') // if snake goes into itself
  ){
    alert('You Died');
    return clearInterval(interval); // stops calling moveOutcomes
  }

  const tail = currentSnake.pop(); // removes last item of the array and shows it
  squares[tail].classList.remove('snake'); // removes snake class from tail of snake
  currentSnake.unshift(currentSnake[0] + direction); // gives direction to the head of the snake, adds a new head based on direction


  // deals with snake getting apple
  if(squares[currentSnake[0]].classList.contains('apple')){
    squares[currentSnake[0]].classList.remove('apple');
    squares[tail].classList.add('snake');
    currentSnake.push(tail); // appends tail at the end of snake array
    // random apple

    randomApple();
    score++;
    scoreDisplay.textContent = score;
    clearInterval(interval); // clear current interval
    intervalTime = intervalTime  * speed; // increase moveOutcomes calling speed so snake speed increases, will happen for every time apple is eaten
    interval = setInterval(moveOutcomes, intervalTime); // start calling moveOutcomes with new intervalTime
  }

  squares[currentSnake[0]].classList.add('snake'); // update grid square as apple is eaten
}


// generate random apple function

function randomApple(){
  do{
    appleIndex = Math.floor(Math.random() * squares.length);
  }while(squares[appleIndex].classList.contains('snake'));  // while index does not have snake class
  squares[appleIndex].classList.add('apple');
}






  // assign functions to keycodes

  function control(e){
    squares[currentIndex].classList.remove('snake');
    if(e.keyCode === 39){
      direction = 1; // if we press right arrow key, snake will go right
    }
    else if(e.keyCode === 38){
      direction = -width; // move to prev row, each row has 10 divs
    }
    else if(e.keyCode === 37){
      direction = -1; // if we press left arrow, snake will go left one div
    }
    else if(e.keyCode === 40){
      direction = +width; // if we press down, snake moves to next row
    }
  }

  document.addEventListener('keyup', control);

  startBtn.addEventListener('click', startGame);



});
