var ChessInterface = function() {
    this.currentPlayer = 'Player 1';
    this.selectedPiece = "";
    this.player1Pieces = 16;
    this.player2Pieces = 16;
    this.elapsedTime = 1;
    this.resetGame = function() {
        console.log("reset")
    };
    this.undo = function() {
        console.log("undo move")
    };
    this.replay = function() {
        console.log("replay")
    };
};