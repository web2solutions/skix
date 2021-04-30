"use strict";

/**
 * import binary assets
 * This provides support to unit test alongside visual test
 */

import skier_crash_bin from '../bin/skier_crash_bin';
import skier_jump_1_bin from '../bin/skier_jump_1_bin';
import skier_jump_2_bin from '../bin/skier_jump_2_bin';
import skier_jump_3_bin from '../bin/skier_jump_3_bin';
import skier_jump_4_bin from '../bin/skier_jump_4_bin';
import skier_jump_5_bin from '../bin/skier_jump_5_bin';
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
import rhino_default from '../bin/rhino_default';
import rhino_lift_eat_1 from '../bin/rhino_lift_eat_1';
import rhino_lift_eat_2 from '../bin/rhino_lift_eat_2';
import rhino_lift_eat_3 from '../bin/rhino_lift_eat_3';
import rhino_lift_eat_4 from '../bin/rhino_lift_eat_4';
import rhino_lift_mouth_open from '../bin/rhino_lift_mouth_open';
import rhino_lift from '../bin/rhino_lift';
import rhino_run_left_2 from '../bin/rhino_run_left_2';
import rhino_run_left from '../bin/rhino_run_left';

export const DISTANCE_BETWEEN_OBSTACLES = 50;
export const STARTING_OBSTACLE_GAP = 100;
export const STARTING_OBSTACLE_REDUCER = 300;
export const NEW_OBSTACLE_CHANCE = 8;

export const SKIER_CRASH = 'skierCrash';
export const SKIER_JUMP1 = 'skierJump1';
export const SKIER_JUMP2 = 'skierJump2';
export const SKIER_JUMP3 = 'skierJump3';
export const SKIER_JUMP4 = 'skierJump4';
export const SKIER_JUMP5 = 'skierJump5';
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

export const RHINO_DEFAULT = 'rhinoDefault';
export const RHINO_LIFT_EAT_1 = 'rhinoLiftEat1';
export const RHINO_LIFT_EAT_2 = 'rhinoLiftEat2';
export const RHINO_LIFT_EAT_3 = 'rhinoLiftEat3';
export const RHINO_LIFT_EAT_4 = 'rhinoLiftEat4';
export const RHINO_LIFT_MOUTH_OPEN = 'rhinoLiftMouthOpen';
export const RHINO_LIFT = 'rhinoLift';
export const RHINO_RUN_LEFT = 'rhinoRunLeft';
export const RHINO_RUN_LEFT_2 = 'rhinoRunLeft2';

export const RHINO_START_AFTER = 30; // seconds

// export const RHINO_STARTING_SPEED = 5;
// export const RHINO_DOUBLE_SPEED = RHINO_STARTING_SPEED * 2;
export const RHINO_DIAGONAL_SPEED_REDUCER = 1.4142;
export const RHINO_DOUBLE_SPEED_TIMER = 1000;

// export const SKIER_STARTING_SPEED = 5;
// export const SKIER_DOUBLE_SPEED = SKIER_STARTING_SPEED * 2;
export const SKIER_DIAGONAL_SPEED_REDUCER = 1.4142;
export const SKIER_DOUBLE_SPEED_TIMER = 1000;

export const ASSETS = {
    [SKIER_CRASH]: skier_crash_bin.img,
    [SKIER_JUMP1]: skier_jump_1_bin.img,
    [SKIER_JUMP2]: skier_jump_2_bin.img,
    [SKIER_JUMP3]: skier_jump_3_bin.img,
    [SKIER_JUMP4]: skier_jump_4_bin.img,
    [SKIER_JUMP5]: skier_jump_5_bin.img,
    [SKIER_LEFT]: skier_left_bin.img,
    [SKIER_LEFTDOWN]: skier_left_down_bin.img,
    [SKIER_DOWN]: skier_down_bin.img,
    [SKIER_RIGHTDOWN]: skier_right_down_bin.img,
    [SKIER_RIGHT]: skier_right_bin.img,
    [TREE] : tree_1_bin.img,
    [TREE_CLUSTER] : tree_cluster_bin.img,
    [ROCK1] : rock_1_bin.img,
    [ROCK2]: rock_2_bin.img,
    [JUMP_RAMP]: jump_ramp_bin.img,

    [RHINO_DEFAULT]: rhino_default.img,
    [RHINO_LIFT_EAT_1]: rhino_lift_eat_1.img,
    [RHINO_LIFT_EAT_2]: rhino_lift_eat_2.img,
    [RHINO_LIFT_EAT_3]: rhino_lift_eat_3.img,
    [RHINO_LIFT_EAT_4]: rhino_lift_eat_4.img,
    [RHINO_LIFT_MOUTH_OPEN]: rhino_lift_mouth_open.img,
    [RHINO_LIFT]: rhino_lift.img,
    [RHINO_RUN_LEFT]: rhino_run_left.img,
    [RHINO_RUN_LEFT_2]: rhino_run_left_2.img
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
    RIGHT: 5,
    JUMP1: -1,
    JUMP2: -2,
    JUMP3: -3,
    JUMP4: -4,
    JUMP5: -5
};




export const SKIER_DIRECTION_ASSET = {
    [SKIER_DIRECTIONS.CRASH]: SKIER_CRASH,
    [SKIER_DIRECTIONS.JUMP1]: SKIER_JUMP1,
    [SKIER_DIRECTIONS.JUMP2]: SKIER_JUMP2,
    [SKIER_DIRECTIONS.JUMP3]: SKIER_JUMP3,
    [SKIER_DIRECTIONS.JUMP4]: SKIER_JUMP4,
    [SKIER_DIRECTIONS.JUMP5] : SKIER_JUMP5,
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
    DOWN: 40,
    JUMP1: 16
};

export const RHINO_DIRECTIONS = {
    DEFAULT: 0,
    RUN_LEFT: 1,
    RUN_LEFT_2 : 2,
    RHINO_LIFT_EAT_1: 3,
    RHINO_LIFT_EAT_2: 4,
    RHINO_LIFT_EAT_3: 5,
    RHINO_LIFT_EAT_4: 6,
    RHINO_LIFT_MOUTH_OPEN: 7,
    RHINO_LIFT: 8
};


export const RHINO_DIRECTION_ASSET = {
    [RHINO_DIRECTIONS.DEFAULT]: RHINO_DEFAULT,
    [RHINO_DIRECTIONS.RUN_LEFT]: RHINO_RUN_LEFT,
    [RHINO_DIRECTIONS.RUN_LEFT_2]: RHINO_RUN_LEFT_2,
    [RHINO_DIRECTIONS.RHINO_LIFT_EAT_1]: RHINO_LIFT_EAT_1,
    [RHINO_DIRECTIONS.RHINO_LIFT_EAT_2]: RHINO_LIFT_EAT_2,
    [RHINO_DIRECTIONS.RHINO_LIFT_EAT_3] : RHINO_LIFT_EAT_3,
    [RHINO_DIRECTIONS.RHINO_LIFT_EAT_4] : RHINO_LIFT_EAT_4,
    [RHINO_DIRECTIONS.RHINO_LIFT_MOUTH_OPEN] : RHINO_LIFT_MOUTH_OPEN,
    [RHINO_DIRECTIONS.RHINO_LIFT] : RHINO_LIFT
};


export const START_GAME_EASY = 'startGameEasy';
export const START_GAME_HARD = 'startGameHard';
export const CHECK_RANK = 'checkRank';
