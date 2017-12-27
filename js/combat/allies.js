var slime_character = new Character("Slime", new Animation(Sprite.slime, "slime"),
				    new Action("tackle", Action_Type.Enemy_Single,
					       function(target){target.take_damage(3);},
					       new Animation(Sprite.slime, "sli_tackle",
							     [[0,0],[1,0]], 2),
					       new Animation(Sprite.action_tackle)),
				    new Action("heal", Action_Type.Ally_Single,
					       function(target){target.take_damage(-1);},
					       new Animation(Sprite.slime, "sli_heal",
							     [[0,0],[1,0]], 2),
					       new Animation(Sprite.action_heal)));
var fight_character =
    new Character("Fighter", new Animation(Sprite.fighter, "idle"),
		  new Action("Punch", Action_Type.Enemy_Single,
			     function(target){target.take_damage(2);},
			     new Animation(Sprite.fighter, "punch",
					   [[0,0], [1,0]], 1.0, 3),
			     new Animation(Sprite.action_punch)),
		  new Action("Super Punch", Action_Type.Enemy_Single,
			     function(target){target.take_damage(3);},
			     new Animation(Sprite.fighter, "fig",
					   [[0,1],[1,1]], 2),
			     new Animation(Sprite.action_super_punch)));
combat.ally_party.add_member(slime_character);
