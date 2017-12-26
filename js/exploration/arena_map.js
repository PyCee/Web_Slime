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

var training_dummy_1 =
    new Character("Training Dummy",
		  new Animation("idle_dummy", Sprite.training_dummy, 0, 0, 3, 1.0, true),
		  new Action("Wiggle", Action_Type.Enemy_Single,
			     function(target){target.take_damage(0);},
			     new Animation("wiggle_dummy", Sprite.training_dummy,
					   0, 0, 1, 4.0),
			     new Animation("action_sit", Sprite.action_sit)),
		  new Action("Stare", Action_Type.Enemy_Single,
			     function(target){target.take_damage(1);},
			     new Animation("wiggle_dummy", Sprite.training_dummy,
					   0, 0, 1, 4.0),
			     new Animation("action_stare", Sprite.action_stare)),
		  5);
var training_dummy_2 =
    new Character("Training Dummy 2",
		  new Animation("idle_dummy", Sprite.training_dummy, 0, 0, 3, 1.0, true),
		  new Action("Super Wiggle", Action_Type.Enemy_Single,
			     function(target){target.take_damage(3);},
			     new Animation("wiggle_dummy", Sprite.training_dummy,
					   0, 0, 1, 4.0),
			     new Animation("action_sit", Sprite.action_sit)),
		  new Action("Stare", Action_Type.Enemy_Single,
			     function(target){target.take_damage(1);},
			     new Animation("wiggle_dummy", Sprite.training_dummy,
					   0, 0, 1, 4.0),
			     new Animation("action_stare", Sprite.action_stare)),
		  5);
var current_arena_battle = 1;
var arena_battle_1 = new Battle(new Party([training_dummy_1]),
				function(){
				    training_dummy_actor_1.hide();
				    current_arena_battle = 2;
				    training_dummy_actor_2.show();
				    Dialogue.set(["Good job",
						  "Now fight 2"], 3.0);
				});
var arena_battle_2 = new Battle(new Party([training_dummy_1, training_dummy_2]),
				function(){
				    training_dummy_actor_2.hide();
				    current_arena_battle = 3;
				    training_dummy_actor_3.show();
				    Dialogue.set(["Let's give you an ally"], 3.0);
				    combat.ally_party.add_member(fight_character);
				});
var arena_battle_3 = new Battle(new Party([training_dummy_1, training_dummy_2]),
				function(){
				    training_dummy_actor_3.hide();
				    Dialogue.set(["That's all folks"]);
				});


var training_dummy_actor_1 = new Actor(new Vector(3, 3),
				     new Vector(1, 1),
				     new Animation("training_dummy",
						   Sprite.training_dummy),
				     false);
var training_dummy_actor_2 = new Actor(new Vector(5, 3),
				     new Vector(1.25, 1.25),
				     new Animation("training_dummy",
						   Sprite.training_dummy),
				     false);
var training_dummy_actor_3 = new Actor(new Vector(8, 3),
				     new Vector(1.5, 1.5),
				     new Animation("training_dummy",
						   Sprite.training_dummy),
				     false);
arena.add_actor(training_dummy_actor_1);
arena.add_actor(training_dummy_actor_2);
arena.add_actor(training_dummy_actor_3);
training_dummy_actor_2.hide();
training_dummy_actor_3.hide();
function arena_training_dummy_1_test () {
    return training_dummy_actor_1.bounding_box.detect_intersection(slime.bounding_box) ==
	block_relative_position.intersects && current_arena_battle == 1;
}
function arena_training_dummy_1_callback () {
    console.log("fighting training dummy1");
    arena_battle_1.fight();
}
var arena_training_dummy_1_event = new Event(arena_training_dummy_1_test,
					   arena_training_dummy_1_callback);
arena.add_event(arena_training_dummy_1_event);
function arena_training_dummy_2_test () {
    return training_dummy_actor_2.bounding_box.detect_intersection(slime.bounding_box) ==
	block_relative_position.intersects && current_arena_battle == 2;
}
function arena_training_dummy_2_callback () {
    console.log("fighting training dummy2");
    arena_battle_2.fight();
}
var arena_training_dummy_2_event = new Event(arena_training_dummy_2_test,
					   arena_training_dummy_2_callback);
arena.add_event(arena_training_dummy_2_event);
function arena_training_dummy_3_test () {
    return training_dummy_actor_3.bounding_box.detect_intersection(slime.bounding_box) ==
	block_relative_position.intersects && current_arena_battle == 3;
}
function arena_training_dummy_3_callback () {
    console.log("fighting training dummy3");
    arena_battle_3.fight();
}
var arena_training_dummy_3_event = new Event(arena_training_dummy_3_test,
					   arena_training_dummy_3_callback);
arena.add_event(arena_training_dummy_3_event);

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
					  arena_corridor_exit_callback, true);
arena.add_event(arena_corridor_exit_event);
