"use strict";

import * as voodux from "voodux";
import * as Constants from "../Constants";
import { Game } from './Game';
import { RankBoard } from './RankBoard';
import { schema } from '../data/schema';

// styles
import {
    wrapperStyle,
    controlStyle,
    buttonControlStyle,
    scenarioStyle,
    styleTram,
    styleSnow
} from './Styles';
export class GameConsole {
    
    #_window = null;
    #_dom = null;
    #_wrapper = null;
    
    #_scenario = null;
    #_snow = null;
    #_tram = null;
    #_scenarioY = 0; // vh
    #_scenarioX = 0;

    #_controls = null;

    #_game = null;

    #_playerName = null;

    #_dataAPI = null;

    #_rankBoard = null;

    get scenarioX() {
        return this.#_scenarioX;
    }

    get scenarioY() {
        return this.#_scenarioY;
    }

    get dataAPI() {
        return this.#_dataAPI;
    }

    constructor(win) {
        /**
         * wtf?
         * win here is a reference to which window object this class relies to. 
         * why? e2e / visual testing. On cypress the application runs in a iframe
         */
        this.#_window = win || window;
        this.#_dom = this.#_window.document;
        this.#_dom.body.style = wrapperStyle;
        this.#_wrapper = this.#_dom.body;
        this.#_scenarioY =  (6000 - this.#_window.innerHeight) * (-1);
        this.#_scenarioX = - (this.#_window.innerWidth / 2);
    }

    #_renderScenario() {
        this.#_scenario = this.#_window.document.createElement('div');
        this.#_scenario.style = scenarioStyle.bind(this)();
        this.#_wrapper.appendChild(this.#_scenario);
    }

    #_renderSnow() {
        this.#_snow = this.#_window.document.createElement('div');
        this.#_snow.style = styleSnow.bind(this)();
        this.#_scenario.appendChild(this.#_snow);
    }

    #_renderTram() {
        this.#_tram = this.#_window.document.createElement('div');
        this.#_tram.style = styleTram;
        this.#_scenario.appendChild(this.#_tram);
    }

    #_runScenario() {
        if (this.#_game) {
            return;
        }
        this.#_scenarioX -= 4;
        
        this.#_scenario
            .style = scenarioStyle.bind(this)();
        
        if (this.#_scenarioX >= this.#_window.innerWidth) {
            this.#_scenarioX = -this.#_window.innerWidth;
        }

        requestAnimationFrame(this.#_runScenario.bind(this));
    }

    #_runSnow() {
        if (this.#_game) {
            return;
        }
        this.#_scenarioY += 1;
        
        this.#_snow
            .style = styleSnow.bind(this)();

        if (this.#_scenarioY >= this.#_window.innerHeight) {
            this.#_scenarioY = (6000 - this.#_window.innerHeight) * (-1);
        }
        
        requestAnimationFrame(this.#_runSnow.bind(this));
    }

    #_renderControls() {
        this.#_controls = this.#_window.document.createElement('div');
        this.#_controls.style = controlStyle;
        this.#_controls.innerHTML = controlButtonsTemplate();
        this.#_wrapper.appendChild(this.#_controls);

        this.#_bindButtons();
    }

    #_bindButtons() {
        document
            .getElementById(Constants.START_GAME_EASY)
            .onclick = this.#_startGame.bind(this, 'easy');
        document
            .getElementById(Constants.START_GAME_HARD)
            .onclick = this.#_startGame.bind(this, 'hard');
        document
            .getElementById(Constants.CHECK_RANK)
            .onclick = this.#_rankBoard.toogle.bind(this.#_rankBoard);
    }

    #_startGame(mode) {
        // console.log(mode);
        this.#_dom.body.innerHTML = '';
        this.#_game = new Game({
            win: this.#_window,
            mode,
            console: this
        });
        
        this.#_game.load().then(() => {
            this.#_game.init();
            this.#_game.run();
        });
    }

    start() {
        (async () => {
            const foundation = new voodux.Foundation({
                name: "SkiFree",
                schemas: {
                    Game: schema
                }
            });
    
            const start = await foundation.start();
            if (start.error) {
                alert(start.error);
                return;
            }

            this.#_dataAPI = foundation.data;

            if (!this.askName()) {
                return;
            }

            this.#_rankBoard = new RankBoard({
                win: this.win,
                console: this
            });
            
            this.#_renderScenario();
            this.#_renderSnow();
            this.#_renderTram();
            this.#_renderControls();
    
            this.#_runScenario();
            this.#_runSnow();

        })();
    }

    askName() {
        let name = window.prompt(`SkiFree Game info: Press the keys to: left arrow: go left, right arrow: go right, up arrow: go up, down arrow: go down, shift: jump.
        \n  Please type your name to start:
        `, 'guest');
        if (name === '') {
            name = 'guest';
        }
        this.#_playerName = name;
        return this.#_playerName;
    }

    async saveMatch({ distance, style, time }) {
        await this.#_dataAPI.Game.add({
            name: this.#_playerName,
            time,
            distance,
            style
        });
    }
}

function controlButtonsTemplate () {
    return (/* html */`
    <button
        style="${buttonControlStyle}"
        id="${Constants.START_GAME_EASY}"
    >
        start game - easy mode
    </button>
    <button
        style="${buttonControlStyle}"
        id="${Constants.CHECK_RANK}"
    >
        check rank
    </button>
    <button
        style="${buttonControlStyle}"
        id="${Constants.START_GAME_HARD}"
    >
        start game - hard mode
    </button>
`);
};
