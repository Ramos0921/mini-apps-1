
var personOne = prompt("Player one enter your Name: ")
var playerOne = document.querySelector('.playerOne');
playerOne.innerHTML= personOne;

var personTwo = prompt("Player two enter your Name: ")
var playerTwo = document.querySelector('.playerTwo');
playerTwo.innerHTML= personTwo;

var countOne = 0;
var scorePlayerOne = document.querySelector('.scoreOne');
var countTwo = 0;
var scorePlayerTwo = document.querySelector('.scoreTwo');

    //create a variable to target the gameStatus class in HTML
    //use document.querySelector('.classname) takes a class name as parameter
var gameStatus = document.querySelector('.gameStatus')


    //gameOn i status of the get true= on false = off;
var gameOn = true;
    //set a current player X: tic tac toe x player always starts first
var currentPlayer = "X";

    //openBoard is an array of empty 9 strings represting the beginning of a clean board
var board = ['','','','','','','','',''];

    //palyerTurn function takes in a the currentplayer as a parameter
var playerTurn = function (player){
      //returns  a message in backtics; so it can be rendered to the dom
      //message will include player that is passed as parameter
      if(player === "X"){
        player = personOne;
      }
      if(player === "O"){
        player = personTwo;
      }

  return `IT IS YOUR TURN ${player}`;
};

var winMessage = function(player){

  if(player === "X"){
    player = personOne;
    countOne ++;
    scorePlayerOne.innerHTML= countOne;
  }
  if(player === "O"){
    player = personTwo;
    countTwo ++;
    scorePlayerTwo.innerHTML= countTwo;
  }


  return `${player} WON!!! PLAY AGAIN!`
}

    //use .innerHTML to render a message to HTML page under class .gameStatus
    //gameStatus was delcared at top of page targeting .gameStatus class: which is an h2 element
    //will display below the board
    //with whos turn to move it is
gameStatus.innerHTML = playerTurn(currentPlayer);

    //event listener functions
var squarePlayed = function(clickedSquare, index)
{
      //in openBoard array set current play to the index of the click
      board[index]= currentPlayer;
      //render current player to our dom
      //set that target property in our click event object to the current player
                //if square 2 was clicked an x will be added in the div corresponding to 2
                //see below                               **here***
      //example:<div data-square-index="2" class = "square"> X </div>
  clickedSquare.target.innerHTML= currentPlayer;
};

var playerChange = function(){
  if(currentPlayer==="X"){
    currentPlayer = "O";
  }else{
    currentPlayer = "X";
  };
  gameStatus.innerHTML = playerTurn(currentPlayer);
};
    //winArray contains all the winning possibities of a simple 3x3 tic tac toe game
var winArray = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

     //check play is where the tic tok logic happens will be invoked every time there is
     //a click on the board
var checkPlay = function(){
      //set state to false
      // if gameState= true there square selected was a winning move
  var winningState = false;
      //for loop to iterate through winArray possiblities
  for(var i = 0; i<winArray.length; i++){
      //win is set to one winning combination at a time
    var win = winArray[i];
      //checkOne will be set to the index 0 of winning combo: win[0]= 0,3,6,0,1,2,0,2
      //this possiblities will be check on the board
    var checkOne = board[win[0]];
      //checkTwo will be set to the index 1 of winning combo: win[1]= 1,4,7,3,4,5,4,4
       //this possiblities will be check on the board
    var checkTwo = board[win[1]];
      //checkThree will be set to the index 2 of winning combo: win[2]= 2,5,8,6,7,8,8,6
      //this possiblities will be check on the board
    var checkThree = board[win[2]];

      //if any of the check is an empty string continue
    if(checkOne ==='' || checkTwo === ''||checkThree===''){
      continue;
    }
      //if checkone = checktwo and checktwo = checkthree
      //set winning state to true
    if(checkOne === checkTwo && checkTwo === checkThree){
      winningState = true;
    }
       //if winning start is true current player won
    if(winningState){
      //render to dom the winning message
      gameStatus.innerHTML = winMessage(currentPlayer);
        //set gameOn to false because the game is over
      gameOn=false;
        //return
      return;
    }

      //tie will just the .includes to check if the board array includes('');
      //when the board is full and no winner has been declared
      // includes will return false and the negation will make tie true;
    var tie = !board.includes('');
      //if tie is true the game is a tie
    if(tie){
      //return a tie message to the dom
     return gameStatus.innerHTML = `THE GAME IS A DRAW! PLAY AGAIN!`
    }


  }
  //invoke playerchange to change current player
  playerChange();
};

      //handleSquareClick takes in a cliick event as a parameter
var handleSquareClick = function(click){
      //inside of the click event is a mouseEven obejct
      //inside the object is a target property: which is an object
      //inside the target object there is a an attribute property
      //inside of proerty there is a value key which contains the value of the data-square-indext
      //to make the process easy use getAttribute
      //use Number to turn the retrieved attribute into a number in java also can use parseInt()
  var squareClicked = Number(click.target.getAttribute('data-square-index'));

      //if openBoard[at number] is not an open string
      //or gameOn activity is false
      //return
  if(board[squareClicked] !== "" || !gameOn){
    return;
  }
      //invoke square played with the click event and the number of square that was clicked
      //this will set an X or O in the sqaure clicked
  squarePlayed(click,squareClicked);
      //invoke checkPlay to check if the play is winning play or a draw or a lose
  checkPlay();
};

    //restartGameClick handles the click of a restart button
var restartGameClick = function(click){
      //set game to true
  gameOn=true;
     //reset current play to X

  currentPlayer = player;
      //clear the open board in our JS
  board = ['','','','','','','','',''];
      //change the rendered message on our dom to the reset current player
  gameStatus.innerHTML = playerTurn(currentPlayer);
      //clearBoard is an array containg all the suqares of our dom board
  var clearBoard = document.querySelectorAll('.square');
      //iterage through the dom Game board
  for(var i = 0; i<clearBoard.length; i++){
      //set each square to an open string
      clearBoard[i].innerHTML ="";
  };

};

    //add eventlistener to every square in the board
    //document.querySelectorALl returns an array containing all the squares
var squares = document.querySelectorAll('.square');
    //use a forloop to iterate through each square in the squares array
for(var i = 0; i<squares.length; i++){
      //add event listner to every square with addEvenListener('click',method to handle click);
  squares[i].addEventListener('click',handleSquareClick);
};
    //document.querySelectorAll('.square').forEach(square => square.addEventListener('click',handleSquareClick));

    //add an event listener to the restart button
    // use .document.querySelecto('class') so select just the resatrt game button
var restart = document.querySelector('.gameRestart');
    //use. addEventListener('cick,method) to set an even listenter
restart.addEventListener('click',restartGameClick);
    //document.querySelector('.gameRestart').addEventListener('click',restartGameClick)

var resetPlayerScores= function(){
      countOne = 0;
      scorePlayerOne.innerHTML= countOne;
      countTwo= 0;
      scorePlayerTwo.innerHTML= countTwo;
}

var resestScores = document.querySelector('.scoreRestart');
resestScores.addEventListener('click',resetPlayerScores);