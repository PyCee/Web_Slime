class Map {
    constructor (width=1.0, show_callback=function(){},
		 actor_list=[], event_list=[]) {
	this.width = width;
	this.show_callback = show_callback;
	this.actor_list = actor_list;
	this.event_list = event_list;
    }
    set () {
	exploration.scene.inside_width = this.width;
	exploration.scene.show_callback = this.show_callback;
	
	// Reset variables for use in next map
	exploration.scene.set_renderables(this.actor_list);
	exploration.actors = this.actor_list;
	exploration.events = this.event_list;

	exploration.scene.show();
    }
    add_actor (actor) {
	this.actor_list.push(actor);
    }
    add_event (event) {
	this.event_list.push(event);
    }
}
