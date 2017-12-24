class Character extends Renderable {
    constructor (name, idle_animation,
		 action_1,
		 action_2,
		 max_health=10,
		 is_alive=function(){return this.health>0;}) {
	super(new Vector(0, 0), new Vector(0.15, 0.15), idle_animation);
	this.name = name;
	this.action_1 = action_1;
	this.action_2 = action_2;
	this.max_health = max_health;
	this.health = max_health;
	this.is_alive = is_alive;
	this.health_bar = new Progress_Bar(new Vector(0,0),
					   new Vector(0.15, 0.03),
					   new Animation("health", Sprite.green),
					   new Animation("red", Sprite.red),
					   this.max_health, this.health);
    }
    position_health_bar () {
	this.health_bar.position = this.position.subtract(new Vector(0.0, -0.16));
    }
    take_damage (damage) {
	this.health -= damage;
	this.health_bar.add_progress(-damage);
    }
}
