class Animation {
    constructor (name, spritemap, row=0, col=0, frame_count=1, duration_s=1.0,
		 loop=false) {
	this.name = name;
	this.spritemap = spritemap;
	this.row = row;
	this.col = col;
	this.frame_count = frame_count;
	this.duration_s = duration_s;
	this.frame_time = this.duration_s / this.frame_count;
	this.loop = loop;
	this.frame = 0;
	this.timeline = new Timeline();
	this.hidden = false;
	// TODO: check max row/col for inclusion in spritemap
    }
    hide () {this.hidden = true;}
    show () {this.hidden = false;}
    update (delta_s) {
	this.timeline.update(delta_s);
	//console.log(this.frame);
	
	while(this.timeline.get_elapsed_time() > this.frame_time){
	    this.timeline.set(this.timeline.get_elapsed_time() - this.frame_time);
	    ++this.frame;
	    if(this.frame == this.frame_count) {
		if(this.loop){
		    this.frame = 0;
		} else {
		    this.frame = this.frame_count-1;
		    this.timeline.stop();
		}
	    }
	}
    }
    reset () {
	this.timeline.reset();
	this.timeline.start();
	this.frame = 0;
	console.log("anim reset");
    }
    is_finished () {
	return this.timeline.active == false;
    }
    draw (position, size) {
	if(this.hidden == false){
	    // If the animation should be displayed
	    position = position.scale(scene_scale);
	    size = size.scale(scene_scale);
	    
	    // Draw the current frame from the sprite sheet
	    ctx.drawImage(this.spritemap.resource,
			  // Spritemap offset (x, y)
			  // TODO: put stuff in terms of pixels
			  (this.col + this.frame) * this.spritemap.get_sprite_width(),
			  this.row * this.spritemap.get_sprite_height(),
			  // Spritemap disensions (width, height)
			  this.spritemap.get_sprite_width(),
			  this.spritemap.get_sprite_height(),
			  // Position (x, y)
			  position.x, position.y,
			  // Display dimensions (width, height)
			  size.x, size.y);
	}
    }
}
