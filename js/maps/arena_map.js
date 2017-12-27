var Arena = {};
Arena.width = 12.0;
Arena.height = Arena.width * canvas_dimensions.aspect_ratio.multiplier;

Arena.top_wall = new Actor(new Vector(0.0, 0.0),
			   new Vector(Arena.width, 1.0),
			   new Animation(Sprite.black), false);
Arena.gate_wall_1 = new Actor(new Vector(0.5, 1.0),
			      new Vector(1.0, 2.0),
			      new Animation(Sprite.black));
Arena.gate_wall_2 = new Actor(new Vector(3.5, 1.0),
			      new Vector(1.5, 2.0),
			      new Animation(Sprite.black));
Arena.gate_wall_3 = new Actor(new Vector(7.0, 1.0),
			      new Vector(1.5, 2.0),
			      new Animation(Sprite.black));
Arena.gate_wall_4 = new Actor(new Vector(10.5, 1.0),
			      new Vector(1.0, 2.0),
			      new Animation(Sprite.black));

Arena.bottom_left_wall = new Actor(new Vector(0.0, Arena.height - 0.3),
				   new Vector(5.5, 0.3),
				   new Animation(Sprite.black));
Arena.bottom_right_wall = new Actor(new Vector(6.5, Arena.height - 0.3),
				    new Vector(5.5, 0.3),
				    new Animation(Sprite.black));
Arena.left_wall = new Actor(new Vector(0.0, 0.0),
			    new Vector(0.5, Arena.height),
			    new Animation(Sprite.black));
Arena.right_wall = new Actor(new Vector(Arena.width - 0.5, 0.0),
			     new Vector(0.5, Arena.height),
			     new Animation(Sprite.black));
Arena.corridor_exit_hitbox = new Block(new Vector(5.5, Arena.height),
				       new Vector(1.0, 0.05));
Arena.gate_1 = new Actor(new Vector(1.5, 1.0),
			 new Vector(2.0, 2.0),
			 new Animation(Sprite.gate));
Arena.gate_2 = new Actor(new Vector(5.0, 1.0),
			 new Vector(2.0, 2.0),
			 new Animation(Sprite.gate));
Arena.gate_3 = new Actor(new Vector(8.5, 1.0),
			 new Vector(2.0, 2.0),
			 new Animation(Sprite.gate));
Arena.dummy_1 = new Actor(new Vector(1.75, -1.0),
			  new Vector(1.5, 1.5),
			  new Animation(Sprite.training_dummy, "Dummy",
					[[0,0],[1,0],[0,0],[2,0]], 2, -1), false, true);
Arena.dummy_2 = new Actor(new Vector(5.25, -1.0),
			  new Vector(1.5, 1.5),
			  new Animation(Sprite.training_dummy, "Dummy",
					[[0,0],[1,0],[0,0],[2,0]], 2, -1), false, true);
Arena.dummy_3 = new Actor(new Vector(8.75, -1.0),
			  new Vector(1.5, 1.5),
			  new Animation(Sprite.training_dummy, "Dummy",
					[[0,0],[1,0],[0,0],[2,0]], 2, -1), false, true);

// Map exit event to Corridor
Arena.corridor_exit_test = function () {
    return Arena.corridor_exit_hitbox.intersects(slime.bounding_box);
};
Arena.corridor_exit_callback = function () {
    Corridor.map.set(new Vector(5.75, 0.1));
};
Arena.corridor_exit_event = new Event(Arena.corridor_exit_test,
				      Arena.corridor_exit_callback, true);

// Battle dummy event
// First battle event
Arena.dummy_battle_test_1 = function () {
    return Arena.dummy_1.bounding_box.intersects(slime.bounding_box);
};
Arena.dummy_battle_callback_1 = function () {
    Arena.dummy_battle_1.start();
};
Arena.dummy_battle_event_1 = new Event(Arena.dummy_battle_test_1,
				       Arena.dummy_battle_callback_1);
// Second battle event
Arena.dummy_battle_test_2 = function () {
    return Arena.dummy_2.bounding_box.intersects(slime.bounding_box);
};
Arena.dummy_battle_callback_2 = function () {
    Arena.dummy_battle_2.start();
};
Arena.dummy_battle_event_2 = new Event(Arena.dummy_battle_test_2,
				       Arena.dummy_battle_callback_2);
