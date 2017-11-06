class Character {
    constructor (name, sprite_res, max_health=10,
		 is_alive=function(){return this.health>0;}) {
	this.name = name;
	this.sprite = new Sprite(new Vector(0, 0), 0.15, 0.15, sprite_res);
	this.max_health = max_health;
	this.health = max_health;
	this.is_alive = is_alive;
	this.actions = [];
    }
    learn_action (action, display_message=false) {
	this.actions.push(action);
    }
}
