import Timer from 'https://cdn.jsdelivr.net/gh/shiyuandaotarou-creator/Javascript-Useful-Classes@main/misc/Timer.js';
import Rect from "./Rect.js";
export default class PhysRect extends Rect{
    constructor(start,end,parent,color,sizeType){
        super(start, end, parent,color,sizeType)
        this.timer = new Timer();
        this.velocity = {
            "x":0,
            "y":0
        }
        this.force = {
            "x":0,
            "y":0
        }
        this.mass = 1;
        this.allowMove=true;
        this.allowForce = false;
        this.#update()
    }
    set gravity(value){
        this.allowForce = true;
        this.force.y = value;
    }
    #update(){
        if(this.allowMove){
            this.move(
                this.start.x+this.velocity.x*this.timer.dt()/1000,
                this.start.y+this.velocity.y*this.timer.dt()/1000
            )
        }
        if(this.isHit){
            this.velocity.y=0;
            if(this.force.y>0){
                this.force.y=0
            }
        }
        // if(this.isHit){
        //     this.velocity.y = -0.9*this.velocity.y;
        //     this.move(
        //         this.start.x+this.velocity.x*this.timer.dt()/1000,
        //         this.start.y+this.velocity.y*this.timer.dt()/1000
        //     )
        // }
        if(this.allowMove){
            this.velocity.x += this.force.x*this.timer.dt()/1000;
            this.velocity.y += this.force.y*this.timer.dt()/1000;
        }
        requestAnimationFrame((t)=>this.#update(t));
    }
}