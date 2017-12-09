var curr_scene = null;
var scene_scale = 1.0;
class Scene {
    constructor (name="DEFAULT", inside_width=1.0, show_callback=function(){},
		 inner_update_callback=function(delta_s){}) {
	this.name = name;
	this.inside_width = inside_width;
	this.show_callback = show_callback;
	this.inner_update_callback = inner_update_callback;
	this.events = [];
	
	this.sprites = [];
	this.user_input = new User_Input_Group();
	this.tmp = true;
    }
    display () {
	scene_scale = canvas.width / this.inside_width;
	for (var i = 0; i < this.sprites.length; ++i){
	    this.sprites[i].draw();
	}
    }
    update (delta_s) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	this.inner_update_callback(delta_s);
	for(var i = 0; i < this.events.length; ++i){
	    this.events[i].test();
	}
	for (var i = 0; i < this.sprites.length; ++i){
	    this.sprites[i].update(delta_s);
	}
	this.display();
    }
    show () {
	curr_scene = this;
	this.user_input.bind();
	this.show_callback();
    }
    set_sprites (sprites) {
	this.sprites = sprites;
    }
    set_events(events) {
	this.events = events;
    }
    add_keyboard_event (key, action, fun){
	this.user_input.add_keyboard_event(key, action, fun);
    }
}
