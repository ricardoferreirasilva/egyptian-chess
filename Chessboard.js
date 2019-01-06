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
                this.chessBoard[x][y] = new Tile(this.scene, x, y, 1, chosenMaterial, undefined)
            }
        }
        // Pawns
        this.chessBoard[1][0].setPiece(new Pawn(this.scene, 1, 0, 1));
        this.chessBoard[1][1].setPiece(new Pawn(this.scene, 1, 1, 1));
        this.chessBoard[1][2].setPiece(new Pawn(this.scene, 1, 2, 1));
        this.chessBoard[1][3].setPiece(new Pawn(this.scene, 1, 3, 1));
        this.chessBoard[1][4].setPiece(new Pawn(this.scene, 1, 4, 1));
        this.chessBoard[1][5].setPiece(new Pawn(this.scene, 1, 5, 1));
        this.chessBoard[1][6].setPiece(new Pawn(this.scene, 1, 6, 1));
        this.chessBoard[1][7].setPiece(new Pawn(this.scene, 1, 7, 1));
        // Towers
        this.chessBoard[0][0].setPiece(new Tower(this.scene, 0, 0, 1));
        this.chessBoard[0][7].setPiece(new Tower(this.scene, 0, 7, 1));
        //Bishop
        this.chessBoard[0][2].setPiece(new Bishop(this.scene, 0, 2, 1));
        this.chessBoard[0][5].setPiece(new Bishop(this.scene, 0, 5, 1));
        //Horse
        this.chessBoard[0][1].setPiece(new Horse(this.scene, 0, 1, 1));
        this.chessBoard[0][6].setPiece(new Horse(this.scene, 0, 6, 1));
        //Royals
        this.chessBoard[0][3].setPiece(new Queen(this.scene, 0, 3, 1));
        this.chessBoard[0][4].setPiece(new King(this.scene, 0, 4, 1));



        // Pawns
        this.chessBoard[6][0].setPiece(new Pawn(this.scene, 6, 0, 2));
        this.chessBoard[6][1].setPiece(new Pawn(this.scene, 6, 1, 2));
        this.chessBoard[6][2].setPiece(new Pawn(this.scene, 6, 2, 2));
        this.chessBoard[6][3].setPiece(new Pawn(this.scene, 6, 3, 2));
        this.chessBoard[6][4].setPiece(new Pawn(this.scene, 6, 4, 2));
        this.chessBoard[6][5].setPiece(new Pawn(this.scene, 6, 5, 2));
        this.chessBoard[6][6].setPiece(new Pawn(this.scene, 6, 6, 2));
        this.chessBoard[6][7].setPiece(new Pawn(this.scene, 6, 7, 2));
        // Towers
        this.chessBoard[7][0].setPiece(new Tower(this.scene, 7, 0, 2));
        this.chessBoard[7][7].setPiece(new Tower(this.scene, 7, 7, 2));
        //Bishop
        this.chessBoard[7][2].setPiece(new Bishop(this.scene, 0, 2, 2));
        this.chessBoard[7][5].setPiece(new Bishop(this.scene, 0, 5, 2));
        //Horse
        this.chessBoard[7][1].setPiece(new Horse(this.scene, 7, 1, 2));
        this.chessBoard[7][6].setPiece(new Horse(this.scene, 7, 6, 2));
        //Royals
        this.chessBoard[7][3].setPiece(new Queen(this.scene, 7, 3, 2));
        this.chessBoard[7][4].setPiece(new King(this.scene, 7, 4, 2));

        this.currentSelectedTile = undefined;
        this.currentPlayer = 1;
        this.animationON = false;
        this.replaying = false;
        this.replayInterval = undefined;
        this.moveStack = [];
    }
    display() {
        this.scene.pushMatrix();
        this.scene.translate(-3.5,0,-3.5)
        let id = 1;
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                this.scene.registerForPick(id++, this.chessBoard[x][y]);
                this.chessBoard[x][y].display();
            }
        }
        this.scene.popMatrix();
    }
    selectTile(tile,replaying = false) {
        if (!this.animationON) {
            if (tile.piece === undefined) {
                if (this.currentSelectedTile !== undefined) {
                    let set = this.currentSelectedTile.piece.getMoveset(this.chessBoard);
                    let valid = validateMove(tile.x, tile.y, set);
                    if (valid) {
                        //Make a move.
                        let x = this.currentSelectedTile.x;
                        let y = this.currentSelectedTile.y

                        let differencePair = { x: (tile.x - x), y: 0, z: (tile.y - y) };
                        console.log(differencePair)
                        //Adding animation.
                        this.currentSelectedTile.piece.currentAnimation = new LinearAnimation(1, [{ x: 0, y: 0, z: 0 }, { x: 0, y: 2, z: 0 }, { x: differencePair.x, y: 2, z: differencePair.z }, differencePair]);
                        this.animationON = true;

                        //Register the move.
                        if(!replaying){
                            this.moveStack.push({ type: "move", from: [x, y], to: [tile.x, tile.y] });
                        }


                        setTimeout(() => {
                            let currentPiece = this.currentSelectedTile.piece;
                            this.currentSelectedTile.piece = undefined
                            tile.setPiece(currentPiece);
                            this.animationON = false;
                            this.unselectTile();
                            this.changePlayer();
                            chessInterface.currentPlayer = "Player " + this.currentPlayer;
                            console.log(chessInterface.currentPlayer)
                        }, 1000);
                    }
                }
                else {
                    console.log("Clicked on an emtpy tile.");
                }
            }
            else {
                if (tile.piece.player == this.currentPlayer) {
                    this.unselectTile();
                    this.currentSelectedTile = tile;
                    chessInterface.selectedPiece = tile.piece.constructor.name;
                    let set = tile.piece.getMoveset(this.chessBoard);
                    let killset = set.kill;
                    for (let i = 0; i < killset.length; i++) {
                        let position = killset[i];
                        console.log(position);
                        console.log(this.chessBoard[position[0]][position[1]])
                        this.chessBoard[position[0]][position[1]].materialState = 4;

                    }
                    let moveset = set.move;
                    for (let i = 0; i < moveset.length; i++) {
                        let position = moveset[i];
                        this.chessBoard[position[0]][position[1]].materialState = 3;

                    }
                }
                else {
                    //If we already selected a piece.
                    if (this.currentSelectedTile !== undefined) {
                        let set = this.currentSelectedTile.piece.getMoveset(this.chessBoard);
                        let valid = validateKill(tile.x, tile.y, set);
                        if (valid) {
                            //Make a move.
                            let x = this.currentSelectedTile.x;
                            let y = this.currentSelectedTile.y
                            let differencePair = { x: (tile.x - x), y: 0, z: (tile.y - y) };
                            //Adding animation.
                            this.currentSelectedTile.piece.currentAnimation = new LinearAnimation(1, [{ x: 0, y: 0, z: 0 }, { x: 0, y: 2, z: 0 }, { x: differencePair.x, y: 2, z: differencePair.z }, differencePair]);
                            this.animationON = true;
                            //Register the move.
                            let eaten = tile.piece;
                            if(tile.piece.constructor.name == "King"){
                                chessInterface.message = "Player won " + this.currentSelectedTile.piece.player + "!";
                            }
                            if(!replaying){
                                this.moveStack.push({ type: "eat", from: [x, y], to: [tile.x, tile.y], eaten: eaten });
                            }

                            setTimeout(() => {
                                //Update interface.
                                if (this.currentSelectedTile.piece.player == 1) {
                                    chessInterface.player1Pieces--;
                                }
                                else {
                                    chessInterface.player2Pieces--;
                                }
                                let currentPiece = this.currentSelectedTile.piece;
                                this.currentSelectedTile.piece = undefined
                                tile.setPiece(currentPiece);
                                this.animationON = false;
                                this.unselectTile();
                                this.changePlayer();

                            }, 1000);
                        }

                    }
                    //No piece currently selected.
                    else {
                        console.log("belongs to enemy.")
                    }
                }
            }
        }
    }
    unselectTile() {
        if (!this.animationON) {
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
    changePlayer() {
        if (this.currentPlayer == 1) this.currentPlayer = 2;
        else this.currentPlayer = 1;
        chessInterface.currentPlayer = "Player " + this.currentPlayer;
    }
    resetGame(resetMoveStack) {
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
                this.chessBoard[x][y] = new Tile(this.scene, x, y, 1, chosenMaterial, undefined)
            }
        }
        // Pawns
        this.chessBoard[1][0].setPiece(new Pawn(this.scene, 1, 0, 1));
        this.chessBoard[1][1].setPiece(new Pawn(this.scene, 1, 1, 1));
        this.chessBoard[1][2].setPiece(new Pawn(this.scene, 1, 2, 1));
        this.chessBoard[1][3].setPiece(new Pawn(this.scene, 1, 3, 1));
        this.chessBoard[1][4].setPiece(new Pawn(this.scene, 1, 4, 1));
        this.chessBoard[1][5].setPiece(new Pawn(this.scene, 1, 5, 1));
        this.chessBoard[1][6].setPiece(new Pawn(this.scene, 1, 6, 1));
        this.chessBoard[1][7].setPiece(new Pawn(this.scene, 1, 7, 1));
        // Towers
        this.chessBoard[0][0].setPiece(new Tower(this.scene, 0, 0, 1));
        this.chessBoard[0][7].setPiece(new Tower(this.scene, 0, 7, 1));
        //Bishop
        this.chessBoard[0][2].setPiece(new Bishop(this.scene, 0, 2, 1));
        this.chessBoard[0][5].setPiece(new Bishop(this.scene, 0, 5, 1));
        //Horse
        this.chessBoard[0][1].setPiece(new Horse(this.scene, 0, 1, 1));
        this.chessBoard[0][6].setPiece(new Horse(this.scene, 0, 6, 1));
        //Royals
        this.chessBoard[0][3].setPiece(new Queen(this.scene, 0, 3, 1));
        this.chessBoard[0][4].setPiece(new King(this.scene, 0, 4, 1));



        // Pawns
        this.chessBoard[6][0].setPiece(new Pawn(this.scene, 6, 0, 2));
        this.chessBoard[6][1].setPiece(new Pawn(this.scene, 6, 1, 2));
        this.chessBoard[6][2].setPiece(new Pawn(this.scene, 6, 2, 2));
        this.chessBoard[6][3].setPiece(new Pawn(this.scene, 6, 3, 2));
        this.chessBoard[6][4].setPiece(new Pawn(this.scene, 6, 4, 2));
        this.chessBoard[6][5].setPiece(new Pawn(this.scene, 6, 5, 2));
        this.chessBoard[6][6].setPiece(new Pawn(this.scene, 6, 6, 2));
        this.chessBoard[6][7].setPiece(new Pawn(this.scene, 6, 7, 2));
        // Towers
        this.chessBoard[7][0].setPiece(new Tower(this.scene, 7, 0, 2));
        this.chessBoard[7][7].setPiece(new Tower(this.scene, 7, 7, 2));
        //Bishop
        this.chessBoard[7][2].setPiece(new Bishop(this.scene, 0, 2, 2));
        this.chessBoard[7][5].setPiece(new Bishop(this.scene, 0, 5, 2));
        //Horse
        this.chessBoard[7][1].setPiece(new Horse(this.scene, 7, 1, 2));
        this.chessBoard[7][6].setPiece(new Horse(this.scene, 7, 6, 2));
        //Royals
        this.chessBoard[7][3].setPiece(new Queen(this.scene, 7, 3, 2));
        this.chessBoard[7][4].setPiece(new King(this.scene, 7, 4, 2));

        this.currentSelectedTile = undefined;
        this.currentPlayer = 1;
        this.animationON = false;
        if(resetMoveStack){
            this.moveStack = [];
        }
    }
    undoMove() {
        if (this.moveStack.length == 0) {
            console.log("No move has been made.");
        }
        else {
            let lastMove = this.moveStack.pop();
            if (lastMove.type == "move") {
                let getPiece = this.chessBoard[lastMove.to[0]][lastMove.to[1]].piece;
                this.chessBoard[lastMove.to[0]][lastMove.to[1]].piece = undefined;
                this.chessBoard[lastMove.from[0]][lastMove.from[1]].setPiece(getPiece);
                this.changePlayer();
            }
            else if (lastMove.type == "eat") {
                let getPiece = this.chessBoard[lastMove.to[0]][lastMove.to[1]].piece;
                this.chessBoard[lastMove.to[0]][lastMove.to[1]].setPiece(lastMove.eaten);
                this.chessBoard[lastMove.from[0]][lastMove.from[1]].setPiece(getPiece);
                this.changePlayer();
            }
        }
    }
    replay() {
        this.resetGame(false);
        if (!this.replaying) {
            this.replaying = true;
            let that = this;
            this.replayInterval = setInterval(function () {
                if(that.moveStack.length > 0){
                    let move = that.moveStack.shift();
                    let select1 = that.chessBoard[move.from[0]][move.from[1]];
                    let select2 = that.chessBoard[move.to[0]][move.to[1]];
                    that.selectTile(select1,true);
                    that.selectTile(select2,true);
                    console.log(move)
                }
                else{
                    that.replaying = false;
                    clearInterval(that.replayInterval);
                    console.log("Replaying done.")
                }
            }, 1500);
        }
        else {
            this.replaying = false;
            clearInterval(this.replayInterval);
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
function validateKill(x, y, set) {
    for (let i = 0; i < set.kill.length; i++) {
        let pair = set.kill[i];
        if (x == pair[0] && y == pair[1]) {
            return true;
        }
    }
    return false;
}
