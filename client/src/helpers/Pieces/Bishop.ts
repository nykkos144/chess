import Piece from "./Piece";

import King from "./King";

import bishop_white from '../../assets/icons/bishop_white.svg';
import bishop_black from '../../assets/icons/bishop_black.svg';

export default class Bishop extends Piece {
    constructor(color : string) {
        super(color, (color === 'white' ? bishop_white : bishop_black ));
    }

    validateMove = (startPos : any, endPos : any, grid : any, check = false) => {

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

        if (endPos.row === startPos.row) {
            return false;
        }
        if (endPos.col === startPos.col) {
            return false;
        }
        
        // console.log(Math.abs(endPos.row - startPos.row), Math.abs(endPos.col - startPos.col))
        if (Math.abs(endPos.row - startPos.row) !== Math.abs(endPos.col - startPos.col)) {
            return false;
        }


        if (endPos.col < startPos.col) {
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
            { row: -1, col: -1 },
            { row: -1, col: 1 },
            { row: 1, col: -1 },
            { row: 1, col: 1 },
        ];
      
        for (const direction of directions) {
            let row = pos.row + direction.row;
            let col = pos.col + direction.col;
        
            while (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {

                if (grid[row][col]) {
                    checkedPositions.push({ row, col });
                    break;
                }
            
                checkedPositions.push({ row, col });
                row += direction.row;
                col += direction.col;
            }
        }
        
        return checkedPositions;
    }

    getCheckedSave = (pos: any, grid: any) : any[] => {

        const checkedPositions: any[] = [];
      
        const directions = [
            { row: -1, col: -1 },
            { row: -1, col: 1 },
            { row: 1, col: -1 },
            { row: 1, col: 1 },
        ];
      
        for (const direction of directions) {
            let row = pos.row + direction.row;
            let col = pos.col + direction.col;
        
            while (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {

                if (grid[row][col]) {
                    if (grid[row][col].color === this.color) {
                        break;
                    }
                    checkedPositions.push({ row, col });
                    break;
                }
            
                checkedPositions.push({ row, col });
                row += direction.row;
                col += direction.col;
            }
        }
        
        return checkedPositions;
    }

    
}



