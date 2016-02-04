generateCell = function(color, piece) {
  if(color == "undefined" && piece == "undefined")
    return {color: null, piece: null};
  else
    return {color: color, piece: piece};
}

generateBoard = function() {
  var board = new Array();
  for(var i = 0; i < 4; i++){
    board[i] = new Array();
    for(var j = 0; j < 8; j++){
      if(i===0&&j===0 || i===3&&j===0 ||
         i===3&&j===1 || i===0&&j===6 ||
         i===0&&j===7 || i===3&&j===7)
        board[i][j] = undefined;
      else
        board[i][j] = generateCell();
    }
  }
  return board;
}

GameState = function() {
  this.board = generateBoard(),
  this.place = function(x, y, color, piece) {
    if(this.board[x][y] === undefined ||
       this.board[x][y].color !== undefined)
      throw 'invalid board position bitch';
    if(y > 3 && color === 'black')
      throw 'invalid area of board for black bitch';
    this.board[x][y] = generateCell(color, piece);
  }
}

exports.generateCell = generateCell;
exports.generateBoard = generateBoard;
exports.GameState = GameState;