import Help from 'https://cdn.jsdelivr.net/gh/shiyuandaotarou-creator/Javascript-Useful-Classes@main/misc/Help.js';
const h = new Help("Input", "キー入力やマウス座標を取得できます");
export default class Input {
    constructor(funcPressed, funcReleased, parent = window) {
        this._pressedKeys = {};
        this.registerKey = (e) => {
            this._pressedKeys[e.code] = true;
        }
        this.releaseKey = (e) => {
            this._pressedKeys[e.code] = false;
        }
        this.giveMousePos = (e) => {
            this._mousePos.x = e.clientX;
            this._mousePos.y = e.clientY;
        }
        this._mousePos = {};
        this.funcPressed = funcPressed;
        this.funcReleased = funcReleased;
        window.addEventListener("blur", () => {
            this._pressedKeys = {};
        })
        h.m("Input(funcPressed,funcReleased) ", "初期化", ["funcPressed:任意のキーを押したときに発動する関数", "funcReleased:任意のキーを離した瞬間に発動する関数", "parent=window:クリックのparent"])
        h.m("start(parent) ", "キー入力受付を開始", ["parent:反応するエリア"])
        h.m("end()", "キー入力受付を終了", ["引数なし"])
        h.m("isPressed(keycode) ", "キー入力があるか判定", ["keycode:キーコード。KeySやKeyEのString形式で渡す。"])
        h.g("pressedKeys", "現在押されているキーのオブジェクト。'key':boolean型のデータ")
        h.g("mousePos", "マウスカーソルの座標")
        if (parent) {
            this.parent = parent;
            this.start(parent)
        }
    }
    help() {
        h.helpShow();
    }
    get mousePos() {
        return this._mousePos;
    }
    get pressedKeys() {
        return this._pressedKeys;
    }
    /**
     * 
     * @param {HTMLElement} parent 
     */
    start(parent) {
        this.parent = parent;
        this.parent.addEventListener("keydown", this.registerKey);
        this.parent.addEventListener("keydown", this.funcPressed);
        this.parent.addEventListener("keyup", this.releaseKey);
        this.parent.addEventListener("keyup", this.funcReleased);
        this.parent.addEventListener("mousemove", this.giveMousePos)
    }
    end() {
        this.parent.removeEventListener("keydown", this.registerKey);
        this.parent.removeEventListener("keydown", this.funcPressed)
        this.parent.removeEventListener("keyup", this.releaseKey);
        this.parent.removeEventListener("keyup", this.funcReleased)
        this.parent.removeEventListener("mousemove", this.giveMousePos)
    }
    isPressed(code) {
        if (this._pressedKeys[code]) {
            return true;
        } else {
            return false;
        }
    }
}
