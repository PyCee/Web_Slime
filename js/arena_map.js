var arena_width = 10.0;
var arena_height = arena_width * canvas_dimensions.aspect_ratio.multiplier;

var arena = new Map(arena_width, function(){
    slime.position = new Vector(1.0, 1.5);
});
arena.add_actor(slime);
// Walls
// Top wall (with gap for gate)
// Top wall (left part)
arena.add_actor(new Actor(new Vector(0.0, 0.0),
			  new Vector(2, 1.0),
			  new Sprite("black.png")));
// Top wall (right part)
arena.add_actor(new Actor(new Vector(2.75, 0.0),
			  new Vector(2.25, 1.0),
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
