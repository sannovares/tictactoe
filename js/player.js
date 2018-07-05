function Player(id, buttonStyle){
    this.id = id
	this.buttonStyle = buttonStyle
	this.winCount = 0
	this.isWinner = false
	
	this.move = function(board){
		board.text(this.id)
		board.addClass('disable '+this.id+' '+this.buttonStyle)
	}
	this.setWinner = function(){
		this.winCount++
		this.isWinner = true
		$('#'+this.id+'_win').text(this.winCount)
	}
}