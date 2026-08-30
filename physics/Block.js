import PhysRect from "./PhysRect.js";
export default  class Block extends PhysRect{
    constructor(pos,width,parent=undefined,color="blue",sizeType="px"){
        let start,end;
        start=[
            pos[0]-width/2,
            pos[1]-width/2,
        ];
        end=[
            pos[0]+width/2,
            pos[1]+width/2,
        ];
        super(start,end,parent,color,sizeType)
        this._rotateMode = 0;
    }
    set rotate(val){
        if(this.element !== undefined){}
        this.element.style.rotate = val + "deg";
    }
    set rotateMode(val){
        if(val === "rand"){
            this._rotateMode = val;
            this.rotate = [0,90,180,270][Math.floor(Math.random()*4)]
        }
    }
    set img(src){
        if(this.element !== undefined){
            this.element.style.backgroundColor="";
            this.element.style.backgroundImage =`url("${src}")`;
            this.element.style.backgroundSize = "cover"
            this.element.style.backgroundPosition = "center"
            this.element.style.imageRendering = "pixelated";
        }
    }

}