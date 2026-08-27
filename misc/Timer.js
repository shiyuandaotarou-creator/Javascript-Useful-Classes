import Help from 'https://cdn.jsdelivr.net/gh/shiyuandaotarou-creator/Javascript-Useful-Classes@main/misc/Help.js';
const h = new Help("Timer","デルタタイムや条件に応じたカウントアップができます。")
export default class Timer {
    #time;
    #previousTime;
    #deltaTime;
    #condition;
    constructor() {
        h.m("Timer","初期化",["引数なし "]);
        h.m("setCondition","カウントアップ条件を設定",[
            "cond:カウントアップ条件 boolean "
        ],"update()などで常時監視が必要")
        h.m("t","カウントアップされた時間を表示",["引数なし "],"ミリ秒で取得")
        h.m("dt","デルタタイムの取得",["requestFPS=false:trueの場合はFPSを返す "])
        this.#time = 0;
        this.#deltaTime = 0;
        this.#previousTime = 0;
        this.#condition = true;
        /**
 * カウントした時間を秒で返します。
 */
        this.ts = () => this.#time / 1000;
        this.#update();
    }
    help(){
        h.helpShow();
    }
    /**
     * 条件が満たされたときカウントアップします。条件登録は常時監視してあげてください。
     * @param {boolean} cond 
     */
    setCondition(cond) {
        this.#condition = cond;
    }
    /**
     * カウントした時間をミリ秒で返します。
     */
    t() {
        return this.#time
    }
    /**
     * デルタタイムを返します。引数がtrueなら逆数(fpsの値)を返します。
     */
    dt(requestFPS = false){
        if(requestFPS){
            return 1000/this.#deltaTime
        }else{
            return this.#deltaTime;
        }
        
    }
    #update(t = 0) {
        this.#deltaTime = t - this.#previousTime;
        this.#previousTime = t;
        if (this.#condition) {
            this.#time += this.#deltaTime;
        }
        requestAnimationFrame(t => this.#update(t));
    }
}

//使用例。5秒カウントしたらストップする
// const t = new Timer();
// update()
// function update() {
//     t.setCondition(t.ts() < 5); //条件監視
//     console.log(t.ts()); //カウンターのメイン部分
//     requestAnimationFrame(update);
// }
