export default class Timer {
    #time;
    #previousTime;
    #deltaTime;
    #condition;
    constructor() {
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