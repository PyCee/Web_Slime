var physics_time_accum = 0;

var exploration = {
    // The scene that will be updated for each map
    scene: new Scene("Exploration", 1.0, function(){
	physics_time_accum = 0;
    }, function(delta_s){
	
	// Physics
	physics_time_accum += delta_s;
	while(physics_time_accum >= PHYSICS_UPDATE_DELTA_S){
	    
	    // Step actor physics
	    for(var i = 0; i < exploration.map.actors.length; ++i){
		exploration.map.actors[i].step_physics(exploration.map.actors, i);
	    }
	    
	    physics_time_accum -= PHYSICS_UPDATE_DELTA_S;
	}
	//TODO: interpolate between the current and the next physics state
	
	for(var i = 0; i < exploration.map.events.length; ++i){
	    exploration.map.events[i].test();
	}
    }),
    set_map: function (map) {
	exploration.map = map;
    },

    // Reference to the data that makes up the current map
    map: null
};
var slime = new Actor(new Vector(0.0, 0.0), new Vector(0.5, 0.5),
		      new Animation("Slime_Move", Sprite.slime, 0, 0, 2, 2, true),
		      false, true, function(){});
var SLIME_MOVE_SPEED = 2.0;

// Add basic control for exploration
exploration.scene.add_keyboard_event("w", "press", function(){
    slime.velocity.y -= SLIME_MOVE_SPEED;
}, true);
exploration.scene.add_keyboard_event("w", "release", function(){
    slime.velocity.y += SLIME_MOVE_SPEED;
});
exploration.scene.add_keyboard_event("a", "press", function(){
    slime.velocity.x -= SLIME_MOVE_SPEED;
}, true);
exploration.scene.add_keyboard_event("a", "release", function(){
    slime.velocity.x += SLIME_MOVE_SPEED;
});
exploration.scene.add_keyboard_event("s", "press", function(){
    slime.velocity.y += SLIME_MOVE_SPEED;
}, true);
exploration.scene.add_keyboard_event("s", "release", function(){
    slime.velocity.y -= SLIME_MOVE_SPEED;
});
exploration.scene.add_keyboard_event("d", "press", function(){
    slime.velocity.x += SLIME_MOVE_SPEED;
}, true);
exploration.scene.add_keyboard_event("d", "release", function(){
    slime.velocity.x -= SLIME_MOVE_SPEED;
});
exploration.scene.add_keyboard_event("q", "press", function(){
    console.log("opening inventory");
});
exploration.scene.add_keyboard_event(" ", "press", function(){
    for(var i = 0; i < exploration.map.actors.length; ++i){
	if(slime.bounding_box.detect_intersection(
	    exploration.map.actors[i].bounding_box) ==
	   block_relative_position.intersects){
	    exploration.map.actors[i].interaction();
	}
    }
});
