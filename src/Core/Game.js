
"use strict";

import Swal from 'sweetalert2';
import * as Constants from "../Constants";
import { wrapperStyle } from './Styles';
import { AssetManager } from "./AssetManager";
import { Canvas } from './Canvas';
import { Skier } from "../Entities/Skier";
import { Rhino } from "../Entities/Rhino";
import { StatsBoard } from './StatsBoard';
import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";
import { Rect } from './Utils';

/* 
    1. load
    2. init
    3. run
*/
export class Game {
    #_gameWindow = null;

    // change
    // pause UpdateGameWindow
    #_pause = false;
    #_obstacle = null;
    #_crashed = false;

    #_end = false;
    #_n = 0;
    #_isEating = false;

    #_window = null;
    
    #_mode = 'easy';

    #_gameConsole = null;

    #_skierSpeed = 10;

    #_rhinoSpeed = 10;
    

    get skierSpeed() {
        return this.#_skierSpeed;
    }

    get rhinoSpeed() {
        return this.#_rhinoSpeed;
    }

    set pause(state) {
        this.#_pause = state;
    }

    get window() {
        return this.#_window;
    }

    get crashed() {
        return this.#_crashed;
    }
    
    get pause() {
        return this.#_pause;
    }

    set obstacle(state) {
        this.#_obstacle = state;
    }
    get obstacle() {
        return this.#_obstacle;
    }

    get gameOver() {
        return this.#_end;
    }

    constructor({ win, mode, console } = {}) {
        
        this.#_mode = mode || 'easy';

        if (this.#_mode === 'easy') {
            this.#_skierSpeed = 5;
            this.#_rhinoSpeed = 5;
        }

        if (console) {
            this.#_gameConsole = console;
        }

        /**
         * wtf?
         * win here is a reference to which window object this class relies to. 
         * why? e2e / visual testing. On cypress the application runs in a iframe
         */
        this.#_window = win || window;
        this.dom = this.#_window.document;
        this.dom.body.style = wrapperStyle;
        
        

        this.assetManager = new AssetManager();
        this.canvas = new Canvas(this.#_window.innerWidth, this.#_window.innerHeight, this.#_window);
        this.skier = new Skier(0, 0, this);

        this.rhino = new Rhino(this.#_window.innerWidth / 2, 0, this);
        this.statsBoard = new StatsBoard(this.#_window);
        this.obstacleManager = new ObstacleManager(this.#_window);

        this.dom.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    init() {
        this.obstacleManager.placeInitialObstacles();
    }

    resetObstacle() {
        this.obstacle = null;
    }

    async load() {
        await this.assetManager.loadAssets(Constants.ASSETS);
    }

    run() {
        this.canvas.clearCanvas();

        this.updateGameWindow();
        this.drawGameWindow();
        
        requestAnimationFrame(this.run.bind(this));
    }

    setGameOver() {
        this.#_isEating = false;
        this.#_end = true;
        if (this.#_gameConsole) {
            (async () => {
                this.#_gameConsole.saveMatch({
                    distance: this.statsBoard.distance,
                    style: this.statsBoard.style,
                    time: this.statsBoard.time
                });
                this.whatNext();
                
            })();
        }
        
    }

    whatNext() {
        Swal.fire({
            title: 'Do you want to play again?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Yes'
            // denyButtonText: `Don't save`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                this.restart();
            } else {
                this.#_window.document.location.reload();
            }
        });
        // reload window
    }

    restart() {
        this.#_pause = false;
        this.#_obstacle = null;
        this.#_crashed = false;

        this.#_end = false;
        this.#_n = 0;
        this.#_isEating = false;

        this.skier.restart();
        this.rhino.restart();

        this.statsBoard.startTime = (new Date()).getTime();
    }

    updateGameWindow() {
        if (this.#_end) {
            return;
        }
        
        if (this.pause) {
            return;
        }

        if (this.#_isEating) {
            return;
        }

        // if (this.#_crashed) {
        //    return;
        // }

        this.statsBoard.setTime();

        const previousGameWindow = this.#_gameWindow;

        this.#_n += 1;
        
        const distance = Math.round(this.#_n / 5);
        if (!this.skier.isIdle) {
            this.statsBoard.setDistance(distance);
            this.statsBoard.setSpeed(this.skier.speed);
        } else {
            this.statsBoard.setSpeed(0);
        }
        
        this.statsBoard.setStyle(this.skier.style);
        
        this.skier.move();

        const timeNow = (new Date()).getTime();
        const timeDiffer = (timeNow - this.statsBoard.startTime) / 1000;
        if (timeDiffer > Constants.RHINO_START_AFTER) {
            this.rhino.move();    
        }
        
        this.calculateGameWindow();

        this.obstacleManager.placeNewObstacle(this.#_gameWindow, previousGameWindow);

        // change
        // if is there a hit, then pause updateGameWindow
        const isHit = this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager);
        if (isHit) {
            if (isHit._assetName === 'jumpRamp') {
                
            } else {
                this.#_crashed = true;
                this.obstacle = isHit;
            }
        }
        
        const isEating = this.rhino.checkIfRhinoHitSkier(this.assetManager);
        if (isEating) {
            this.skier.assetName = '';
            this.statsBoard.setSpeed(0);
            this.#_isEating = true;
            setTimeout(this.setGameOver.bind(this), 1500);
        }
        
    }

    drawGameWindow() {
        this.canvas.setDrawOffset(this.#_gameWindow.left, this.#_gameWindow.top);

        this.skier.draw(this.canvas, this.assetManager);
        this.rhino.draw(this.canvas, this.assetManager);    
        
        
        this.obstacleManager.drawObstacles(this.canvas, this.assetManager);
    }

    calculateGameWindow() {
        const skierPosition = this.skier.getPosition();
        const left = skierPosition.x - (this.#_window.innerWidth / 2);
        const top = skierPosition.y - (this.#_window.innerHeight / 2);

        this.#_gameWindow = new Rect(left, top, left + this.#_window.innerWidth, top + this.#_window.innerHeight);
    }

    triggerKeyDown(key = Constants.KEYS.DOWN) {
        const evt = this.dom.createEvent( 'Events' );
        evt.initEvent('keydown', true, true);
        evt.which = key;
        evt.keyCode = key;
        this.dom.dispatchEvent( evt );
    }

    handleKeyDown(event) {
        if (this.#_isEating) {
            return;
        }
        if (this.#_end) {
            return;
        }
        switch(event.which) {
            case Constants.KEYS.LEFT:
                if (this.#_crashed) { 
                    this.#_crashed = false;
                }
                this.skier.turnLeft();
                event.preventDefault();
                break;
            case Constants.KEYS.RIGHT:
                if (this.#_crashed) {
                    break;
                }
                this.skier.turnRight();
                event.preventDefault();
                break;
            case Constants.KEYS.UP:
                if (this.#_crashed) {
                    break;
                }
                this.skier.turnUp();
                event.preventDefault();
                break;
            case Constants.KEYS.DOWN:
                if (this.#_crashed) {
                    break;
                }
                this.skier.turnDown();
                event.preventDefault();
                break;
            case Constants.KEYS.JUMP1:
                if (this.#_crashed) {
                    break;
                }
                this.skier.jump();
                event.preventDefault();
                break;
            default:
                event.preventDefault();
                break;
        }
    }
}
