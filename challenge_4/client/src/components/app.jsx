import React from 'react';
import Board from './Board.jsx'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      board: Array(6).fill(0).map(x => Array(7).fill(0)),
      playerOne: 0,
      playerTwo: 0,
      turn: 'playerOne'
    }
  }

  addPiece(piece, arr,col){
    for(var i = arr.length-1; i>=0;i--){
      if(arr[i][col]===0){
        arr[i][col]= piece;
        return arr;
      }
    }
    alert('No more room');
    return arr;
  }

  toggle(x,y){
    console.log(x+" "+y)
    if(this.state.turn ==='playerOne'){
      var playOne = this.addPiece(1,this.state.board,y)
      this.setState({
        board: playOne,
        turn:'playerTwo'
      })
    }else if(this.state.turn ==='playerTwo'){
      var playTwo = this.addPiece(-1, this.state.board,y)
      this.setState({
        board: playTwo,
        turn: 'playerOne'
      })

    }
  }

  render(){
    return(
      <div align = 'center'>
        <div>
    <h1>Player 1 Score: {this.state.playerOne}</h1>
        </div>
        <div>
          <h1>Player 2 Score: {this.state.playerTwo}</h1>
        </div>
        <Board board = {this.state.board} onClick={this.toggle.bind(this)}/>
      </div>
    )
  }

}

export default App;