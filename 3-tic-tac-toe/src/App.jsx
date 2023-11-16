import { useState } from 'react';

function Board({xIsnext, squares, onPlay}) {
  
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextsquares = squares.slice();

    if (xIsnext === true) {
      nextsquares[i] = "X";
    } else {
      nextsquares[i] = "O";
    }
 
   onPlay(nextsquares);
  }

  const winner = calculateWinner(squares);
  let status = "";
  
  if(winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (xIsnext ? "X" : "O");
  }

  return (  
    <>
    <div className="status">{status}</div>
    <div className="board">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
      <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
      <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
      <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
      <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
      <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
      <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
    </div>  
  </>
  
  );
}

function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Game() {
  const[xIsnext, setXIsnext] = useState(true);
  const[history, setHistory] = useState([Array(9).fill(null)]);
  const[currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsnext(nextMove % 2 === 0);
  }

  function handlePlay(nextsquares) {
    const nextHistory = [...history.slice(0, currentMove + 1) , nextsquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1)
    setXIsnext(!xIsnext);
  }

  const moves = history.map((squares, move) => {
    let decsription = "";
    if(move > 0) {
      decsription = "Go to move #" + move;
    } else {
      decsription = "Go to game start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{decsription}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board  xIsnext={xIsnext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    //horizontal
    [0,1,2],
    [3,4,5],
    [6,7,8],

    //vertikal
    [0,3,6],
    [1,4,7],
    [2,5,8],

    //diagonal
    [0,4,8],
    [2,4,6],
  ];

  for(let z=0; z < lines.length; z++) {
    const a = lines[z][0];
    const b = lines[z][1];
    const c = lines[z][2];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return false;
}

//export default Board;
