generateCell = function(color, piece) {
  if(color == "undefined" && piece == "undefined")
    return {color: undefined, piece: undefined, locked: false, partOfPath: false};
  else
    return {color: color, piece: piece, locked: false, partOfPath: false};
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
  this.boardHeight = this.board[0].length,
  this.boardWidth = this.board.length,
  this.place = function(x, y, color, piece) {
    if(this.board[x][y] === undefined ||
       this.board[x][y].color !== undefined)
      throw 'invalid board position bitch';
    if((y > 3 && color === 'black') || (y < 4 && color === 'white'))
      throw 'invalid area of board for placement bitch';
    this.board[x][y] = generateCell(color, piece);
  },

  this.move = function(x_src, y_src, x_dest, y_dest) {
    if(this.board[x_dest][y_dest].color !== undefined) {
      if(this.board[x_src][y_src].piece === 'pusher'){
        if(this.board[x_src][y_src].locked)
          throw 'cannot move locked piece';
        this.push(x_src, y_src, x_dest, y_dest);
        this.clearLocks();
        this.board[x_dest][y_dest].locked = true;
        return;
      }
      else
        throw 'piece already here bitch';
    }
    else if(this.board[x_src][y_src].locked)
      throw 'cannot move locked piece';
    else if(!this.validPath(x_src, y_src, x_dest, y_dest))
      throw 'no valid path';
    else {
      this.board[x_dest][y_dest].color = this.board[x_src][y_src].color;
      this.board[x_dest][y_dest].piece = this.board[x_src][y_src].piece;
      this.board[x_src][y_src].piece = undefined;
      this.board[x_src][y_src].color = undefined;
    }
  },

  this.push = function(x_src, y_src, x_dest, y_dest) {
    if(y_dest < y_src)
      this.translateUp(x_src, y_src);
    else if (y_dest > y_src)
      this.translateDown(x_src, y_src);
    else if (x_dest < x_src)
      this.translateLeft(x_src, y_src);
    else if (x_dest > x_src) 
      this.translateRight(x_src, y_src);
    else
      throw 'likely an invalid push!';
  },

  this.translateUp = function(x, y){
    for(var i = y; i > 0; i--) {
      if(this.board[x][i] !== undefined && this.board[x][i].color === undefined) { //if an empty space exists in the column
        for(var j = i; j < y; j++){                                                //translate it up
          this.board[x][j].color = this.board[x][j+1].color;
          this.board[x][j].piece = this.board[x][j+1].piece;
        }
        this.board[x][y].color = undefined;
        this.board[x][y].piece = undefined;
        return;
      }
      else if(this.board[x][i].locked) {
        throw 'invalid push, locked pusher is blocking you';
      }
    }
    //win condition will go here
    throw 'no empty space! invalid push!';
  },

  this.translateDown = function(x, y) {
    for(var i = y; i < this.boardHeight; i++) {
      if(this.board[x][i].color === undefined) {
        for(var j = i; j > y; j--) {
          this.board[x][j].color = this.board[x][j - 1].color;
          this.board[x][j].piece = this.board[x][j - 1].piece;
        }
        this.board[x][y].color = undefined;
        this.board[x][y].piece = undefined;
        return;
      }
      else if(this.board[x][i].locked) {
        throw 'invalid push, locked pusher is blocking you';
      }
    }
    //win condition will go here
    throw 'no empty space! invalid push!';
  },

  this.translateLeft = function(x, y) {
    for(var i = x; i > -1; i--) {
      if(this.board[i][y].color === undefined) {
        for(var j = i; j < x; j++) {
          this.board[j][y].color = this.board[j + 1][y].color;
          this.board[j][y].piece = this.board[j + 1][y].piece;
        }
        this.board[x][y].color = undefined;
        this.board[x][y].piece = undefined;
        return;
      }
      else if(this.board[i][y].locked) {
        throw 'invalid push, locked pusher is blocking you';
      }
    }
    //win condition will go here
    throw 'no empty space! invalid push!';
  },

  this.translateRight = function(x, y) {
    for(var i = x; i < this.boardWidth; i++) {
      if(this.board[i][y].color === undefined) {
        for(var j = i; j > 0; j--) {
          this.board[j][y].color = this.board[j - 1][y].color;
          this.board[j][y].piece = this.board[j - 1][y].piece;
        }
        this.board[x][y].color = undefined;
        this.board[x][y].piece = undefined;
        return;
      }
      else if(this.board[i][y].locked) {
        throw 'invalid push, locked pusher is blocking you';
      }
    }
    //win condition will go here
    throw 'no empty space! invalid push!';
  },

  //TODO: Refactor this pile of shit
  this.validPath = function(x_src, y_src, x_dest, y_dest) {
    if(this.board[x_dest][y_dest] === undefined)
      return false;
    if(this.board[x_src][y_src] === this.board[x_dest][y_dest])
      return true;
    if(this.board[x_dest][y_dest].color !== undefined)
      return false;
    this.board[x_dest][y_dest].partOfPath = true;
    if(this.board[x_dest] !== undefined && 
       this.board[x_dest][y_dest - 1] !== undefined && 
      !this.board[x_dest][y_dest - 1].partOfPath && 
       this.validPath(x_src, y_src, x_dest, y_dest - 1) === true)
      return true;
    if(this.board[x_dest + 1] !== undefined &&
       this.board[x_dest + 1][y_dest] !== undefined &&
      !this.board[x_dest + 1][y_dest].partOfPath && 
       this.validPath(x_src, y_src, x_dest + 1, y_dest) === true)
      return true;
    if(this.board[x_dest] !== undefined &&
       this.board[x_dest][y_dest + 1] !== undefined &&
      !this.board[x_dest][y_dest + 1].partOfPath && 
       this.validPath(x_src, y_src, x_dest, y_dest + 1) === true)
      return true;
    if(this.board[x_dest - 1] !== undefined && 
       this.board[x_dest - 1][y_dest] !== undefined && 
      !this.board[x_dest - 1][y_dest].partOfPath && 
       this.validPath(x_src, y_src, x_dest - 1, y_dest) === true)
      return true; 
    this.board[x_dest][y_dest].partOfPath = false;
    return false;
  },

  this.clearLocks = function() {
    for(var i = 0; i < this.boardWidth; i++){
      for(var j = 0; j < this.boardHeight; j++) {
        if(this.board[i][j] !== undefined && this.board[i][j].locked)
          this.board[i][j].locked = false;
      }
    }
  }
}

exports.generateCell = generateCell;
exports.generateBoard = generateBoard;
exports.GameState = GameState;
