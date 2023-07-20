import King from "./Pieces/King";

export const formatTime = (minutes : number, seconds : number) : string => {

    if (minutes >= 60) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(remainingMinutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        return `${ formattedHours } : ${ formattedMinutes } : ${ formattedSeconds }`;
    }

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${ formattedMinutes } : ${ formattedSeconds }`;

}



// export const calculateLevel = (xp : number) => {
  
//     let remainingXp = xp;
//     let level = 0;
//     let xpNeededToProgress = 200;
  
//     while (remainingXp >= xpNeededToProgress) {
//         remainingXp -= xpNeededToProgress;
//         level++;
//         if (level < 5) {
//             xpNeededToProgress = 200;
//         } else {
//             xpNeededToProgress += 200;
//         }
//     }
  
//     return [level, remainingXp + 200 * level, xpNeededToProgress * level];
// }

export const calculateLevel = (xp : number) => {
  
    // let remainingXp = xp;
    // let level = 0;
    // let xpNeededToProgress = 200;
  
    const level = Math.floor(xp / 200);
    const remainingXp = xp % 200;
  
    return [level, remainingXp, 200];
}





// export const levelEnds = (xp: number): [number, number] => {
//     let level = 0;
//     let xpNeededToProgress = 200;
  
//     while (xp >= xpNeededToProgress) {
//         xp -= xpNeededToProgress;
//         level++;
//         if (level >= 5) {
//             xpNeededToProgress += 200;
//         }
//     }
  
//     const bottomEnd = level === 0 ? 0 : (level - 1) * 200;
//     const topEnd = level * 200;
  
//     return [bottomEnd, topEnd];
// };



export const isKingChecked = (startPos : any, endPos : any, grid : any, color : string) => {

    let tempGrid : any = [];
    for (let i = 0; i < grid.length; i++) {
        tempGrid.push([...grid[i]]);
    }

    tempGrid[endPos.row][endPos.col] = tempGrid[startPos.row][startPos.col]
    tempGrid[startPos.row][startPos.col] = null;
  
    tempGrid = rotateChessBoard(tempGrid);
    startPos = rotateCords(startPos);
    endPos = rotateCords(endPos);

    let kingPos;

    for (let i = 0; i < tempGrid.length; i++) {
        for (let j = 0; j < tempGrid[i].length; j++) {
            const piece = tempGrid[i][j];
            if (piece && piece.color === color && piece instanceof King) {
                kingPos = {
                    row: i,
                    col: j
                }
                break;
            }
        }
    }


    for (let i = 0; i < tempGrid.length; i++) {
        for (let j = 0; j < tempGrid[i].length; j++) {

            const piece = tempGrid[i][j];

            if (!piece) continue;
            if (piece.color === color) continue;
            if (piece instanceof King) continue;
            
            if (piece.validateMove({ row: i, col: j }, kingPos, tempGrid, true)) {
                return true;
            }

        }
    }

    return false;
}

export const isKingCheckedGrid = (grid : any, color : any) => {
    
    grid = rotateChessBoard(grid);

    let kingPos;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const piece = grid[i][j];
            if (piece && piece.color === color && piece instanceof King) {
                kingPos = {
                    row: i,
                    col: j
                }
                break;
            }
        }
    }


    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {

            const piece = grid[i][j];

            if (!piece) continue;
            if (piece.color === color) continue;
            if (piece instanceof King) continue;
            
            if (piece.validateMove({ row: i, col: j }, kingPos, grid, true)) {
                return true;
            }

        }
    }

    return false;

}


export const rotateChessBoard = (board: any[][]) : any[][] => {
    const rotatedBoard = board.map((row) => [...row]); // Create a copy of the original board
  
    // Reverse each row
    rotatedBoard.forEach((row) => row.reverse());
  
    // Transpose the board
    for (let i = 0; i < rotatedBoard.length; i++) {
      for (let j = 0; j < i; j++) {
        const temp = rotatedBoard[i][j];
        rotatedBoard[i][j] = rotatedBoard[j][i];
        rotatedBoard[j][i] = temp;
      }
    }
  
    return rotatedBoard;
}

export const rotateCords = (cords : any) => {
    return {
        row: 7 - cords.row,
        col: 7 - cords.col
    }
}


