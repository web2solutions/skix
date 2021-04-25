import { statsBoard } from './Styles';

export class StatsBoard {

    constructor(win) {
        const board = win.document.createElement('div');
        board.id = "statsBoard";
        board.style = statsBoard;
        win.document.body.appendChild(board);
    }
    
}
