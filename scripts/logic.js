generateCell = function(color, piece) {
  if(color == "undefined" && piece == "undefined")
    return {color: null, piece: null};
  else
    return {color: color, piece: piece};
}

generateBoard = function() {
  var board = new Array();
  for(i = 0; i < 4; i++){
    board[i] = new Array();
    for(j = 0; j < 8; j++){
      board[i][j] = generateCell();
    }
  }
  return board;
}

exports.generateCell = generateCell;
exports.generateBoard = generateBoard;