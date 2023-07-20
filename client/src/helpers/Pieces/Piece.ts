export default class Piece {

    color: string;
    img: any;
    style: { backgroundImage: string; };
    lastMove: { row: number; col: number; };
    moveCount: number;
    type: string;

    constructor(color : string, img : any) {
        this.color = color;
        this.img = img;
        this.style = { backgroundImage: `url(${ img })`}
        // this.initialPosition = 
        this.lastMove = { row: -1, col: -1}
        this.moveCount = 0
        this.type = ''
    }
}