generateCell = function(color, piece) {
  if(color == "undefined" && piece == "undefined")
    return {color: undefined, piece: undefined};
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
    if((y > 3 && color === 'black') || (y < 4 && color === 'white'))
      throw 'invalid area of board for placement bitch';
    this.board[x][y] = generateCell(color, piece);
  },

  this.move = function(x_src, y_src, x_dest, y_dest) {
    if(this.board[x_dest][y_dest].color !== undefined){
      if(this.board[x_src][y_src].piece === 'pusher')
        this.push(x_src, y_src, x_dest, y_dest);
      else
        throw 'piece already here bitch';
    }
    this.board[x_dest][y_dest].color = this.board[x_src][y_src].color;
    this.board[x_dest][y_dest].piece = this.board[x_src][y_src].piece;
    this.board[x_src][y_src].piece = undefined;
    this.board[x_src][y_src].color = undefined;
  },

  this.push = function(x_src, y_src, x_dest, y_dest) {
    
  }
}

exports.generateCell = generateCell;
exports.generateBoard = generateBoard;
exports.GameState = GameState;