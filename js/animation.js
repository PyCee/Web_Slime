class Animation extends Sprite {
    constructor (position, size, resource_s, name, duration_s, time_array) {
	super(position, size, resource_s);
	this.name = name;
	this.duration_s = duration_s;
	this.timeline = new Timeline();
	this.time_array = time_array;
	
	// Check that the time array is sorted
	
	this.frame_width = get_resource(resource_s).width / this.time_array.length;
	if(this.frame_width != Math.floor(this.frame_width)){
	    // If the width of the sprite map is not divisible by the number of frames
	    console.log("Animation " + resource_s +
			" given invalid frame number " + this.time_array.length);
	}
    }
    update (delta_s) {
	this.timeline.update(delta_s);
	var difference = this.timeline.get_elapsed_time() - this.duration_s;
	if(difference >= 0.0){
	    this.timeline.set(difference);
	}
    }
    draw (position, size) {
	if(this.display){
	    // If the animation should be displayed
	    var position = this.position.scale(scene_scale);
	    var size = this.size.scale(scene_scale);
	    
	    // calculate current frame index from elapsed time in time_array
	    for(var i = 0; i < this.time_array.length - 1; ++i){
		if(this.time_array[i + 1] > this.timeline.get_elapsed_time()){
		    break;
		}
	    }
	    var curr_frame_i = i;
	    
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
