var arena_width = 10.0;
var arena_height = arena_width * canvas_dimensions.aspect_ratio.multiplier;

var arena = new Map(arena_width, function(){
    slime.position = new Vector(4.75, 4.0);
});
arena.add_actor(slime);
// Walls
// Top wall
arena.add_actor(new Actor(new Vector(0.0, 0.0),
			  new Vector(arena_width, 1.0),
			  new Sprite("black.png")));
// Bottom wall
arena.add_actor(new Actor(new Vector(0.0, arena_height - 0.3),
			  new Vector(arena_width, 0.3),
			  new Sprite("black.png")));
// Left wall
arena.add_actor(new Actor(new Vector(0.0, 0.0),
			  new Vector(0.5, arena_height),
			  new Sprite("black.png")));
// Right wall
arena.add_actor(new Actor(new Vector(arena_width - 0.5, 0.0),
			  new Vector(0.5, arena_height),
			  new Sprite("black.png")));
