import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";

export class Skier extends Entity {
    
    #_direction = Constants.SKIER_DIRECTIONS.DOWN;
    #_speed = Constants.SKIER_STARTING_SPEED;

    constructor(x, y, _game) {
        super(x, y);
        this.game = _game;

        this.assetName = Constants.SKIER_DOWN;
    }

    setDirection(direction) {
        this.direction = direction;
        this.updateAsset();
    }

    

    get direction() {
        return this.#_direction;
    }

    // change
    set direction(direction) {
        // console.info('set direction', direction)
        this.#_direction = direction;
    }

    updateAsset() {
        // console.log('------------< updateAsset')
        // console.log(this.direction, Constants.SKIER_DIRECTION_ASSET)
        this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];
    }

    move() {
        switch(this.direction) {
            case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
                this.moveSkierLeftDown();
                break;
            case Constants.SKIER_DIRECTIONS.DOWN:
                this.moveSkierDown();
                break;
            case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
                this.moveSkierRightDown();
                break;
            default:
                break;
        }
    }

    moveSkierLeft() {
        this.x -= Constants.SKIER_STARTING_SPEED;
    }

    moveSkierLeftDown() {
        this.x -= this.#_speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.#_speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierDown() {
        this.y += this.#_speed;
    }

    moveSkierRightDown() {
        this.x += this.#_speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.#_speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierRight() {
        this.x += Constants.SKIER_STARTING_SPEED;
    }

    moveSkierUp() {
        this.y -= Constants.SKIER_STARTING_SPEED;
    }

    // change
    turnLeft() {
        if(this.direction === Constants.SKIER_DIRECTIONS.LEFT) {
            this.moveSkierLeft();
        }
        else {
            if (this.direction === 0) {
                
                // set face to left
                this.setDirection(1);
                
                const x = this.getTurnLeftX(this.game.obstacle.assetName);

                // place left after the obstacle
                this.x = this.game.obstacle.x - x;

                this.game.resetObstacle();
            } else {
                this.setDirection(this.direction - 1);
            }
            
        }
    }

    // change
    getTurnLeftX(name) {
        // console.log(name, Constants.OBSTACLE_SIZE);
        if (Constants.OBSTACLE_SIZE[name]) {
            return (Constants.OBSTACLE_SIZE[name] / 2) + 5;
        }
        return 0;
    }

    turnRight() {
        if(this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierRight();
        }
        else {
            this.setDirection(this.direction + 1);
        }
    }

    turnUp() {
        if(this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierUp();
        }
    }

    turnDown() {
        this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
    }

    checkIfSkierHitObstacle(obstacleManager, assetManager) {
        // console.log(obstacleManager, assetManager);
        // console.log('this.assetName', this.assetName);
        const asset = assetManager.getAsset(this.assetName);
        
        const skierBounds = new Rect(
            this.x - asset.width / 2,
            this.y - asset.height / 2,
            this.x + asset.width / 2,
            this.y - asset.height / 4
        );

        const collision = obstacleManager.getObstacles().find((obstacle) => {
            const obstacleAsset = assetManager.getAsset(obstacle.getAssetName());
            const obstaclePosition = obstacle.getPosition();
            const obstacleBounds = new Rect(
                obstaclePosition.x - obstacleAsset.width / 2,
                obstaclePosition.y - obstacleAsset.height / 2,
                obstaclePosition.x + obstacleAsset.width / 2,
                obstaclePosition.y
            );

            return intersectTwoRects(skierBounds, obstacleBounds);
        });
        
        
        if (collision) {
            // console.warn('========> collision', collision);
            // console.warn(obstacleManager, assetManager);
            // console.warn(asset);
            this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
            // console.warn('========> end collision', collision);
            // change
            // debug pause
            return collision;
        }

        return false;
    };
}
