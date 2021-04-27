
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

    #_end = false;
    #_n = 0;
    #_isEating = false;

    constructor(win) {
       
        this.window = win || window;
        this.dom = this.window.document;
        this.dom.body.style = wrapperStyle;
       
        this.assetManager = new AssetManager();
        this.canvas = new Canvas(this.window.innerWidth, this.window.innerHeight, this.window);
        this.skier = new Skier(0, 0, this);

        this.rhino = new Rhino(this.window.innerWidth / 2, 0, this);
        this.statsBoard = new StatsBoard(this.window);
        this.obstacleManager = new ObstacleManager(this.window);

        this.dom.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    init() {
        this.obstacleManager.placeInitialObstacles();
    }

    
    set pause(state) {
        this.#_pause = state;
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

    get gameOver() {
        return this.#_end;
    }

    updateGameWindow() {
        
        if (this.#_end) {
            return;
        }
        
        // if is there a hit, then pause updateGameWindow
        if (this.pause) {
            return;
        }


        if (this.#_isEating) {
            return;
        }

        /* if (!this.skier.isMoving) {
            return;
        } */

        this.statsBoard.setTime();

        const previousGameWindow = this.#_gameWindow;

        this.#_n += 1;
        
        const distance = Math.round(this.#_n / 5);
        this.statsBoard.setDistance(distance);
        this.statsBoard.setSpeed(this.skier.speed);
        this.statsBoard.setStyle(this.skier.style);
        
        this.skier.move();

        this.rhino.move();

        this.calculateGameWindow();

        this.obstacleManager.placeNewObstacle(this.#_gameWindow, previousGameWindow);

        // change
        // if is there a hit, then pause updateGameWindow
        const isHit = this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager);
        if (isHit) {
            if (isHit._assetName === 'jumpRamp') {
                
            } else {
                this.obstacle = isHit;
            }
        }
        
        const isEating = this.rhino.checkIfRhinoHitSkier(this.assetManager);
        if (isEating) {
            this.skier.assetName = '';
            this.#_isEating = true;
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
        const left = skierPosition.x - (this.window.innerWidth / 2);
        const top = skierPosition.y - (this.window.innerHeight / 2);

        this.#_gameWindow = new Rect(left, top, left + this.window.innerWidth, top + this.window.innerHeight);
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
                if (this.pause) { 
                    this.pause = false;
                }
                this.skier.turnLeft();
                event.preventDefault();
                break;
            case Constants.KEYS.RIGHT:
                if (this.pause) {
                    break;
                }
                this.skier.turnRight();
                event.preventDefault();
                break;
            case Constants.KEYS.UP:
                if (this.pause) {
                    break;
                }
                this.skier.turnUp();
                event.preventDefault();
                break;
            case Constants.KEYS.DOWN:
                if (this.pause) {
                    break;
                }
                this.skier.turnDown();
                event.preventDefault();
                break;
            case Constants.KEYS.JUMP1:
                if (this.pause) {
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
