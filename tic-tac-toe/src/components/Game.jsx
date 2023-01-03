import React, { Component } from 'react'
import Board from './Board'

export default class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                },
            ],
            stepNumber:0,
            currentIsX: true,
        };
    }

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if(calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.currentIsX ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]), 
            stepNumber: history.length,
            currentIsX: !this.state.currentIsX
        });
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            currentIsX: (step%2)===0,
        })
    }

    render(){
        const history = this.state.history;
        const current = history[this.state.stepNumber];

        const moves = history.map((step, move) => {
            const description = move ? 'Go to move #' + move : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {description}
                    </button>
                </li>
            );
        });
        
        let winner = calculateWinner(current.squares);
        let status = 'Current Player - ' + (this.state.currentIsX ? 'X' : 'O');
        if(winner){
            status = 'Game Over';
            winner = 'The winner is: ' + winner;
        }
        return (
            <div className="Game">
                <div className="game-board">
                    <div className="status">{status}</div>
                    <Board
                        squares = {current.squares}
                        onClick = {(i) => this.handleClick(i)}
                    />
                    <div className="game-info">
                        <div>{winner}</div>
                        <ol>{moves}</ol>
                    </div>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares){
    const winLines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ];

    for(let i=0; i<winLines.length; i++){
      const [a,b,c] = winLines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a];
      }
    }
    return null;
}