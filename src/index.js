import { GameConsole } from './Core/GameConsole';

document.addEventListener("DOMContentLoaded",() => {
    const gameConsole = new GameConsole();
    gameConsole.renderWelcome();
});
