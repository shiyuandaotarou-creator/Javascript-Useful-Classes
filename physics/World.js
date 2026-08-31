export default class World {
    constructor(width = 500, height = 500, canvasId = "canvas") {
        /** @type { HTMLCanvasElement } */
        this.canvas = document.getElementById(canvasId);
        this.rectList = [];
        this.canvasId = canvasId;
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext("2d")
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    }
}
