//class Boards, anything related to the game rule and the character of the board game defined here
function Board()
{
	//currently supports 3
    const dimensionSize = 3
	
	this.count = 0
	//a 2 dimensional array containing id of the li elements 
	this.dimension = [['#one','#two','#three'],['#four','#five','#six'],['#seven','#eight','#nine']]
    
	this.resetBoard = function(){
		$("#game li").text("+");
		$("#game li").removeClass('disable')
		$("#game li").removeClass('o')
		$("#game li").removeClass('x')
		$("#game li").removeClass('btn-primary')
		$("#game li").removeClass('btn-info')
	}
	
	//a precheck method to validate beofre player's move
	this.playable = function(board, playerO, playerX){
		if (playerO.isWinner){
			alert('O has won the game. Start a new game')
			this.resetBoard()
			playerO.isWinner=false
			return false
		}
		else if (playerX.isWinner){
			alert('X wins has won the game. Start a new game')
			this.resetBoard()
			playerX.isWinner=false
			return false
		}
		else if (this.count == 9){
			alert('Its a tie. It will restart.')
			this.resetBoard()
			this.count = 0
			return false
		}
		else if (board.hasClass('disable')){
			alert('Already selected')
			return false
		}
		return true
	}
	
	// final check to the 3 selected areas (be it horizontal, vertical or diagonal)
	var isWin = function(rowToProcess, player)
    {
		var win = true
		var row;
		for(row=0;row<dimensionSize;row++){
			if(!$(rowToProcess[row]).hasClass(player)){
				win = false
			}	 
		} 
		return win
    }
	//check whether it fulfill the requirements of winning horizontally
	var winHorizontally = function(dimensionInput, playerInput){
		var row;
		for(row=0;row<3;row++){
			if(isWin(dimensionInput[row],playerInput)){
				return true
			}
		}
	}
	//check whether it fulfill the requirements of winning vertically
	var winVertically = function(dimensionInput, playerInput){
		var column;
		var row;
		for(column=0;column<3;column++){
			var tempRow = new Array(3);
			for(row=0;row<3;row++){
				tempRow[row] = dimensionInput[row][column]
			}
			if(isWin(tempRow,playerInput)){
				return true
			}
		}
	}
	//check whether it fulfill the requirements of winning diagonally
	var winDiagonally = function(dimensionInput, playerInput){
		var column=0;
		var row=0;
		var diagonal = new Array(3)
		while (row < 3 && column < 3) {
			diagonal[column] = dimensionInput[row][column];
			row++;
			column++;
		}
		if (isWin(diagonal,playerInput)) {
			return true;
		}
	  
		row = 3 - 1;
		column = 0;
		diagonal = new Array(3)
		while (row >=0 && column < 3) {
			diagonal[column] = dimensionInput[row][column];
			row--;
			column++;
		}
		return isWin(diagonal,playerInput);
	}

    this.winConditionMet = function(player){
        return winHorizontally(this.dimension, player) || winVertically(this.dimension, player) || winDiagonally(this.dimension, player)
    }
}