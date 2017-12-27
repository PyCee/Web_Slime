var Corridor = {};
Corridor.width = 12;
Corridor.height = Corridor.width * canvas_dimensions.aspect_ratio.multiplier;

Corridor.map = new Map(Corridor.width);

Corridor.left_wall = new Actor(new Vector(0.0, 0.0),
			       new Vector(5.5, Corridor.height),
			       new Animation(Sprite.black));
Corridor.right_wall = new Actor(new Vector(6.5, 0.0),
				new Vector(5.5, Corridor.height),
				new Animation(Sprite.black));

// Exit hitboxes
Corridor.arena_exit_hitbox = new Block(new Vector(5.5, 0.0),
					   new Vector(1.0, 0.05));
Corridor.dungeon_exit_hitbox = new Block(new Vector(5.5, Corridor.height),
					     new Vector(1.0, 0.05));

// Map exit event to Arena
Corridor.arena_exit_test = function () {
    return Corridor.arena_exit_hitbox.intersects(slime.bounding_box);
};
Corridor.arena_exit_callback = function () {
    Arena.map.set(new Vector(5.75, 6.0));
};
Corridor.arena_exit_event = new Event(Corridor.arena_exit_test,
					  Corridor.arena_exit_callback, true);
// Map exit event to Dungeon
Corridor.dungeon_exit_test = function () {
    return Corridor.dungeon_exit_hitbox.intersects(slime.bounding_box);
}
Corridor.dungeon_exit_callback = function () {
    Dungeon.map.set(new Vector(2.125, 0.02));
}
Corridor.dungeon_exit_event = new Event(Corridor.dungeon_exit_test,
					    Corridor.dungeon_exit_callback, true);
Corridor.map.set_actors([
    slime,
    Corridor.left_wall,
    Corridor.right_wall]);
Corridor.map.set_events([
    Corridor.arena_exit_event,
    Corridor.dungeon_exit_event]);
