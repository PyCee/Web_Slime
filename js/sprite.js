class Sprite extends Renderable {
    constructor (position, width, height, resource) {
	super(position, width, height);
	this.resource = resource;
	load_resource("img", resource);
    }
    display (scale) {
	if(this.draw){
	    var position = this.position.scale(scale);
	    var size = this.size.scale(scale);
	    
	    // TODO: change sprite offset and dimensions for animations
	    
	    // Draw sprite
	    ctx.drawImage(get_resource(this.resource),
			  // Spritemap offset (x, y)
			  0, 0,
			  // Spritemap disensions (width, height)
			  get_resource(this.resource).width,
			  get_resource(this.resource).height,
			  // Display position
			  position.x, position.y,
			  // Display dimensions (width, height)
			  size.x, size.y);
	}
    }
}
