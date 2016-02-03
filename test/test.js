var logic = require('../scripts/logic.js');

exports.testCanary = function(test) {
	test.ok(true);
	test.done();
};

exports.defaultCellHasNoPieceOrColor = function(test) {
  var cell = logic.generateCell();
  test.deepEqual(cell.piece, undefined);
  test.deepEqual(cell.color, undefined);
  test.done();
}

exports.cellPassedBlackPawnHasBlackPawn = function(test) {
  var cell = logic.generateCell('black', 'pawn');
  test.deepEqual(cell.piece, 'pawn');
  test.deepEqual(cell.color, 'black');
  test.done();
}

exports.cellPassedBlackPusherHasBlackPusher = function(test) {
  var cell = logic.generateCell('black', 'pusher');
  test.deepEqual(cell.piece, 'pusher');
  test.deepEqual(cell.color, 'black');
  test.done();
}

exports.boardIs4by8 = function(test) {
  var board = logic.generateBoard();
  test.deepEqual(board.length, 4);
  test.deepEqual(board[0].length, 8);
  test.done();
}

/***********
Board should look like this:
        u**u
        ***u
        ****
        ****
        ****
        ****
        u***
        u**u
where u is undefined
*/
exports.boardInvalidAreasAreUndefined = function(test) {
  var board = logic.generateBoard();
  test.deepEqual(board[0][0], undefined);
  test.deepEqual(board[0][3], undefined);
  test.deepEqual(board[1][3], undefined);
  test.deepEqual(board[0][6], undefined);
  test.deepEqual(board[0][7], undefined);
  test.deepEqual(board[3][7], undefined);
  test.done();
}

// exports.pieceCanBePlacedAtValidLocation = function(test) {
//   var board = logic.generateBoard;
  
// }