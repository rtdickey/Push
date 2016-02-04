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
  test.deepEqual(board[3][0], undefined);
  test.deepEqual(board[3][1], undefined);
  test.deepEqual(board[0][6], undefined);
  test.deepEqual(board[0][7], undefined);
  test.deepEqual(board[3][7], undefined);
  test.done();
}

exports.pieceCanBePlacedAtValidLocation = function(test) {
  var gameState = new GameState;
  gameState.place(2, 2, 'black', 'pusher');
  test.deepEqual(gameState.board[2][2].color, 'black');
  test.deepEqual(gameState.board[2][2].piece, 'pusher');
  test.done();
}

exports.pieceCantBePlacedOffBoard = function(test) {
  var gameState = new GameState;
  test.throws( function() { gameState.place(10, 10, 'black', 'pusher') });
  test.done();
}

exports.pieceCantBePlacedAtUndefinedPosition = function(test) {
  var gameState = new GameState;
  test.throws( function() { gameState.place(0, 0, 'white', 'pawn') });
  test.done();
}

exports.pawnCantBePlacedOnAnotherPiece = function(test) {
  var gameState = new GameState;
  gameState.place(2, 2, 'black', 'pawn');
  test.throws( function() { gameState.place(2, 2, 'white', 'pawn') });
  test.done();
}

exports.pusherCantBePlacedOnAnotherPiece = function(test) {
  var gameState = new GameState;
  gameState.place(2, 6, 'white', 'pusher');
  test.throws( function() { gameState.place(2, 6, 'white', 'pusher') });
  test.done();
}

exports.blackCanOnlyBePlacedOnTopHalfOfBoard = function(test) {
  var gameState = new GameState;
  test.throws( function() { gameState.place(1, 4, 'black', 'pusher') });
  test.throws( function() { gameState.place(2, 4, 'black', 'pawn') });
  gameState.place(1, 3, 'black', 'pusher');
  gameState.place(2, 3, 'black', 'pawn');
  test.deepEqual(gameState.board[1][3].color, 'black');
  test.deepEqual(gameState.board[1][3].piece, 'pusher');
  test.deepEqual(gameState.board[2][3].color, 'black');
  test.deepEqual(gameState.board[2][3].piece, 'pawn');
  test.done();
}

exports.whiteCanOnlyBePlacedOnBottomHalfOfBoard = function(test) {
  var gameState = new GameState;
  test.throws( function() { gameState.place(1, 3, 'white', 'pusher') });
  test.throws( function() { gameState.place(2, 3, 'white', 'pawn') });
  gameState.place(1, 4, 'white', 'pusher');
  gameState.place(2, 4, 'white', 'pawn');
  test.deepEqual(gameState.board[1][4].color, 'white');
  test.deepEqual(gameState.board[1][4].piece, 'pusher');
  test.deepEqual(gameState.board[2][4].color, 'white');
  test.deepEqual(gameState.board[2][4].piece, 'pawn');
  test.done();
}