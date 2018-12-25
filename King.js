class King {
    constructor(scene, x, y, player) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.player = player;
        this.model = new MyCube(this.scene, 0, 1, 0, 1);
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
        this.scene.scale(0.5, 1.3, 0.5)
        this.scene.translate(0, 0.5, 0)
        if (this.currentAnimation != undefined) {
            if (!this.currentAnimation.finished) {
                this.currentAnimation.update(this.scene);
            }
        }
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
        let positions = [];
        positions.push({x:this.x+1,y:this.y});
        positions.push({x:this.x-1,y:this.y});
        positions.push({x:this.x,y:this.y+1});
        positions.push({x:this.x,y:this.y-1});

        positions.push({x:this.x+1,y:this.y-1});
        positions.push({x:this.x+1,y:this.y+1});
        positions.push({x:this.x-1,y:this.y-1});
        positions.push({x:this.x-1,y:this.y+1});

        for (let i = 0; i < positions.length; i++) {
            let pos = positions[i];
            if (insideBoard(pos.x, pos.y)) {
                let tilePiece = chessBoard[pos.x][pos.y].piece;
                if (tilePiece == undefined) {
                    set.move.push([pos.x, pos.y])
                }
                else {
                    if (tilePiece.player != this.player) {
                        set.kill.push([pos.x, pos.y]);
                    }
                    else if(tilePiece.player == this.player) {
                    } 
                }
            }
            
        }
        return set;
    }
}