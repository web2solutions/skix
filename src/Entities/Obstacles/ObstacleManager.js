import * as Constants from '../../Constants';
import { randomInt } from '../../Core/Utils';
import { Obstacle } from "./Obstacle";

export class ObstacleManager {
    obstacles = [];

    constructor(win) {
        this.window = win || window;
    }

    getObstacles() {
        return this.obstacles;
    }

    drawObstacles(canvas, assetManager) {
        this.obstacles.forEach((obstacle) => {
            obstacle.draw(canvas, assetManager);
        });
    }

    placeInitialObstacles() {
        const numberObstacles = Math.ceil((this.window.innerWidth / Constants.STARTING_OBSTACLE_REDUCER) * (this.window.innerHeight / Constants.STARTING_OBSTACLE_REDUCER));

        const minX = -this.window.innerWidth / 2;
        const maxX = this.window.innerWidth / 2;
        const minY = Constants.STARTING_OBSTACLE_GAP;
        const maxY = this.window.innerHeight / 2;

        for(let i = 0; i < numberObstacles; i++) {
            this.placeRandomObstacle(minX, maxX, minY, maxY);
        }

        this.obstacles.sort((obstacle1, obstacle2) => {
            return obstacle1.getPosition().y - obstacle2.getPosition().y;
        });
    }

    placeNewObstacle(gameWindow, previousGameWindow) {
        const shouldPlaceObstacle = randomInt(1, Constants.NEW_OBSTACLE_CHANCE);
        if(shouldPlaceObstacle !== Constants.NEW_OBSTACLE_CHANCE) {
            return;
        }

        if(gameWindow.left < previousGameWindow.left) {
            this.placeObstacleLeft(gameWindow);
        }
        else if(gameWindow.left > previousGameWindow.left) {
            this.placeObstacleRight(gameWindow);
        }

        if(gameWindow.top < previousGameWindow.top) {
            this.placeObstacleTop(gameWindow);
        }
        else if(gameWindow.top > previousGameWindow.top) {
            this.placeObstacleBottom(gameWindow);
        }
    };

    placeObstacleLeft(gameWindow) {
        this.placeRandomObstacle(gameWindow.left, gameWindow.left, gameWindow.top, gameWindow.bottom);
    }

    placeObstacleRight(gameWindow) {
        this.placeRandomObstacle(gameWindow.right, gameWindow.right, gameWindow.top, gameWindow.bottom);
    }

    placeObstacleTop(gameWindow) {
        this.placeRandomObstacle(gameWindow.left, gameWindow.right, gameWindow.top, gameWindow.top);
    }

    placeObstacleBottom(gameWindow) {
        this.placeRandomObstacle(gameWindow.left, gameWindow.right, gameWindow.bottom, gameWindow.bottom);
    }

    placeRandomObstacle(minX, maxX, minY, maxY) {
        const position = this.calculateOpenPosition(minX, maxX, minY, maxY);
        const newObstacle = new Obstacle(position.x, position.y);

        this.obstacles.push(newObstacle);
    }

    calculateOpenPosition(minX, maxX, minY, maxY) {
        const x = randomInt(minX, maxX);
        const y = randomInt(minY, maxY);

        const foundCollision = this.obstacles.find((obstacle) => {
            return (
                x > (obstacle.x - Constants.DISTANCE_BETWEEN_OBSTACLES) &&
                x < (obstacle.x + Constants.DISTANCE_BETWEEN_OBSTACLES) &&
                y > (obstacle.y - Constants.DISTANCE_BETWEEN_OBSTACLES) &&
                y < (obstacle.y + Constants.DISTANCE_BETWEEN_OBSTACLES)
            );
        });

        if(foundCollision) {
            return this.calculateOpenPosition(minX, maxX, minY, maxY);
        }
        else {
            return {
                x: x,
                y: y
            };
        }
    }
}
