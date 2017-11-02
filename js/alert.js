var Alert = {
    string: "",
    exit_update_callback: function(){},
    draw: function (delta_s) {
	// TODO draw
	
	var font_size = 32;
	ctx.font = font_size + "px Arial";
	
	var x_offset = canvas.width * 0.25;
	var y_offset = canvas.height * 0.4;
	var width = canvas.width * 0.4;
	var height = canvas.height * 0.2;
	
	// Draw text background
	
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(x_offset, y_offset, width, height);
	
	// Draw text
	
	ctx.fillStyle = "#005500";
	ctx.fillText(Alert.string,
		     x_offset + (width * 0.5 - Alert.string.length * 0.25 * font_size),
		     y_offset + height * 0.5);
    },
    set: function (string) {
	// Will pop up a message that will dissapear upon a button press
	Alert.exit_update_callback = Update.get();
	Alert.string = string;
	Update.set(Alert.draw());
	
	if (document.addEventListener) {
	    // For all major browsers, except IE 8 and earlier
	    document.addEventListener("keydown", Alert.remove);
	} else if (document.attachEvent) {
	    // For IE 8 and earlier versions
	    document.attachEvent("keydown", Alert.remove);
	}
    },
    remove: function (event) {
	if(event.keyCode == " ".toUpperCase().charCodeAt(0)){
	    if(Alert.string != ""){
		Update.set(Alert.exit_update_callback);
		Alert.string = "";
		
		if (document.addEventListener) {
		    // For all major browsers, except IE 8 and earlier
		    document.removeEventListener("keydown", Alert.remove);
		} else if (document.attachEvent) {
		    // For IE 8 and earlier versions
		    document.detachEvent("keydown", Alert.remove);
		}
	    }
	}
    }
};

