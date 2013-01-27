var canvasSideSize = 512;
var gridSize = 8;
var squareSize = (512/8);

var alpha = 1.0;

var time = 0;
var animationHandler = new AppearAnimation(time, (squareSize/2));

var correct = false;
var startAnimationDone = 0;

// Setup the grid
var grid = new Array(gridSize);
for (var i = 0; i < gridSize; i++) {
	grid[i] = new Array(gridSize);
}

for (var i = 0; i < grid.length; i++) { // each row
	for(var j = 0; j < grid[i].length; j++) { // each column
		grid[i][j] = 0;
	}
}

var displayGrid = new Array(gridSize);
for (var i=0;i<gridSize;i++) {
	displayGrid[i] = new Array(gridSize);
}
for(var i=0;i<displayGrid.length;i++) {
	for(var j=0;j<displayGrid[i].length;j++) {
		var rect = new Rectangle();
		rect.x = i*squareSize + (squareSize/2);
		rect.y = j*squareSize + (squareSize/2);
		rect.w = 0;
		rect.h = 0;
		rect.a = 1.0;
		displayGrid[j][i] = rect;
	}
}

var mouseDown = false;
var currentX = -1;
var currentY = -1;
var hoverX = -1;
var hoverY = -1;

// Create the canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = canvasSideSize;
canvas.height = canvasSideSize;
document.body.appendChild(canvas);

// To check if the user is correct
var checkIfCorrect = function() {
	$.getJSON(  
		"/comparePattern.php",  
		{"input":JSON.stringify(grid)},
		function(json) { 
			if(json==0) {
				correct = true;
			} else {
				correct = false;
			}
		}  
	);  
}

// For getting mouse coords
function relMouseCoords(event){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do{
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while(currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {x:canvasX, y:canvasY}
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;

canvas.onmousedown = function(e){
	if(!correct) {
		mouseDown = true;
		canvas.onmousemove(e);
	}
}
canvas.onmouseup = function(e){
    mouseDown = false;
	currentX = -1;
	currentY = -1;
}
canvas.onmouseout = function(e){
	mouseDown = false;
	currentX = -1;
	currentY = -1;
	hoverY = -1;
	hoverX = -1;
	hoverX = -1;
}
canvas.onmousemove = function(e){
	coords = canvas.relMouseCoords(e);
	canvasX = coords.x;
	canvasY = coords.y;
	x = Math.floor(canvasX / squareSize);
	y = Math.floor(canvasY / squareSize);
	hoverX = x;
	hoverY = y;
	if(mouseDown) {
		if(!((x==currentX)&&(y==currentY))) {
			grid[y][x] = ((grid[y][x]==1) ? 0 : 1);
			currentX = x;
			currentY = y;
			checkIfCorrect();
		}
	}
}


// Draw the grid
var render = function () {
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.clearRect (0, 0, canvasSideSize, canvasSideSize);
	for(var i=0; i<grid.length;i++) {
		for(var j=0; j<grid[i].length;j++) {
			var rect = displayGrid[j][i];
			if(grid[j][i]==1) {
				rect.r = 0;
				rect.g = 0;
				rect.b = 0;
				displayGrid[j][i] = rect;
				displayGrid[j][i].draw(ctx);
			} else if((hoverX==i)&&(hoverY==j)) {
				rect.r = 200;
				rect.g = 200;
				rect.b = 200;
				displayGrid[j][i] = rect;
				displayGrid[j][i].draw(ctx);
			}  else {
				rect.r = 230;
				rect.g = 230;
				rect.b = 230;
				displayGrid[j][i] = rect;
				displayGrid[j][i].draw(ctx);
			}
		}
	}
	if(correct) {
		if(alpha>0) {
			alpha = alpha - 0.005;
		}
		ctx.fillStyle = "rgba(0,0,0," + (1-alpha) + ")";
		var height = 12;
		ctx.font = "bold " + height + "px sans-serif";
		var text = "I'm working on what happens next...";
		ctx.fillText(text, ((canvasSideSize/2) - (ctx.measureText(text).width/2)), ((canvasSideSize/2) - (height/2)));
	}
}

// The main game loop
var main = function () {
	render();
	time++;
	if(startAnimationDone==1) {
		animationHandler = new SplitAnimation(time, (canvasSideSize/2));
		startAnimationDone = 2;
	} else if(startAnimationDone==2) {
		//Do nothing
	} else {
		animationHandler.tick(displayGrid);
		startAnimationDone = (animationHandler.isFinished() ? 1 : 0);
	}
	if(correct) {
		animationHandler.tick(displayGrid);
	}
};

// Let's play this game!
setInterval(main, 1); // Execute as fast as possible