var dungeon_width = 5.0;
var dungeon_height = dungeon_width * canvas_dimensions.aspect_ratio.multiplier;

var dungeon = new Map(dungeon_width, function(){
    slime.position = new Vector(1.0, 1.5);
});
dungeon.add_actor(slime);
// Walls
// Top wall (with gap for gate)
// Top wall (left part)
dungeon.add_actor(new Actor(new Sprite(new Vector(0.0, 0.0),
				       new Vector(2, 1.0),
				       "black.png")));
// Top wall (right part)
dungeon.add_actor(new Actor(new Sprite(new Vector(2.75, 0.0),
				       new Vector(2.25, 1.0),
				       "black.png")));
// Bottom wall
dungeon.add_actor(new Actor(new Sprite(new Vector(0.0, dungeon_height - 0.3),
				       new Vector(dungeon_width, 0.3),
				       "black.png")));
// Left wall
dungeon.add_actor(new Actor(new Sprite(new Vector(0.0, 0.0),
				       new Vector(0.5, dungeon_height),
				       "black.png")));
// Right wall
dungeon.add_actor(new Actor(new Sprite(new Vector(dungeon_width - 0.5, 0.0),
				       new Vector(0.5, dungeon_height),
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
var dungeon_key = new Actor(new Sprite(new Vector(3.5, 1.5), new Vector(0.5, 0.5),
				       "key.png"),
			    false, false, function(){}, dungeon_key_interaction);
dungeon.add_actor(dungeon_key);

var dungeon_gate = new Actor(new Sprite(new Vector(2.0, 0.0), new Vector(0.75, 1.0),
				       "gate.png"));
dungeon.add_actor(dungeon_gate);

// The interaction box for the dungeon exit
var dungeon_gate_unlock_hitbox = new Actor(new Sprite(new Vector(2.0, 1.0),
						      new Vector(0.75, 0.05),
						      "red.png"),
					   false, false);

function dungeon_gate_unlock_test () {
    return dungeon_gate_unlock_hitbox.bounding_box.
	detect_intersection(slime.bounding_box) == block_relative_position.intersects;
}
var locked_alert = false;
var dungeon_gate_locked = true;
function dungeon_gate_unlock_callback () {
    if(dungeon_gate_locked && Inventory.contains(dungeon_key_item)){
	dungeon_gate_locked = false;
	locked_alert = true;
	dungeon_gate.blocking = false;
	dungeon_gate.sprite.hide();
	// play animation for gate opening
    } else if(!locked_alert){
	locked_alert = true;
	Alert.set("The exit is locked...");
    }
}
var dungeon_door_unlock_event =
    new Event(dungeon_gate_unlock_test, dungeon_gate_unlock_callback);
dungeon.add_event(dungeon_door_unlock_event);


var dungeon_exit_hitbox = new Actor(new Sprite(new Vector(2.0, 0.0),
					       new Vector(0.75, 0.5),
					       "green.png"), false, false);
dungeon_exit_hitbox.sprite.hide();
dungeon.add_actor(dungeon_exit_hitbox);

function dungeon_exit_test () {
    return dungeon_exit_hitbox.bounding_box.detect_intersection(slime.bounding_box) ==
	block_relative_position.intersects;
}
var exit_message_displayed = false;
function dungeon_exit_callback () {
    if(!exit_message_displayed){
	Alert.set("You escaped!");
	exit_message_displayed = true;
    }
}
var dungeon_exit_event = new Event(dungeon_exit_test, dungeon_exit_callback);
dungeon.add_event(dungeon_exit_event);
