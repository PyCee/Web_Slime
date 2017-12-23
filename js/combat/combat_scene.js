var Combat_State = {
    Characer_Select: 0,
    Action_Select: 1,
    Target_Select: 2,
    Player_Animation: 3,
    Enemy_Animation: 4,
    Win: 5,
    Lose: 6
};
var combat = {
    ally_party: new Party(),
    enemy_party: new Party(),
    state: Combat_State.Character_Select,
    scene: new Scene("Combat", 1.0, function(){
	// set position of all characters in combat.ally_party and combat.enemy_party
	for(var i = 0; i < combat.ally_party.characters.length; ++i){
	    // Set positions from center-screen, right to left
	    combat.ally_party.characters[i].position = 
		new Vector(0.5 - (i+1) * 1.10 *
			   combat.ally_party.characters[i].size.x, 0.2);
	}
	for(var i = 0; i < combat.enemy_party.characters.length; ++i){
	    // Set positions from center-screen, left to right
	    combat.enemy_party.characters[i].position = 
		new Vector(0.5 + (i) * 1.10 *
			   combat.enemy_party.characters[i].size.x, 0.2);
	}
	// Create non-static selections for this battle
	// Reverse combat.ally_party.characters so left and right selection fits
	//   when drawn in reverse order
	combat.ally_sel = new Selection(combat.ally_party.characters.reverse(), false);
	combat.enemy_sel = new Selection(combat.enemy_party.characters, false);
	
	// Add ui renderables
	var renderables = [];
	for(var i = 0; i < combat.ally_party.characters.length; ++i){
	    // Add each player character to renderables
	    renderables.push(combat.ally_party.characters[i]);
	}
	for(var i = 0; i < combat.enemy_party.characters.length; ++i){
	    // Add each enemy character to renderables
	    renderables.push(combat.enemy_party.characters[i]);
	}
	renderables.push(combat.action_sel_indicator);
	renderables.push(combat.character_sel_indicator);
	renderables.push(combat.first_action);
	renderables.push(combat.second_action);
	combat.scene.set_renderables(renderables);

	// Initially hide action selection indicator
	combat.action_sel_indicator.hide();
	
	// Initialize state to character select
	combat.set_state(Combat_State.Character_Select);
	combat.update_character_indicator(combat.ally_sel.get());
    }, function (delta_s) {
	switch(combat.state){
	case Combat_State.Character_Select:
	    Dialogue.set(["Select an ally character"]);
	    break;
	case Combat_State.Action_Select:
	    Dialogue.set(["Select one of that character's moves"]);
	    break;
	case Combat_State.Target_Select:
	    Dialogue.set(["Select a target"]);
	    break;
	case Combat_State.Player_Animation:
	    Dialogue.set([combat.acting_character.name + " is using " +
			  combat.action_sel.get().name]);
	    if(combat.acting_character.animation.is_finished()){
		// If animation has finished
		combat.acting_character.set_idle();
		combat.set_state(Combat_State.Enemy_Animation);
	    }
	    break;
	case Combat_State.Enemy_Animation:
	    Dialogue.set(["Enemy's turn"]);
	    combat.animation_timeline.update(delta_s);
	    if(combat.animation_timeline.get_elapsed_time() > 2.0){
		// Calculate enemy action and set animation (tmp: timeline)
		combat.set_state(Combat_State.Character_Select);
	    }
	    break;
	case Combat_State.Win:
	    Dialogue.set(["You Win!"]);
	    combat.end_timeline.update(delta_s);
	    if(combat.end_timeline.get_elapsed_time() > 3.0){
		// switch to prev scene, denoted by battle

		
		// TODO: go to exploration scene
		exploration.scene.show();

		
		console.log("should switch now");
	    }
	    break;
	case Combat_State.Lose:
	    Dialogue.set(["You Lose..."]);
	    combat.end_timeline.update(delta_s);
	    if(combat.end_timeline.get_elapsed_time() > 3.0){
		// switch to prev scene, denoted by battle
		console.log("should switch now");
	    }
	    break;
	default:
	    break;
	}
    }),
    // TODO: replace timeline with character animation
    end_timeline: new Timeline(true),
    animation_timeline: new Timeline(true),
    acting_character: null,
    
    first_action: new Renderable(new Vector(0.15, 0.4), new Vector(0.3, 0.1),
				 new Animation("default", Sprite.black)),
    second_action: new Renderable(new Vector(0.65, 0.4), new Vector(0.3, 0.1),
				  new Animation("default", Sprite.black)),
    action_sel: null,
    action_sel_indicator: new Renderable(new Vector(0.05, 0.4), new Vector(0.1, 0.1),
					 new Animation("default", Sprite.red)),
    // ally_sel and enemy_sel are created upon combat.scene load,
    //   and changed as characters die during battle
    ally_sel: null,
    enemy_sel: null,
    // target_sel will be set to ally_sel or enemy_sel depending on action type
    target_sel: null,
    character_sel_indicator: new Renderable(new Vector(0, 0), new Vector(0.15, 0.05),
					    new Animation("default", Sprite.black)),
    reset_selection: function (selection, party, s, all_dead_state) {
	selection.reset();
	// Select the first alive character, unless
	for(var i = 0; i < party.characters.length; ++i){
	    if(party.characters[i].is_alive()){
		// If the character is alive
		//   Set this character as the default selected
		//   Stop searching
		selection.set_index(i);
		break;
	    }else if(party.characters[i] == selection.get_end()){
		// Else if this is the last character (none are alive)
		//   End the combat (in defeat)
		combat.set_state(all_dead_state);
		console.log("All " + s + " defeated");
		break;
	    }
	}
    },
    reset_ally_selection () {
	combat.reset_selection(combat.ally_sel, combat.ally_party, "allies",
			      Combat_State.Lose);
    },
    reset_enemy_selection () {
	combat.reset_selection(combat.enemy_sel, combat.enemy_party, "enemies",
			      Combat_State.Win);
    },
    set_state: function (state) {
	combat.state = state;
	switch(combat.state){
	case Combat_State.Character_Select:
	    for(var i = 0; i < combat.ally_party.characters.length; ++i){
		console.log(combat.ally_party.characters[i].name+" has health: "+
			    combat.ally_party.characters[i].health);
	    }
	    for(var i = 0; i < combat.enemy_party.characters.length; ++i){
		console.log(combat.enemy_party.characters[i].name+" has health: "+
			    combat.enemy_party.characters[i].health+" and is alive? "+
			    combat.enemy_party.characters[i].is_alive());
	    }
	    combat.reset_ally_selection();
	    combat.update_character_indicator(combat.ally_sel.get());
	    break;
	case Combat_State.Action_Select:
	    combat.action_sel.reset();
	    combat.update_action_indicator();
	    break;
	case Combat_State.Target_Select:
	    combat.update_character_indicator(combat.target_sel.get());
	    break;
	case Combat_State.Player_Animation:

	    // Hide aciton selection indicator after selecting target
	    combat.action_sel_indicator.hide();
	    
	    combat.acting_character.set_animation(
		combat.action_sel.get().character_animation);
	    combat.acting_character.animation.reset();
	    break;
	case Combat_State.Enemy_Animation:
	    combat.reset_enemy_selection();
	    
	    // Select enemy to use action
	    // Use enemy action
	    // On target
	    combat.animation_timeline.reset();
	    break;
	case Combat_State.Win:
	    break;
	case Combat_State.Lose:
	    break;
	default:
	    break;
	}
    },
    enemy_turn: function () {
	// Calculate enemy to use action
	// Calculate enemy action
	// Calculate enemy's target
    },
    update_action_icons: function () {
	combat.first_action.set_animation(
	    combat.ally_sel.get().action_1.display_animation);
	combat.second_action.set_animation(
	    combat.ally_sel.get().action_2.display_animation);
    },
    update_action_indicator: function () {
	combat.action_sel_indicator.show();
	combat.action_sel_indicator.position =
	    new Vector(0.05 + combat.action_sel.get_index() * 0.5, 0.4);
    },
    update_character_indicator: function (character) {
	combat.character_sel_indicator.position =
	    new Vector(character.position.x, 0.15);
	if(combat.state == Combat_State.Character_Select){
	    combat.update_action_icons();
	}
    }
};
combat.scene.add_keyboard_event(" ", "press", function(){
    switch(combat.state){
    case Combat_State.Character_Select:
	// Character has been selected
	combat.acting_character = combat.ally_sel.get();
	combat.action_sel = new Selection([combat.acting_character.action_1,
					   combat.acting_character.action_2], false);
	combat.set_state(Combat_State.Action_Select);
	break;
    case Combat_State.Action_Select:
	// Action has been selected
	//   Handle combat state depending on action type
	switch(combat.action_sel.get().type){
	case Action_Type.Enemy_Single:
	    // Ready target selection
	    combat.reset_enemy_selection();
	    combat.target_sel = combat.enemy_sel;
	    combat.set_state(Combat_State.Target_Select);
	    break;
	case Action_Type.Ally_Single:
	    // Ready target selection
	    combat.reset_ally_selection();
	    combat.target_sel = combat.ally_sel;
	    combat.set_state(Combat_State.Target_Select);
	    break;
	case Action_Type.Enemy_All:
	    // Do action on all alive enemies
	    for(var i = 0; i < combat.enemy_party.characters.length; ++i){
		// For each enemy character
		//   Complete the action
		combat.action_sel.get().complete(combat.enemy_party.characters[i]);
	    }
	    // Go into player animation
	    combat.set_state(Combat_State.Player_Animation);
	    break;
	case Action_Type.Ally_All:
	    // Do action on all allies
	    for(var i = 0; i < combat.ally_party.characters.length; ++i){
		// For each enemy character
		//   Complete the action
		combat.action_sel.get().complete(combat.ally_party.characters[i]);
	    }
	    // Go into player animation
	    combat.set_state(Combat_State.Player_Animation);
	    break;
	default:
	    console.log("ERROR::unknown Action_Type: " +
			combat.action_sel.get().type);
	    break;
	}
	break;
    case Combat_State.Target_Select:
	// Complete action on target
	combat.action_sel.get().complete(combat.target_sel.get());
	// Go into player animation
	combat.set_state(Combat_State.Player_Animation);
	break;
    default:
	break;
    }
    
});
combat.scene.add_keyboard_event("a", "press", function(){
    switch(combat.state){
    case Combat_State.Character_Select:
	var prev_char_i = combat.ally_sel.get_index();
	while(!combat.ally_sel.previous().is_alive()){
	    // Loop through allies until we reach a living ally
	    if(combat.ally_sel.get() == combat.ally_sel.get_start()){
		// If this is the start selection
		//   No character after our prev selection is alive
		//   Go back to our prev selection
		combat.ally_sel.set_index(prev_char_i);
		break;
	    }
	}
	combat.update_character_indicator(combat.ally_sel.get());
	break;
    case Combat_State.Action_Select:
	combat.action_sel.previous();
	combat.update_action_indicator();
	break;
    case Combat_State.Target_Select:
	var prev_char_i = combat.target_sel.get_index();
	while(!combat.target_sel.previous().is_alive()){
	    // Loop through targets until we reach a living target
	    if(combat.target_sel.get() == combat.target_sel.get_start()){
		// If this is the start selection
		//   No character after our prev selection is alive
		//   Go back to our prev selection
		combat.target_sel.set_index(prev_char_i);
		break;
	    }
	}
	combat.update_character_indicator(combat.target_sel.get());
	break;
    default:
	break;
    }
});
combat.scene.add_keyboard_event("d", "press", function(){
    switch(combat.state){
    case Combat_State.Character_Select:
	var prev_char_i = combat.ally_sel.get_index();
	while(!combat.ally_sel.next().is_alive()){
	    // Loop through allies until we reach a living ally
	    if(combat.ally_sel.get() == combat.ally_sel.get_end()){
		// If this is the end selection
		//   No character after our prev selection is alive
		//   Go back to our prev selection
		combat.ally_sel.set_index(prev_char_i);
		break;
	    }
	}
	combat.update_character_indicator(combat.ally_sel.get());
	break;
    case Combat_State.Action_Select:
	combat.action_sel.next();
	combat.update_action_indicator();
	break;
    case Combat_State.Target_Select:
	var prev_char_i = combat.target_sel.get_index();
	while(!combat.target_sel.next().is_alive()){
	    // Loop through targets until we reach a living target
	    if(combat.target_sel.get() == combat.target_sel.get_end()){
		// If this is the end selection
		//   No character after our prev selection is alive
		//   Go back to our prev selection
		combat.target_sel.set_index(prev_char_i);
		break;
	    }
	}
	combat.update_character_indicator(combat.target_sel.get());
	break;
    default:
	break;
    }
});
