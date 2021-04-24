
import * as Constants from "../Constants";
import { AssetManager } from "./AssetManager";
import { Canvas } from './Canvas';
import { Skier } from "../Entities/Skier";
import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";
import { Rect } from './Utils';

export class Game {
    #_gameWindow = null;

    // change
    // pause UpdateGameWindow
    #_pause = false
    #_obstacle = null

    constructor(win) {
        this.window = win || window;
        this.dom = this.window.document;
        this.dom.body.style = 'width: 100wv; heigth: 100hv; padding: 0px; margin: 0px;';
        this.assetManager = new AssetManager();
        this.canvas = new Canvas(this.window.innerWidth, this.window.innerHeight, this.window);
        this.skier = new Skier(0, 0, this);
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
        // console.log('-----> run');
        this.canvas.clearCanvas();

        this.updateGameWindow();
        this.drawGameWindow();

        requestAnimationFrame(this.run.bind(this));
    }

    updateGameWindow() {
        // change
        // if is there a hit, then pause updateGameWindow
        if (this.pause) {
            return;
        }
        
        this.skier.move();

        const previousGameWindow = this.#_gameWindow;
        this.calculateGameWindow();

        this.obstacleManager.placeNewObstacle(this.#_gameWindow, previousGameWindow);

        // change
        // if is there a hit, then pause updateGameWindow
        const isCrash = this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager);
        // console.log('isCrash', isCrash)
        if (isCrash) {
            this.obstacle = isCrash;
            this.pause = true;
        }
        
    }

    drawGameWindow() {
        this.canvas.setDrawOffset(this.#_gameWindow.left, this.#_gameWindow.top);

        this.skier.draw(this.canvas, this.assetManager);
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
            default:
                event.preventDefault();
                break;
        }
    }
}
