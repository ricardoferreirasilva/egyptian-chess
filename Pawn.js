class Pawn{
    constructor(scene,x,y,player){
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.player = player;
        this.model = new MyCube(this.scene,0,1,0,1);
        this.animations = [];

        this.material1 = new CGFappearance(this.scene);
        this.material1.setAmbient(0.9, 0.3, 0.8, 1);
        this.material1.setDiffuse(0.1, 0.6, 0.6, 1);
        this.material1.setSpecular(1, 0.2, 0.8, 1);

        this.material2 = new CGFappearance(this.scene);
        this.material2.setAmbient(0.9, 0.3, 0.1, 1);
        this.material2.setDiffuse(0.9, 0.6, 0.6, 1);
        this.material2.setSpecular(1, 0.2, 0.8, 1);
    }
    display(){
        this.scene.pushMatrix();
        this.scene.scale(0.5,1,0.5)
        this.scene.translate(0,0.5,0)
        if(this.player == 1){
            this.material1.apply();
        }
        else{
            this.material2.apply();
        }
        this.model.display();
        this.scene.popMatrix();
    }
    getMoveset(chessBoard){
       let set = {kill:[], move:[]};
       if(this.player == 1){
            //move to the front.
            if(insideBoard(this.x+1,this.y)){
                let tilePiece = chessBoard[this.x+1][this.y].piece;
                if(tilePiece == undefined){
                    set.move.push([this.x+1,this.y])
                }
            }
            //front right
            if(insideBoard(this.x+1,this.y+1)){
                let tilePiece = chessBoard[this.x+1][this.y+1].piece;
                if(tilePiece != undefined && tilePiece.player != this.player){
                    set.kill.push([this.x+1,this.y+1])
                }
            }
             //front left
             if(insideBoard(this.x+1,this.y-1)){
                let tilePiece = chessBoard[this.x+1][this.y-1].piece;
                if(tilePiece != undefined && tilePiece.player != this.player){
                    set.kill.push([this.x+1,this.y-1])
                }
            }
       }
       else if(this.player == 2){
            //move to the front.
            if(insideBoard(this.x-1,this.y)){
                let tilePiece = chessBoard[this.x-1][this.y].piece;
                if(tilePiece == undefined){
                    set.move.push([this.x-1,this.y])
                }
            }
            //front right
            if(insideBoard(this.x-1,this.y+1)){
                let tilePiece = chessBoard[this.x-1][this.y+1].piece;
                if(tilePiece != undefined && tilePiece.player != this.player){
                    set.kill.push([this.x-1,this.y+1])
                }
            }
             //front left
             if(insideBoard(this.x-1,this.y-1)){
                let tilePiece = chessBoard[this.x-1][this.y-1].piece;
                if(tilePiece != undefined && tilePiece.player != this.player){
                    set.kill.push([this.x-1,this.y-1])
                }
            }
       }
       return set;
    }
}