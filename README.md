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


10. `FEATURE`

Game console. The game console is the welcome screen allowing the player to select the game mode to start or check the game rank.

11. `PROJECT SETUP`

- Continuous integration setup using Circle CI.
- Online demo is being deployed at vercel.

12. `FEATURE`

Rank Database. It is saving the match data to indexeDB through [voodux](https://web2solutions.github.io/voodux/code/index.html)

## Notes

`NOTE 1`:

Except for the `pop up widgets` and `data persistence` features, this game is a VanilaJS implementation. For sure we can decrease the development time and improve the `game experience` by using 3 party libraries or framework, but the main idea is to show how to do things with pure JS.

`NOTE 2`:

Rather building a back end to persist data, I have added [voodux](https://web2solutions.github.io/voodux/code/index.html) to the project to persist data in a local nosql database.


`NOTE 3`:

Inside some classes such as Game and GameConsole there is a reference to the browser global window object. It may sounds dumb, but it provides support to visual testing throuhg Cypress. Cypress works by rendering the tested code in a iframe in the right side of the screen when you run it in a non headless mode.

## Improvement suggestions:

1. Implement better UI for asking player name.
2. Give the player an option after being ate by rhino.
3. Refactor game console.
4. Deprecate voodux usage in favor of native IndexedDB API to reduce the bundle size. 
5. Write more unit tests.
6. Write more e2e tests.
7. Code coverage.
8. Code documentation. jsDoc is already set up.

## Known bugs

1. When rhino is running into skier direction AND if iskier direction 
2. There are some cases where you are fast pressing arrows and you are eaten by rhino, the skier reappears in the screen.
