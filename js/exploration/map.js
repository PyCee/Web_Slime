class Map {
    constructor (width=1.0, show_callback=function(){},
		 actors=[], events=[]) {
	this.width = width;
	this.show_callback = show_callback;
	// Lists the actors that are apart of the map
	this.actors = actors;
	this.events = events;
    }
    set (slime_start_position) {
	slime.set_position(slime_start_position);
	exploration.scene.inside_width = this.width;
	exploration.scene.show_callback = this.show_callback;
	
	// Reset variables for use in next map
	var sprites = [];
	for(var i = 0; i < this.actors.length; ++i){
	    sprites.push(this.actors[i].sprite);
	}
	//exploration.actors = this.actors;
	exploration.scene.set_renderables(this.actors)
	//exploration.scene.events = this.events;
	exploration.set_map(this);
	exploration.scene.show();
    }
    add_actor (actor) {
	this.actors.push(actor);
    }
    add_event (event) {
	this.events.push(event);
    }
}
