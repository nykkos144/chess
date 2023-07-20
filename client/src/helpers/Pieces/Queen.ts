import Piece from "./Piece";

import King from "./King";

import queen_white from '../../assets/icons/queen_white.svg';
import queen_black from '../../assets/icons/queen_black.svg';

export default class Queen extends Piece {
    constructor(color : string) {
        super(color, (color === 'white' ? queen_white : queen_black ));
    }

    validateMove(startPos : any, endPos : any, grid : any, check = false) {

        if (endPos.col === startPos.col && endPos.row === startPos.row) {
            return false;
        }
        if (grid[endPos.row][endPos.col] && grid[endPos.row][endPos.col].color === this.color) {
            return false;
        }

        if (!check) {
            if (grid[endPos.row][endPos.col] instanceof King) {
                return false;
            }
        }

        if (endPos.row != startPos.row && endPos.col != startPos.col && Math.abs(endPos.row - startPos.row) != Math.abs(endPos.col - startPos.col)) {
            return false;
        }


        if (endPos.row === startPos.row) {

            if (endPos.col < startPos.col) {
                for (let i = endPos.col + 1; i < startPos.col; i++) {
                    if (grid[endPos.row][i]) {
                        return false;
                    }
                }
            }
            else if (endPos.col > startPos.col) {
                for (let i = startPos.col + 1; i < endPos.col; i++) {
                    if (grid[endPos.row][i]) {
                        return false;
                    }
                }
            }

        }
        else if (endPos.col === startPos.col) {

            if (endPos.row < startPos.row) {
                for (let i = endPos.row + 1; i < startPos.row; i++) {
                    if (grid[i][endPos.col]) {
                        return false;
                    }
                }
            }
            else if (endPos.row > startPos.row) {
                for (let i = startPos.row + 1; i < endPos.row; i++) {
                    if (grid[i][endPos.col]) {
                        return false;
                    }
                }
            }

        }
        else if (endPos.col < startPos.col) {
            if (endPos.row < startPos.row) {
                for (let i = 1; i < Math.abs(endPos.row - startPos.row); i++) {
                    if (grid[startPos.row - i][startPos.col - i]) {
                        return false;
                    }
                }
            }
            if (endPos.row > startPos.row) {
                for (let i = 1; i < Math.abs(endPos.row - startPos.row); i++) {
                    if (grid[startPos.row + i][startPos.col - i]) {
                        return false;
                    }
                }
            }
        }
        else if (endPos.col > startPos.col) {
            if (endPos.row < startPos.row) {
                for (let i = 1; i < Math.abs(endPos.row - startPos.row); i++) {
                    if (grid[startPos.row - i][startPos.col + i]) {
                        return false;
                    }
                }
            }
            if (endPos.row > startPos.row) {
                for (let i = 1; i < Math.abs(endPos.row - startPos.row); i++) {
                    if (grid[startPos.row + i][startPos.col + i]) {
                        return false;
                    }
                }
            }
        }


        return true;
    }

    getChecked = (pos: any, grid: any) : any[] => {
        const checkedPositions: any[] = [];
      
        const directions = [
            { row: -1, col: -1 }, // top-left
            { row: -1, col: 0 }, // top
            { row: -1, col: 1 }, // top-right
            { row: 0, col: -1 }, // left
            { row: 0, col: 1 }, // right
            { row: 1, col: -1 }, // bottom-left
            { row: 1, col: 0 }, // bottom
            { row: 1, col: 1 }, // bottom-right
        ];
      
        for (const direction of directions) {
            let newRow = pos.row + direction.row;
            let newCol = pos.col + direction.col;
        
            while (
                newRow >= 0 &&
                newRow < grid.length &&
                newCol >= 0 &&
                newCol < grid[0].length
            ) {
                if (grid[newRow][newCol]) {
                    checkedPositions.push({ row: newRow, col: newCol });
                    break;
                }
            
                checkedPositions.push({ row: newRow, col: newCol });
            
                newRow += direction.row;
                newCol += direction.col;
            }
        }
      
        return checkedPositions;
    }
    
    getCheckedSave = (pos: any, grid: any) : any[] => {
        const checkedPositions: any[] = [];
      
        const directions = [
            { row: -1, col: -1 }, // top-left
            { row: -1, col: 0 }, // top
            { row: -1, col: 1 }, // top-right
            { row: 0, col: -1 }, // left
            { row: 0, col: 1 }, // right
            { row: 1, col: -1 }, // bottom-left
            { row: 1, col: 0 }, // bottom
            { row: 1, col: 1 }, // bottom-right
        ];
      
        for (const direction of directions) {
            let newRow = pos.row + direction.row;
            let newCol = pos.col + direction.col;
        
            while (
                newRow >= 0 &&
                newRow < grid.length &&
                newCol >= 0 &&
                newCol < grid[0].length
            ) {
                if (grid[newRow][newCol]) {
                    if (grid[newRow][newCol].color === this.color) {
                        break;
                    }
                    checkedPositions.push({ row: newRow, col: newCol });
                    break;
                }
            
                checkedPositions.push({ row: newRow, col: newCol });
            
                newRow += direction.row;
                newCol += direction.col;
            }
        }
      
        return checkedPositions;
    }
}



