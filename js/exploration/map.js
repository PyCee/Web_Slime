class Map {
    constructor (width=1.0, map_callback=function(){},
		 actors=[], events=[]) {
	this.width = width;
	this.map_callback = map_callback;
	// Lists the actors that are apart of the map
	this.actors = actors;
	this.events = events;
    }
    set (slime_start_position) {
	slime.set_position(slime_start_position);
	exploration.scene.inside_width = this.width;
	
	// Reset variables for use in next map
	exploration.scene.set_renderables(this.actors);
	exploration.set_map(this);
	this.map_callback();
    }
    set_actors (actors) {
	this.actors = actors;
    }
    set_events (events) {
	this.events = events;
    }
}
