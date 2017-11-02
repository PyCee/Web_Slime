class Renderable {
    constructor (position, width, height, color="#000000", draw=true) {
	this.position = position;
	this.size = new Vector(width, height);
	this.color = color;
	this.draw = draw;
    }
    display (scale) {
	if(this.draw){
	    var position = this.position.scale(scale);
	    var size = this.size.scale(scale);
	    
	    ctx.fillStyle = this.color;
	    ctx.fillRect(position.x, position.y,
			 size.x, size.y);
	}
    }
}
