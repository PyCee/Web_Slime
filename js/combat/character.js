var Health_Change_Type = {
    Damage: 0,
    Heal: 1
};
var Health_Change_Indicator = {
    offset: new Vector(0.02, -0.05),
    font_size: 0.06,
    damage_color: "#aa0011",
    heal_color: "#00aa11"
};
class Character extends Renderable {
    constructor (name, idle_animation,
		 action_1,
		 action_2,
		 dead_animation=null,
		 max_health=10,
		 is_alive=function(){return this.health>0;}) {
	super(new Vector(0, 0), new Vector(0.15, 0.15), idle_animation);
	this.name = name;
	this.idle_animation = idle_animation;
	this.actions = [action_1, action_2];
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
    reset () {
	this.health = this.max_health;
	this.position_health_bar();
    }
    set_idle () {
	this.set_animation(this.idle_animation);
    }
    position_health_bar () {
	this.health_bar.position = this.position.add(new Vector(0.0, 0.16));
    }
    change_health (change, type) {
	var health_sign = "";
	var indicator_color = "";
	switch(type){
	case Health_Change_Type.Damage:
	    this.health -= change;
	    health_sign = "-"
	    indicator_color = Health_Change_Indicator.damage_color;
	    break;
	case Health_Change_Type.Heal:
	    this.health += change;
	    health_sign = "+"
	    indicator_color = Health_Change_Indicator.heal_color;
	    break;
	default:
	    break;
	}
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
	var health_change_ind =
	    new Text(this.position.add(Health_Change_Indicator.offset),
		     Health_Change_Indicator.font_size,
		     health_sign + change, indicator_color);
	var id = Combat.scene.add_renderable(health_change_ind);
	var health_change_ind_sequence = new Sequence();
	health_change_ind_sequence.add_lerp(new Lerp(0.0, 3.0, new Vector(0.0, 0.05),
						     [health_change_ind]));
	health_change_ind_sequence.add_event(3.0, function(){
	    Combat.scene.remove_renderable_id(id);
	});
	Cutscene.start(health_change_ind_sequence);
    }
    take_damage (damage) {
	this.change_health(damage, Health_Change_Type.Damage);
    }
    heal_damage (heal) {
	this.change_health(heal, Health_Change_Type.Heal);
    }
}
