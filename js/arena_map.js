var arena_width = 12.0;
var arena_height = arena_width * canvas_dimensions.aspect_ratio.multiplier;

var arena = new Map(arena_width, function(){
    slime.position = new Vector(5.75, 6.0);
});
arena.add_actor(slime);
// Walls
// Top wall
arena.add_actor(new Actor(new Vector(0.0, 0.0),
			  new Vector(arena_width, 1.0),
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
