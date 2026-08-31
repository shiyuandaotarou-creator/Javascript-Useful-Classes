import Rect from "https://cdn.jsdelivr.net/gh/shiyuandaotarou-creator/Javascript-Useful-Classes@main/physics/Rect.js";
import Help from 'https://cdn.jsdelivr.net/gh/shiyuandaotarou-creator/Javascript-Useful-Classes@main/misc/Help.js';
export default class ImageRect extends Rect {
    constructor(link, center, rate = 1, world = undefined, layer = 0) {
        super([0, 0], [0, 0], world, layer, "transparent")
        this.world = world;
        this._center = center;
        this.imageLoaded = false;
        if (link) {
            this.image = new Image();
            this.image.src = link;
            this.image.onload = () => {
                this.imageLoaded = true;
                this.width = this.image.width * rate;
                this.height = this.image.height * rate;

                this._startPos = [
                    center[0] - this._width / 2,
                    center[1] - this._height / 2
                ]
                this._endPos = [
                    center[0] + this._width / 2,
                    center[1] + this._height / 2
                ];
            }
        }
        this.h = new Help("ImageRect", "画像付きのRectクラス")
        this.h.m("ImageRect(link,center,rate,world,layer)", "初期化", ["link:画像リンク", "center:画像中心", "rate:拡大倍率", "world:rectの登録先world", "layer:rectのレイヤー"]);
        this.h.m("draw(cond)", "画像をCanvasに描画", ["cond=true:描画条件"])
        this.h.g("imageLoaded", "画像が読み込まれたか")
    }
    help() {
        this.h.helpShow();
    }
    draw(cond = true) {
        if (cond && this.imageLoaded)
            this.world.ctx.drawImage(this.image, this._startPos[0], this._startPos[1], this._width, this._height)
    }
}