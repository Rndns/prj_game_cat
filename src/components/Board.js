import React from 'react';
import Square from './Square';

function Board ({ size, squares, onClick, count, myButton }) {
  
  const renderSquare = (i) => {
    return (
      <Square
        key={i}
        num={i}
        nums={squares[i]}
        onClick={() => onClick(i)}
        counts = {count}
        myButton = {myButton}
      />
    );
  };

  const board = [];

  for (let row = 0; row < size; row++) {
    let boardRow = [];

    for (let col = 0; col < size; col++) {
      boardRow.push(renderSquare(row * 10 + col));
    }

    board.push(
      <div key={row} className="board-row">
        {boardRow}
      </div>
    );
  }

  return (
      <div>
        <div>
          {board}
        </div>
      </div>
  );
};

export default Board;