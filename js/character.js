class Character extends Renderable{
    constructor (name, sprite_res, max_health=10,
		 action_1=new Action("DEFAULT_ACTION"),
		 action_2=new Action("DEFAULT_ACTION"),
		 is_alive=function(){return this.health>0;}) {
	super(new Vector(0, 0), new Vector(0.15, 0.15), new Sprite(sprite_res));
	this.name = name;
	this.max_health = max_health;
	this.health = max_health;
	this.action_1 = action_1;
	this.action_2 = action_2;
	this.is_alive = is_alive;
    }
    display(){
	super.display();
    }
}
