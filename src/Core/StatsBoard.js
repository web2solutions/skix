import { statsBoard } from './Styles';

export class StatsBoard {
    #_win = null;
    #_board = null;
    #_ms = 0;
    #_distance = 0;

    #_timeDisplay = null;
    #_distanceDisplay = null;
    #_speedDisplay = null;
    #_styleDisplay = null;

    #_timeStart = (new Date()).getTime();

    #_style = 0;

    get startTime() {
        return this.#_timeStart;
    }

    constructor(win) {
        this.#_win = win;
        this.#_board = this.#_win.document.createElement('ul');
        this.#_board.id = "statsBoard";
        this.#_board.style = statsBoard;
        this.#_win.document.body.appendChild(this.#_board);

        this.renderTimeDisplay();
        this.renderDistanceDisplay();
        this.renderSpeedDisplay();
        this.renderStyleDisplay();
    }


    renderTimeDisplay() {
        this.#_timeDisplay = this.#_win.document.createElement('li');
        this.#_board.appendChild(this.#_timeDisplay);
        this.setTime();
    }

    setTime() {
        const endTime = new Date();
        let timeDiff = endTime - this.#_timeStart;
        timeDiff /= 1000;
        const seconds = Math.round(timeDiff);
        const min = Math.round(seconds / 60);
        const hour = Math.round(min / 60);
        this.#_timeDisplay.innerText = `Time: ${hour}:${min}:${seconds}`;
    }

    renderDistanceDisplay() {
        this.#_distanceDisplay = this.#_win.document.createElement('li');
        this.#_board.appendChild(this.#_distanceDisplay);
        this.setDistance();
    }

    setDistance(distance = 0) {
        this.#_distanceDisplay.innerText = `Distance: ${distance}m`;
    }

    renderSpeedDisplay() {
        this.#_speedDisplay = this.#_win.document.createElement('li');
        this.#_board.appendChild(this.#_speedDisplay);
        this.setSpeed();
    }

    setSpeed(speed = 0) {
        this.#_speedDisplay.innerText = `Speed: ${speed}m/s`;
    }

    renderStyleDisplay() {
        this.#_styleDisplay = this.#_win.document.createElement('li');
        this.#_board.appendChild(this.#_styleDisplay);
        this.setStyle();
    }

    setStyle(style = 0) {
        this.#_styleDisplay.innerText = `Style: ${style}`;
    }

}
