class Queen {
    constructor(scene, x, y, player) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.player = player;
        this.model = new CGFOBJModel(this.scene, 'models/Queen.obj');
        this.currentAnimation = undefined;


        this.material1 = new CGFappearance(this.scene);
        this.material1.setAmbient(0.9, 0.3, 0.8, 1);
        this.material1.setDiffuse(0.1, 0.6, 0.6, 1);
        this.material1.setSpecular(1, 0.2, 0.8, 1);

        this.material2 = new CGFappearance(this.scene);
        this.material2.setAmbient(0.9, 0.3, 0.1, 1);
        this.material2.setDiffuse(0.9, 0.6, 0.6, 1);
        this.material2.setSpecular(1, 0.2, 0.8, 1);
    }
    display() {
        this.scene.pushMatrix();
        if (this.currentAnimation != undefined) {
            if (!this.currentAnimation.finished) {
                this.currentAnimation.update(this.scene);
            }
        }
        this.scene.translate(0, 0.5, 0)
        if (this.player == 1) {
            this.material1.apply();
        }
        else {
            this.material2.apply();
        }
        this.model.display();
        this.scene.popMatrix();
    }
    getMoveset(chessBoard) {
        let set = { kill: [], move: [] };
        for (let z = this.y + 1; z < 8; z++) {
            if (insideBoard(this.x, z)) {
                let tilePiece = chessBoard[this.x][z].piece;
                if (tilePiece == undefined) {
                    set.move.push([this.x, z])
                }
                else {
                    if (tilePiece.player != this.player) {
                        set.kill.push([this.x, z]);
                        break;
                    }
                    else if (tilePiece.player == this.player) {
                        break;
                    }
                }
            }

        }
        for (let z = this.y - 1; z >= 0; z--) {
            if (insideBoard(this.x, z)) {
                let tilePiece = chessBoard[this.x][z].piece;
                if (tilePiece == undefined) {
                    set.move.push([this.x, z])
                }
                else {
                    if (tilePiece.player != this.player) {
                        set.kill.push([this.x, z]);
                        break;
                    }
                    else if (tilePiece.player == this.player) {
                        break;
                    }
                }
            }
        }
        for (let z = this.x + 1; z < 8; z++) {
            if (insideBoard(z, this.y)) {
                let tilePiece = chessBoard[z][this.y].piece;
                if (tilePiece == undefined) {
                    set.move.push([z, this.y])
                }
                else {
                    if (tilePiece.player != this.player) {
                        set.kill.push([z, this.y]);
                        break;
                    }
                    else if (tilePiece.player == this.player) {
                        break;
                    }
                }
            }
        }
        for (let z = this.x - 1; z >= 0; z--) {
            if (insideBoard(z, this.y)) {
                let tilePiece = chessBoard[z][this.y].piece;
                if (tilePiece == undefined) {
                    set.move.push([z, this.y])
                }
                else {
                    if (tilePiece.player != this.player) {
                        set.kill.push([z, this.y])
                        break;
                    }
                    else if (tilePiece.player == this.player) {
                        break;
                    }
                }
            }
        }
        for (let z = this.y + 1; z < 8; z++) {
            let A = (z - (this.y));
            if (insideBoard(this.x - A, z)) {
                let tilePiece = chessBoard[this.x - A][z].piece;
                if (tilePiece == undefined) {
                    set.move.push([this.x - A, z])
                }
                else {
                    if (tilePiece.player != this.player) {
                        set.kill.push([this.x - A, z]);
                        break;
                    }
                    else if (tilePiece.player == this.player) {
                        break;
                    }
                }
            }

        }
        for (let z = this.y - 1; z >= 0; z--) {
            let A = (z - (this.y));
            if (insideBoard(this.x - A, z)) {
                let tilePiece = chessBoard[this.x - A][z].piece;
                if (tilePiece == undefined) {
                    set.move.push([this.x - A, z])
                }
                else {
                    if (tilePiece.player != this.player) {
                        set.kill.push([this.x - A, z]);
                        break;
                    }
                    else if (tilePiece.player == this.player) {
                        break;
                    }
                }
            }
        }
        for (let z = this.x + 1; z < 8; z++) {
            let A = (z - (this.x));
            if (insideBoard(z, this.y + A)) {
                let tilePiece = chessBoard[z][this.y + A].piece;
                if (tilePiece == undefined) {
                    set.move.push([z, this.y + A])
                }
                else {
                    if (tilePiece.player != this.player) {
                        set.kill.push([z, this.y + A]);
                        break;
                    }
                    else if (tilePiece.player == this.player) {
                        break;
                    }
                }
            }
        }
        for (let z = this.x - 1; z >= 0; z--) {
            let A = (z - (this.x));
            if (insideBoard(z, this.y + A)) {
                let tilePiece = chessBoard[z][this.y + A].piece;
                if (tilePiece == undefined) {
                    set.move.push([z, this.y + A])
                }
                else {
                    if (tilePiece.player != this.player) {
                        set.kill.push([z, this.y + A])
                        break;
                    }
                    else if (tilePiece.player == this.player) {
                        break;
                    }
                }
            }
        }
        return set;
    }
}