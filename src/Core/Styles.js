// images
import bg1_bin from '../../bin/bg1_bin';
import snow_bin from '../../bin/snow_bin';
import tram2_bin from '../../bin/tram2_bin';

export const wrapperStyle = `
    width: 100vw;
    height: 100vh;
    padding: 0px;
    margin: 0px;
    font-family: Gill Sans Extrabold, sans-serif;
    font-size: 1em;
`;

export const statsBoard = `
    padding: 2px;
    margin: 2px;
    position: fixed;
    top: 0px;
    right: 0px;
    border: solid #333333 1px;
    background: white;
    width: 20vw;
    height: 20vh;
    list-style-type: none;
    color: #333333;
`;

export const statsBoardItem = ``;

export const controlStyle = `
    width: auto;
    height: auto;
    padding: 10px;
    background-color: #333;
    position: absolute;
    top: 80vh;
    left: 35vw;
    border-radius: 5px;
    z-index: 5;
`;

export const buttonControlStyle = `
    font-size: 1em;
`;




export const scenarioStyle = function () {
    return (`
        width: 100vw;
        height: 100vh;
        background-image: url('${bg1_bin.img}');
        background-repeat:   repeat-x;
        background-position: ${this.scenarioX}px -45vh;
        background-size: contains;
        position: absolute;
        z-index: 0;
        overflow: hidden;           
    `);
};


export const styleTram = `
    width: 100vw;
    height: 100vh;
    background-image: url('${tram2_bin.img}');
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: center center;
    position: absolute;
    top: -5vh;
    z-index: 2;
`;

export const styleSnow = function () {
    return (`
        width: 100vw;
        height: 6000px;
        background-image: url('${snow_bin.img}');
        background-repeat: repeat;
        position: absolute;
        top: ${this.scenarioY}px;
        z-index: 1;
    `);
};
