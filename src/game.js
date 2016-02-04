var Board = require('./board');

console.log(Board);

function Game() {
    this.board = new Board();
}

Game.prototype.new = function() {
    this.board = new Board();
}

Game.prototype.place = function(x, y, color, piece) {
    return this.board[x][y] = this.board.generateCell(color, place);
}
