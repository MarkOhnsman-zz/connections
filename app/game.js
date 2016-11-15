angular.module('con4', [])
	.component('gameComponent', {
		templateUrl: 'app/game.html',
		controller: GameController
	})

function GameController() {

		var gc = this
		var victory = false
		var count = 0
		var currentPlayer = 0
		var activeSelectedPlayers = 2
		var gridHeight
		var gridWidth
		var totalPlayers = ['Red', 'Black', 'Yellow', 'Green', 'Orange']
		gc.selectedPlayers
		gc.grid = []
		gc.activePlayer = 'Red'

		

		gc.newGame = function () {
			victory = false
			count = 0
			currentPlayer = 0
			gc.activePlayer = 'Red'
			activeSelectedPlayers = gc.selectedPlayers
			gridHeight = (parseInt(activeSelectedPlayers)-2) + 6
			gridWidth= (parseInt(activeSelectedPlayers)-2) + 8
		 	gc.grid = buildGrid(gridHeight, gridWidth);
		}

		function buildGrid(vert, horz) {
			var grid = [];
			for (var x = 0; x < vert; x++) {
				grid.push([]);
			for (var y = 0; y < horz; y++) {
				grid[x].push({row:x, col:y}); 
				}
			}
			return grid
		}

		gc.dropToken = function (col) {
		//if Column is full no space available cancels drop
		if (gc.grid[0][col].hasToken) { return }
		var row = checkSouth(0, col);
		var cell = gc.grid[row][col]
		cell.hasToken = true

		cell.color = gc.activePlayer
		checkVictory(cell)
		checkCount()
		endTurn()
		}

		function checkSouth(row, col) {
		if(row> gridHeight-1){ return gridHeight - 1}
		if(gc.grid[row][col].hasToken){
			row --
			return row
		}else{
			row ++
			return checkSouth(row, col)
		}
		}

		function checkVictory(cell) {

		var horizontalMatches = 0;
		//Check Horizontal
		horizontalMatches += checkNextCell(cell, 0, 'left');
		horizontalMatches += checkNextCell(cell, 0, 'right');

		//Check Vertical
		var verticalMatches = 0;
		verticalMatches += checkNextCell(cell, 0, 'bottom');

		//Check DiagLeftUp and RightDown
		var diagLeft = 0;
		diagLeft += checkNextCell(cell, 0, 'diagUpLeft');
		diagLeft += checkNextCell(cell, 0, 'diagBotRight');

		//Check DiagRigthUp and LeftDown
		var diagRight = 0;
		diagRight += checkNextCell(cell, 0, 'diagUpRight');
		diagRight += checkNextCell(cell, 0, 'diagBotLeft');
		if (verticalMatches >= 3 || horizontalMatches >= 3 || diagLeft >= 3 || diagRight >= 3) {
			alert(cell.color + ' Wins');
		}
		}

		function getNextCell(cell, direction) {
		  var nextRow = cell.row;
		  var nextCol = cell.col;
		  
		  //adjusts the values of nextRow
		  //and nextCol as needed based upon
		  //the direction of travel.
		  switch(direction){
			case 'left':
				nextCol--
				break;
			case 'right':
				nextCol++
				break;
			case 'bottom':
				nextRow++
				break;
			case 'diagUpLeft':
				nextRow--
				nextCol--
				break;
			case 'diagBotRight':
				nextRow++
				nextCol++
				break;
			case 'diagUpRight':
				nextRow--
				nextCol++
				break;
			case 'diagBotLeft':
				nextRow++
				nextCol--
				break;
		  }
		  if(nextRow < 0 || nextRow > gridHeight-1){return null}
		  if(nextCol > gridWidth) {return null}

		  return gc.grid[nextRow][nextCol];
		 
		}

		function checkNextCell(cell, matches, direction) {
			var nextCell = getNextCell(cell, direction)
			var matches = matches
			if(nextCell){
				if(nextCell.hasToken && cell.color == nextCell.color){
					matches++
					return checkNextCell(nextCell, matches, direction)
				}
			}
			return matches
		}

		function endTurn() {
			tempPlayer = parseInt(activeSelectedPlayers)
			if(currentPlayer >=  tempPlayer- 1){
				currentPlayer = 0
			}else{
				currentPlayer++
			}
			gc.activePlayer = totalPlayers[currentPlayer]
		}

		
	 	function checkCount(){
			if(count == ((gridHeight*gridWidth)-1)){
				alert('Tie Game!')
			}else{
				count++
			}
		}
};