"use strict";

import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";

export class Skier extends Entity {
    
    #_direction = Constants.SKIER_DIRECTIONS.DOWN;
    #_speed = 0;
    #_originalSpeed = 0;
    #_isJumping = false;
    #_stepUp = 0;
    #_positionBeforeJump = null;
    #_directionBeforeJump = null;
    #_jumpingTimeOut = null;
    #_style = 0;

    get isMoving() {
        return (this.direction === Constants.SKIER_DIRECTIONS.LEFT_DOWN
            || this.direction === Constants.SKIER_DIRECTIONS.DOWN
            || this.direction === Constants.SKIER_DIRECTIONS.RIGHT_DOWN
        );
    }

    get isIdle() {
        return (
            this.direction === Constants.SKIER_DIRECTIONS.LEFT
            || this.direction === Constants.SKIER_DIRECTIONS.RIGHT
            || this.direction === Constants.SKIER_DIRECTIONS.CRASH
        );
    }

    get speed() {
        return this.#_speed;
    }

    get style() {
        return this.#_style;
    }

    get isJumping() {
        return this.#_isJumping;
    }

    get direction() {
        return this.#_direction;
    }

    set direction(direction) {
        this.#_direction = direction;
    }

    constructor(x, y, _game) {
        super(x, y);
        this.game = _game;

        this.assetName = Constants.SKIER_DOWN;

        this.#_speed = this.game.skierSpeed;
        this.#_originalSpeed = this.game.skierSpeed;
    }

    setDirection(direction) {
        this.direction = direction;
        this.updateAsset();
    }

    updateAsset() {
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
        this.x -= this.speed;
    }

    moveSkierLeftDown() {
        this.x -= this.#_speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.#_speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.#_style += 1;
    }

    moveSkierDown() {
        this.y += this.#_speed;
    }

    moveSkierRightDown() {
        this.x += this.#_speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.#_speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.#_style += 1;
    }

    moveSkierRight() {
        this.x += this.speed;
    }

    moveSkierUp() {
        this.y -= this.speed;
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
                const after = this.getTurnLeftX(this.game.obstacle.assetName);
                // place left after the obstacle
                this.x = this.game.obstacle.x - after;
                this.game.resetObstacle();
            } else {
                this.setDirection(this.direction - 1);
            }
        }
    }

    // change
    getTurnLeftX(name) {
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
        this.#_isJumping = false;
        this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
    }

    jump() {
        this.#_stepUp += 1;

        if (this.#_stepUp === 1) {
            this.#_isJumping = true;
            this.#_positionBeforeJump = this.y;
            this.#_directionBeforeJump = this.direction;
        }
        
        this.y -= 5;
        this.setDirection(Constants.SKIER_DIRECTIONS[`JUMP${this.#_stepUp}`]);
        
        if (this.#_stepUp === 5) {
            this.#_stepUp = 0;
            if (
                this.#_directionBeforeJump === Constants.SKIER_DIRECTIONS.LEFT
                || this.#_directionBeforeJump === Constants.SKIER_DIRECTIONS.RIGHT
            ) {
                this.y = this.#_positionBeforeJump;
                this.#_isJumping = false;
            } else {
                this.#_speed = (this.speed * 2);
                
                this.y = this.#_positionBeforeJump + 100;
                this.#_jumpingTimeOut = setTimeout(() => {
                    this.#_speed = this.#_originalSpeed;
                    this.#_isJumping = false;
                }, Constants.SKIER_DOUBLE_SPEED_TIMER);
            }
            this.#_style += 5;
            this.setDirection(this.#_directionBeforeJump);
            this.#_positionBeforeJump = 0;
        } else {
            requestAnimationFrame(this.jump.bind(this));
        }
    }

    checkIfSkierHitObstacle(obstacleManager, assetManager) {

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
            if (collision._assetName === 'jumpRamp') {
                this.jump();
                return false;
            } else if(collision._assetName === 'rock1' || collision._assetName === 'rock1' ) {
                if (this.#_isJumping) {
                    return false;
                }
            }
            this.game.statsBoard.setSpeed(0);
            this.#_style -= 5;
            this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
            return collision;
        }

        return false;
    }

    restart() {
        
        this.assetName = Constants.SKIER_DOWN;
        this.setDirection(3);
        this.#_speed = this.#_originalSpeed;
    }
}
