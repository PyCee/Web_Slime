var training_dummy =
    new Character("Training Dummy",
		  new Animation("idle_dummy", Sprite.training_dummy, 0, 0, 3, 1.0, true),
		  new Action("Sit", Action_Type.Enemy_Single,
			     function(target){target.health -= 1;},
			     new Animation("wiggle_dummy", Sprite.training_dummy,
					   0, 0, 1, 4.0),
			     new Animation("action_sit", Sprite.action_sit)),
		  new Action("Stare", Action_Type.Enemy_Single,
			     function(target){target.health -= 2},
			     new Animation("wiggle_dummy", Sprite.training_dummy,
					   0, 0, 1, 4.0),
			     new Animation("action_stare", Sprite.action_stare)),
		  5);

var training_dummy_battle = new Battle(new Party([training_dummy]));
