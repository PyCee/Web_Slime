class Sprite {
    constructor (resource_s) {
	load_resource("img", resource_s, function(){});
	this.resource_s = resource_s;
	this.display = true;
    }
    hide () {this.display = false;}
    show () {this.display = true;}
    update (delta_s) {}
    draw (position, size) {
	if(this.display){
	    // If the animation should be displayed
	    var position = position.scale(scene_scale);
	    var size = size.scale(scene_scale);
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
