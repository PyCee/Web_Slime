var ally_party = new Party();
var enemy_party = new Party();

var slime_character = new Character("Slime", "green.png",
				    new Action("tackle", Action_Type.Enemy_Single,
					       function(target){target.health-=2;}),
				    new Action("slime it", Action_Type.Enemy_Single,
					       function(target){target.health-=1;}));
ally_party.add_member(slime_character);
/*
var fighter_character = new Character("Fighter", "green.png");
ally_party.add_member(fighter_character);
*/
var enemy_character1 = new Character("Enemy", "red.png",
				    new Action("kil", Action_Type.Enemy_Single,
					       function(target){target.health-=2;}),
				    new Action("murk", Action_Type.Enemy_Single,
					       function(target){target.health-=1;}));
enemy_party.add_member(enemy_character1);
/*
var enemy_character2 = new Character("Enemy", "red.png");
enemy_party.add_member(enemy_character2);
var enemy_character3 = new Character("Enemy", "red.png");
enemy_party.add_member(enemy_character3);
*/
var Combat_State = {
    Characer_Select: 0,
    Action_Select: 1,
    Target_Select: 2,
    Player_Animation: 3,
    Enemy_Animation: 4
};
var combat = {
    state: Combat_State.Character_Select,
    scene: new Scene("Combat", 1.0, function(){
	// set position of all characters in ally_party and enemy_party
	var renderables = [];
	var ally_sel_options = [];
	var enemy_sel_options = [];
	for(var i = 0; i < ally_party.characters.length; ++i){
	    // Set positions from center-screen, right to left
	    ally_party.characters[i].position = 
		new Vector(0.5 - (i+1) * 1.10 *
			   ally_party.characters[i].size.x, 0.2);
	}
	for(var i = 0; i < enemy_party.characters.length; ++i){
	    // Set positions from center-screen, left to right
	    enemy_party.characters[i].position = 
		new Vector(0.5 + (i) * 1.10 *
			   enemy_party.characters[i].size.x, 0.2);
	}
	// Create non-static selections for this battle
	combat.ally_sel = new Selection(ally_party.characters, true);
	combat.enemy_sel = new Selection(enemy_party.characters, true);
	
	// Add ui renderables
	for(var i = 0; i < ally_party.characters.length; ++i){
	    // Add each player character to renderables
	    renderables.push(ally_party.characters[i]);
	}
	for(var i = 0; i < enemy_party.characters.length; ++i){
	    // Add each enemy character to renderables
	    renderables.push(enemy_party.characters[i]);
	}
	renderables.push(combat.action_sel_indicator);
	renderables.push(combat.first_action);
	renderables.push(combat.second_action);
	combat.scene.set_renderables(renderables);
	combat.set_state(Combat_State.Character_Select);
    }, function (delta_s) {
	//console.log(combat.state);
	
	switch(combat.state){
	case Combat_State.Character_Select:
	    console.log("Select player character");
	    break;
	case Combat_State.Action_Select:
	    console.log("Select action");
	    break;
	case Combat_State.Target_Select:
	    console.log("Select target");
	    break;
	case Combat_State.Player_Animation:
	    console.log("playing player animation");
	    combat.animation_timeline.update(delta_s);
	    if(combat.animation_timeline.get_elapsed_time() > 2.0){
		// Calculate enemy action and set animation (tmp: timeline)
		combat.set_state(Combat_State.Enemy_Animation);
	    }
	    break;
	case Combat_State.Enemy_Animation:
	    console.log("playing enemy animation");
	    combat.animation_timeline.update(delta_s);
	    if(combat.animation_timeline.get_elapsed_time() > 2.0){
		// Calculate enemy action and set animation (tmp: timeline)
		combat.set_state(Combat_State.Character_Select);
	    }
	    break;
	default:
	    break;
	}
    }),
    // TODO: replace timeline with character animation
    animation_timeline: new Timeline(true),
    
    first_action: new Renderable(new Vector(0.15, 0.4), new Vector(0.3, 0.1),
				 new Sprite("black.png")),
    second_action: new Renderable(new Vector(0.65, 0.4), new Vector(0.3, 0.1),
				  new Sprite("black.png")),
    action_sel: null,
    action_sel_indicator: new Renderable(new Vector(0.05, 0.4), new Vector(0.1, 0.1),
					 new Sprite("red.png")),
    // ally_sel and enemy_sel are created upon combat.scene load,
    //   and changed as characters die during battle
    ally_sel: null,
    ally_sel_indicator: new Renderable(new Vector(1, 1), new Vector(1, 1),
				       new Sprite("red.png")),
    enemy_sel: null,
    enemy_sel_indicator: new Renderable(new Vector(1, 1), new Vector(1, 1),
					new Sprite("red.png")),
    // target_sel will be set to ally_sel or enemy_sel depending on action type
    target_sel: null,

    set_state: function (state) {
	combat.state = state;
	combat.animation_timeline.reset();
    },
    enemy_turn: function () {
	// Calculate enemy to use action
	// Calculate enemy action
	// Calculate enemy's target
    },
    update_action_indicator: function () {
	switch(combat.action_sel.get()){
	case combat.action_sel.options[0]:
	    combat.action_sel_indicator.position = new Vector(0.05, 0.4);
	    break;
	case combat.action_sel.options[1]:
	    combat.action_sel_indicator.position = new Vector(0.55, 0.4);
	    break;
	default:
	    break;
	}
    },
    update_ally_indicator: function () {
	
    },
    update_enemy_indicator: function () {
	
    }
};
combat.scene.add_keyboard_event(" ", "press", function(){
    switch(combat.state){
    case Combat_State.Character_Select:
	// Character has been selected
	combat.action_sel = new Selection([combat.ally_sel.get().action_1,
					   combat.ally_sel.get().action_2], true);
	combat.update_action_indicator();
	combat.set_state(Combat_State.Action_Select);
	break;
    case Combat_State.Action_Select:
	// Action has been selected
	//   Handle combat state depending on action type
	switch(combat.action_sel.get().type){
	case Action_Type.Enemy_Single:
	    // Ready target selection
	    combat.enemy_sel.reset();
	    combat.target_sel = combat.enemy_sel;
	    combat.set_state(Combat_State.Target_Select);
	    break;
	case Action_Type.Ally_Single:
	    // Ready target selection
	    combat.ally_sel.reset();
	    combat.target_sel = combat.ally_sel;
	    combat.set_state(Combat_State.Target_Select);
	    break;
	case Action_Type.Enemy_All:
	    // Do action on all alive enemies
	    for(var i = 0; i < enemy_party.characters.length; ++i){
		// For each enemy character
		//   Complete the action
		combat.action_sel.get().complete(enemy_party.characters[i]);
	    }
	    // Go into player animation
	    combat.set_state(Combat_State.Player_Animation);
	    break;
	case Action_Type.Ally_All:
	    // Do action on all allies
	    for(var i = 0; i < ally_party.characters.length; ++i){
		// For each enemy character
		//   Complete the action
		combat.action_sel.get().complete(ally_party.characters[i]);
	    }
	    // Go into player animation
	    combat.set_state(Combat_State.Player_Animation);
	    break;
	default:
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
	while(!combat.ally_sel.previous().is_alive()){
	    // Loop through characters until we reach an alive character
	}
	combat.update_ally_indicator();
	break;
    case Combat_State.Action_Select:
	combat.action_sel.previous();
	combat.update_action_indicator();
	break;
    case Combat_State.Target_Select:
	while(!combat.target_sel.previous().is_alive()){
	    // Loop through targets until we reach a living target
	}
	// update_target_indicator
	combat.update_enemy_indicator();
	break;
    default:
	break;
    }
});
combat.scene.add_keyboard_event("d", "press", function(){
    switch(combat.state){
    case Combat_State.Character_Select:
	while(!combat.ally_sel.next().is_alive()){
	    // Loop through characters until we reach an alive character
	}
	combat.update_ally_indicator();
	break;
    case Combat_State.Action_Select:
	combat.action_sel.next();
	combat.update_action_indicator();
	break;
    case Combat_State.Target_Select:
	while(!combat.target_sel.next().is_alive()){
	    // Loop through targets until we reach a living target
	}
	// update_target_indicator
	combat.update_enemy_indicator();
	break;
    default:
	break;
    }
});
