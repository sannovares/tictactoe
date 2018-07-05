// JavaScript Document
//index.js, where the main process occurs
$(document).ready(function() {
	
	//instantiate the board and the players
	var board = new Board();
	var playerO = new Player('o','btn-primary');
	var playerX = new Player('x','btn-info');
	
	$('#game li').click(function(){
		//precheck before player's move
		if(board.playable($(this),playerO, playerX)){
			//player 'O' turn
			if(board.count%2 == 0){
				board.count++
				playerO.move($(this))
				if (board.winConditionMet(playerO.id)){
					alert('O wins')
					board.count = 0
					playerO.setWinner()
				}
			} else{
				//player 'X' turn
				board.count++
				playerX.move($(this))
				if (board.winConditionMet(playerX.id)){
					alert('X wins')
					board.count = 0
					playerX.setWinner()
				}
			}
		}

	});
    $("#reset").click(function () {
		board.resetBoard()
		board.count = 0
		playerO.isWinner=false
		playerX.isWinner=false
	});
});
