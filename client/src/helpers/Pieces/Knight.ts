import Piece from "./Piece";

import King from "./King";

import knight_white from '../../assets/icons/knight_white.svg';
import knight_black from '../../assets/icons/knight_black.svg';

export default class Knight extends Piece {
    constructor(color : string) {
        super(color, (color === 'white' ? knight_white : knight_black ));
    }

    validateMove(startPos : any, endPos : any, grid : any, check = false) {

        if (endPos.col == startPos.col && endPos.row == startPos.row) {
            return false;
        }
        if (grid[endPos.row][endPos.col] && grid[endPos.row][endPos.col].color == this.color) {
            return false;
        }

        if (!check) {
            if (grid[endPos.row][endPos.col] instanceof King) {
                return false;
            }
        }

        if (endPos.row == startPos.row - 2 && endPos.col == startPos.col - 1) {
            return true;
        }
        else if (endPos.row == startPos.row - 2 && endPos.col == startPos.col + 1) {
            return true;
        }
        else if (endPos.row == startPos.row + 2 && endPos.col == startPos.col - 1) {
            return true;
        }
        else if (endPos.row == startPos.row + 2 && endPos.col == startPos.col + 1) {
            return true;
        }
        else if (endPos.col == startPos.col - 2 && endPos.row == startPos.row - 1) {
            return true;
        }
        else if (endPos.col == startPos.col - 2 && endPos.row == startPos.row + 1) {
            return true;
        }
        else if (endPos.col == startPos.col + 2 && endPos.row == startPos.row - 1) {
            return true;
        }
        else if (endPos.col == startPos.col + 2 && endPos.row == startPos.row + 1) {
            return true;
        }


        return false;


        // if (endPos.row != startPos.row && endPos.col != startPos.col) {
        //     return false;
        // }


        // if 


        // if (endPos.row == startPos.row) {

        //     if (endPos.col < startPos.col) {
        //         for (let i = endPos.col + 1; i < startPos.col; i++) {
        //             if (grid[endPos.row][i]) {
        //                 return false;
        //             }
        //         }
        //     }
        //     else if (endPos.col > startPos.col) {
        //         for (let i = startPos.col + 1; i < endPos.col; i++) {
        //             if (grid[endPos.row][i]) {
        //                 return false;
        //             }
        //         }
        //     }

        // }
        // else if (endPos.col == startPos.col) {

        //     if (endPos.row < startPos.row) {
        //         for (let i = endPos.row + 1; i < startPos.row; i++) {
        //             if (grid[i][endPos.col]) {
        //                 return false;
        //             }
        //         }
        //     }
        //     else if (endPos.row > startPos.row) {
        //         for (let i = startPos.row + 1; i < endPos.row; i++) {
        //             if (grid[i][endPos.col]) {
        //                 return false;
        //             }
        //         }
        //     }

        // }

        // return true;
    }

    getChecked = (pos: any, grid: any) : any[] => {
        
        const checkedPositions: any[] = [];
      
        const knightMoves = [
            { row: -2, col: -1 },
            { row: -2, col: 1 },
            { row: -1, col: -2 },
            { row: -1, col: 2 },
            { row: 1, col: -2 },
            { row: 1, col: 2 },
            { row: 2, col: -1 },
            { row: 2, col: 1 },
        ];
      
        for (const move of knightMoves) {
            const newRow = pos.row + move.row;
            const newCol = pos.col + move.col;
        
            if (
                newRow >= 0 &&
                newRow < grid.length &&
                newCol >= 0 &&
                newCol < grid[0].length
            ) {
                checkedPositions.push({ row: newRow, col: newCol });
            }
        }
      
        return checkedPositions;
    }

    getCheckedSave = (pos: any, grid: any) : any[] => {
        
        const checkedPositions: any[] = [];
      
        const knightMoves = [
            { row: -2, col: -1 },
            { row: -2, col: 1 },
            { row: -1, col: -2 },
            { row: -1, col: 2 },
            { row: 1, col: -2 },
            { row: 1, col: 2 },
            { row: 2, col: -1 },
            { row: 2, col: 1 },
        ];
      
        for (const move of knightMoves) {
            const newRow = pos.row + move.row;
            const newCol = pos.col + move.col;
        
            if (
                newRow >= 0 &&
                newRow < grid.length &&
                newCol >= 0 &&
                newCol < grid[0].length
            ) {
                if (grid[newRow][newCol] && grid[newRow][newCol].color === this.color) {
                    continue;
                }
                checkedPositions.push({ row: newRow, col: newCol });
            }
        }
      
        return checkedPositions;
    }
}



