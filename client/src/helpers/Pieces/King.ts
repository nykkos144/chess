import Piece from "./Piece";

import king_white from '../../assets/icons/king_white.svg';
import king_black from '../../assets/icons/king_black.svg';
import { isKingChecked } from "../utils";

export default class King extends Piece {
    constructor(color : string) {
        super(color, (color === 'white' ? king_white : king_black ));
        // this.initialP
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


        if (endPos.row == startPos.row - 1 && endPos.col == startPos.col) {

            if (!this.validateKingPosition(startPos, endPos, grid)) {
                return false;
            }

            return true;
        }
        else if (endPos.row == startPos.row - 1 && endPos.col == startPos.col - 1) {

            if (!this.validateKingPosition(startPos, endPos, grid)) {
                return false;
            }

            return true;
        }
        else if (endPos.row == startPos.row && endPos.col == startPos.col - 1) {

            if (!this.validateKingPosition(startPos, endPos, grid)) {
                return false;
            }

            return true;
        }
        else if (endPos.row == startPos.row + 1 && endPos.col == startPos.col - 1) {

            if (!this.validateKingPosition(startPos, endPos, grid)) {
                return false;
            }

            return true;
        }
        else if (endPos.row == startPos.row + 1 && endPos.col == startPos.col) {

            if (!this.validateKingPosition(startPos, endPos, grid)) {
                return false;
            }

            return true;
        }
        else if (endPos.row == startPos.row + 1 && endPos.col == startPos.col + 1) {

            if (!this.validateKingPosition(startPos, endPos, grid)) {
                return false;
            }

            return true;
        }
        else if (endPos.row == startPos.row && endPos.col == startPos.col + 1) {

            if (!this.validateKingPosition(startPos, endPos, grid)) {
                return false;
            }

            return true;
        }
        else if (endPos.row == startPos.row - 1 && endPos.col == startPos.col + 1) {

            if (!this.validateKingPosition(startPos, endPos, grid)) {
                return false;
            }

            return true;
        }

        return false;
    }

    validateKingPosition(startPos : any, endPos : any, grid : any) {
        if (isKingChecked(startPos, endPos, grid, this.color)) {
            return false;
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
            const newRow = pos.row + direction.row;
            const newCol = pos.col + direction.col;
        
            if (
                newRow >= 0 &&
                newRow < grid.length &&
                newCol >= 0 &&
                newCol < grid[0].length &&
                (!grid[newRow][newCol] ||
                (grid[newRow][newCol] && grid[newRow][newCol].color !== pos.color))
            ) {
                checkedPositions.push({ row: newRow, col: newCol });
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
            const newRow = pos.row + direction.row;
            const newCol = pos.col + direction.col;
        
            if (
                newRow >= 0 &&
                newRow < grid.length &&
                newCol >= 0 &&
                newCol < grid[0].length &&
                (!grid[newRow][newCol] ||
                (grid[newRow][newCol] && grid[newRow][newCol].color !== this.color))
            ) {
                if (!this.validateKingPosition(pos, { row: newRow, col: newCol }, grid)) continue;
                checkedPositions.push({ row: newRow, col: newCol });
            }
        }
    
        return checkedPositions;
    }


}



