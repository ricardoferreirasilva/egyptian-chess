class Tile {
    constructor(scene,x,y,color){
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.color = color;

        this.model = new MyCube(this.scene,0,1,0,1);
    }
    display(){
        this.scene.pushMatrix();
        this.model.display();
        this.scene.popMatrix();
    }
}