function Rectangle() {
    this.x = 0;
	this.y = 0;
	this.w = 10;
	this.h = 10;
	this.a = 1.0;
	this.padding = 1;
    this.r = 0;
	this.g = 0;
	this.b = 0;
    this.draw = function(context) {
        ctx.fillStyle = "rgba(" + this.r + "," + this.g + "," + this.b + "," + (this.a) + ")";
		ctx.fillRect(this.padding + this.x, 
					 this.padding + this.y, 
					 this.w-(this.padding*2), 
					 this.w-(this.padding*2));
    };
	
	this.drawWithColor = function(context, withColor) {
        ctx.fillStyle = withColor;
		ctx.fillRect(this.padding + this.x, 
					 this.padding + this.y, 
					 this.w-(this.padding*2), 
					 this.w-(this.padding*2));
    };
}