var canvasSideSize = 512;
var gridSize = 8;
var squareSize = (512/8);

var time = 0;
var animationHandler = new AppearAnimation(time, (squareSize/2));

// Setup the grid
var grid = new Array(gridSize);
for (var i=0;i<gridSize;i++) {
	grid[i] = new Array(gridSize);
}

for(var i=0;i<grid.length;i++) {
	for(var j=0;j<grid[i].length;j++) {
		var rect = new Rectangle();
		rect.x = i*squareSize + (squareSize/2);
		rect.y = j*squareSize + (squareSize/2);
		rect.w = 0;
		rect.h = 0;
		grid[j][i] = rect;
	}
}

// Create the canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = canvasSideSize;
canvas.height = canvasSideSize;
document.body.appendChild(canvas);

// Draw the grid
var render = function () {
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.clearRect (0, 0, canvasSideSize, canvasSideSize);
	for(var i=0; i<grid.length;i++) {
		for(var j=0; j<grid[i].length;j++) {
			grid[j][i].draw(ctx, "black");
		}
	}
}



// The main game loop
var main = function () {
	render();
	time++;
	animationHandler.tick(grid);
};

// Let's play this game!
setInterval(main,40); // Execute as fast as possible