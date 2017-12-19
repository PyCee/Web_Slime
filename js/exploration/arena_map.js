var arena_width = 12.0;
var arena_height = arena_width * canvas_dimensions.aspect_ratio.multiplier;

var arena = new Map(arena_width);
arena.add_actor(slime);
// Walls
// Top wall
arena.add_actor(new Actor(new Vector(0.0, 0.0),
			  new Vector(arena_width, 2.0),
			  new Animation("black", Sprite.black)));
// Bottom wall
// Bottom Left
arena.add_actor(new Actor(new Vector(0.0, arena_height - 0.3),
			  new Vector(5.5, 0.3),
			  new Animation("black", Sprite.black)));
// Bottom Right
arena.add_actor(new Actor(new Vector(6.5, arena_height - 0.3),
			  new Vector(5.5, 0.3),
			  new Animation("black", Sprite.black)));
// Left wall
arena.add_actor(new Actor(new Vector(0.0, 0.0),
			  new Vector(0.5, arena_height),
			  new Animation("black", Sprite.black)));
// Right wall
arena.add_actor(new Actor(new Vector(arena_width - 0.5, 0.0),
			  new Vector(0.5, arena_height),
			  new Animation("black", Sprite.black)));

var training_dummy_actor = new Actor(new Vector(3, 3),
				     new Vector(1, 1),
				     new Animation("training_dummy",
						   Sprite.training_dummy),
				     false);
arena.add_actor(training_dummy_actor);
function arena_training_dummy_test () {
    return training_dummy_actor.bounding_box.detect_intersection(slime.bounding_box) ==
	block_relative_position.intersects;
}
function arena_training_dummy_callback () {
    console.log("fighting training dummy");
    training_dummy_battle.fight();
}
var arena_training_dummy_event = new Event(arena_training_dummy_test,
					   arena_training_dummy_callback);
arena.add_event(arena_training_dummy_event);

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
