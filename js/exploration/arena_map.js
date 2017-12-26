var Arena = {};
Arena.width = 12.0;
Arena.height = Arena.width * canvas_dimensions.aspect_ratio.multiplier;
Arena.map = new Map(Arena.width);

Arena.top_wall = new Actor(new Vector(0.0, 0.0),
			   new Vector(Arena.width, 3.0),
			   new Animation("black", Sprite.black));
Arena.bottom_left_wall = new Actor(new Vector(0.0, Arena.height - 0.3),
				   new Vector(5.5, 0.3),
				   new Animation("black", Sprite.black));
Arena.bottom_right_wall = new Actor(new Vector(6.5, Arena.height - 0.3),
				    new Vector(5.5, 0.3),
				    new Animation("black", Sprite.black));
Arena.left_wall = new Actor(new Vector(0.0, 0.0),
			    new Vector(0.5, Arena.height),
			    new Animation("black", Sprite.black));
Arena.right_wall = new Actor(new Vector(Arena.width - 0.5, 0.0),
			     new Vector(0.5, Arena.height),
			     new Animation("black", Sprite.black));
Arena.corridor_exit_hitbox = new Block(new Vector(5.5, Arena.height),
				       new Vector(1.0, 0.05));

// Map exit event to Corridor
Arena.corridor_exit_test = function () {
    return Arena.corridor_exit_hitbox.detect_intersection(slime.bounding_box) ==
	block_relative_position.intersects;
};
Arena.corridor_exit_callback = function () {
    corridor.set(new Vector(5.75, 0.1));
};
Arena.corridor_exit_event = new Event(Arena.corridor_exit_test,
				      Arena.corridor_exit_callback, true);

Arena.map.set_actors([
    slime,
    Arena.top_wall,
    Arena.bottom_left_wall,
    Arena.bottom_right_wall,
    Arena.left_wall,
    Arena.right_wall]);
Arena.map.set_events([
    Arena.corridor_exit_event]);
