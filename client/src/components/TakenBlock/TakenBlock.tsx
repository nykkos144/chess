import './TakenBlock.css';

import pawn_white from '../../assets/icons/pawn_white.svg';
import rook_white from '../../assets/icons/rook_white.svg';
import knight_white from '../../assets/icons/knight_white.svg';
import bishop_white from '../../assets/icons/bishop_white.svg';
import queen_white from '../../assets/icons/queen_white.svg';
import king_white from '../../assets/icons/king_white.svg';

import pawn_black from '../../assets/icons/pawn_black.svg';
import rook_black from '../../assets/icons/rook_black.svg';
import knight_black from '../../assets/icons/knight_black.svg';
import bishop_black from '../../assets/icons/bishop_black.svg';
import queen_black from '../../assets/icons/queen_black.svg';
import king_black from '../../assets/icons/king_black.svg';

const TakenBlock = ({ taken, color } : any) => {

    const pawns = taken.filter((value : any) => value === 'pawn').length;
    const bishops = taken.filter((value : any) => value === 'bishop').length;
    const knights = taken.filter((value : any) => value === 'knight').length;
    const rooks = taken.filter((value : any) => value === 'rook').length;
    const queens = taken.filter((value : any) => value === 'queen').length;

    return (
        <div className='taken-container'>

            <div>
                <img src={ color === 'white' ? pawn_white : pawn_black } alt="" />
                <label htmlFor="">x</label>
                <label htmlFor="">{ pawns }</label>
            </div>
            <div>
                <img src={ color === 'white' ? bishop_white : bishop_black } alt="" />
                <label htmlFor="">x</label>
                <label htmlFor="">{ bishops }</label>
            </div>
            <div>
                <img src={ color === 'white' ? knight_white : knight_black } alt="" />
                <label htmlFor="">x</label>
                <label htmlFor="">{ knights }</label>
            </div>
            <div>
                <img src={ color === 'white' ? rook_white : rook_black } alt="" />
                <label htmlFor="">x</label>
                <label htmlFor="">{ rooks }</label>
            </div>
            <div>
                <img src={ color === 'white' ? queen_white : queen_black } alt="" />
                <label htmlFor="">x</label>
                <label htmlFor="">{ queens }</label>
            </div>

        </div>
    );

}

export default TakenBlock;

