
import * as Constants from "../Constants";

// styles
import {
    wrapperStyle,
    controlStyle,
    buttonControlStyle,
    scenarioStyle,
    styleTram,
    styleSnow
} from './Styles';

// game
import { Game } from './Game';

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

    get scenarioX() {
        return this.#_scenarioX;
    }

    get scenarioY() {
        return this.#_scenarioY;
    }

    constructor(win) {
        this.#_window = win || window;
        this.#_dom = this.#_window.document;
        this.#_dom.body.style = wrapperStyle;
        this.#_wrapper = this.#_dom.body;
        this.#_scenarioY =  (6000 - this.#_window.innerHeight) * (-1);
        this.#_scenarioX = - (this.#_window.innerWidth /2 );
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
            .onclick = this.#_startGame.bind(this, 'hard');
    }

    #_startGame(mode) {
        // console.log(mode);
        this.#_dom.body.innerHTML = '';
        this.#_game = new Game({
            win: this.#_window,
            mode
        });
        
        this.#_game.load().then(() => {
            this.#_game.init();
            this.#_game.run();
        });
    }

    renderWelcome() {
        this.#_renderScenario();
        this.#_renderSnow();
        this.#_renderTram();
        this.#_renderControls();

        this.#_runScenario();
        this.#_runSnow();
    }
}

function controlButtonsTemplate () {
    return (`
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
