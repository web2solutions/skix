<img src="https://i.imgur.com/E6d4jv7.png" height="200"  />

# SkiX, the SkiFree Game

[![CircleCI](https://circleci.com/gh/web2solutions/skix/tree/main.svg?style=svg&circle-token=bc4fd519af3fa134ece1332870cadcb82174130d)](https://circleci.com/gh/web2solutions/skix/tree/main)


[Doc](https://web2solutions.github.io/skix/code)

[Play online - Demo](https://skix.vercel.app/)

### Run in dev mode

```bash
npm install
npm run dev
```


### Run tests on Visual mode

```bash
npm run cy:open

```


### Run tests on Unit mode


```bash
npm run test
```
## Code challenge

This project is a answer to the following code challenge:

- [Ceros Ski Code Challenge](https://github.com/tobbie/ceros-ski-master)

### Changes made after the code being forked:


1. `PROJECT SETUP`

- The babel and wepack setup was update to use newer versions. Allowing, for example, the usage of private resources inside Classes. 
- Security issues related to modules being used is also now solved.
- Added source maps to improve debugging.
- Added Eslint to enforce best pratices and code quality.
- jsDoc setup to generate documentation based on comments from source files.

2. `BUG FIX`

After get crashed when hitting an obstacle, the skier should be able to get and be facing to the left side up after pressing the `left arrow`.

3. `BUG FIX`

There was a bug when starting the game and imediately calling ObstacleManager.placeNewObstacle() method. There were no conditionals checking the value of the variable `previousGameWindow`.

<img src="https://i.imgur.com/86R358e.png" width="400">



4. `REFACTOR`

`Skier`: The property `Skier.assetName` is moved to `Entity` class to be able to be used by any class extending the Entity class.
`Game`: 

5. `FEATURE`

- The skier is now able to jump when pressing the `shift` key. 
- It original speed is incresed to two times. When jumping the skier does not get crashed if it hit any `rock` obstacle.


6. `FEATURE`

- The `Ramp Jump` obstacle  is now implemented.
- When hitting the `ramp jump` the skier behaves like it's jumping.

6. `TESTING`

- Deprecated Jest in favor of Cypress to get a real browser environment to test the game. Jest setup would need at least one addon to deal with canvas and you still does not have a real browser environment. This change is now allowing `visual testing`.
- Written unit tests to cover initial reported issue.
- Written unit tests to cover the `jump` funcionality.
- The test suite now is now able to be run as `unit test` and `visual testing and unit test` mode.


<img src="https://i.imgur.com/ZgboCuV.png" width="400">

<img src="https://i.imgur.com/oCZSccG.png" width="400">

<img src="https://i.imgur.com/7y4VIaj.png" width="400">

7. `REFACTOR`

The image assets were encoded into base64 strings and stored as js modules and now are they are built and loaded together with the `main` and `unique` `bundle file`.

This is a change which improves the game loading and make it easiest to update any asset

8. `FEATURE`

The  rhino is up and hungry!

- Rhino runs from right to left based in skier currently position


9. `FEATURE`

Game Stats Panel

- Display time
- Display distance
- Display speed
- Display style

