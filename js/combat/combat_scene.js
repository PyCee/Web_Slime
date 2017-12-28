var Combat_State = {
    Characer_Select: 0,
    Action_Select: 1,
    Target_Select: 2,
    Player_Action: 3,
    Enemy_Action: 4,
    Win: 5,
    Lose: 6
};
var Combat = {
    encounter: null,
    ally_party: new Party(),
    living_allies: null,
    living_enemies: null,
    living_targets: null,
    state: Combat_State.Character_Select,
    scene: new Scene("Combat", 1.0, function(){
	// set position of all characters in Combat.ally_party and Combat.enemy_party
	for(var i = 0; i < Combat.ally_party.characters.length; ++i){
	    // Set positions from center-screen, right to left
	    Combat.ally_party.characters[i].position = 
		new Vector(0.5 - (i+1) * 1.10 *
			   Combat.ally_party.characters[i].size.x, 0.2);
	    Combat.ally_party.characters[i].position_health_bar();
	}
	for(var i = 0; i < Combat.encounter.enemy_party.characters.length; ++i){
	    // Set positions from center-screen, left to right
	    Combat.encounter.enemy_party.characters[i].position = 
		new Vector(0.5 + (i) * 1.10 *
			   Combat.encounter.enemy_party.characters[i].size.x, 0.2);
	    Combat.encounter.enemy_party.characters[i].position_health_bar();
	}
	
	// Add ui renderables
	var renderables = [];
	for(var i = 0; i < Combat.ally_party.characters.length; ++i){
	    // Add each player character and health bar to renderables
	    renderables.push(Combat.ally_party.characters[i]);
	    renderables.push(Combat.ally_party.characters[i].health_bar);
	}
	for(var i = 0; i < Combat.encounter.enemy_party.characters.length; ++i){
	    // Add each enemy character and health bar to renderables
	    renderables.push(Combat.encounter.enemy_party.characters[i]);
	    renderables.push(Combat.encounter.enemy_party.characters[i].health_bar);
	}
	renderables.push(Combat.action_sel_indicator);
	renderables.push(Combat.character_sel_indicator);
	renderables.push(Combat.first_action_icon);
	renderables.push(Combat.second_action_icon);
	Combat.scene.set_renderables(renderables);

	// Initially hide indicators
	Combat.action_sel_indicator.hide();
	Combat.character_sel_indicator.hide();

	Combat.reset_living_allies();
	Combat.reset_living_enemies();
	
	// Initialize state to character select
	Combat.set_state(Combat_State.Character_Select);
	Combat.update_character_indicator(Combat.ally_sel.get());

	Combat.end_timeline.reset();
    }, function (delta_s) {
	switch(Combat.state){
	case Combat_State.Character_Select:
	    break;
	case Combat_State.Action_Select:
	    break;
	case Combat_State.Target_Select:
	    break;
	case Combat_State.Player_Action:
	    if(!Combat.acting_character.animation.is_finished()){
		// If animation has not finished
		break;
	    }
	    // Else, Complete the action
	    switch(Combat.action_sel.get().type){
	    case Action_Type.Enemy_Single:
	    case Action_Type.Ally_Single:
		// Complete action on target (whether enemy or ally)
		Combat.action_sel.get().complete(Combat.target_sel.get());
		break;
	    case Action_Type.Enemy_All:
		// Do action on all enemies
		Combat.action_sel.get().complete_all(Combat.living_enemies.characters);
		break;
	    case Action_Type.Ally_All:
		// Do action on all allies
		Combat.action_sel.get().complete_all(Combat.living_allies.characters);
		break;
	    default:
		break;
	    }
	    Combat.acting_character.set_idle();
	    
	    // Reset living_enemies party to respond to possible enemy death
	    Combat.reset_living_enemies();
	    if(Combat.living_enemies.characters.length > 0){
		Combat.set_state(Combat_State.Enemy_Action);
	    }
	    break;
	case Combat_State.Enemy_Action:
	    if(!Combat.acting_character.animation.is_finished()){
		// If animation has not finished
		break;
	    }
	    // TODO: allow for enemies to use action on allies and parties
	    Combat.action_sel.get().complete(Combat.target_sel.get());
	    
	    Combat.acting_character.set_idle();
	    
	    // Reset living_allies party to respond to ally death
	    Combat.reset_living_allies();
	    if(Combat.living_allies.characters.length > 0){
		Combat.set_state(Combat_State.Character_Select);
	    }
	    break;
	case Combat_State.Win:
	    Combat.end_timeline.update(delta_s);
	    if(Combat.end_timeline.get_elapsed_time() > Combat.win_wait){
		Combat.encounter.callback();
		exploration.scene.show();
	    }
	    break;
	case Combat_State.Lose:
	    Combat.end_timeline.update(delta_s);
	    if(Combat.end_timeline.get_elapsed_time() > Combat.lose_wait){
		// TODO:switch to prev scene, denoted by encounter
		location.reload();
		Combat.end_timeline.reset();
		Combat.end_timeline.stop();
	    }
	    break;
	default:
	    break;
	}
    }),
    win_wait: 3,
    lose_wait: 3,
    end_timeline: new Timeline(),
    acting_character: null,
    
    first_action_icon: new Renderable(new Vector(0.15, 0.4), new Vector(0.3, 0.1),
				 new Animation(Sprite.black)),
    second_action_icon: new Renderable(new Vector(0.65, 0.4), new Vector(0.3, 0.1),
				  new Animation(Sprite.black)),
    action_sel: null,
    action_sel_indicator: new Renderable(new Vector(0.05, 0.4), new Vector(0.1, 0.1),
					 new Animation(Sprite.red)),
    // ally_sel and enemy_sel are created upon Combat.scene load,
    //   and changed as characters die during battle
    ally_sel: null,
    enemy_sel: null,
    // target_sel will be set to ally_sel or enemy_sel depending on action type
    target_sel: null,
    character_sel_indicator: new Renderable(new Vector(0, 0), new Vector(0.15, 0.05),
					    new Animation(Sprite.black)),
    set_state: function (state) {
	Combat.state = state;
	switch(Combat.state){
	case Combat_State.Character_Select:
	    Dialogue.set(["Select an ally character"]);
	    
	    Combat.target_sel = Combat.ally_sel;
	    if(Combat.living_allies.characters.length == 0){
		// If all alies are dead
		console.log("All allies dead...");
		Combat.set_state(Combat_State.Lose);
	    } else{
		// Else, select last living ally
		Combat.target_sel.set_index(Combat.living_allies.characters.length - 1);
		if(Combat.living_allies.characters.length == 1){
		    // If there is one living ally, skip character selection
		    Combat.set_state(Combat_State.Action_Select);
		} else {
		    // Else, update selection indicator
		    Combat.update_character_indicator(Combat.target_sel.get());
		    Combat.character_sel_indicator.show();
		}
	    }
	    break;
	case Combat_State.Action_Select:
	    Dialogue.set(["Select an action"]);
	    Combat.action_sel_indicator.show();

	    // Update action icons so they are updated
	    //   even if character select is skipped
	    Combat.update_action_icons();
	    
	    Combat.acting_character = Combat.ally_sel.get();
	    Combat.action_sel = new Selection(Combat.acting_character.actions, false);
	    Combat.update_action_indicator();
	    break;
	case Combat_State.Target_Select:
	    Dialogue.set(["Select a target"]);
	    
	    Combat.target_sel.reset();
	    Combat.character_sel_indicator.show();
	    
	    if(Combat.living_targets.characters.length == 0){
		// If all targets are dead
		console.log("All targets are dead... should have been handled earlier");
	    } else{
		// Else, select last living target
		Combat.target_sel.set_index(Combat.living_targets.characters.length - 1);
		if(Combat.living_targets.characters.length == 1){
		    // If there is one living target, skip target selection
		    Combat.set_state(Combat_State.Player_Action);
		} else {
		    // Else, update character indicator
		    Combat.update_character_indicator(Combat.target_sel.get());
		}
	    }
	    break;
	case Combat_State.Player_Action:
	    Dialogue.set([Combat.acting_character.name + " is using " +
			  Combat.action_sel.get().name,
			  "on " + Combat.target_sel.get().name]);
	    // Hide aciton selection indicator after selecting target
	    Combat.action_sel_indicator.hide();
	    Combat.character_sel_indicator.hide();
	    Combat.acting_character.set_animation(
		Combat.action_sel.get().character_animation);
	    Combat.acting_character.animation.reset();
	    break;
	case Combat_State.Enemy_Action:
	    
	    // Select random living enemy to use action
	    var enemy_index = Math.floor(Math.random() *
					 Combat.living_enemies.characters.length);
	    Combat.acting_character = Combat.living_enemies.characters[enemy_index];
	    
	    // Select random enemy action
	    Combat.action_sel = new Selection(Combat.acting_character.actions);
	    Combat.action_sel.set_index(Math.floor(Math.random() * 2));
	    Combat.acting_character.set_animation(
		Combat.action_sel.get().character_animation);
	    
	    // Select random target
	    // TODO: allow enemy characters to target their allies
	    //       and target entire parties
	    Combat.target_sel = Combat.ally_sel;
	    
	    var target_index = Math.floor(Math.random() *
					  Combat.living_allies.characters.length);
	    Combat.target_sel.set_index(target_index);

	    
	    Combat.acting_character.animation.reset();
	    Dialogue.set([Combat.acting_character.name + " is using " +
			  Combat.action_sel.get().name,
			  "on " + Combat.target_sel.get().name]);
	    break;
	case Combat_State.Win:
	    Dialogue.set(["You Win!"], Combat.win_wait);
	    break;
	case Combat_State.Lose:
	    Dialogue.set(["You Lose..."], Combat.lose_wait);
	    break;
	default:
	    break;
	}
    },
    update_action_indicator: function () {
	Combat.action_sel_indicator.position =
	    new Vector(0.05 + Combat.action_sel.get_index() * 0.5, 0.4);
    },
    update_character_indicator: function (character) {
	Combat.character_sel_indicator.position =
	    new Vector(character.position.x, 0.15);
	if(Combat.state == Combat_State.Character_Select){
	    Combat.update_action_icons();
	}
    },
    update_action_icons: function () {
	Combat.first_action_icon.set_animation(
	    Combat.ally_sel.get().actions[0].display_animation);
	Combat.second_action_icon.set_animation(
	    Combat.ally_sel.get().actions[1].display_animation);
    },
    reset_living_party: function (living_party, party) {
	for(var i = 0; i < party.characters.length; ++i){
	    if(party.characters[i].is_alive()){
		living_party.add_member(party.characters[i]);
	    }
	}
    },
    reset_living_allies: function () {
	Combat.living_allies = new Party();
	Combat.reset_living_party(Combat.living_allies, Combat.ally_party);
	if(Combat.living_allies.characters.length == 0){
		Combat.set_state(Combat_State.Lose);
	} else{
	    Combat.ally_sel = new Selection(Combat.living_allies.characters.reverse(),
					    false);
	}
    },
    reset_living_enemies: function () {
	Combat.living_enemies = new Party();
	Combat.reset_living_party(Combat.living_enemies, Combat.encounter.enemy_party);
	if(Combat.living_enemies.characters.length == 0){
	    Combat.set_state(Combat_State.Win);
	} else{
	    Combat.enemy_sel = new Selection(Combat.living_enemies.characters, false);
	}
    }
};
Combat.scene.user_input.add_keyboard_event(" ", "press", function(){
    switch(Combat.state){
    case Combat_State.Character_Select:
	// Character has been selected
	Combat.set_state(Combat_State.Action_Select);
	break;
    case Combat_State.Action_Select:
	// Action has been selected
	// Handle Combat state depending on action type
	switch(Combat.action_sel.get().type){
	case Action_Type.Enemy_Single:
	    // Ready target selection
	    Combat.living_targets = Combat.living_enemies;
	    Combat.target_sel = Combat.enemy_sel;
	    Combat.set_state(Combat_State.Target_Select);
	    break;
	case Action_Type.Ally_Single:
	    // Ready target selection
	    Combat.living_targets = Combat.living_allies;
	    Combat.target_sel = Combat.ally_sel;
	    Combat.set_state(Combat_State.Target_Select);
	    break;
	case Action_Type.Enemy_All:
	case Action_Type.Ally_All:
	    // Go to player action
	    Combat.set_state(Combat_State.Player_Action);
	    break;
	default:
	    console.log("ERROR::unknown Action_Type: " +
			Combat.action_sel.get().type);
	    break;
	}
	break;
    case Combat_State.Target_Select:
	// Go into player animation
	Combat.set_state(Combat_State.Player_Action);
	break;
    default:
	break;
    }
    
});
Combat.scene.user_input.add_keyboard_event("a", "press", function(){
    switch(Combat.state){
    case Combat_State.Character_Select:
	Combat.target_sel.previous();
	Combat.update_character_indicator(Combat.ally_sel.get());
	break;
    case Combat_State.Action_Select:
	Combat.action_sel.previous();
	Combat.update_action_indicator();
	break;
    case Combat_State.Target_Select:
	Combat.target_sel.previous();
	Combat.update_character_indicator(Combat.target_sel.get());
	break;
    default:
	break;
    }
});
Combat.scene.user_input.add_keyboard_event("d", "press", function(){
    switch(Combat.state){
    case Combat_State.Character_Select:
	Combat.target_sel.next();
	Combat.update_character_indicator(Combat.ally_sel.get());
	break;
    case Combat_State.Action_Select:
	Combat.action_sel.next();
	Combat.update_action_indicator();
	break;
    case Combat_State.Target_Select:
	Combat.target_sel.next();
	Combat.update_character_indicator(Combat.target_sel.get());
	break;
    default:
	break;
    }
});
