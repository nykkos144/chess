import Piece from "./Piece";

import King from "./King";

import pawn_white from '../../assets/icons/pawn_white.svg';
import pawn_black from '../../assets/icons/pawn_black.svg';

export default class Pawn extends Piece {
    constructor(color : string) {
        super(color, (color === 'white' ? pawn_white : pawn_black ));
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

        if (endPos.row >= startPos.row) {
            return false;
        }
        if (endPos.row == startPos.row) {
            return false;
        }
        if (endPos.row < startPos.row - 2) {
            return false;
        }


        if (endPos.col == startPos.col) {
            if (endPos.row == startPos.row - 1 && !grid[endPos.row][endPos.col]) {
                return true;
            }
            else if (endPos.row == startPos.row - 2 && this.moveCount == 0 && !grid[endPos.row][endPos.col]) {
                return true;
            }
        }
        else if (endPos.col == startPos.col - 1 && endPos.row == startPos.row - 1 && grid[endPos.row][endPos.col]) {
            return true;
        }
        else if (endPos.col == startPos.col + 1 && endPos.row == startPos.row - 1 && grid[endPos.row][endPos.col]) {
            return true;
        }

        return false;
    }

    getChecked = (pos: any, grid: any) : any[] => {

        const checkedPositions: any[] = [];
      
        // const opponentDirection = pos.color === 'white' ? 1 : -1;
        const opponentDirection = 1;
        const checkDirections = [
            { row: opponentDirection, col: -1 }, // diagonal left
            { row: opponentDirection, col: 1 }, // diagonal right
        ];
      
        for (const direction of checkDirections) {
            const newRow = pos.row + direction.row;
            const newCol = pos.col + direction.col;
        
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
      
        const opponentDirection = 1;
        const checkDirections = [
            { row: opponentDirection, col: -1 }, // diagonal left
            { row: opponentDirection, col: 1 }, // diagonal right
        ];
      
        for (const direction of checkDirections) {
            const newRow = pos.row + direction.row;
            const newCol = pos.col + direction.col;
        
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