// Third battle event
Arena.dummy_battle_test_3 = function () {
    return Arena.dummy_3.bounding_box.intersects(slime.bounding_box);
};
Arena.dummy_battle_callback_3 = function () {
    Arena.dummy_battle_3.start();
};
Arena.dummy_battle_event_3 = new Event(Arena.dummy_battle_test_3,
				     Arena.dummy_battle_callback_3);

// Encounters
Arena.dummy_battle_1 =
    new Encounter(new Party([Enemies.training_dummy()]),
		  function () {
		      Arena.dummy_1.set_animation(new Animation(Sprite.training_dummy,
								"dead dummy",[[3,0]]));
		      Cutscene.start(Arena.sequence_2);
		  });
Arena.dummy_battle_2 =
    new Encounter(new Party([Enemies.training_dummy(),
			     Enemies.training_dummy()]),
		  function () {
		      Arena.dummy_2.set_animation(new Animation(Sprite.training_dummy,
								"dead dummy",[[3,0]]));
		      combat.ally_party.add_member(fight_character);
		      Cutscene.start(Arena.sequence_3);
		  });
Arena.dummy_battle_3 =
    new Encounter(new Party([Enemies.training_dummy(),
			     Enemies.training_dummy()]),
		  function () {
		      Arena.dummy_3.set_animation(new Animation(Sprite.training_dummy,
								"dead dummy",[[3,0]]));
		  });


Arena.sequence_1 = new Sequence();
Arena.sequence_1.timeline.add_event(1.0, disable_controls);
Arena.sequence_1.add_lerp(new Lerp(1.0, 2.5, new Vector(0.0, 1.5), [Arena.gate_1]));
Arena.sequence_1.add_lerp(new Lerp(3.0, 5.0, new Vector(0.0, -4.2), [Arena.dummy_1]));
Arena.sequence_1.timeline.add_event(4.0, function(){Dialogue.set(["Take this!"], 3.0);});
Arena.sequence_1.add_lerp(new Lerp(4.8, 6.3, new Vector(0.0, -1.5), [Arena.gate_1]));
Arena.sequence_1.timeline.add_event(6.5, enable_controls);

Arena.sequence_2 = new Sequence();
Arena.sequence_2.timeline.add_event(0.0, disable_controls);
Arena.sequence_2.add_lerp(new Lerp(0.5, 2.0, new Vector(0.0, 1.5), [Arena.gate_2]));
Arena.sequence_2.add_lerp(new Lerp(2.5, 4.5, new Vector(0.0, -4.2), [Arena.dummy_2]));
Arena.sequence_2.timeline.add_event(3.0, function(){Dialogue.set(["Two more!"], 3.0);});
Arena.sequence_2.add_lerp(new Lerp(4.3, 5.8, new Vector(0.0, -1.5), [Arena.gate_2]));
Arena.sequence_2.timeline.add_event(5.8, enable_controls);

Arena.sequence_3 = new Sequence();
Arena.sequence_3.timeline.add_event(0.0, disable_controls);
Arena.sequence_3.timeline.add_event(0.0, function(){
    Dialogue.set(["Now with an ally!"], 5.0);});
Arena.sequence_3.add_lerp(new Lerp(0.5, 2.0, new Vector(0.0, 1.5), [Arena.gate_3]));
Arena.sequence_3.add_lerp(new Lerp(2.5, 4.5, new Vector(0.0, -4.2), [Arena.dummy_3]));
Arena.sequence_3.add_lerp(new Lerp(4.3, 5.8, new Vector(0.0, -1.5), [Arena.gate_3]));
Arena.sequence_3.timeline.add_event(4.5, function(){
    Dialogue.set(["A Fighter joined the party!"], 5.0);});
Arena.sequence_3.timeline.add_event(5.8, enable_controls);
    
Arena.map = new Map(Arena.width,function(){
    Cutscene.start(Arena.sequence_1);
});
Arena.map.set_actors([
    slime,
    Arena.dummy_1,
    Arena.dummy_2,
    Arena.dummy_3,
    Arena.top_wall,
    Arena.bottom_left_wall,
    Arena.bottom_right_wall,
    Arena.left_wall,
    Arena.right_wall,
    Arena.gate_wall_1,
    Arena.gate_wall_2,
    Arena.gate_wall_3,
    Arena.gate_wall_4,
    Arena.gate_1,
    Arena.gate_2,
    Arena.gate_3]);
Arena.map.set_events([
    Arena.corridor_exit_event,
    Arena.dummy_battle_event_1,
    Arena.dummy_battle_event_2,
    Arena.dummy_battle_event_3]);
