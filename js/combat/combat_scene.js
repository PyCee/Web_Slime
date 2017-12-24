var Combat_State = {
    Characer_Select: 0,
    Action_Select: 1,
    Target_Select: 2,
    Player_Action: 3,
    Enemy_Action: 4,
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
	renderables.push(combat.first_action_icon);
	renderables.push(combat.second_action_icon);
	combat.scene.set_renderables(renderables);

	// Initially hide action selection indicator
	combat.action_sel_indicator.hide();
	
	// Initialize state to character select
	combat.set_state(Combat_State.Character_Select);
	combat.update_character_indicator(combat.ally_sel.get());
    }, function (delta_s) {
	switch(combat.state){
	case Combat_State.Character_Select:
	    break;
	case Combat_State.Action_Select:
	    break;
	case Combat_State.Target_Select:
	    break;
	case Combat_State.Player_Action:
	    if(!combat.acting_character.animation.is_finished()){
		// If animation has not finished
		break;
	    }
	    // Else, Complete the action
	    switch(combat.action_sel.get().type){
	    case Action_Type.Enemy_Single:
	    case Action_Type.Ally_Single:
		// Complete action on target (whether enemy or ally)
		combat.action_sel.get().complete(combat.target_sel.get());
		break;
	    case Action_Type.Enemy_All:
		// Do action on all enemies
		combat.action_sel.get().complete_all(combat.enemy_party.characters);
		break;
	    case Action_Type.Ally_All:
		// Do action on all allies
		combat.action_sel.get().complete_all(combat.ally_party.characters);
		break;
	    default:
		break;
	    }
	    combat.acting_character.set_idle();
	    combat.set_state(Combat_State.Enemy_Action);
	    break;
	case Combat_State.Enemy_Action:
	    if(!combat.acting_character.animation.is_finished()){
		// If animation has not finished
		break;
	    }
	    // TODO: allow for enemies to use action on allies and parties
	    combat.action_sel.get().complete(combat.target_sel.get());
	    
	    combat.acting_character.set_idle();
	    combat.set_state(Combat_State.Character_Select);
	    break;
	case Combat_State.Win:
	    combat.end_timeline.update(delta_s);
	    if(combat.end_timeline.get_elapsed_time() > 3.0){
		
		// TODO: go to exploration scene
		exploration.scene.show();
		
		console.log("should switch now");
	    }
	    break;
	case Combat_State.Lose:
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
    end_timeline: new Timeline(true),
    acting_character: null,
    
    first_action_icon: new Renderable(new Vector(0.15, 0.4), new Vector(0.3, 0.1),
				 new Animation("default", Sprite.black)),
    second_action_icon: new Renderable(new Vector(0.65, 0.4), new Vector(0.3, 0.1),
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
    set_state: function (state) {
	combat.state = state;
	switch(combat.state){
	case Combat_State.Character_Select:
	    Dialogue.set(["Select an ally character"]);
	    // TODO: remove debug logs after implimentation of health bar
	    for(var i = 0; i < combat.ally_party.characters.length; ++i){
		console.log(combat.ally_party.characters[i].name+" has health: "+
			    combat.ally_party.characters[i].health);
	    }
	    for(var i = 0; i < combat.enemy_party.characters.length; ++i){
		console.log(combat.enemy_party.characters[i].name+" has health: "+
			    combat.enemy_party.characters[i].health+" and is alive? "+
			    combat.enemy_party.characters[i].is_alive());
	    }
	    // /end TODO
	    
	    var living_ally_count = 0;
	    var last_living_ally_index = -1;
	    for(var i = 0; i < combat.ally_party.characters.length; ++i){
		if(combat.ally_party.characters[i].is_alive()){
		    ++living_ally_count;
		    last_living_ally_index = i;
		}
	    }
	    combat.target_sel = combat.ally_sel;
	    if(living_ally_count == 0){
		// If all alies are dead
		console.log("All allies dead...");
		combat.set_state(Combat_State.Lose);
	    } else{
		// Else, select last living ally
		combat.target_sel.set_index(last_living_ally_index);
		if(living_ally_count == 1){
		    // If there is one living ally, skip character selection
		    combat.set_state(Combat_State.Action_Select);
		} else {
		    // Else, update selection indicator
		    combat.update_character_indicator(combat.target_sel.get());
		}
	    }
	    break;
	case Combat_State.Action_Select:
	    Dialogue.set(["Select an action"]);
	    combat.acting_character = combat.ally_sel.get();
	    combat.action_sel = new Selection([combat.acting_character.action_1,
					       combat.acting_character.action_2], false);
	    combat.update_action_indicator();
	    break;
	case Combat_State.Target_Select:
	    Dialogue.set(["Select a target"]);
	    
	    var living_target_count = 0;
	    var last_living_target_index = -1;
	    combat.target_sel.reset();
	    while(true){
		if(combat.target_sel.get().is_alive()){
		    // If the current selected target is alive
		    ++living_target_count;
		    last_living_target_index = combat.target_sel.get_index();
		}
		if(combat.target_sel.get() == combat.target_sel.get_end()){
		    // If this selection is the last, break out of the while loop
		    break;
		} else {
		    // Else, loop again with the next selection
		    combat.target_sel.next();
		}
	    }
	    if(living_target_count == 0){
		// If all targets are dead
		console.log("All targets are dead... should have been handled earlier");
	    } else{
		// Else, select last living target
		combat.target_sel.set_index(last_living_target_index);
		if(living_target_count == 1){
		    // If there is one living target, skip target selection
		    combat.set_state(Combat_State.Player_Action);
		} else {
		    // Else, update character indicator
		    combat.update_character_indicator(combat.target_sel.get());
		}
	    }
	    break;
	case Combat_State.Player_Action:
	    Dialogue.set([combat.acting_character.name + " is using " +
			  combat.action_sel.get().name]);
	    // Hide aciton selection indicator after selecting target
	    combat.action_sel_indicator.hide();
	    combat.acting_character.set_animation(
		combat.action_sel.get().character_animation);
	    combat.acting_character.animation.reset();
	    break;
	case Combat_State.Enemy_Action:
	    // Check that there is an alive enemy
	    var i = 0;
	    for(i = 0; i < combat.enemy_party.characters.length; ++i){
		// For each enemy character
		if(combat.enemy_party.characters[i].is_alive()){
		    // If the character is alive, break
		    break;
		}
	    }
	    if(i == combat.enemy_party.characters.length){
		console.log("all enemies defeated");
		combat.set_state(Combat_State.Win);
		return;
	    }
	    
	    // Select random living enemy to use action
	    while(true){
		var enemy_index = Math.floor(Math.random() *
					     combat.enemy_party.characters.length);
		combat.acting_character = combat.enemy_party.characters[enemy_index];
		if(combat.acting_character.is_alive()){
		    break;
		}
	    }
	    // Use random enemy action
	    combat.action_sel = new Selection([combat.acting_character.action_1,
					       combat.acting_character.action_2]);
	    switch(Math.floor(Math.random() * 2)){
	    case 0:
		combat.acting_character.set_animation(
		    combat.acting_character.action_1.character_animation);
		combat.action_sel.set_index(0);
		break;
	    case 1:
		combat.acting_character.set_animation(
		    combat.acting_character.action_2.character_animation);
		combat.action_sel.set_index(1);
		break;
	    }
	    // Select random target
	    // TODO: allow enemy characters to target their allies
	    //       and target entire parties
	    combat.target_sel = combat.ally_sel;
	    while(true){
		var target_index = Math.floor(Math.random() *
					      combat.ally_party.characters.length);
		combat.target_sel.set_index(target_index);
		if(combat.target_sel.get().is_alive()){
		    break;
		}
	    }

	    combat.acting_character.animation.reset();
	    Dialogue.set([combat.acting_character.name + " is using " +
			  combat.action_sel.get().name]);
	    break;
	case Combat_State.Win:
	    Dialogue.set(["You Win!"]);
	    break;
	case Combat_State.Lose:
	    Dialogue.set(["You Lose..."]);
	    break;
	default:
	    break;
	}
    },
    update_action_icons: function () {
	combat.first_action_icon.set_animation(
	    combat.ally_sel.get().action_1.display_animation);
	combat.second_action_icon.set_animation(
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
    },
    select_living_target: function (selection_type) {
	var prev_char_i = combat.target_sel.get_index();
	while(!combat.target_sel.change(selection_type).is_alive()){
	    // Loop through targets until we reach a living target
	    if(combat.target_sel.get() == combat.target_sel.get_start()){
		// If this is the start selection
		//   No character after our prev selection is alive
		//   Go back to our prev selection
		combat.target_sel.set_index(prev_char_i);
		break;
	    }
	}
    }
};
combat.scene.user_input.add_keyboard_event(" ", "press", function(){
    switch(combat.state){
    case Combat_State.Character_Select:
	// Character has been selected
	combat.set_state(Combat_State.Action_Select);
	break;
    case Combat_State.Action_Select:
	// Action has been selected
	// Handle combat state depending on action type
	switch(combat.action_sel.get().type){
	case Action_Type.Enemy_Single:
	    // Ready target selection
	    combat.target_sel = combat.enemy_sel;
	    combat.set_state(Combat_State.Target_Select);
	    break;
	case Action_Type.Ally_Single:
	    // Ready target selection
	    combat.target_sel = combat.ally_sel;
	    combat.set_state(Combat_State.Target_Select);
	    break;
	case Action_Type.Enemy_All:
	case Action_Type.Ally_All:
	    // Go to player action
	    combat.set_state(Combat_State.Player_Action);
	    break;
	default:
	    console.log("ERROR::unknown Action_Type: " +
			combat.action_sel.get().type);
	    break;
	}
	break;
    case Combat_State.Target_Select:
	// Go into player animation
	combat.set_state(Combat_State.Player_Action);
	break;
    default:
	break;
    }
    
});
combat.scene.user_input.add_keyboard_event("a", "press", function(){
    switch(combat.state){
    case Combat_State.Character_Select:
	combat.select_living_target(Selection_Type.Previous);
	combat.update_character_indicator(combat.ally_sel.get());
	break;
    case Combat_State.Action_Select:
	combat.action_sel.previous();
	combat.update_action_indicator();
	break;
    case Combat_State.Target_Select:
	combat.select_living_target(Selection_Type.Previous);
	combat.update_character_indicator(combat.target_sel.get());
	break;
    default:
	break;
    }
});
combat.scene.user_input.add_keyboard_event("d", "press", function(){
    switch(combat.state){
    case Combat_State.Character_Select:
	combat.select_living_target(Selection_Type.Next);
	combat.update_character_indicator(combat.ally_sel.get());
	break;
    case Combat_State.Action_Select:
	combat.action_sel.next();
	combat.update_action_indicator();
	break;
    case Combat_State.Target_Select:
	combat.select_living_target(Selection_Type.Next);
	combat.update_character_indicator(combat.target_sel.get());
	break;
    default:
	break;
    }
});
