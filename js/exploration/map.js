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
	exploration.scene.set_renderables(this.actors);
	exploration.set_map(this);
    }
    set_actors (actors) {
	this.actors = actors;
    }
    set_events (events) {
	this.events = events;
    }
}
