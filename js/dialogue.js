var Dialogue = {
    text: "",
    timeline: new Timeline(),
    duration: 0.0,
    font_size: 48,
    offset: new Vector(canvas.width * 0.1, canvas.height * 0.0),
    width: canvas.width * 0.8,
    height: canvas.height * 0.1,
    set: function (text, duration=-1) {
	Dialogue.text = text;
	Dialogue.duration = duration;
	Dialogue.timeline.reset();
    },
    reset: function (){
	Dialogue.set("");
    },
    has_text () {return Dialogue.text != ""},
    write (delta_s) {
	if(Dialogue.has_text()){
	    // If there is text to write
	    
	    // Update the timeline
	    Dialogue.timeline.update(delta_s);
	    if(Dialogue.timeline.get_elapsed_time() >= Dialogue.duration &&
	       Dialogue.duration != -1){
		// If the text has lived it's life
		Dialogue.text = "";
		Dialogue.timeline.reset();
		Dialogue.duration = -1;
		return;
	    }
	    
	    // Draw text background
	    ctx.fillStyle = "#ffffff";
	    ctx.fillRect(Dialogue.offset.x, Dialogue.offset.y,
			 Dialogue.width, Dialogue.height);
	    // Draw text
	    ctx.font = Dialogue.font_size + "px Arial";
	    ctx.fillStyle = "#005500";
	    ctx.fillText(Dialogue.text,
			 Dialogue.offset.x,
			 Dialogue.offset.y + Dialogue.font_size);
	}
    }
};
