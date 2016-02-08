var createFriendlyTable = function(playerSocket){
	for(var i = 0; i < 8; i++) {
      var tr = document.createElement("tr");
      for(var j = 0; j < 4; j++) {
        var button = document.createElement("BUTTON");
        button.id = i + ',' + j;
        //button.onclick = placeShipHandler(i, j, playerSocket);
        var td = document.createElement("td");
        var txtBtn = document.createTextNode(" _____ ");
        button.appendChild(txtBtn);
        td.appendChild(button);
        tr.appendChild(td);
      }
      document.getElementById('boardArea').appendChild(tr);
    }
}