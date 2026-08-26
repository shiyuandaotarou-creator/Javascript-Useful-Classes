export default class CanvasWrapper {
    /**
     * 
     * @param {string} canvasID 
     */
    constructor(width = 500, height = 500, canvasID = "canvas") {
        /** @type {HTMLCanvasElement} */
        this.canvas = document.getElementById(canvasID);
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.canvas.width = width;
        this.canvas.height = height
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
    }
    line(points,close = false,color = "red") {
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(points[0][0], points[0][1]);
        for (let i = 1; i < points.length; i++) {
            this.ctx.lineTo(points[i][0], points[i][1])
        }
        if(close){
            this.ctx.closePath();
        }
        this.ctx.stroke();
    }
    image(img, pos, width) {
        const height = width * img.height / img.width
        this.ctx.drawImage(img, pos[0] - 0.5 * width, pos[1] - 0.5 * height, width,height );
    }
point(x, y, radius = 10, color = "red") {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x - radius / 2, y - radius / 2, radius, radius)
}
clear() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
}
grid(row, column) {
    const width = this.canvasWidth / column;
    const height = this.canvasHeight / row;
    for (let i = 1; i < column; i++) {
        this.line([[i * width, 0], [i * width, this.canvasHeight]]);
    }
    for (let i = 1; i < row; i++) {
        this.line([[0, i * height], [this.canvasWidth, i * height]]);
    }
}
}