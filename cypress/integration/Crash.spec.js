/* global describe it cy,  before */
import * as Constants from "../../src/Constants";
// import '../../game.css';
import { Game } from '../../src/Core/Game.js';

describe('#--- SkiFree Crash test suite', () => {
    let skiGame = null;
    
    before(function () {
        // capture test runner window
        cy.window().then((win) => {
            // clear default cypress information
            win.document.body.innerHTML = '';
            // create a Game instance passing the runner window
            skiGame = new Game(win);
            // load the game assets
            skiGame.load().then(() => {
                // init the game
                skiGame.init();
                // run game
                skiGame.run();    
            });
        });
    });

    describe('Crash bug must be solved', () => {
        it('Start game and wait until the skier chashes', () => {
            cy.wrap(skiGame).should('have.property', 'pause', true);
        });

        it('press left arrow after skier get crashed must get the skier UP facing to left side', () => {
            skiGame.triggerKeyDown(Constants.KEYS.LEFT);
            cy.wrap(skiGame).should('have.property', 'pause', false);
        });
    });
});
