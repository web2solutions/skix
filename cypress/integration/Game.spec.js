/* global describe it cy,  before */
import * as Constants from "../../src/Constants";
// import '../css/game.css';
import { Game } from '../../src/Core/Game.js';

document.addEventListener("DOMContentLoaded",() => {
    
});
describe('#--- FreeSki test suite', () => {
    let skiGame = null;
    
    before(function () {
        cy.window().then((win) => {
            win.document.body.innerHTML = '';
            skiGame = new Game(win);
            skiGame.load().then(() => {
                skiGame.init();
                skiGame.run();    
            });
        });
    });

    describe('Crash bug must be solved', () => {
        
        it('Start game and wait until the skier chashes', {
            defaultCommandTimeout: 100000
          }, () => {
            cy.wrap(skiGame).should('have.property', 'pause', true);
        });

        it('press left arrow after skier get crashed must get the skier UP facing to left side', () => {
            skiGame.triggerKeyDown(Constants.KEYS.LEFT);
            cy.wrap(skiGame).should('have.property', 'pause', false);
        });


    });
});
