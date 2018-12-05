class Pawn{
    constructor(scene,x,y){
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.model = new MyCube(this.scene,0,1,0,1);
        this.animations = [];
    }
    display(){
        this.scene.pushMatrix();
        this.scene.scale(0.5,1,0.5)
        this.scene.translate(0,0.5,0)
        this.model.display();
        this.scene.popMatrix();
    }
}