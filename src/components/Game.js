import React, {useState} from 'react';
import Board from './Board';
import calculateWinner from './calculateWinner';
import '../App.css';

function Game () {
    const [history, setHistory] = useState([{squares : Array(9).fill(null)}]);
    const [stepNumber, setStepnumber] = useState(0);
    const [xIsNext, setXIsnext] = useState(true);
    
    const boardSize = 6;
    
    let [MB, setMB] = useState('')
    let [kittyA, setCountA] = useState(8)
    let [kittyB, setCountB] = useState(8)
    let [catA, setCatA] = useState(0)
    let [catB, setCatB] = useState(0)

    let aPlayer = 0;
    let bPlayer = 0;
    
    const handleClick = (i) => {
      const historycopy = history.slice(0, stepNumber + 1);
      const current = historycopy[historycopy.length - 1];
      const squares = current.squares.slice();
      
      if((xIsNext === true && (MB === 'b'|| MB ==='B')) || (xIsNext === false && (MB === 'a'||MB === 'A'))){
        setMB('c')
        alert("잘못누르셨습니다")
        return (
          <div className="game">
            <div className="game-board">
              <Board
                squares={current.squares}
                onClick={i => handleClick(i)}
                size={boardSize}
                count = {count}
                myButton = {MB}
              />
            </div>

            <div className="game-turn">
              <div>{status}</div>
              <ol>{moves}</ol>
            </div>
            
            <div className='game-score'>
              <table>
                <thead>
                  <tr><td>X</td><td>O</td></tr>
                </thead>

                <tbody>
                  <tr><td>{aPlayer}</td><td>{bPlayer}</td></tr>
                </tbody>
              </table>
            </div>

            <div>
              <div>
                <button onClick={()=>setMB(MB = 'a')}>KittyA</button>
                <button onClick={()=>setMB(MB = 'A')}>CatA</button>
                <button onClick={()=>setMB(MB = 'b')}>KittyB</button>
                <button onClick={()=>setMB(MB = 'B')}>CatB</button>
              </div>

              <div>
                <h1>KittyA: {kittyA}    KittyB: {kittyB}</h1>
                <h1>Cat A: {catA}      Cat B: {catB} </h1>
              </div>
            </div>
          </div>
        );
      } 
        
      if (calculateWinner(squares, boardSize) || squares[i]) {
        if(winner === 'X'){
          setCatA(catA += 1)
        }else{
          setCatB(catB += 1)
        };
      }

      if (xIsNext === true && MB === 'a'&& kittyA > 0 ) {
        setCountA(kittyA -= 1)
      }else if (xIsNext === false && MB === 'b' && kittyB > 0){
        setCountB(kittyB -= 1)
      }else if (xIsNext === true && MB === 'A') {
        setCatA(catA += 1)
      }else if (xIsNext === false && MB === 'B') {
        setCatB(catB += 1)
      }
        
      squares[i] = xIsNext ? "X" : "O";

      if (!squares[i+2]) {
        squares[i+2] = squares[i+1];
        squares[i+1] = "";
      }
      if (!squares[i-2]) {
        squares[i-2] = squares[i-1];
        squares[i-1] = "";
      }
      if (!squares[i+20]) {
        squares[i+20] = squares[i+10];
        squares[i+10] = "";
      }
      if (!squares[i-20]) {
        squares[i-20] = squares[i-10];
        squares[i-10] = "";
      }
      
      setHistory(historycopy.concat([{squares: squares}]));
      setXIsnext(!xIsNext);
      setStepnumber(history.length);
    }

    const jumpTo = (step) => {
      setStepnumber(step);
      setXIsnext((step % 2) === 0);
    }
  
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares, boardSize);
    const count = 100-history.length

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;

    if (winner) {
      status = 'Winner' + winner;
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
          squares={current.squares}
          onClick={i => handleClick(i)}
          size={boardSize}
          count = {count}
          myButton = {MB}
          />
        </div>

        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>

        <div>
          <div>
            <button onClick={()=>setMB(MB = 'a')}>KittyA</button>
            <button onClick={()=>setMB(MB = 'A')}>CatA</button>
            <button onClick={()=>setMB(MB = 'b')}>KittyB</button>
            <button onClick={()=>setMB(MB = 'B')}>CatB</button>
          </div>
            
          <div>
            <h1>KittyA: {kittyA}    KittyB: {kittyB}</h1>
            <h1>Cat A: {catA}      Cat B: {catB} </h1>
          </div>
        </div>
      </div>
    );
}

  export default Game;