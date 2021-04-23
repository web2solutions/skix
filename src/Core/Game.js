
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

    constructor() {
        this.assetManager = new AssetManager();
        this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        this.skier = new Skier(0, 0, this);
        this.obstacleManager = new ObstacleManager();

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
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
        const left = skierPosition.x - (Constants.GAME_WIDTH / 2);
        const top = skierPosition.y - (Constants.GAME_HEIGHT / 2);

        this.#_gameWindow = new Rect(left, top, left + Constants.GAME_WIDTH, top + Constants.GAME_HEIGHT);
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
