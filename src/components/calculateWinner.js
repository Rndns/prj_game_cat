function generateWinningLines(boardSize) {
    const lines = [];
    const boardWinsize = boardSize-3
    
    // 가로
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardWinsize; col++) {
            const horizontalLine = [];
            for (let j = 0; j < boardWinsize; j++) {
                horizontalLine.push(row * boardSize + col + j);
            }
            lines.push(horizontalLine);
        }
    }

    // 세로
    for (let col = 0; col < boardSize; col++) {
        for (let row = 0; row < boardWinsize; row++) {
            const verticalLine = [];
            for (let y = 0; y < boardWinsize; y++) {
                verticalLine.push((row + y) * boardSize + col);
            }
            lines.push(verticalLine);
        }
    }

    // 대각선
    for (let row = 0; row < boardSize-2; row++) {
        for (let x = 0; x < (boardWinsize + 1) ; x++) {
            const diagonal1 = [];
            const diagonal2 = [];
            for (let y = 0; y < boardWinsize; y++) {
                diagonal1.push((row + y) * boardSize + x + y );
                diagonal2.push((row + y) * boardSize + (boardSize -x -y -1));
            }
            lines.push(diagonal1);
            lines.push(diagonal2);
        }
    }
    
    return lines;
    
}

function calculateWinner(squares, boardSize) {
    const lines = generateWinningLines(boardSize);
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let first = squares[line[0]];
        if (first && line.every(index => squares[index] === first)) {
            window.print(line)
            return first;
        }
    }
    return null;
}

export default calculateWinner;