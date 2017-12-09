var dungeon = new Map(10.0, function(){
    slime.position = new Vector(2.0, 1.5);
});
dungeon.add_actor(slime);
// Walls
var dungeon_height = 10.0 * canvas_dimensions.aspect_ratio.multiplier;
dungeon.add_actor(new Actor(new Vector(0.0, 0.0), new Vector(10.0, 0.5),
			    new Sprite(new Vector(0.0, 0.0), new Vector(10.0, 0.5),
				       "black.png")));
dungeon.add_actor(new Actor(new Vector(0.0, 0.0),
			    new Vector(0.5, dungeon_height),
			    new Sprite(new Vector(0.0, 0.0),
				       new Vector(0.5, dungeon_height),
				       "black.png")));
dungeon.add_actor(new Actor(new Vector(0.0, dungeon_height - 0.5),
			    new Vector(10.0, 0.5),
			    new Sprite(new Vector(0.0, dungeon_height - 0.5),
				       new Vector(10.0, 0.5),
				       "black.png")));
// Right wall (with gap for door)
dungeon.add_actor(new Actor(new Vector(10.0 - 0.5, 0.0),
			    new Vector(0.5, 2.5), 
			    new Sprite(new Vector(10.0 - 0.5, 0.0),
				       new Vector(0.5, 2.5),
				       "black.png")));
dungeon.add_actor(new Actor(new Vector(10.0 - 0.5, 3.5),
			    new Vector(0.5, dungeon_height - 3.5),
			    new Sprite(new Vector(10.0 - 0.5, 3.5),
				       new Vector(0.5, dungeon_height - 3.5),
				       "black.png")));


var dungeon_key_item = new Inventory_Item("dungeon key", "key from a skeleton");
// The skeleton that the player recieves the key from
function dungeon_key_interaction () {
    if(!Inventory.contains(dungeon_key_item)){
	Alert.set("Picked up a key!");
	Inventory.add_item(dungeon_key_item);
	dungeon_key.sprite.hide();
    }
}
var dungeon_key = new Actor(new Vector(0.5, 3.5), new Vector(0.5, 0.5),
			    new Sprite(new Vector(0.5, 3.5), new Vector(0.5, 0.5),
				       "key.png"),
			    false, false, dungeon_key_interaction);
dungeon.add_actor(dungeon_key);

// The dungeon exit
var dungeon_door = new Actor(new Vector(9.5, 2.5), new Vector(0.5, 1.0),
			     new Sprite(new Vector(9.5, 2.5), new Vector(0.5, 1.0),
					"red.png"));
dungeon.add_actor(dungeon_door);

// The interaction box for the dungeon exit
var dungeon_door_unlock_hitbox = new Actor(new Vector(9.0, 2.25), new Vector(0.5, 1.5),
					   new Sprite(new Vector(9.0, 2.25),
						      new Vector(0.5, 1.5),
						      "green.png"),
					   false, false);

function dungeon_door_unlock_collision () {
    return dungeon_door_unlock_hitbox.bounding_box.
	detect_intersection(slime.bounding_box) == block_relative_position.intersects;
}
var locked_alert = false;
function dungeon_door_attempt_unlock () {
    if(Inventory.contains(dungeon_key_item)){
	dungeon_door.blocking = false;
	dungeon_door.sprite.hide();
    } else if(!locked_alert){
	locked_alert = true;
	Alert.set("The exit is locked...");
    }
}
var dungeon_door_unlock_event =
    new Event(dungeon_door_unlock_collision, dungeon_door_attempt_unlock);
dungeon.add_event(dungeon_door_unlock_event);



function dungeon_exit_attempt () {
    return dungeon_door.bounding_box.detect_intersection(slime.bounding_box) ==
	block_relative_position.intersects;
}
var exit_message_displayed = false;
function dungeon_exit () {
    if(!exit_message_displayed){
	Alert.set("You escaped!");
	exit_message_displayed = true;
    }
}
var dungeon_exit = new Event(dungeon_exit_attempt, dungeon_exit);
dungeon.add_event(dungeon_exit);
