class Animation extends Sprite {
    constructor (resource_s, name, duration_s, time_array) {
	super(resource_s);
	this.name = name;
	this.duration_s = duration_s;
	this.timeline = new Timeline();
	this.time_array = time_array;
	// Check that the time array is sorted
	var last_time = 0.0;
	for(var i = 1; i < this.time_array.length; ++i){
	    if(this.time_array[i - 1] >= this.time_array[i]){
		// If the previous time is equal to or greater than the next
		// Error, the time_array must be sorted in ascending order
		console.log("ERROR::" + this.name + " has an unsorted time_array");
	    }
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
	    position = position.scale(scene_scale);
	    size = size.scale(scene_scale);
	    
	    // calculate current frame index from elapsed time in time_array
	    for(var i = 0; i < this.time_array.length - 1; ++i){
		if(this.time_array[i + 1] > this.timeline.get_elapsed_time()){
		    break;
		}
	    }
	    var frame_width = get_resource(this.resource_s).width /
		this.time_array.length;
	    // Draw the current frame from the sprite sheet
	    ctx.drawImage(get_resource(this.resource_s),
			  // Spritemap offset (x, y)
			  i * frame_width, 0,
			  // Spritemap disensions (width, height)
			  frame_width,
			  get_resource(this.resource_s).height,
			  // Position (x, y)
			  position.x, position.y,
			  // Display dimensions (width, height)
			  size.x, size.y);
	}
    }
}
