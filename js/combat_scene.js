var player_party = new Party();
var enemy_party = new Party();

var slime_character = new Character("Slime", "green.png");
player_party.add_member(slime_character);
var fighter_character = new Character("Fighter", "green.png");
player_party.add_member(fighter_character);

var enemy_character1 = new Character("Enemy", "red.png");
enemy_party.add_member(enemy_character1);
var enemy_character2 = new Character("Enemy", "red.png");
enemy_party.add_member(enemy_character2);
var enemy_character3 = new Character("Enemy", "red.png");
enemy_party.add_member(enemy_character3);

var combat = {
    scene: new Scene("Combat", 1.0, function(){
	// set position of all characters in player_party and enemy_party
	var renderables = [];
	
	for(var i = 0; i < player_party.characters.length; ++i){
	    // Set positions from center-screen, right to left
	    player_party.characters[i].sprite.position = 
		new Vector(0.5 - (i+1) * 1.10 *
			   player_party.characters[i].sprite.size.x, 0.2);
	    renderables.push(player_party.characters[i].sprite);
	}
	for(var i = 0; i < enemy_party.characters.length; ++i){
	    // Set positions from center-screen, left to right
	    enemy_party.characters[i].sprite.position = 
		new Vector(0.5 + (i) * 1.10 *
			   enemy_party.characters[i].sprite.size.x, 0.2);
	    renderables.push(enemy_party.characters[i].sprite);
	}
	
	// Add ui renderables
	renderables.push(combat.selection_col);
	renderables.push(combat.attack_sel);
	renderables.push(combat.run_sel);
	
	combat.scene.set_renderables(renderables);
	
    }, function (delta_s) {
	// Update enemy logic if needed and play animations
    }),
    action_selection: new Selection(["Attack", "Run"], true),
    selection_col: new Actor(new Vector(0.05, 0.4), 0.1, 0.1, "red.png"),
    attack_sel: new Actor(new Vector(0.15,0.4), 0.3, 0.1, "green.png"),
    run_sel: new Actor(new Vector(0.65,0.4), 0.3, 0.1, "green.png")
    
};
combat.scene.add_keyboard_event(" ", "press", function(){
    switch(combat.action_selection.get()){
    case combat.action_selection.options[0]:
	console.log("attacking");
	break;
    case combat.action_selection.options[1]:
	console.log("running");
	break;
    default:
	break;
    }
});
combat.scene.add_keyboard_event("a", "press", function(){
    switch(combat.action_selection.previous()){
    case combat.action_selection.options[0]:
	combat.selection_col.position = new Vector(0.05, 0.4);
	break;
    case combat.action_selection.options[1]:
	combat.selection_col.position = new Vector(0.55, 0.4);
	break;
    default:
	break;
    }
});
combat.scene.add_keyboard_event("d", "press", function(){
    switch(combat.action_selection.next()){
    case combat.action_selection.options[0]:
	combat.selection_col.position = new Vector(0.05, 0.4);
	break;
    case combat.action_selection.options[1]:
	combat.selection_col.position = new Vector(0.55, 0.4);
	break;
    default:
	break;
    }
});
