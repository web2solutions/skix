import '../css/game.css';
import { Game } from './Core/Game.js';

document.addEventListener("DOMContentLoaded",() => {
    const skiGame = new Game();
    skiGame.load().then(() => {
        skiGame.init();
        skiGame.run();
    });
});