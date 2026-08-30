import Help from 'https://cdn.jsdelivr.net/gh/shiyuandaotarou-creator/Javascript-Useful-Classes@main/misc/Help.js';
const h = new Help("Input", "キーインプット配列を返します");
export default class Input {
    constructor(funcPressed, funcReleased, parent = undefined) {
        this._pressedKeys = {};
        this.registerKey = (e) => {
            this._pressedKeys[e.code] = true;
        }
        this.releaseKey = (e) => {
            this._pressedKeys[e.code] = false;
        }
        this.funcPressed = funcPressed;
        this.funcReleased = funcReleased;
        window.addEventListener("blur", () => {
            this._pressedKeys = {};
        })
        h.m("Input(funcPressed,funcReleased) ", "初期化", ["funcPressed:任意のキーを押したときに発動する関数", "funcReleased:任意のキーを離した瞬間に発動する関数", "parent=undefined:クリックのparent"])
        h.m("start(parent) ", "キー入力受付を開始", ["parent:反応するエリア"])
        h.m("end()", "キー入力受付を終了", ["引数なし"])
        h.m("isPressed(keycode) ", "キー入力があるか判定", ["keycode:キーコード。KeySやKeyEのString形式で渡す。"])
        h.g("pressedKeys", "現在押されているキーのオブジェくト。'key':boolean型のデータ")
        if (parent) {
            this.parent = parent;
            this.start(parent)
        }
    }
    help() {
        h.helpShow();
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
        this.parent.addEventListener("keydown", this.registerKey)
        this.parent.addEventListener("keydown", this.funcPressed)
        this.parent.addEventListener("keyup", this.releaseKey)
        this.parent.addEventListener("keyup", this.funcReleased)
    }
    end() {
        this.parent.removeEventListener("keydown", this.registerKey);
        this.parent.removeEventListener("keydown", this.funcPressed)
        this.parent.removeEventListener("keyup", this.releaseKey);
        this.parent.removeEventListener("keyup", this.funcReleased)
    }
    isPressed(code) {
        if (this._pressedKeys[code]) {
            return true;
        } else {
            return false;
        }
    }
}
