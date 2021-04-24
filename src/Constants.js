
import skier_crash_bin from '../bin/skier_crash_bin';
import skier_left_bin from '../bin/skier_left_bin';
import skier_left_down_bin from '../bin/skier_left_down_bin';
import skier_down_bin from '../bin/skier_down_bin';
import skier_right_down_bin from '../bin/skier_right_down_bin';
import skier_right_bin from '../bin/skier_right_bin';

import tree_1_bin from '../bin/tree_1_bin';
import tree_cluster_bin from '../bin/tree_cluster_bin';
import rock_1_bin from '../bin/rock_1_bin';
import rock_2_bin from '../bin/rock_2_bin';
import jump_ramp_bin from '../bin/jump_ramp_bin';



export const GAME_WIDTH = window.innerWidth;
export const GAME_HEIGHT = window.innerHeight;

export const SKIER_CRASH = 'skierCrash';
export const SKIER_LEFT = 'skierLeft';
export const SKIER_LEFTDOWN = 'skierLeftDown';
export const SKIER_DOWN = 'skierDown';
export const SKIER_RIGHTDOWN = 'skierRightDown';
export const SKIER_RIGHT = 'skierRight';
export const TREE = 'tree';
export const TREE_CLUSTER = 'treeCluster';
export const ROCK1 = 'rock1';
export const ROCK2 = 'rock2';
export const JUMP_RAMP = 'jumpRamp';

export const SKIER_STARTING_SPEED = 10;
export const SKIER_DIAGONAL_SPEED_REDUCER = 1.4142;

export const ASSETS = {
    [SKIER_CRASH]: skier_crash_bin.img,
    [SKIER_LEFT]: skier_left_bin.img,
    [SKIER_LEFTDOWN]: skier_left_down_bin.img,
    [SKIER_DOWN]: skier_down_bin.img,
    [SKIER_RIGHTDOWN]: skier_right_down_bin.img,
    [SKIER_RIGHT]: skier_right_bin.img,
    [TREE] : tree_1_bin.img,
    [TREE_CLUSTER] : tree_cluster_bin.img,
    [ROCK1] : rock_1_bin.img,
    [ROCK2]: rock_2_bin.img,
    [JUMP_RAMP]: jump_ramp_bin.img
};

export const OBSTACLE_SIZE = {
    [TREE] : 43,
    [TREE_CLUSTER] : 88,
    [ROCK1] : 40,
    [ROCK2] : 49
};

export const SKIER_DIRECTIONS = {
    CRASH : 0,
    LEFT : 1,
    LEFT_DOWN : 2,
    DOWN : 3,
    RIGHT_DOWN : 4,
    RIGHT : 5
};

export const SKIER_DIRECTION_ASSET = {
    [SKIER_DIRECTIONS.CRASH] : SKIER_CRASH,
    [SKIER_DIRECTIONS.LEFT] : SKIER_LEFT,
    [SKIER_DIRECTIONS.LEFT_DOWN] : SKIER_LEFTDOWN,
    [SKIER_DIRECTIONS.DOWN] : SKIER_DOWN,
    [SKIER_DIRECTIONS.RIGHT_DOWN] : SKIER_RIGHTDOWN,
    [SKIER_DIRECTIONS.RIGHT] : SKIER_RIGHT
};

export const KEYS = {
    LEFT : 37,
    RIGHT : 39,
    UP : 38,
    DOWN : 40
};
