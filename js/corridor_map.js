var corridor_width = 12;
var corridor_height = corridor_width * canvas_dimensions.aspect_ratio.multiplier;

var corridor = new Map(corridor_width, function(){
    slime.position = new Vector(5.75, 5.8);
});
corridor.add_actor(slime);
// Walls

// Left wall
corridor.add_actor(new Actor(new Vector(0.0, 0.0),
			     new Vector(5.5, corridor_height),
			     new Sprite("black.png")));
// Right wall
corridor.add_actor(new Actor(new Vector(6.5, 0.0),
			     new Vector(5.5, corridor_height),
			     new Sprite("black.png")));

var corridor_arena_exit_hitbox = new Block(new Vector(5.5, 0.0),
					   new Vector(1.0, 0.1));

function corridor_arena_exit_test () {
    return corridor_arena_exit_hitbox.detect_intersection(slime.bounding_box) ==
	block_relative_position.intersects;
}
function corridor_arena_exit_callback () {
    arena.set();
}
var corridor_arena_exit_event = new Event(corridor_arena_exit_test,
					  corridor_arena_exit_callback);
corridor.add_event(corridor_arena_exit_event);
