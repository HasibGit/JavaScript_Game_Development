// jshint esversion : 6

let board = new Array(9);

for(let i = 0;i < 9;i++){
  board[i] = new Array(9);
}


for(let i = 0;i < 9;i++){
  for(let j = 0;j < 9;j++){
    board[i][j] = -1;
  }
}

let turn = "player1";

const slots = document.querySelectorAll('.slot');
slots.forEach(slot => {
  slot.addEventListener('click', process);
});




function checkLeftDiagonals1(){


  let p = 0, q = 0;
  while(q <= 5){
    let i = p, j = q;
    while(i+3 < 9 && j+3 < 9){
      if(board[i][j] == 1 && board[i+1][j+1] == 1 && board[i+2][j+2] == 1 && board[i+3][j+3] == 1){
        return true;
      }
      i++;
      j++;
    }
    q++;
  }

  p = 1;
  q = 0;

  while(p <= 5){
    let i = p, j = q;
    while(i+3 < 9 && j+3 < 9){
      if(board[i][j] == 1 && board[i+1][j+1] == 1 && board[i+2][j+2] == 1 && board[i+3][j+3] == 1){
        return true;
      }
      i++;
      j++;
    }
    p++;
  }

  return false;

}



function checkRightDiagonals1(){
     let p = 3, q = 0;
     while(p < 9){
       let i = p,j = q;
       while(i-3 >= 0 && j+3 < 9){
         if(board[i][j] == 1 && board[i-1][j+1] == 1 && board[i-2][j+2] == 1 && board[i-3][j+3] == 1){
           return true;
         }
         i--;
         j++;
       }
       p++;
     }

     p = 8;
     q = 1;

     while(q <= 5){
       let i = p, j = q;
       while(i-3 >= 0 && j+3 < 9){
         if(board[i][j] == 1 && board[i-1][j+1] == 1 && board[i-2][j+2] == 1 && board[i-3][j+3] == 1){
           return true;
         }
         i--;
         j++;
       }
       q++;
     }
     return false;
}



function checkLeftDiagonals2(){


  let p = 0, q = 0;
  while(q <= 5){
    let i = p, j = q;
    while(i+3 < 9 && j+3 < 9){
      if(board[i][j] == 2 && board[i+1][j+1] == 2 && board[i+2][j+2] == 2 && board[i+3][j+3] == 2){
        return true;
      }
      i++;
      j++;
    }
    q++;
  }

  p = 1;
  q = 0;

  while(p <= 5){
    let i = p, j = q;
    while(i+3 < 9 && j+3 < 9){
      if(board[i][j] == 2 && board[i+1][j+1] == 2 && board[i+2][j+2] == 2 && board[i+3][j+3] == 2){
        return true;
      }
      i++;
      j++;
    }
    p++;
  }

  return false;

}



function checkRightDiagonals2(){
     let p = 3, q = 0;
     while(p < 9){
       let i = p,j = q;
       while(i-3 >= 0 && j+3 < 9){
         if(board[i][j] == 2 && board[i-1][j+1] == 2 && board[i-2][j+2] == 2 && board[i-3][j+3] == 2){
           return true;
         }
         i--;
         j++;
       }
       p++;
     }

     p = 8;
     q = 1;

     while(q <= 5){
       let i = p, j = q;
       while(i-3 >= 0 && j+3 < 9){
         if(board[i][j] == 2 && board[i-1][j+1] == 2 && board[i-2][j+2] == 2 && board[i-3][j+3] == 2){
           return true;
         }
         i--;
         j++;
       }
       q++;
     }
     return false;
}




function checkWinner(){

// For first player
    let first = false;
    let second = false;
    // For Every row
    for(let i = 0;i < 9;i++){
      for(let j = 0; j+3 < 9;j++){
        if(board[i][j] == 1 && board[i][j+1] == 1 && board[i][j+2] == 1 && board[i][j+3] == 1){
           first = true;
           break;
        }
      }
    }

    // For every column
    for(let j = 0;j < 9;j++){
      for(let i = 0;i+3 < 9;i++){
        if(board[i][j] == 1 && board[i+1][j] == 1 && board[i+2][j] == 1 && board[i+3][j] == 1){
          first = true;
          break;
        }
      }
    }

    if(!first){
      first = checkLeftDiagonals1();
    }

    if(!first){
      first = checkRightDiagonals1();
    }

  // For second player

  // For Every row
  for(let i = 0;i < 9;i++){
    for(let j = 0; j+3 < 9;j++){
      if(board[i][j] == 2 && board[i][j+1] == 2 && board[i][j+2] == 2 && board[i][j+3] == 2){
         second = true;
         break;
      }
    }
  }

  // For every column
  for(let j = 0;j < 9;j++){
    for(let i = 0;i+3 < 9;i++){
      if(board[i][j] == 2 && board[i+1][j] == 2 && board[i+2][j] == 2 && board[i+3][j] == 2){
        second = true;
        break;
      }
    }
  }

  if(!second){
    second = checkLeftDiagonals2();
  }

  if(!second){
    second = checkRightDiagonals2();
  }

  if(first){
    alert('Player 1 wins!');
    setTimeout(()=>{
        location.reload();
    },1000);

  }
  else if(second){
    alert('Player 2 wins!');
    setTimeout(()=>{
        location.reload();
    },1000);
  }

}


function checkDraw(){
  for(let j = 0;j < 9;j++){
    if(board[0][j] == -1){
      return false;
    }
  }
  return true;
}




function process(){
  let position = this.getAttribute('id');
  positionValue = parseInt(position);

  let column = positionValue % 10;
  let row = Math.floor(positionValue / 10);

  let isPossible = false;
  for(let i = 8; i >= 0; i--){
     if(board[i][column] === -1){
         isPossible = true;

         let slotPosition = ""+i+column;

         const slot = document.getElementById(slotPosition);

         slot.classList.add(turn);


         if(turn === "player1"){
           board[i][column] = 1;
           turn = 'player2';
         }
         else{
           board[i][column] = 2;
           turn = 'player1';
         }
         break;
     }
  }
  if(!isPossible){
    alert('Illegal move!');
  }
  else{
    setTimeout(()=>{
      checkWinner();
      let condition = checkDraw();
      if(condition){
        alert("It's a draw!");
        setTimeout(()=>{
            location.reload();
        },2000);
      }
    },500);

  }

  if(turn === 'player1'){
    document.querySelector('.player-turn').textContent = 'Turn : Player 1';
  }else{
    document.querySelector('.player-turn').textContent = 'Turn : Player 2';
  }

}
