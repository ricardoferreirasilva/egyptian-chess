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
        //player 1
        this.chessBoard[1][0].setPiece(new Pawn(this.scene, 1, 0, 1));
        this.chessBoard[1][1].setPiece(new Pawn(this.scene, 1, 1, 1));
        this.chessBoard[1][2].setPiece(new Pawn(this.scene, 1, 2, 1));
        this.chessBoard[1][3].setPiece(new Pawn(this.scene, 1, 3, 1));
        this.chessBoard[1][4].setPiece(new Pawn(this.scene, 1, 4, 1));
        this.chessBoard[1][5].setPiece(new Pawn(this.scene, 1, 5, 1));
        this.chessBoard[1][6].setPiece(new Pawn(this.scene, 1, 6, 1));
        this.chessBoard[1][7].setPiece(new Pawn(this.scene, 1, 7, 1));





        this.chessBoard[2][2].setPiece(new Pawn(this.scene, 2, 2, 2));

        this.currentSelectedTile = undefined;
        this.currentPlayer = 1;
        this.animationON = false;
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
        if (!this.animationON) {
            if (tile.piece === undefined) {
                //console.log("This tile has no piece.")
                if (this.currentSelectedTile !== undefined) {
                    let set = this.currentSelectedTile.piece.getMoveset(this.chessBoard);
                    let valid = validateMove(tile.x, tile.y, set);
                    if (valid) {
                        let x = this.currentSelectedTile.x;
                        let y = this.currentSelectedTile.y
                        console.log(x + " " + y)
                        console.log(tile.x + " " + tile.y)
                        let differencePair = { x: (tile.x - x), y: 0, z: (tile.y - y) };
                        console.log(differencePair);
                        this.currentSelectedTile.piece.currentAnimation = new LinearAnimation(1, [{ x: 0, y: 0, z: 0 }, { x: 0, y: 2, z: 0 }, { x: differencePair.x, y: 2, z: differencePair.z }, differencePair]);
                        this.animationON = true;
                        setTimeout(() => {
                            let currentPiece = this.currentSelectedTile.piece;
                            this.currentSelectedTile.piece = undefined
                            tile.setPiece(currentPiece);
                            this.animationON = false;
                            this.unselectTile();
                        }, 1000);
                    }
                }
                else {
                    console.log("Clicked on an emtpy tile.");
                }
            }
            else {
                console.log(tile.piece.constructor.name)
                if (tile.piece.player == this.currentPlayer) {
                    this.unselectTile();
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
                else {
                    console.log("belongs to enemy.")
                }
            }
        }
    }
    unselectTile() {
        if(!this.animationON){
            this.currentSelectedTile = undefined;
            for (let x = 0; x < 8; x++) {
                for (let y = 0; y < 8; y++) {
                    this.chessBoard[x][y].materialState = 1;
                }
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

function validateMove(x, y, set) {
    for (let i = 0; i < set.move.length; i++) {
        let pair = set.move[i];
        if (x == pair[0] && y == pair[1]) {
            return true;
        }
    }
    return false;
}