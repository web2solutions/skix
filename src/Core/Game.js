
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

    constructor({ win, mode } = {}) {

        if (mode === 'easy') {
            this.#_skierSpeed = 5;
            this.#_rhinoSpeed = 5;
        }


        this.#_window = win || window;
        this.dom = this.#_window.document;
        this.dom.body.style = wrapperStyle;
        
        this.#_mode = mode || 'easy';

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

        this.statsBoard.setTime();

        const previousGameWindow = this.#_gameWindow;

        this.#_n += 1;
        
        const distance = Math.round(this.#_n / 5);
        this.statsBoard.setDistance(distance);
        this.statsBoard.setSpeed(this.skier.speed);
        this.statsBoard.setStyle(this.skier.style);
        
        this.skier.move();
        
        const timeNow = (new Date()).getTime();
        console.log(Math.round((timeNow - this.statsBoard.startTime) / 1000));
        // if()

        // this.rhino.move();

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
        
        if (this.rhino) {
            const isEating = this.rhino.checkIfRhinoHitSkier(this.assetManager);
            if (isEating) {
                this.skier.assetName = '';
                this.#_isEating = true;
            }
        }
        
    }

    drawGameWindow() {
        this.canvas.setDrawOffset(this.#_gameWindow.left, this.#_gameWindow.top);

        this.skier.draw(this.canvas, this.assetManager);
        if (this.rhino) {
            this.rhino.draw(this.canvas, this.assetManager);    
        }
        
        
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
