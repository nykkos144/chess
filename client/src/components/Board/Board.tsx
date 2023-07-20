import { useEffect, useRef, useState } from 'react';
import './Board.css';
import { isKingChecked } from '../../helpers/utils';

const Square = (props : any) => {

    const node = props.node ? JSON.parse(props.node) : null;

    return (
        <div key={ props.i + '' + props.j } className={ 'square ' + props.color + ' ' + (node ? 'piece' : '') + ' ' + props.player }>
            
            { node && (
                <div key={ props.i + '' + props.j } style={{ backgroundImage: `url(${ node.img })` }}></div>
            )}

        </div> 
    )
}

const Board = ({ grid, pieceMoveCallback, color, turn } : any) => {

    const boardRef : any = useRef();

    const [dragging, setDragging] : any = useState(false);
    const [activePiece, setActivePiece] : any = useState(false);
    const [activePiecePos, setActivePiecePos] : any = useState(false);

    // let dragging : boolean = false;
    // let activePiece : any = null;
    // let activePiecePos : any = null;

    useEffect(() => {

        window.addEventListener('mousemove', (e : any) => {
            e.preventDefault();

            if (!dragging) {
                return;
            }
            if (!activePiece) {
                return;
            }
            
            if (e.target.classList.contains('square')) {
                return;
            }
    
            const x = e.clientX;
            const y = e.clientY;
    
            activePiece.style.left = `${ x - 13 }px`;
            activePiece.style.top = `${ y - 13 }px`;
    
        });

        window.addEventListener('mouseup', (e : any) => {

            if (!dragging) {
                return;
            }
            if (!activePiece) {
                return;
            }
            
            if (e.target.classList.contains('square')) {
                return;
            }

            activePiece.classList.remove('drag');
            setDragging(false);

        });


    }, [dragging, activePiece, activePiecePos]);

    const handleMouseDown = (e : any) => {
        
        e.preventDefault();

        if (!e.target.classList.contains('piece')) {
            return;
        }
        
        const boardSize = boardRef.current.clientHeight;

        
        const row = Math.floor((e.clientY - boardRef.current.offsetTop) / (boardSize / 8));
        const col = Math.floor((e.clientX - boardRef.current.offsetLeft) / (boardSize / 8));

        if (grid[row][col].color !== color) {
            return;
        }

        setDragging(true);
        
        const piece : any = e.target.getElementsByTagName('div')[0];

        const x = e.clientX;
        const y = e.clientY;

        piece.classList.add('drag');

        const squareSize = boardSize / 8 - 40;

        piece.style.left = `${ x - squareSize / 2 }px`;
        piece.style.top = `${ y - squareSize / 2 }px`;

        setActivePiece(piece);
        setActivePiecePos({row, col});

    }

    const handleMouseMove = (e : any) => {

        if (!dragging) {
            return;
        }
        if (!activePiece) {
            return;
        }
        
        const boardSize = boardRef.current.clientHeight;

        const x = e.clientX;
        const y = e.clientY;

        const squareSize = boardSize / 8 / 2;
        
        activePiece.style.left = `${ x - squareSize / 2 }px`;
        activePiece.style.top = `${ y - squareSize / 2 }px`;

    }

    const handleMouseUp = (e : any) => {

        e.preventDefault();

        if (!dragging) {
            return;
        }
        if (!activePiece) {
            return;
        }

        const boardSize = boardRef.current.clientHeight;
        
        const row = Math.floor((e.clientY - boardRef.current.offsetTop) / (boardSize / 8));
        const col = Math.floor((e.clientX - boardRef.current.offsetLeft) / (boardSize / 8));

        const piece = grid[activePiecePos.row][activePiecePos.col];

        activePiece.classList.remove('drag');

        setDragging(false);

        if (turn !== color) return;
        if (!piece) return;


        if (piece.validateMove(activePiecePos, { row, col }, grid)) {

            if (isKingChecked(activePiecePos, { row, col }, grid, color)) {
                console.log('check');
                return;
            }

            piece.moveCount++;
            pieceMoveCallback(activePiecePos, {row, col});
        }
        
    }


    let board = [];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            board.push(<Square key={i + '' + j }
                        row={ i }
                        col={ j }
                        node={ grid[i][j] ? JSON.stringify(grid[i][j]) : null }
                        color={ (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))? "light" : "dark" }
                        player={ grid[i][j] && (color === grid[i][j].color ? 'you' : 'opponent') }
                    />);
        }
    }

    return (
        <div className='board' ref={ boardRef } onMouseDown={ handleMouseDown } onMouseMove={ handleMouseMove } onMouseUp={ handleMouseUp }>
            { board }
        </div>
    )
}

function isEven(num : number){
    return num % 2 == 0
}


export default Board;