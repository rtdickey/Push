var logic = require('../scripts/logic.js');

exports.testCanary = function(test) {
	test.ok(true);
	test.done();
};

exports.defaultCellHasNoPiece = function(test) {
  cell = logic.generateCell();
  console.log("HELLO WORLDO");
  console.log(cell);
  test.deepEqual(cell.piece, null);
  test.done();
}

exports.cellPassedBlackPawnHasBlackPawn = function(test) {
  cell = logic.generateCell('black', 'pawn')
  console.log("HELLO WORLDO2");
  console.log(cell);
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

// exports.defaultBoardIsCorrect = function(test) {
//   defaultBoard = logic.generateGameBoard();
//   test.deepEqual()
// }

// exports.testCreateShowReturnsJsonObjWithShowData = function(test) {
// 	var result = logic.createShow('Breaking Bad', 4, 13);
// 	test.deepEqual({"showName": 'Breaking Bad', "seasons": 4, "episodes": 13}, result);
// 	test.done();
// };