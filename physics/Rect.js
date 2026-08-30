import Help from 'https://cdn.jsdelivr.net/gh/shiyuandaotarou-creator/Javascript-Useful-Classes@main/misc/Help.js';
import World from 'https://cdn.jsdelivr.net/gh/shiyuandaotarou-creator/Javascript-Useful-Classes@main/physics/World.js';
export default class Rect {
    /**
     * 
     * @param {number[]} startPos 
     * @param {number[]} endPos 
     * @param {World} world 
     */
    constructor(startPos = [0, 0], endPos = [1, 1], world = undefined, layer = 0, backgroundColor = "red") {
        this.layer = layer;
        this.hitTargetLayers = [layer];
        this.startPos = [ //正規化
            Math.min(startPos[0], endPos[0]),
            Math.min(startPos[1], endPos[1])
        ];
        this.endPos = [
            Math.max(startPos[0], endPos[0]),
            Math.max(startPos[1], endPos[1])
        ];
        if (world !== undefined) {
            this.world = world;
        }
        this._center = [
            (this.startPos[0] + this.endPos[0]) / 2,
            (this.startPos[1] + this.endPos[1]) / 2
        ]
        this.canvas = world.canvas;
        this.ctx = this.canvas.getContext("2d");
        this._width = this.endPos[0] - this.startPos[0];
        this._height = this.endPos[1] - this.startPos[1];
        this.backgroundColor = backgroundColor;
        world.rectList.push(this)
        this.h = new Help("Rect", "長方形のテンプレートを作成します");
        this.h.m("Rect(startPos, endPos, world, layer, backgroundColor)", "初期化", [
            "startPos:長方形の開始位置", "endPos:長方形の終了位置", "world:親のWorldクラス", "layer=0:レイヤー", "backgroundColor=red:背景色"
        ]);
        this.h.m("setHitLayer(...layerNums)", "衝突判定をもたせるレイヤーを指定", ["layerNums:対象レイヤー"]);
        this.h.m("draw()", "変数をCanvasに適用して描画", ["引数なし"]);
        this.h.m("hasOverlap(rect,returnDirection)", "2つのrectの衝突判定", ["rect:衝突判定する相手", "returnDirection=false:衝突面の方向を返すかどうか"],
            "returnDirection=trueの場合は配列を返し、0番目に衝突したかのtrue/false,1番目にthisからみてrectがどこに衝突したかを返します"
        );
        this.h.m("getOverlaps(returnBoolean)", "重なっているRectすべてを返す", ["returnBoolean=false:これがtrueの場合は結果がtrue/falseで返ります"], "Worldの管理するrectListの中で判定します")
        this.h.gs("center", "中心座標。渡すときは配列の形で渡す")
        this.h.gs("layer", "Rectのレイヤー")
        this.h.gs("backgroundColor", "長方形の背景色")
        this.h.g("startPos", "開始座標");
        this.h.g("endPos", "終了座標")
        this.h.g("width", "幅");
        this.h.g("height", "高さ")
    }
    help() {
        this.h.helpShow();
    }
    setHitLayer(...layerNums) {
        this.hitTargetLayers = layerNums;
    }
    draw() {
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(this.startPos[0], this.startPos[1], this._width, this._height);
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    set width(width) {
        this._width = width;
        this.startPos = [
            this._center[0] - this._width / 2,
            this._center[1] - this._height / 2
        ];
    }
    set height(height) {
        this._height = height;
        this.startPos = [
            this._center[0] - this._width / 2,
            this._center[1] - this._height / 2
        ];
    }
    set center(centerPos) {
        this._center = centerPos;
        this.startPos = [
            centerPos[0] - this._width / 2,
            centerPos[1] - this._height / 2
        ];
        this.endPos = [
            centerPos[0] + this._width / 2,
            centerPos[1] + this._height / 2
        ]
    }
    get center() {
        return this._center;
    }
    /**
     * 
     * @param {Rect} rect
     */
    hasOverlap(rect, returnDirection = false) {
        if (!this.hitTargetLayers.includes(rect.layer)) {
            if (returnDirection) {
                return [false, "none"]
            } else {
                return false;
            }
        }
        const overlapX = Math.min(this.endPos[0], rect.endPos[0]) - Math.max(this.startPos[0], rect.startPos[0]);
        const overlapY = Math.min(this.endPos[1], rect.endPos[1]) - Math.max(this.startPos[1], rect.startPos[1]);
        if (overlapX < 0 || overlapY < 0) {
            if (returnDirection) {
                return [false, "none"];
            }
            return false;
        } else if (!returnDirection) {
            return true
        } else {
            if (overlapX < overlapY) {
                return rect.center[0] > this._center[0] ? [true, "right"] : [true, "left"]
            } else {
                return rect.center[1] > this._center[1] ? [true, "bottom"] : [true, "top"]
            }
        }
    }
    getOverlaps(returnBoolean = false) {
        let result = [];
        for (const rect of this.world.rectList) {
            const overlap = this.hasOverlap(rect, true);
            if (rect === this) {
                continue
            }
            if (overlap[0]) {
                if (returnBoolean) {
                    return true;
                }
                result.push({
                    "rect": rect,
                    "direction": overlap[1]
                })
            }
        }
        if (returnBoolean) {
            return false;
        }
        return result;
    }
}