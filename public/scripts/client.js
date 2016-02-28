var createTable = function(playerSocket){
	for(var i = 0; i < 8; i++) {
      var tr = document.createElement("tr");
      for(var j = 0; j < 4; j++) {
        var cell = document.createElement("td");
        if(!(i===0&&j===0 || i===0&&j===3 ||
         i===1&&j===3 || i===6&&j===0 ||
         i===7&&j===0 || i===7&&j===3)){
          var cell = document.createElement("td");
          cell.id = i + ',' + j;
          cell.setAttribute("draggable", true);
          cell.addEventListener("dragstart", dragging);
          cell.addEventListener("dragover", function(e){e.preventDefault();});
          cell.addEventListener("drop", dropping);
          tr.appendChild(cell);
        }else{
          var blank = document.createElement("td")
          blank.id = "blank"
          tr.appendChild(blank);
        }
      }
      document.getElementById('boardArea').appendChild(tr);
    }
}

var dragging = function(data) {
  coords = data.srcElement.id;
  console.log("from " + coords);
}

var dropping = function(data) {
  coords = data.toElement.id;
  console.log("to " + coords);
}