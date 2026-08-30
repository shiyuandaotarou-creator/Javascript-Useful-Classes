import World from './World.js';
export default class Rect {
    /**
     * 
     * @param {number[]} start 
     * @param {number[]} end 
     * @param {string} sizeType 
     * @param {World} world 
     * @param {string} color 
     */
    constructor(start, end, world, color = "blue",sizeType = "px") {
        this.start = {
            "x": Math.min(start[0], end[0]),
            "y": Math.min(start[1], end[1]),
        };
        this.end = {
            "x": Math.max(start[0], end[0]),
            "y": Math.max(start[1], end[1]),
        };
        this.sizeType = sizeType;
        this.width = this.end.x - this.start.x;
        this.height = this.end.y - this.start.y;
        this._color = color;
        this.world = world;
        this._overlaps = 0;
        this.world.rectList.push(this);
        if (world !== undefined) {
            this.create(world, color);
        }
    }
    set layer(v){
        if(this.element !== undefined){
            this.element.dataset.layer = v;
        }
        this._layer = v;
    }
    get layer(){
        return this._layer;
    }
    set color(v) {
        this._color = v;
        if (this.element !== undefined) {
            this.element.style.backgroundColor = this._color;
        }
    }
    /**
     * 
     * @param {World} world 
     * @param {string} color 
     */
    set id(val){
        this._id=val;
        if(this.element !== undefined){
            this.element.id = val;
        }
    }
    create(world, color = "blue", opacity = 1) {
        this.element = document.createElement("div");
        this.style = this.element.style;
        this.style.position = "absolute";
        this.applyCssPos();
        this.style.backgroundColor = color;
        this.style.opacity = opacity;
        world.parent.append(this.element)
    }
    applyCssPos() {
        this.style.left = this.start.x + this.sizeType;
        this.style.top = this.start.y + this.sizeType;
        this.style.width = this.width + this.sizeType;
        this.style.height = this.height + this.sizeType;

    }
    get center() {
        return {
            "x": (this.start.x + this.end.x) / 2,
            "y": (this.start.y + this.end.y) / 2,
        }
    }
    /**
     * 
     * @param {Rect} rect1 
     * @param {Rect} rect2 
     */
    get overlaps(){
        return this.RectOverlap().length;
    }
    RectOverlap(){
        const result = [];
        for(let i = 0;i<this.world.rectList.length;i++){
            if(Rect.hasOverlap(this.world.rectList[i],this)[0] && this.world.rectList[i] !== this){
                result.push(this.world.rectList[i])
            }
        }
        return result;
    }
    get isHit(){
        for(let i = 0;i<this.world.rectList.length;i++){
            if(Rect.hasOverlap(this.world.rectList[i],this)[0] && this.world.rectList[i] !== this){
                return true;
            }
        }
        return false;
    }
    /**
     * hasOverlap[0]...衝突したかどうかtrue/false
     * hasOverlap[1]...第2引数からみて、第1引数の位置(top,bottom,right,left)
     * hasOverlap[2,3]...x,yのめり込んだ量
     * @param {Rect} rect1 
     * @param {Rect} rect2 
     * @returns 
     */
    static hasOverlap(rect1, rect2) {
        if (rect1 === undefined || rect2 === undefined) {
            return [false,undefined,undefined,undefined];
        }
        const dx = rect1.center.x - rect2.center.x;
        const dy = rect1.center.y - rect2.center.y;
        const overlapX = (rect1.width+rect2.width)/2 - Math.abs(dx);
        const overlapY = (rect1.height+rect2.height)/2 - Math.abs(dy);
        let direction;
        if(overlapX <0||overlapY<0){
            return [false,"none",overlapX,overlapY]
        }
        if(overlapX < overlapY){
            direction = dx > 0 ?  "right" : "left"; 
        }else{
            direction = dy > 0 ?  "bottom" : "top"; 
        }
        // if (rect1.start.x > rect2.end.x) {
        //     return [false,"none"];
        // }
        // if (rect1.start.y > rect2.end.y) {
        //     return [false,"none"];
        // }
        // if (rect2.start.x > rect1.end.x) {
        //     return [false,"none"];
        // }
        // if (rect2.start.y > rect1.end.y) {
        //     return [false,"none"];
        // }
        return [true,direction,overlapX,overlapY];
    }
    move(x, y) {
        this.start.x = x;
        this.start.y = y;
        this.end.x = x + this.width;
        this.end.y = y + this.height;
        if (this.element !== undefined) {
            this.applyCssPos();
        }
    }
}