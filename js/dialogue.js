var Dialogue = {
    text_array: [],
    timeline: new Timeline(),
    duration: 0.0,
    font_size: 48,
    offset: new Vector(canvas.width * 0.1, canvas.height * 0.0),
    width: canvas.width * 0.8,
    height: canvas.height * 0.1,
    set: function (text_array, duration=-1) {
	Dialogue.text_array = text_array;
	Dialogue.duration = duration;
	Dialogue.timeline.reset();
    },
    reset: function (){
	Dialogue.set([]);
	Dialogue.timeline.reset();
	Dialogue.duration = -1;
    },
    has_text () {return Dialogue.text_array.length != 0},
    write (delta_s) {
	if(Dialogue.has_text()){
	    // If there is text to write
	    
	    // Update the timeline
	    Dialogue.timeline.update(delta_s);
	    if(Dialogue.timeline.get_elapsed_time() >= Dialogue.duration &&
	       Dialogue.duration != -1){
		// If the text has lived it's life
		//   reset the dialogue
		Dialogue.reset();
		return;
	    }
	    
	    // Draw text background
	    ctx.fillStyle = "#ffffff";
	    ctx.fillRect(Dialogue.offset.x, Dialogue.offset.y,
			 Dialogue.width, Dialogue.height * Dialogue.text_array.length);
	    // Draw text
	    ctx.textBaseline = "top";
	    ctx.font = Dialogue.font_size + "px Arial";
	    ctx.fillStyle = "#002211";
	    for(var i = 0; i < Dialogue.text_array.length; ++i){
		ctx.fillText(Dialogue.text_array[i],
			     Dialogue.offset.x + 5,
			     Dialogue.offset.y + Dialogue.font_size*i);
	    }
	}
    }
};
