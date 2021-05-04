"use strict";

import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";
export class Rhino extends Entity {
    
    #_direction = Constants.RHINO_DIRECTIONS.RUN_LEFT;
    #_eating = false;
    #_speed = 0;

    #_end = false;

    #_x = null;
    #_y = null;

    #_rqID = null;

    #_originalSpeed = 0;
    
    get speed() {
        return this.#_speed;
    }

    constructor(x, y, _game) {
        super(x, y);

        this.#_x = x;
        this.#_y = y;

        this.game = _game;

        this.assetName = Constants.RHINO_DEFAULT;
        
        this.#_speed = this.game.rhinoSpeed;
        this.#_originalSpeed = this.#_speed;
        this.run();
    }

    restart() {
        cancelAnimationFrame(this.#_rqID);
        this.assetName = Constants.RHINO_DEFAULT;
        this.y = this.#_y;
        this.x = this.#_x;
        this.#_direction = Constants.RHINO_DIRECTIONS.RUN_LEFT;
        this.#_eating = false;
        this.#_speed = this.#_originalSpeed;
        this.#_end = false;
        this.run();
    }

    setDirection(direction) {
        
        this.direction = direction;
        this.updateAsset();
    }

    run() {
        if (this.#_eating) {
            return;
        }
        if (this.direction === Constants.RHINO_DIRECTIONS.RUN_LEFT) {
            this.setDirection(Constants.RHINO_DIRECTIONS.RUN_LEFT_2);
        } else {
            this.setDirection(Constants.RHINO_DIRECTIONS.RUN_LEFT);
        }
        this.#_rqID = requestAnimationFrame(this.run.bind(this));
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

    eat(step = null) {
        if (this.#_end) {
            return;
        }
        let _step = null;
        if (!step) {
            this.setDirection(Constants.RHINO_DIRECTIONS.RHINO_LIFT);
            _step = Constants.RHINO_DIRECTIONS.RHINO_LIFT_MOUTH_OPEN;
        } else {
            this.setDirection(step);
            switch (step) {
                case Constants.RHINO_DIRECTIONS.RHINO_LIFT_MOUTH_OPEN:
                    _step = Constants.RHINO_DIRECTIONS.RHINO_LIFT_EAT_1;
                    break;
                case Constants.RHINO_DIRECTIONS.RHINO_LIFT_EAT_1:
                    _step = Constants.RHINO_DIRECTIONS.RHINO_LIFT_EAT_2;
                    break;
                case Constants.RHINO_DIRECTIONS.RHINO_LIFT_EAT_2:
                    _step = Constants.RHINO_DIRECTIONS.RHINO_LIFT_EAT_3;
                    break;
                case Constants.RHINO_DIRECTIONS.RHINO_LIFT_EAT_3:
                    _step = Constants.RHINO_DIRECTIONS.RHINO_LIFT_EAT_4;
                    break;
                default:
                    this.#_end = true;
                    _step = Constants.RHINO_DIRECTIONS.RHINO_LIFT_EAT_4;
                    break;
            }
        }
        setTimeout(() => {
            requestAnimationFrame(this.eat.bind(this, _step));
        }, 200);
        
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
        this.x -= this.speed;
        // console.log(this.x)
        const { x, y } = this.game.skier.getPosition();
        
        if (this.x <= x) {
            // console.warn('reset', this.game.window.innerWidth)
            this.x = this.game.window.innerWidth / 2;
        }
        this.y = y;
    }


    moveRhinoDown() {
        this.y += this.speed;
    }

    moveRhinoUp() {
        this.y -= this.speed;
    }

    checkIfRhinoHitSkier(assetManager) {
        const asset = assetManager.getAsset(this.assetName);
        
        const rhinoBounds = new Rect(
            this.x - asset.width / 2,
            this.y - asset.height / 2,
            this.x + asset.width / 2,
            this.y - asset.height / 4
        );

        // skier
        const skierAsset = assetManager.getAsset(this.game.skier.assetName);
        const skierPosition = this.game.skier.getPosition();
        const skierBounds = new Rect(
            skierPosition.x - skierAsset.width / 2,
            skierPosition.y - skierAsset.height / 2,
            skierPosition.x + skierAsset.width / 2,
            skierPosition.y
        );
        const collision = intersectTwoRects(rhinoBounds, skierBounds);
        
        
        if (collision) {
            this.eat();
            this.#_eating = true;
            return collision;
        }

        return false;
    };

    draw(canvas, assetManager) {
        const asset = assetManager.getAsset(this.assetName);
        const drawX = this.x - asset.width;
        const drawY = this.y - asset.height;

        canvas.drawImage(asset, drawX, drawY, 64, 65);
    }
}
