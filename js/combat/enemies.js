Enemies = {};
Enemies.training_dummy = function () {
    return new Character("Training Dummy",
			 new Animation("idle", Sprite.training_dummy),
			 new Action("Stare", Action_Type.Ally_Single,
				    function(target){target.take_damage(1)},
				    new Animation("Stare", Sprite.training_dummy,
						  0, 0, 1)),
			 new Action("Wiggle", Action_Type.Ally_Single,
				    function(target){target.take_damage(2)},
				    new Animation("Stare", Sprite.training_dummy,
						  0, 0, 3)),
			 5);
};
