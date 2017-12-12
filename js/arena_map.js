var arena_width = 12.0;
var arena_height = arena_width * canvas_dimensions.aspect_ratio.multiplier;

var arena = new Map(arena_width);
arena.add_actor(slime);
// Walls
// Top wall
arena.add_actor(new Actor(new Vector(0.0, 0.0),
			  new Vector(arena_width, 2.0),
			  new Sprite("black.png")));
// Bottom wall
// Bottom Left
arena.add_actor(new Actor(new Vector(0.0, arena_height - 0.3),
			  new Vector(5.5, 0.3),
			  new Sprite("black.png")));
// Bottom Right
arena.add_actor(new Actor(new Vector(6.5, arena_height - 0.3),
			  new Vector(5.5, 0.3),
			  new Sprite("black.png")));
// Left wall
arena.add_actor(new Actor(new Vector(0.0, 0.0),
			  new Vector(0.5, arena_height),
			  new Sprite("black.png")));
// Right wall
arena.add_actor(new Actor(new Vector(arena_width - 0.5, 0.0),
			  new Vector(0.5, arena_height),
			  new Sprite("black.png")));

var arena_corridor_exit_hitbox = new Block(new Vector(5.5, arena_height),
					   new Vector(1.0, 0.05));
function arena_corridor_exit_test () {
    return arena_corridor_exit_hitbox.detect_intersection(slime.bounding_box) ==
	block_relative_position.intersects;
}
function arena_corridor_exit_callback () {
    corridor.set(new Vector(5.75, 0.1));
}
var arena_corridor_exit_event = new Event(arena_corridor_exit_test,
					  arena_corridor_exit_callback);
arena.add_event(arena_corridor_exit_event);
