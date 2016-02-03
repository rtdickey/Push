class Cell = function(){
  function constructor(color, piece) {
    this.color = color;
    this.piece = piece;
  }
}

generateCell = function(color, piece) {
  if(color !== "undefined" && piece !== "undefined") {
    return new Cell(color, piece)
  }
  else
    return new Cell(null, null)
}

exports.generateCell = generateCell;