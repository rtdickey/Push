function Board(board) {
    this.board = board || [];
}

/**
 * Create Board
 * @return {Array} stuff? I've never played this game
 */
Board.prototype.create = function () {
    for (var i = 0; i < 4; i++) {
        this.board[i] = new Array();

        for (var j = 0; j < 8; j++) {
            if (i === 0 && j === 0 || i === 3 && j === 0 ||
                i === 3 && j === 1 || i === 0 && j === 6 ||
                i === 0 && j === 7 || i === 3 && j === 7) {
                this.board[i][j] = null;
            }
            else {
                this.board[i][j] = this.generateCell();
            }
        }
    }

    return this.board;
}

/**
 * Generate a cell on the board
 * @param  {string} color color of cell
 * @param  {string} piece idk
 * @return {object}       color and piece
 */
Board.prototype.generateCell = function (color, piece) {
    return {
        color: color ? color : null,
        piece: piece ? piece : null
    };
}

module.exports = Board;
