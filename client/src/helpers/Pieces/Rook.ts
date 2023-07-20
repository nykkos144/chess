import Piece from "./Piece";

import King from "./King";

import rook_white from '../../assets/icons/rook_white.svg';
import rook_black from '../../assets/icons/rook_black.svg';


export default class Rook extends Piece {
    constructor(color : string) {
        super(color, (color === 'white' ? rook_white : rook_black ));
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

        if (endPos.row !== startPos.row && endPos.col !== startPos.col) {
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

        return true;
    }

    getChecked = (pos: any, grid: any) : any[] => {

        const checkedPositions: any[] = [];
      
        const directions = [
            { row: -1, col: 0 }, // up
            { row: 1, col: 0 }, // down
            { row: 0, col: -1 }, // left
            { row: 0, col: 1 }, // right
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
            { row: -1, col: 0 }, // up
            { row: 1, col: 0 }, // down
            { row: 0, col: -1 }, // left
            { row: 0, col: 1 }, // right
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



