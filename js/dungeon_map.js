var dungeon = new Map(10.0, function(){
    slime.position = new Vector(2.0, 1.5);
});
dungeon.add_actor(slime);
// Walls
dungeon.add_actor(new Actor(new Vector(0.0, 0.0), 10.0, 0.5, "black.png"));
dungeon.add_actor(new Actor(new Vector(0.0,0.0), 0.5,
			    10.0 * canvas_dimensions.aspect_ratio.multiplier,
			    "black.png"));
dungeon.add_actor(new Actor(new Vector(0.0, 10.0 *
				       canvas_dimensions.aspect_ratio.multiplier - 0.5),
			    10.0, 0.5, "black.png"));
// Right wall (with gap for door)
dungeon.add_actor(new Actor(new Vector(10.0 - 0.5, 0.0), 0.5, 2.5, "black.png"));
dungeon.add_actor(new Actor(new Vector(10.0 - 0.5, 3.5), 0.5,
			    10.0 * canvas_dimensions.aspect_ratio.multiplier - 3.5,
			    "black.png"));


var dungeon_key_item = new Inventory_Item("dungeon key", "key from a skeleton");
// The skeleton that the player recieves the key from
function dungeon_key_interaction () {
    if(!Inventory.contains(dungeon_key_item)){
	Alert.set("Picked up a key!");
	Inventory.add_item(dungeon_key_item);
	dungeon_key.draw = false;
    }
}
var dungeon_key = new Actor(new Vector(0.5, 3.5), 0.5, 0.5, "key.png", false,
				 false, dungeon_key_interaction);
dungeon.add_actor(dungeon_key);

// The dungeon exit
var dungeon_door = new Actor(new Vector(9.5, 2.5), 0.5, 1.0, "red.png");
dungeon.add_actor(dungeon_door);

// The interaction box for the dungeon exit
var dungeon_door_hitbox = new Actor(new Vector(9.0, 2.25), 0.5, 1.5, "green.png",
				    false, false);

function dungeon_door_attempt_unlock () {
    return dungeon_door_hitbox.bounding_box.detect_intersection(slime.bounding_box) ==
	block_relative_position.intersects && Inventory.contains(dungeon_key_item);
}
function dungeon_door_unlock () {
    console.log("Used the key to unlock the door");
    dungeon_door.blocking = false;
    dungeon_door.draw = false;
    Inventory.remove_item(dungeon_key_item);
}

var dungeon_door_attempt_unlock =
    new Event(dungeon_door_attempt_unlock, dungeon_door_unlock);
dungeon.add_event(dungeon_door_attempt_unlock);
