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
	    for(var i = 0; i < exploration.actors.length; ++i){
		exploration.actors[i].step_physics(exploration.actors, i);
	    }
	    
	    physics_time_accum -= PHYSICS_UPDATE_DELTA_S;
	}
	//TODO: interpolate between the current and the next physics state
    }),

    // Lists the actors that are apart of the map
    actors: []
};
var slime = new Actor(new Vector(0.0, 0.0), new Vector(0.5, 0.5),
		      new Animation("slime.png", "Slime_Move", 2, [0.0, 1.0], true),
		      false, true, function(){});
var SLIME_MOVE_SPEED = 2.0;

// Add basic control for exploration
exploration.scene.add_keyboard_event("w", "press", function(){
    slime.velocity.y -= SLIME_MOVE_SPEED;
});
exploration.scene.add_keyboard_event("w", "release", function(){
    slime.velocity.y += SLIME_MOVE_SPEED;
});
exploration.scene.add_keyboard_event("a", "press", function(){
    slime.velocity.x -= SLIME_MOVE_SPEED;
});
exploration.scene.add_keyboard_event("a", "release", function(){
    slime.velocity.x += SLIME_MOVE_SPEED;
});
exploration.scene.add_keyboard_event("s", "press", function(){
    slime.velocity.y += SLIME_MOVE_SPEED;
});
exploration.scene.add_keyboard_event("s", "release", function(){
    slime.velocity.y -= SLIME_MOVE_SPEED;
});
exploration.scene.add_keyboard_event("d", "press", function(){
    slime.velocity.x += SLIME_MOVE_SPEED;
});
exploration.scene.add_keyboard_event("d", "release", function(){
    slime.velocity.x -= SLIME_MOVE_SPEED;
});
exploration.scene.add_keyboard_event("q", "press", function(){
    console.log("opening inventory");
});
exploration.scene.add_keyboard_event(" ", "press", function(){
    for(var i = 0; i < exploration.actors.length; ++i){
	if(slime.bounding_box.detect_intersection(exploration.actors[i].bounding_box) ==
	   block_relative_position.intersects){
	    exploration.actors[i].interaction();
	}
    }
});
