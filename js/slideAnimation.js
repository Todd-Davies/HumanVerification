function SplitAnimation(startTime, ticks) {
	this.startTime = startTime;
	this.endTime = startTime + ticks;
	this.currentTime = 0;
	this.alpha = 1.0;
	this.tick = function(grid) {
		this.currentTime++;
		if(alpha>0) {
			alpha = alpha - 0.005;
		}
		if(this.isFinished()) {
			return false;
		}
		var move = 1;
		for(var i=0; i<grid.length;i++) {
			for(var j=0; j<grid[i].length;j++) {
				var rect = grid[j][i];
				if(i>=(gridSize/2)) {
					rect.x += move;
				} else {
					rect.x -= move;
				}
				rect.a = alpha;
				grid[j][i] = rect;
			}
		}
		console.log('Tick ' + this.currentTime);
		return true;
	}
	this.isFinished = function() {
		if(this.currentTime>this.endTime) {
			return true;
		} else {
			return false;
		}
	}
}