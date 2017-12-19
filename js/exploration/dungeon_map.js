var dungeon_width = 5.0;
var dungeon_height = dungeon_width * canvas_dimensions.aspect_ratio.multiplier;

var dungeon = new Map(dungeon_width);
dungeon.add_actor(slime);
// Walls
// Top wall (with gap for gate)
// Top wall (left part)
dungeon.add_actor(new Actor(new Vector(0.0, 0.0),
			    new Vector(2, 1.0),
			    new Animation("black", Sprite.black)));
// Top wall (right part)
dungeon.add_actor(new Actor(new Vector(2.75, 0.0),
			    new Vector(2.25, 1.0),
			    new Animation("black", Sprite.black)));
// Bottom wall
dungeon.add_actor(new Actor(new Vector(0.0, dungeon_height - 0.3),
			    new Vector(dungeon_width, 0.3),
			    new Animation("black", Sprite.black)));
// Left wall
dungeon.add_actor(new Actor(new Vector(0.0, 0.0),
			    new Vector(0.5, dungeon_height),
			    new Animation("black", Sprite.black)));
// Right wall
dungeon.add_actor(new Actor(new Vector(dungeon_width - 0.5, 0.0),
			    new Vector(0.5, dungeon_height),
			    new Animation("black", Sprite.black)));


var dungeon_key_item = new Inventory_Item("dungeon key", "key on the ground");
var dungeon_key = new Actor(new Vector(3.5, 1.5), new Vector(0.5, 0.5),
			    new Animation("key.png", Sprite.key),
			    false);
dungeon.add_actor(dungeon_key);
function dungeon_key_pickup_test () {
    return dungeon_key.bounding_box.detect_intersection(slime.bounding_box) ==
	block_relative_position.intersects && !Inventory.contains(dungeon_key_item);
}
function dungeon_key_pickup_callback () {
    Dialogue.set(["Picked up a key!"], 1.5);
    Inventory.add_item(dungeon_key_item);
    dungeon_key.hide();
}
var dungeon_key_pickup_event = new Event(dungeon_key_pickup_test,
					 dungeon_key_pickup_callback);
dungeon.add_event(dungeon_key_pickup_event);

var dungeon_gate = new Actor(new Vector(2.0, 0.0), new Vector(0.75, 1.0),
			     new Animation("gate.png", Sprite.gate));
dungeon.add_actor(dungeon_gate);
// The interaction box for the dungeon exit
var dungeon_gate_unlock_hitbox = new Block(new Vector(2.0, 1.0),
					   new Vector(0.75, 0.05));

function dungeon_gate_unlock_test () {
    return dungeon_gate_unlock_hitbox.detect_intersection(slime.bounding_box) ==
	block_relative_position.intersects;
}
var locked_alert = false;
var dungeon_gate_locked = true;
function dungeon_gate_unlock_callback () {
    if(dungeon_gate_locked && Inventory.contains(dungeon_key_item)){
	dungeon_gate_locked = false;
	locked_alert = true;
	dungeon_gate.blocking = false;
	dungeon_gate.hide();
	Dialogue.set(["You unlocked the gate"], 2);
	// play animation for gate opening
    } else if(!locked_alert){
	locked_alert = true;
	Dialogue.set(["The exit is locked..."], 2);
    }
}
var dungeon_door_unlock_event =
    new Event(dungeon_gate_unlock_test, dungeon_gate_unlock_callback);
dungeon.add_event(dungeon_door_unlock_event);

var dungeon_exit_hitbox = new Block(new Vector(2.0, 0.0),
				    new Vector(0.75, 0.01));
function dungeon_exit_test () {
    return dungeon_exit_hitbox.detect_intersection(slime.bounding_box) ==
	block_relative_position.intersects;
}
function dungeon_exit_callback () {
    corridor.set(new Vector(5.75, 6.25));
}
var dungeon_exit_event = new Event(dungeon_exit_test, dungeon_exit_callback);
dungeon.add_event(dungeon_exit_event);

