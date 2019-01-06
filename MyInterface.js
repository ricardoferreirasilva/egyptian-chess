
var chessInterface = new ChessInterface();
class MyInterface extends CGFinterface {
    /**
     * @constructor
     */
    constructor() {
        super();
        this.materialCount = 0;
    }

    /**
     * Initializes the interface.
     * @param {CGFapplication} application
     */
    init(application) {
        super.init(application);
        // init GUI. For more information on the methods, check:
        //  http://workshop.chromeexperiments.com/examples/gui


        let passScene = this.scene;
        chessInterface.resetGame = function (){
            passScene.resetGame();
            console.log("The game was reset.")
        };
        chessInterface.undo = function (){
            passScene.undoMove();
        };
        chessInterface.replay = function (){
            passScene.replay();
        };
        this.gui = new dat.GUI();
        let f1 = this.gui.addFolder('Game Logic');
        f1.add(chessInterface, 'currentPlayer').listen();
        f1.add(chessInterface, 'message').listen();
        f1.add(chessInterface, 'selectedPiece').listen();
        f1.add(chessInterface, 'player1Pieces').listen();
        f1.add(chessInterface, 'player2Pieces').listen();
        f1.add(chessInterface, 'resetGame');
        f1.add(chessInterface, 'undo');
        f1.add(chessInterface, 'replay');
        return true;
    }
    changeCamera(camera){
        this.setActiveCamera(camera);
    }
    /**
     * Adds a folder containing the IDs of the lights passed as parameter.
     * @param {array} lights
     */
    addLightsGroup(lights) {

        var group = this.gui.addFolder("Lights");
        group.open();

        for(let i=0;i<lights.length;i++){
            this.scene.lightValues[i] = lights[i].enabled;
            group.add(this.scene.lightValues,i);
        }
    }
    processKeyboard(event){
        if(event.key == "m"){
            this.materialCount++;
            console.log(this.materialCount);
        }
    }
    processMouseDown(event){
        super.processMouseDown(event);
        if(event.button == 2){
            this.scene.unselectPiece();
        }
    }
}