
var Text = {
    strings: [],

    draw: function () {
	if(Text.strings.length){
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
	    for(var i = 0; i < Text.strings.length; ++i){
		ctx.fillText(Text.strings[i], x_offset, y_offset +
			     i * y_stride);
	    }
	}
    },
    add_line: function (string) {
	Text.strings.push(string);
    },
    clear: function () {
	Text.strings = [];
    }
};
