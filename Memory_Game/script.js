// jshint esversion : 6

const grid = document.querySelector('.grid');

let matchArray = [];
let indices = [];
let cardsWon = 0;

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

let cards = [
  {
    name : 'goldberg',
    src : 'images/goldberg.png',
    index : -1
  },
  {
    name : 'goldberg',
    src : 'images/goldberg.png',
    index : -1
  },
  {
    name : 'batista',
    src : 'images/batista.png',
    index : -1
  },
  {
    name : 'batista',
    src : 'images/batista.png',
    index : -1
  },
  {
    name : 'brock',
    src : 'images/brock.png',
    index : -1
  },
  {
    name : 'brock',
    src : 'images/brock.png',
    index : -1
  },
  {
    name : 'randy',
    src : 'images/randy.png',
    index : -1
  },
  {
    name : 'randy',
    src : 'images/randy.png',
    index : -1
  },
  {
    name : 'jerico',
    src : 'images/jerico.png',
    index : -1
  },
  {
    name : 'jerico',
    src : 'images/jerico.png',
    index : -1
  },
  {
    name : 'cena',
    src : 'images/cena.png',
    index : -1
  },
  {
    name : 'cena',
    src : 'images/cena.png',
    index : -1
  },
];

cards = shuffle(cards);

for(let i = 0;i < cards.length;i++){
  cards[i].index = i;
}


for(let i = 0;i < cards.length;i++){
  let card = document.createElement('img');
  card.setAttribute('src', 'images/locked.jpg');
  card.setAttribute('data-id', cards[i].index);
  card.addEventListener('click', flipCard);
  grid.appendChild(card);
}




function gameOver(){
  alert('Found All Matches!');
  setTimeout(()=>{
    location.reload();
  },1000);
}

function checkMatch(){
  let cards = document.querySelectorAll('img');
      if(matchArray[0] === matchArray[1]){
         alert('Found Match!');
         cards[indices[0]].setAttribute('src','images/done.png');
         cards[indices[1]].setAttribute('src','images/done.png');
         cardsWon += 2;
         if(cardsWon === 12){
           gameOver();
           return;
         }
      }
      else{
        alert("Sorry, try again..");
        cards[indices[0]].setAttribute('src','images/locked.jpg');
        cards[indices[1]].setAttribute('src','images/locked.jpg');
      }
      matchArray = [];
      indices = [];
}

function flipCard(){
    let cardId = this.getAttribute('data-id');
    this.src = cards[cardId].src;
    matchArray.push(cards[cardId].name);
    indices.push(cardId);
    if(matchArray.length === 2){
      setTimeout(()=>{
        checkMatch();
      },500);
    }
}
