function Key_callback_group () {
    this.key_is_down = false;
    this.key_press_callbacks = [];
    this.key_release_callbacks = [];
}

var keyboard = [];

function keyboard_callback_add (fun, key, action) {
    var key_value = key.toUpperCase().charCodeAt(0);
    while(keyboard.length <= key_value){
	keyboard.push(new Key_callback_group());
    }
    switch(action){
    case "press": keyboard[key_value].key_press_callbacks.push(fun); break;
    case "release": keyboard[key_value].key_release_callbacks.push(fun); break;
    }
}
var iiiii = "";
function handle_keyboard_events (event) {
    while(keyboard.length <= event.keyCode){
	keyboard.push(new Key_callback_group);
    }
    switch(event.type){
    case "keydown": handle_key_press(event); break;
    case "keyup": handle_key_release(event); break;
    default: break;
    }
}
function handle_key_press(event){
    callback_group = keyboard[event.keyCode];
    if(!callback_group.key_is_down){
	callback_group.key_is_down = true;
	for(var fun in callback_group.key_press_callbacks){
	    callback_group.key_press_callbacks[fun]();
	}
    }
}
function handle_key_release(event){
    callback_group = keyboard[event.keyCode];
    if(callback_group.key_is_down){
	callback_group.key_is_down = false;
	for(var fun in callback_group.key_release_callbacks){
	    callback_group.key_release_callbacks[fun]();
	}
    }
}
