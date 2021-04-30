"use strict";
// styles
import {
    rankBoardStyle
} from './Styles';


const tableTemplate = /* html */`
    <thead>
        <tr>
            <th>Name</th>
            <th>Distance</th>
            <th>Time</th>
            <th>Style</th>
            <th>Date</th>
        </tr>
    </thead>
    <tbody></tbody>
`;

export class RankBoard {
    
    #_window = null;
    #_dom = null;
    #_rankBoard = null;

    #_gameConsole = null;
    #_table = null;

    constructor({ win, console }) {
        this.#_window = win || window;
        this.#_dom = this.#_window.document;
        
        this.#_gameConsole = console;
        this.#_renderRankBoard();
        this.#_renderTable();
    }

    #_renderRankBoard() {
        this.#_rankBoard = this.#_window.document.createElement('div');
        this.#_rankBoard.style = rankBoardStyle;
        this.#_dom.body.appendChild(this.#_rankBoard);
    }

    #_renderTable() {
        this.#_table = this.#_window.document.createElement('table');
        // this.#_table.style = rankBoardStyle;
        this.#_table.innerHTML = tableTemplate;
        this.#_rankBoard.appendChild(this.#_table);
        
        console.log(this.#_gameConsole);

        this.#_gameConsole.dataAPI.Game.find({}).then((findGames) => {
            if (!findGames) {
                return;
            }
            let rows = '';
            if (findGames.data) {
                findGames.data.forEach(doc => {
                    rows += `
                        <tr>
                            <td>${doc.name}</td>
                            <td>${doc.distance}</td>
                            <td>${doc.time}</td>
                            <td>${doc.style}</td>
                            <td>${doc.date}</td>
                        </tr>
                    `;
                });
            }
            this.#_dom.querySelector('tbody').innerHTML = rows; 
        });
    }

    toogle() {
        this.#_rankBoard.style.display = this.#_rankBoard.style.display === 'block' ? 'none' : 'block';
    }
}
