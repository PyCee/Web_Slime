class Character extends Renderable {
    constructor (name, idle_animation,
		 action_1,
		 action_2,
		 dead_animation=null,
		 max_health=10,
		 is_alive=function(){return this.health>0;}) {
	super(new Vector(0, 0), new Vector(0.15, 0.15), idle_animation);
	this.name = name;
	this.action_1 = action_1;
	this.action_2 = action_2;
	this.dead_animation = dead_animation;
	this.max_health = max_health;
	this.health = max_health;
	this.is_alive = is_alive;
	this.health_bar = new Progress_Bar(new Vector(0,0),
					   new Vector(0.15, 0.03),
					   new Animation(Sprite.green, "Health"),
					   new Animation(Sprite.red, "Health_BG"),
					   this.max_health, this.health);
    }
    position_health_bar () {
	this.health_bar.position = this.position.subtract(new Vector(0.0, -0.16));
    }
    take_damage (damage) {
	this.health -= damage;
	
	if(this.health > this.max_health){
	    this.health = this.max_health;
	} else if (this.health <= 0){
	    // If taking this damage kills the character
	    this.health = 0;
	    if(this.dead_animation != null){
		this.set_animation(this.dead_animation);
	    }
	}
	this.health_bar.set_progress(this.health);
    }
    heal_damage (heal) {
	this.take_damage(-1.0 * heal);
    }
}
