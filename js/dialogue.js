class Sentence {
    constructor (string, duration_s, write_duration_s=0) {
	this.string = string;
	this.duration_s = duration_s;
	this.write_duration_s = write_duration_s;
    }
    write () {
	
    }
}

// TODO: finish implimentation of Dialogue
var Dialogue = {
    lines: [],

    draw: function () {
	if(Dialogue.lines.length){
	    var font_size = 24;
	    ctx.font = font_size + "px Arial";
	    
	    var x_offset = canvas.width * 0.10;
	    var y_offset = canvas.height * 0.8;
	    var y_stride = font_size * 1.2;

	    // Draw text background
	    
	    ctx.fillStyle = "#ffffff";
	    ctx.fillRect(0, y_offset - 30,
			 canvas.width, canvas.height - (y_offset + 30));
	    
	    // Draw text
	    
	    ctx.fillStyle = "#000000";
	    for(var i = 0; i < Dialogue.lines.length; ++i){
		ctx.fillText(Dialogue.lines[i].string, x_offset, y_offset +
			     i * y_stride);
	    }
	}
    },
    add_line: function (sentence) {
	Text.lines.push(sentence);
    },
    clear: function () {
	Text.lines = [];
    }
};
