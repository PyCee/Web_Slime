var corridor_width = 12;
var corridor_height = corridor_width * canvas_dimensions.aspect_ratio.multiplier;

var corridor = new Map(corridor_width);
corridor.add_actor(slime);
// Walls

// Left wall
corridor.add_actor(new Actor(new Vector(0.0, 0.0),
			     new Vector(5.5, corridor_height),
			     new Animation("black", Sprite.black)));
// Right wall
corridor.add_actor(new Actor(new Vector(6.5, 0.0),
			     new Vector(5.5, corridor_height),
			     new Animation("black", Sprite.black)));

var corridor_arena_exit_hitbox = new Block(new Vector(5.5, 0.0),
					   new Vector(1.0, 0.05));
function corridor_arena_exit_test () {
    return corridor_arena_exit_hitbox.detect_intersection(slime.bounding_box) ==
	block_relative_position.intersects;
}
function corridor_arena_exit_callback () {
    arena.set(new Vector(5.75, 6.0));
}
var corridor_arena_exit_event = new Event(corridor_arena_exit_test,
					  corridor_arena_exit_callback);
corridor.add_event(corridor_arena_exit_event);

var corridor_dungeon_exit_hitbox = new Block(new Vector(5.5, corridor_height),
					     new Vector(1.0, 0.05));
function corridor_dungeon_exit_test () {
    return corridor_dungeon_exit_hitbox.detect_intersection(slime.bounding_box) ==
	block_relative_position.intersects;
}
function corridor_dungeon_exit_callback () {
    dungeon.set(new Vector(2.125, 0.02));
}
var corridor_dungeon_exit_event = new Event(corridor_dungeon_exit_test,
					    corridor_dungeon_exit_callback);
corridor.add_event(corridor_dungeon_exit_event);
