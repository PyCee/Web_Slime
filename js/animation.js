class Animation extends Sprite {
    constructor (position, size, resource_s, name, num_frames, duration_s) {
	super(position, size, resource_s);
	this.name = name;
	this.num_frames = num_frames;
	this.duration_s = duration_s;
	this.progress_s = 0.0;
	
	this.frame_width = get_resource(resource_s).width / num_frames;
	if(this.frame_width != Math.floor(this.frame_width)){
	    // If the width of the sprite map is not divisible by the number of frames
	    console.log("Animation " + resource_s +
			" given invalid frame number " + num_frames);
	}
    }
    update (delta_s) {
	this.progress_s += delta_s;
	if(this.progress_s >= this.duration_s){
	    this.progress_s -= this.duration_s;
	}
    }
    draw (position, size) {
	if(this.display){
	    // If the animation should be displayed
	    var position = this.position.scale(scene_scale);
	    var size = this.size.scale(scene_scale);
	    // Calculate current frame
	    var curr_frame_i = Math.floor(
		(this.progress_s / this.duration_s) * this.num_frames);
	    // Draw the current frame from the sprite sheet
	    ctx.drawImage(get_resource(this.resource_s),
			  // Spritemap offset (x, y)
			  curr_frame_i * this.frame_width, 0,
			  // Spritemap disensions (width, height)
			  this.frame_width,
			  get_resource(this.resource_s).height,
			  // Position (x, y)
			  position.x, position.y,
			  // Display dimensions (width, height)
			  size.x, size.y);
	}
    }
}
