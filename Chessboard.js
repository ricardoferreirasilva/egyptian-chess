class Chessboard {
    constructor(scene) {
        this.scene = scene;
        this.chessBoard = [[],[],[],[],[],[],[],[]];


        let egyptTexture = new CGFtexture(this.scene, "./scenes/images/egypt1.jpg")
        let goldTexture = new CGFtexture(this.scene, "./scenes/images/gold.jpg")

        let egyptMaterial = new CGFappearance(this.scene);
        egyptMaterial.setAmbient(0.3, 0.3, 0.3, 1);
        egyptMaterial.setDiffuse(0.6, 0.6, 0.6, 1);
        egyptMaterial.setSpecular(0, 0.2, 0.8, 1);
        egyptMaterial.setTexture(egyptTexture);

        let goldMaterial = new CGFappearance(this.scene);
        goldMaterial.setAmbient(0.3, 0.3, 0.3, 1);
        goldMaterial.setDiffuse(0.6, 0.6, 0.6, 1);
        goldMaterial.setSpecular(0, 0.2, 0.8, 1);
        goldMaterial.setTexture(goldTexture);

        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                let sum = x + y;
                let chosenMaterial;;
                if(sum % 2 == 0){
                    chosenMaterial = egyptMaterial;
                }
                else{
                   chosenMaterial = goldMaterial;
                }

                console.log(chosenMaterial);
                this.chessBoard[x][y] = new Tile(this.scene,x,y,1,chosenMaterial)
            }
        }
    }
    display() {
        this.scene.pushMatrix();
        //this.scene.translate(-3.5,0,-3.5)
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                this.chessBoard[x][y].display();
            }
        }
        this.scene.popMatrix();
    }
}