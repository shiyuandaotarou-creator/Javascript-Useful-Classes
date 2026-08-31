import Help from 'https://cdn.jsdelivr.net/gh/shiyuandaotarou-creator/Javascript-Useful-Classes@main/misc/Help.js';
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
        this.h = new Help("World", "キャンバス統一データを扱います");
        this.h.m("World(width,height,canvasId)", "初期化", ["width:横解像度", "height:縦解像度", "canvasId:キャンバスID"]);
        this.h.m("clearCanvas()", "キャンバスを初期化", ["引数なし"]);
        this.h.g("canvasId", "キャンバスのID");
        this.h.g("canvasHeight", "キャンバスの縦解像度")
        this.h.g("canvasWidth", "キャンバスの横解像度")
        this.h.g("canvas", "キャンバスエレメント")
        this.h.g("ctx", "2Dキャンバスコンテキスト")
        this.h.sg("rectList", "登録されているRectの一覧")
    }
    help() {
        this.h.helpShow();
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    }
} 
