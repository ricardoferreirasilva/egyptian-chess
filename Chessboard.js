class Chessboard {
    constructor(scene) {
        this.scene = scene;
        this.chessBoard = [[], [], [], [], [], [], [], []];


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
                if (sum % 2 == 0) {
                    chosenMaterial = egyptMaterial;
                }
                else {
                    chosenMaterial = goldMaterial;
                }

                console.log(chosenMaterial);
                this.chessBoard[x][y] = new Tile(this.scene, x, y, 1, chosenMaterial, undefined)
            }
        }
        this.chessBoard[1][1].setPiece(new Pawn(this.scene, 1, 1, 1));
        this.chessBoard[2][2].setPiece(new Pawn(this.scene, 2, 2, 2));

        this.currentSelectedTile = undefined;
    }
    display() {
        this.scene.pushMatrix();
        //this.scene.translate(-3.5,0,-3.5)
        let id = 1;
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                this.scene.registerForPick(id++, this.chessBoard[x][y]);
                this.chessBoard[x][y].display();
            }
        }
        this.scene.popMatrix();
    }
    selectTile(tile) {
        let x = tile.x;
        let y = tile.y;
        console.log("Selecting a tile: " + x + "," + y);
        if (tile.piece === undefined) {
            console.log("This tile has no piece.")
        }
        else {
            console.log(tile.piece.constructor.name)
            this.currentSelectedTile = tile;
            let set = tile.piece.getMoveset(this.chessBoard);
            let killset = set.kill;
            for (let i = 0; i < killset.length; i++) {
                let position = killset[i];
                this.chessBoard[position[0]][position[1]].materialState = 4;

            }
            let moveset = set.move;
            for (let i = 0; i < moveset.length; i++) {
                let position = moveset[i];
                this.chessBoard[position[0]][position[1]].materialState = 3;

            }
        }
    }
    unselectTile() {
        this.currentSelectedTile = undefined;
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                this.chessBoard[x][y].materialState = 1;
            }
        }

    }
    movePieceTo(x1, y1, x2, y2) {
        if (this.piece == undefined) {
            console.log("This tile has no piece to play.")
        }
        else {
            //play animation.
            // after animation is done this.piece undefined.
        }
    }
}

function insideBoard(x, y) {
    if ((x >= 0 && x < 8) && (y >= 0 && y < 8)) {
        return true;
    }
    else {
        return false;
    }
}
