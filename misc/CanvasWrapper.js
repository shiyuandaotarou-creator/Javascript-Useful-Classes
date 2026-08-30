import Help from 'https://cdn.jsdelivr.net/gh/shiyuandaotarou-creator/Javascript-Useful-Classes@main/misc/Help.js';
const h = new Help("CanvasWrapper", "Canvasの便利機能をまとめました。点・折れ線・画像の描画ができます。");
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
        this.imageList = [];
        h.m("CanvasWrapper(width,height,canvasID)", "初期化", [
            "width=500:横解像度 ", "height=500:縦解像度", "canvasID:キャンバスのHTMLID"]);
        h.m("addImage(link, pos, width, name = link, num,func)", "画像を登録", [
            "link:画像のリンク ", "pos:中心座標 number[] ", "width:横幅", "name:画像の名前", "num:画像レイヤー ","func:画像読込み時に実行する関数"
        ], "画像読み込み時に一回だけ実行。update()の中で実行しないでください")
        h.m("editImage(name,input1,input2)", "画像を編集", ["name:編集する画像の名前。数字で渡した場合はその添字の部分を編集します。", "input1,input2:後述 "],
            "input1,input2にはpos,widthのどちらかが入ります。配列で入れた部分がpos,数字で入れた部分がwidthとして認識されるので渡す順番は自由です。input2は必須ではありません。毎フレームeditImageを呼ぶ場合はeditImageのname引数にかならず'添字'を渡してください。添字はgetIndexで取得できます。(計算量が爆発するため)"
        )
        h.m("getIndex(name)","画像名から添字を取得",["name:画像名 "],"毎フレームeditImageを呼ぶ場合はeditImageのname引数にかならず添字を渡してください(計算量が爆発するため)")
        h.m(" removeImage(name)", "画像登録を解除", ["name:登録を解除する画像の名前 "])
        h.m("line(points, color) ", "折れ線を描画", ["points:通る点 number[][]", "close=false:閉路にするか", "color='red':線の色 "])
        h.m("point(x, y, radius, color) ", "点を描画", ["x:中心のx座標", "y:中心のy座標", "radius=10:半径", "color='red':点の色 "])
        h.m("clear()", "画面を消去", ["引数なし "])
        h.m("grid(row, column) ", "グリッドを描画", ["row:行の数", "column:列の数 "])
        h.m("drawUpdate(func, drawCond, imgCond, stopCond) ", "毎フレーム描画", [
            "func:実行する関数", "drawCond=true:描画条件", "imgCond=true:画像描画条件", "stopCond=false:描画強制終了条件"
        ], "内部でupdate()を実行するので一回だけ呼べば十分。\nimgCondはラムダ式で画像のレイヤーを受け取れます。\n各条件が時々刻々と変化する場合はラムダ式で渡してください")
    }
    help() {
        h.helpShow();
    }
    getIndex(name){
        for(let i in this.imageList){
            if(this.imageList[i].name === name){
                return Number(i);
            }
        }
    }
    drawImage(cond = () => true) {
        for (const c of this.imageList) {
            if (cond(c.class)) {
                this.image(c.img, c.pos, c.width);
            }
        }
    }
    addImage(link, pos, width, name = link, num = 0,func=()=>{}) {
        const img = new Image();
        img.src = link;
        img.onload = () => {
            this.imageList.push({
                "name": name,
                "img": img,
                "pos": pos,
                "width": width,
                "class": num,
            });
            func();
        }
    }
    editImage(name, input1, input2) {
        let pos, width;
        if (Array.isArray(input1)) { //input1のほうがposの場合
            pos = input1;
            if (input2 !== undefined) {
                width = input2;
            }
        } else {
            width = input1;
            if (input2 !== undefined) {
                pos = input2;
            }
        }//pos,widthに内容を入力。かたっぽだけなら相方はundefined
        if (typeof name === "string") {
            for (const c of this.imageList) {
                if (c.name === name) {
                    if (pos !== undefined) {
                        c.pos = pos;
                    }
                    if (width !== undefined) {
                        c.width = width;
                    }
                }
            }
        } else if (typeof name === "number") {
            const c = this.imageList[name]
            if (pos !== undefined) {
                c.pos = pos;
            }
            if (width !== undefined) {
                c.width = width;
            }
        }
    }
    removeImage(name) {
        for (const i in this.imageList) {
            if (this.imageList[i].name === name) {
                this.imageList.splice(i, 1);
                console.log(`${i}番目に${name}があったので消去しました。`);

            }
        }
    }
    line(points, close = false, color = "red") {
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(points[0][0], points[0][1]);
        for (let i = 1; i < points.length; i++) {
            this.ctx.lineTo(points[i][0], points[i][1])
        }
        if (close) {
            this.ctx.closePath();
        }
        this.ctx.stroke();
    }
    image(img, pos, width) {
        const height = width * img.height / img.width
        this.ctx.drawImage(img, pos[0] - 0.5 * width, pos[1] - 0.5 * height, width, height);
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
    drawUpdate(func =()=>{}, drawCond = () => true, imgCond = () => true, stopCond = () => false) {
        const update = () => {
            if (drawCond()) {
                this.clear();
                this.drawImage(imgCond);
                func();
            }
            if (!stopCond()) {
                requestAnimationFrame(update);
            }
        }
        update()
    }
}
