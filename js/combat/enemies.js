Enemies = {};
Enemies.training_dummy = function () {
    return new Character("Training Dummy",
			 new Animation(Sprite.training_dummy, "idle",
				       [[0,0],[1,0],[0,0],[2,0]], 3, -1),
			 new Action("Stare", Action_Type.Ally_Single,
				    function(target){target.take_damage(1)},
				    new Animation(Sprite.training_dummy, "Stare",
						  [[0,0]], 4)),
			 new Action("Wiggle", Action_Type.Ally_Single,
				    function(target){target.take_damage(2)},
				    new Animation(Sprite.training_dummy, "Wiggle",
						  [[0,0],[1,0],[0,0],[2,0]], 0.5, 8)),
			 5);
};
