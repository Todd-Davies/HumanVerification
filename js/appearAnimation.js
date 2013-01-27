function AppearAnimation(startTime, ticks) {
	this.startTime = startTime;
	this.endTime = startTime + ticks;
	this.currentTime = 0;
	this.skipTick = 0;
	this.tick = function(grid) {
		this.skipTick++;
		if(this.skipTick==5) {
			this.skipTick = 0;
		} else {
			return false;
		}
		this.currentTime++;
		if(this.isFinished()) {
			return true;
		}
		var move = 1;
		for(var i=0; i<grid.length;i++) {
			for(var j=0; j<grid[i].length;j++) {
				var rect = grid[j][i];
				rect.x -= move;
				rect.y -= move;
				rect.w += (2*move);
				rect.h += (2*move);
				grid[j][i] = rect;
			}
		}
		console.log('Tick ' + this.currentTime);
		return false;
	}
	this.isFinished = function() {
		if(this.currentTime>this.endTime) {
			return true;
		} else {
			return false;
		}
	}
}