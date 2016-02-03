var logic = require('../scripts/logic.js');

exports.testCanary = function(test) {
	test.ok(true);
	test.done();
};

exports.defaultCellHasNoPieceOrColor = function(test) {
  cell = logic.generateCell();
  test.deepEqual(cell.piece, undefined);
  test.deepEqual(cell.color, undefined);
  test.done();
}

exports.cellPassedBlackPawnHasBlackPawn = function(test) {
  cell = logic.generateCell('black', 'pawn')
  test.deepEqual(cell.piece, 'pawn')
  test.deepEqual(cell.color, 'black')
  test.done();
}

exports.cellPassedBlackPusherHasBlackPusher = function(test) {
  cell = logic.generateCell('black', 'pusher')
  test.deepEqual(cell.piece, 'pusher')
  test.deepEqual(cell.color, 'black')
  test.done();
}