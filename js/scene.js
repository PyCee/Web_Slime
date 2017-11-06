var curr_scene = null;
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
    display () {
	var scale_factor = canvas.width / this.inside_width;
	for (var i = 0; i < this.renderables.length; ++i){
	    this.renderables[i].display(scale_factor);
	}
    }
    update (delta_s) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	curr_scene.inner_update_callback(delta_s);
	curr_scene.display();
    }
    show () {
	curr_scene = this;
	this.user_input.bind();
	this.show_callback();
	Update.set(this.update);
    }
    set_renderables (renderables) {
	this.renderables = renderables;
    }
    add_keyboard_event (key, action, fun){
	this.user_input.add_keyboard_event(key, action, fun);
    }
}
