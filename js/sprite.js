class Sprite {
    constructor (position, size, resource_s) {
	load_resource("img", resource_s);
	this.position = position;
	this.size = size;
	this.resource_s = resource_s;
	this.display = true;
    }
    hide () {this.display = false;}
    show () {this.display = true;}
    update (delta_s) {}
    draw () {
	if(this.display){
	    // If the animation should be displayed
	    var position = this.position.scale(scene_scale);
	    var size = this.size.scale(scene_scale);
	    // Draw sprite
	    ctx.drawImage(get_resource(this.resource_s),
			  // Spritemap offset (x, y)
			  0, 0,
			  // Spritemap disensions (width, height)
			  get_resource(this.resource_s).width,
			  get_resource(this.resource_s).height,
			  // Display position (x, y)
			  position.x, position.y,
			  // Display dimensions (width, height)
			  size.x, size.y);
	}
    }
}
