var curr_scene = null;
var scene_scale = 1.0;
class Scene {
    constructor (name="DEFAULT", inside_width=1.0, show_callback=function(){},
		 inner_update_callback=function(delta_s){}) {
	this.name = name;
	this.inside_width = inside_width;
	this.show_callback = show_callback;
	this.inner_update_callback = inner_update_callback;
	
	this.renderables = [];
	this.user_input = new User_Input_Group();
    }
    update (delta_s) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for(var i = 0; i < this.renderables.length; ++i){
	    // For each renderable
	    this.renderables[i].update_animation(delta_s);
	}
	this.inner_update_callback(delta_s);
	this.display();
    }
    display () {
	scene_scale = canvas.width / this.inside_width;
	for (var i = 0; i < this.renderables.length; ++i){
	    this.renderables[i].display();
	}
    }
    show () {
	// TODO: add code that does the stuff in comments
	if(curr_scene != null){
	    // If there is a previous scene
	    //   Release it's user input
	    curr_scene.user_input.release();
	}
	curr_scene = this;
	this.user_input.bind();
	this.show_callback();
    }
    set_renderables (renderables) {
	this.renderables = renderables;
    }
    add_keyboard_event (key, action, fun, hangover){
	this.user_input.add_keyboard_event(key, action, fun, hangover);
    }
}
