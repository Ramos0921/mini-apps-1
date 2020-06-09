
//****** Player one ***************** */
  //prompt first player to enter name;
var personOne = prompt("Player one enter your Name: ");
  //use querySelector so target playerOne in scores table
var playerOne = document.querySelector('.playerOne');
  //change plyer one in table to the name of player promt
playerOne.innerHTML= personOne;

//****Player two************************* */

var personTwo = prompt("Player two enter your Name: ")
var playerTwo = document.querySelector('.playerTwo');
playerTwo.innerHTML= personTwo;



  //countOne and CountTwo used to keep players socres
  //set countone = 0;
var countOne = 0;
  //scorePlayerOne use querySelector to target value in table
var scorePlayerOne = document.querySelector('.scoreOne');
var countTwo = 0;
var scorePlayerTwo = document.querySelector('.scoreTwo');




    //create a variable to target the gameStatus class in HTML
var gameStatus = document.querySelector('.gameStatus')


    //gameOn is status of the game true= on gone false = play over;
var gameOn = true;

    //set a current player X: tic tac toe x player always starts first
var currentPlayer = "X";

    //board is an array of empty 9 strings represting the beginning of a clean board
var board = ['','','','','','','','',''];




    //palyerTurn function takes in a the currentplayer as a parameter
var playerTurn = function (player){
      //returns  a message in backtics; so it can be rendered to the dom
      //message will include player that is passed as parameter
      //if player is X assigne player to personOne = name;
      if(player === "X"){
        player = personOne;
      }
      //if player = O set player to personTwo = name;
      if(player === "O"){
        player = personTwo;
      }
      //return a message containing players name
  return `${player}'s TURN`;
};



  //winMessage takes in a player as a parameter
  //returns a message with the winning player
  //and adds a win to the count of player
var winMessage = function(player){
  //if the player is X
  if(player === "X"){
    //player = player one name
    player = personOne;
    //add one to the scoer
    countOne ++;
    //render the new count of player one
    scorePlayerOne.innerHTML= countOne;
  }
  //if player is O
  if(player === "O"){
    //set player you the name of player two
    player = personTwo;
    //add one win to the count of player two
    countTwo ++;
    //render the new score to player two score
    scorePlayerTwo.innerHTML= countTwo;
  }
  //return a message containing the current game winner
  return `${player} WON!!!`
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


  //playerChange function will change player turns
var playerChange = function(){
  //if current player is X set currentplayer to O
  if(currentPlayer==="X"){
    currentPlayer = "O";
  }else{
    //else current player is O and needs ot be X
    currentPlayer = "X";
  };
    //render to dom in gameStatus call Player Turn to set the turn to currentplayer and
    // grab the message that needs to be rendered
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
  for(var i = 0; i < winArray.length; i++){
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
      //render a winning message to dom with currentplayer
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
     return gameStatus.innerHTML = `TIE! CLEAR THE BOARD TO PLAY AGAIN!`
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




    //lost function takes in the current winning player and returns the losing player
    //used when resetting the board
    //loser will move first on the next game
var lost= function(player)
{
  if(player ==="X"){
    return "O"
  }
  if(player ==="O"){
    return "X"
  }
};


    //restartGameClick handles the click of a restart button
var restartGameClick = function(click){
      //set game to true
  gameOn=true;
     //reset current play to X
  currentPlayer = lost(currentPlayer);
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





    //add an event listener to the restart button
    // use .document.querySelecto('class') so select just the resatrt game button
var restart = document.querySelector('.gameRestart');
    //use. addEventListener('cick,method) to set an even listenter
restart.addEventListener('click',restartGameClick);


  //reset player scores will reset the players scores
var resetPlayerScores= function(){
      //countOne set to 0
      countOne = 0;
      //render score to dom
      scorePlayerOne.innerHTML= countOne;
      //countTwo set to 0
      countTwo= 0;
      //render score to table;
      scorePlayerTwo.innerHTML= countTwo;
}



  //resectScore targets the score reset button
var resestScores = document.querySelector('.scoreRestart');
  //add eventListen click and resetPlayerScores as parameters
resestScores.addEventListener('click',resetPlayerScores);