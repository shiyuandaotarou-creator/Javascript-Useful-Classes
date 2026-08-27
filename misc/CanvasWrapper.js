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
    }
    help() {
        console.log(
            "%cCanvasWrapper使用方法\n%cこのクラスは、Canvasの便利機能をまとめたクラスです。点・折れ線・画像を描画できます。",
            "font-size:15px;font-weight:700",""
        );
        console.log(
            "[初期化方法]\n%cCanvasWrapper(width=500,height=500,canvasID='canvas')%c\nwidth:キャンバス解像度幅\nheight:キャンバス解像度高\ncanvasID:HTMLファイルののキャンバスID"
            ,"color:yellow",""
        );
        console.log(
            "[画像を登録]\n%caddImage(link,pos,width,name=link,num=0)%c\nlink:画像のリンク\npos:配列で中心座標\nwidth:幅\nname:画像名\nnum:画像レイヤー"
            ,"color:yellow",""
        );
        console.log(
            "[画像登録を解除]\n%cremoveImage(name)%c\nname:消去する画像名",
            "color:yellow",""
        );
        console.log(
            '[折れ線を引く]\n%cline(points, close = false, color = "red")%c\npoints:点の配列\nclose:閉路にするか\ncolor:線の色'
            ,"color:yellow",""
        )
        console.log(
            '[点を打つ]\n%cpoint(x, y, radius = 10, color = "red") %c\nx:点のx座標\ny:点のy座標\nradius:点の半径\ncolor:点の色'
            ,"color:yellow",""
        )
        console.log(
            '[グリッドを作る]\n%cgrid(row, column)%c\nrow:行の数\ncolumn:列の数'
            ,"color:yellow",""
        )
        console.log(
            '[画面を消去]\n%cclear()\n%c引数なし'
            ,"color:yellow",""
        )
        console.log(
            '[毎フレーム描画用update]\n%cdrawUpdate(func, drawCond = true, imgCond = true, stopCond = false)\n%cfunc:実行する関数\ndrawCond:描画する条件\nimgCond:画像を描画する条件。引数にレイヤー番号を受け取り可能。\nstopCond:この条件を満たしたらストップ'
            ,"color:yellow",""
        )
    }
    drawImage(cond = true) {
        for (const c of this.imageList) {
            if (cond(c.class)) {
                this.image(c.img, c.pos, c.width);
            }
        }
    }
    addImage(link, pos, width, name = link, num = 0) {
        const img = new Image();
        img.src = link;
        img.onload = () => {
            this.imageList.push({
                "name": name,
                "img": img,
                "pos": pos,
                "width": width,
                "class": num,
            })
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
    drawUpdate(func, drawCond = true, imgCond = true, stopCond = false) {
        const update = () => {
            if (drawCond()) {
                this.clear();
                this.drawImage(imgCond);
                func();
            }
            if (!stopCond) {
                requestAnimationFrame(update);
            }
        }
        update()
    }
}
