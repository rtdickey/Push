
generateCell = function(color, piece) {
  if(color == "undefined" && piece == "undefined")
    return {color: null, piece: null};
  else
    return {color: color, piece: piece};
}

exports.generateCell = generateCell;