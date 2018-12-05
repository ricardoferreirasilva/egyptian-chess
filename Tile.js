class Tile {
    constructor(scene,x,y,color,material){
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.color = color;
        this.tileHeightScale = 0.3;
        this.translateFactor = 1.0;
        this.model = new MyCube(this.scene,0,1,0,1);
        this.tileMaterial = material;
    }
    display(){
        this.scene.pushMatrix();

        this.tileMaterial.apply();

        this.scene.scale(1,this.tileHeightScale,1);
        this.scene.translate(this.x* this.translateFactor,0,this.y* this.translateFactor);
        this.model.display();
        this.scene.popMatrix();
    }
}