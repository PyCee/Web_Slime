var keys_down = [];
class Key_Callback_Group {
    constructor () {
	this.press_callbacks = [];
	this.release_callbacks = []
    }
    press_callback () {
	for(var i = 0; i < this.press_callbacks.length; ++i){
	    this.press_callbacks[i]();
	}
    }
    release_callback () {
	for(var i = 0; i < this.release_callbacks.length; ++i){
	    this.release_callbacks[i]();
	}
    }
}
var curr_user_input_group = null;
function handle_press_user_input (event) {
    if(curr_user_input_group.keyboard.length <= event.keyCode){
	// If this key has no callback group
	return;
    }
    if(!keys_down[event.keyCode]){
	keys_down[event.keyCode] = true;
	curr_user_input_group.keyboard[event.keyCode].press_callback();
    }
}
function handle_release_user_input (event) {
    if(curr_user_input_group.keyboard.length <= event.keyCode){
	// If this key has no callback group
	return;
    }
    if(keys_down[event.keyCode]){
	keys_down[event.keyCode] = false;
	curr_user_input_group.keyboard[event.keyCode].release_callback();
    }
}
if (document.addEventListener) {
    // For all major browsers, except IE 8 and earlier
    document.addEventListener("keydown", handle_press_user_input);
    document.addEventListener("keyup", handle_release_user_input);
} else if (document.attachEvent) {
    // For IE 8 and earlier versions
    document.attachEvent("keydown", handle_press_user_input);
    document.attachEvent("keyup", handle_release_user_input);
}

class User_Input_Group {
    constructor () {
	this.keyboard = [];
    }
    add_keyboard_event (key, action, callback) {
	var key_value = key.toUpperCase().charCodeAt(0);
	while(keys_down.length <= key_value){
	    keys_down.push(false);
	}
	while(this.keyboard.length <= key_value){
	    this.keyboard.push(new Key_Callback_Group());
	}
	switch(action){
	case "press":
	    this.keyboard[key_value].press_callbacks.push(callback);
	    break;
	case "release":
	    this.keyboard[key_value].release_callbacks.push(callback);
	    break;
	default:
	    console.log("Attempting to assign callback to undefined keyboard action");
	    break;
	}
    }
    bind () {
	curr_user_input_group = this;
    }
}

