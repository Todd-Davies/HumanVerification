var compareShapes = function(currentShape, desiredShape) {
	
	var distance = 0;
	
	for (var i = 0; i < currentShape.length; i++) { // each row
		for(var j = 0; j < currentShape[i].length; j++) { // each column
			if(currentShape[i][j] != desiredShape[i][j]) {
				distance++;
			}
		}
	}
	
	return distance;
}