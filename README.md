<img src="https://i.imgur.com/E6d4jv7.png" height="200"  />

# SkiX, the SkiFree Game

[![CircleCI](https://circleci.com/gh/web2solutions/skix/tree/main.svg?style=svg&circle-token=bc4fd519af3fa134ece1332870cadcb82174130d)](https://circleci.com/gh/web2solutions/skix/tree/main)


[Doc](https://web2solutions.github.io/skix/code)

[Play online - Demo](https://skix.vercel.app/)

```bash
npm install
npm run dev
```

## Code challenge

This project is a answer to the following code challenge:

- [Ceros Ski Code Challenge](https://github.com/tobbie/ceros-ski-master)

### Changes made after the fork:

1. BUG FIX

After get crashed when hitting an obstacle, the skier should be able to get and be facing to the left side up after pressing the `left arrow`.

2. BUG FIX

There was a bug when starting the game and imediately calling ObstacleManager.placeNewObstacle() method. There were no conditionals checking the value of the variable `previousGameWindow`.

<img src="https://i.imgur.com/86R358e.png" width="400">

3. BUILD IMPROVEMENTS

- The babel and wepack setup was update to use newer versions. Allowing, for example, the usage of private resources inside Classes. 
- Security issues related to modules being used is also now solved.
- Added source maps to improve debugging.
- Added Eslint to enforce best pratices and code quality.
- jsDoc setup to generate documentation based on comments from source files.

4. Refactor

`Skier`: The property `Skier.assetName` is moved to `Entity` class to be able to be used by any class extending the Entity class.
`Game`: 


5. TESTING

- Deprecated Jest in favor of Cypress to get a real browser environment to test the game. Jest setup would need at least one addon to deal with canvas and you still does not have a real browser environment. This change is now allowing `visual testing`.
- Written unit tests to cover initial reported issue.
- Written unit tests to cover the `jump` funcionality.
- The test suite now is now able to be run as `unit test` and `visual testing and unit test` mode.


<img src="https://i.imgur.com/ZgboCuV.png" width="400">

<img src="https://i.imgur.com/ZgboCuV.png" width="400">

<img src="https://i.imgur.com/7y4VIaj.png" width="400">
