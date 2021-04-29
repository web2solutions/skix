/* global describe it cy,  before */
import * as Constants from "../../src/Constants";
// import '../../game.css';
import { Game } from '../../src/Core/Game.js';

describe('#--- SkiFree Jump test suite', () => {
    let skiGame = null;
    
    before(function () {
        // capture test runner window
        cy.window().then((win) => {
            // clear default cypress information
            win.document.body.innerHTML = '';
            // create a Game instance passing the runner window
            skiGame = new Game({ win });
            // load the game assets
            skiGame.load().then(() => {
                // init the game
                skiGame.init();
                // run game
                skiGame.run();    
            });
        });
    });

    describe('Jumping while not running', () => {
        it('Turning left', () => {
            cy.wrap(skiGame.skier).should('have.property', 'isIdle', true);
            skiGame.triggerKeyDown(Constants.KEYS.LEFT);
            skiGame.triggerKeyDown(Constants.KEYS.LEFT);
        });

        it('Jumping', () => {
            cy.wrap(skiGame.skier).should('have.property', 'isJumping', true);
            skiGame.triggerKeyDown(Constants.KEYS.JUMP1);
        });
    });

    describe('Jumping while running', () => {
        it('Turning down', (done) => {
            setTimeout(function () {
                cy.wrap(skiGame.skier).should('have.property', 'direction', 3);
                skiGame.triggerKeyDown(Constants.KEYS.DOWN);
                done();
            }, 1100);
        });

        it('Jumping', () => {
            cy.wrap(skiGame.skier).should('have.property', 'isJumping', true);
            skiGame.triggerKeyDown(Constants.KEYS.JUMP1);
        });
    });
});
