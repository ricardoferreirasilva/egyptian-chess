class Tile {
    constructor(scene,x,y,color,material,piece){
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.color = color;
        this.tileHeightScale = 0.3;
        this.translateFactor = 1.0;
        this.model = new MyCube(this.scene,0,1,0,1);
        this.tileMaterial = material;
        this.piece = piece;

        //Materials
        this.moveMaterial = new CGFappearance(this.scene);
        this.moveMaterial.setAmbient(0.2, 0.2, 1, 1);
        this.moveMaterial.setDiffuse(0.2, 0.2, 1, 1);
        this.moveMaterial.setSpecular(0.2, 0.2, 1, 1);
        this.moveMaterial.setTexture(material.texture);

        //Materials
        this.killMaterial = new CGFappearance(this.scene);
        this.killMaterial.setAmbient(0.7, 0.2, 0.2, 1);
        this.killMaterial.setDiffuse(0.7, 0.2, 0.2, 1);
        this.killMaterial.setSpecular(0.7, 0.2, 0.2, 1);
        this.killMaterial.setTexture(material.texture);

        //1 normal,2 selected,3 move,4,kill
        this.materialState = 1;
    }
    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.x* this.translateFactor,0,this.y* this.translateFactor);
        if(this.piece != undefined){
            this.piece.display();
        }
        switch (this.materialState) {
            case 1:
                this.tileMaterial.apply();
                break;
            case 3:
                this.moveMaterial.apply();
                break;
            case 4:
                this.killMaterial.apply();
                break;
            default:
                this.tileMaterial.apply();
                break;
        }
        this.scene.scale(1,this.tileHeightScale,1);
        this.model.display();
        this.scene.popMatrix();
    }
    setPiece(piece){
        this.piece = piece;
    }
}