"use strict";
export class Canvas {
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    drawOffset = {
        x: 0,
        y: 0
    };
    ctx = null;

    constructor(width, height, win) {
        this.width = width;
        this.height = height;

        this.createCanvas(win);
    }

    createCanvas(win) {
        const canvas = win.document.createElement('canvas');
        canvas.id = "skiCanvas";
        canvas.width = this.width * win.devicePixelRatio;
        canvas.height = this.height * win.devicePixelRatio;
        canvas.style.width = this.width + 'px';
        canvas.style.height = this.height + 'px';

        this.ctx = canvas.getContext("2d");
        this.ctx.scale(win.devicePixelRatio, win.devicePixelRatio);

        win.document.body.appendChild(canvas);
    }

    clearCanvas() {
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
    }

    setDrawOffset(x, y) {
        this.drawOffset.x = x;
        this.drawOffset.y = y;
    }

    drawImage(image, x, y, width, height) {
        x -= this.drawOffset.x;
        y -= this.drawOffset.y;

        this.ctx.drawImage(image, x, y, width, height);
    }
}
