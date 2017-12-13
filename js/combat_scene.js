var player_party = new Party();
var enemy_party = new Party();

var slime_character = new Character("Slime", "green.png");
player_party.add_member(slime_character);
/*
var fighter_character = new Character("Fighter", "green.png");
player_party.add_member(fighter_character);
*/
var enemy_character1 = new Character("Enemy", "red.png");
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
    Player_Animaion: 3,
    Enemy_Calculate_Turn: 4,
    Enemy_Animation: 5
};
var combat = {
    state: 0,
    scene: new Scene("Combat", 1.0, function(){
	// set position of all characters in player_party and enemy_party
	var renderables = [];
	var character_selection_options = [];
	for(var i = 0; i < player_party.characters.length; ++i){
	    // Set positions from center-screen, right to left
	    player_party.characters[i].position = 
		new Vector(0.5 - (i+1) * 1.10 *
			   player_party.characters[i].size.x, 0.2);
	    renderables.push(player_party.characters[i]);
	    character_selection_options.push(player_party.characters[i].name);
	}
	for(var i = 0; i < enemy_party.characters.length; ++i){
	    // Set positions from center-screen, left to right
	    enemy_party.characters[i].position = 
		new Vector(0.5 + (i) * 1.10 *
			   enemy_party.characters[i].size.x, 0.2);
	    renderables.push(enemy_party.characters[i]);
	}
	// Add ui renderables
	renderables.push(combat.action_selection_col);
	renderables.push(combat.first_attack);
	renderables.push(combat.second_attack);
	combat.character_selection = new Selection(character_selection_options);
	combat.scene.set_renderables(renderables);
	combat.state = Combat_State.Character_Select;
    }, function (delta_s) {
	switch(combat.state){
	case Combat_State.Character_Select:
	    // Select Character to use action
	    // Character selection should be visible
	    break;
	case Combat_State.Action_Select:
	    // Select action to use
	    // Action selection should be visible
	    break;
	case Combat_State.Target_Select:
	    // Select target to use action on
	    // Either Character selection or Enemy selection should be visible
	    //   Character for healing, of Enemy for damage
	    break;
	case Combat_State.Player_Animation:
	    // Update and check timeline
	    break;
	case Combat_State.Enemy_Calculate_Turn:
	    // Calculate Enemy turn
	    
	    // Calculate enemy to use action
	    // Calculate enemy action
	    // Calculate enemy's target
	    break;
	case Combat_State.Enemy_Animation:
	    // Update and check timeline
	    break;
	default:
	    break;
	}
	
	// Set first_attack and second_attack to pngs based on character_selection
    }),
    action_selection: new Selection(["First", "Second"], true),
    action_selection_col: new Renderable(new Vector(0.05, 0.4), new Vector(0.1, 0.1),
					 new Sprite("red.png")),
    first_attack: new Renderable(new Vector(0.15, 0.4), new Vector(0.3, 0.1),
				 new Sprite("blue.png")),
    second_attack: new Renderable(new Vector(0.65, 0.4), new Vector(0.3, 0.1),
				  new Sprite("blue.png")),

    character_selection: null,
    character_selection_col: new Renderable(new Vector(1, 1), new Vector(1, 1),
					    new Sprite("black.png"))
};
combat.scene.add_keyboard_event(" ", "press", function(){
    switch(combat.action_selection.get()){
    case combat.action_selection.options[0]:
	console.log("first attack");
	break;
    case combat.action_selection.options[1]:
	console.log("second attack");
	break;
    default:
	break;
    }
    // dont accept user input until next user turn
    // play user attack animation
    // see if combat is done,
    //   if so go to scene that is given (TODO:create variable for return scene)
    //   this scene will stop updating
    // then decide enemmy attack
    // play enemy attack animation
    // start user turn if combat still going
});
combat.scene.add_keyboard_event("a", "press", function(){
    switch(combat.action_selection.previous()){
    case combat.action_selection.options[0]:
	combat.action_selection_col.position = new Vector(0.05, 0.4);
	break;
    case combat.action_selection.options[1]:
	combat.action_selection_col.position = new Vector(0.55, 0.4);
	break;
    default:
	break;
    }
});
combat.scene.add_keyboard_event("d", "press", function(){
    switch(combat.action_selection.next()){
    case combat.action_selection.options[0]:
	combat.action_selection_col.position = new Vector(0.05, 0.4);
	break;
    case combat.action_selection.options[1]:
	combat.action_selection_col.position = new Vector(0.55, 0.4);
	break;
    default:
	break;
    }
});
