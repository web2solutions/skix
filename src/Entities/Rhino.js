import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";

export class Rhino extends Entity {
    
    #_direction = Constants.RHINO_DIRECTIONS.RUN_LEFT;
    #_speed = Constants.RHINO_STARTING_SPEED;
    #_isJumping = false;
    #_stepUp = 0;
    #_positionBeforeJump = null;
    #_directionBeforeJump = null;
    #_jumpingTimeOut = null;
    #_style = 0;
    constructor(x, y, _game) {
        super(x, y);
        this.game = _game;

        this.assetName = Constants.RHINO_DEFAULT;

        this.run();
    }

    setDirection(direction) {
        this.direction = direction;
        this.updateAsset();
    }

    run() {
        if (this.direction === Constants.RHINO_DIRECTIONS.RUN_LEFT) {
            this.setDirection(Constants.RHINO_DIRECTIONS.RUN_LEFT_2);
        } else {
            this.setDirection(Constants.RHINO_DIRECTIONS.RUN_LEFT);
        }
        requestAnimationFrame(this.run.bind(this));
    }

    get isMoving() {
        return (this.direction === 2 || this.direction === 3 || this.direction === 4);
    }

    get isIdle() {
        return (this.direction === 1 || this.direction === 5);
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

    // change
    set direction(direction) {
        this.#_direction = direction;
    }

    updateAsset() {
        this.assetName = Constants.RHINO_DIRECTION_ASSET[this.direction];
    }

    move() {
        switch(this.direction) {
            case Constants.RHINO_DIRECTIONS.RUN_LEFT:
                this.moveRhinoLeft();
                break;
            case Constants.RHINO_DIRECTIONS.DOWN:
                this.moveRhinoDown();
                break;
            case Constants.RHINO_DIRECTIONS.RIGHT_DOWN:
                this.moveRhinoRightDown();
                break;
            default:
                this.moveRhinoLeft();
                break;
        }
    }

    moveRhinoLeft() {
        this.x -= Constants.RHINO_STARTING_SPEED;
        // console.log(this.x)
        const lim = (this.game.window.innerWidth / 2) * (-1);
        if (this.x <= lim) {
            // console.warn('reset', this.game.window.innerWidth)
            this.x = this.game.window.innerWidth / 2;
        }
        this.y += this.#_speed;
    }

    moveRhinoLeftDown() {
        this.x -= this.#_speed / Constants.RHINO_DIAGONAL_SPEED_REDUCER;
        this.y += this.#_speed / Constants.RHINO_DIAGONAL_SPEED_REDUCER;
        this.#_style += 1;
    }

    moveRhinoDown() {
        this.y += this.#_speed;
    }

    moveRhinoRightDown() {
        this.x += this.#_speed / Constants.RHINO_DIAGONAL_SPEED_REDUCER;
        this.y += this.#_speed / Constants.RHINO_DIAGONAL_SPEED_REDUCER;
        this.#_style += 1;
    }

    moveRhinoRight() {
        this.x += Constants.RHINO_STARTING_SPEED;
    }

    moveRhinoUp() {
        this.y -= Constants.RHINO_STARTING_SPEED;
    }

    // change
    turnLeft() {
        if(this.direction === Constants.RHINO_DIRECTIONS.LEFT) {
            this.moveRhinoLeft();
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
        if (Constants.OBSTACLE_SIZE[name]) {
            return (Constants.OBSTACLE_SIZE[name] / 2) + 5;
        }
        return 0;
    }

    turnRight() {
        if(this.direction === Constants.RHINO_DIRECTIONS.RIGHT) {
            this.moveRhinoRight();
        }
        else {
            this.setDirection(this.direction + 1);
        }
    }

    turnUp() {
        if(this.direction === Constants.RHINO_DIRECTIONS.LEFT || this.direction === Constants.RHINO_DIRECTIONS.RIGHT) {
            this.moveRhinoUp();
        }
    }

    turnDown() {
        this.#_isJumping = false;
        this.setDirection(Constants.RHINO_DIRECTIONS.DOWN);
    }

    jump() {
        this.#_stepUp += 1;

        if (this.#_stepUp === 1) {
            this.#_isJumping = true;
            this.#_positionBeforeJump = this.y;
            this.#_directionBeforeJump = this.direction;
        }
        
        this.y -= 5;
        this.setDirection(Constants.RHINO_DIRECTIONS[`JUMP${this.#_stepUp}`]);
        
        if (this.#_stepUp === 5) {
            this.#_stepUp = 0;
            if (
                this.#_directionBeforeJump === Constants.RHINO_DIRECTIONS.LEFT
                || this.#_directionBeforeJump === Constants.RHINO_DIRECTIONS.RIGHT
            ) {
                this.y = this.#_positionBeforeJump;
                this.#_isJumping = false;
            } else {
                this.#_speed = Constants.RHINO_DOUBLE_SPEED;
                this.y = this.#_positionBeforeJump + 100;
                this.#_jumpingTimeOut = setTimeout(() => {
                    this.#_speed = Constants.RHINO_STARTING_SPEED;
                    this.#_isJumping = false;
                }, Constants.RHINO_DOUBLE_SPEED_TIMER);
            }
            this.#_style += 5;
            this.setDirection(this.#_directionBeforeJump);
            this.#_positionBeforeJump = 0;
        } else {
            requestAnimationFrame(this.jump.bind(this));
        }
    }

    checkIfRhinoHitObstacle(obstacleManager, assetManager) {

        const asset = assetManager.getAsset(this.assetName);
        
        const rhinoBounds = new Rect(
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

            return intersectTwoRects(rhinoBounds, obstacleBounds);
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
            this.setDirection(Constants.RHINO_DIRECTIONS.CRASH);
            return collision;
        }

        return false;
    };
}
