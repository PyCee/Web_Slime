class Character {
    constructor (name, sprite, max_health=10) {
	this.name = name;
	this.sprite = sprite;
	this.max_health = max_health;
	this.health = max_health;
	this.actions = [];
    }
    learn_action (action, display_message=false) {
	this.actions.push(action);
	if(display_message){
	    // Display the message 'character.name has learned "action.name"!'
	}
    }
}
