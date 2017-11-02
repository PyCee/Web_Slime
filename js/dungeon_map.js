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
	Text.add_line("Picked up key");
	Inventory.add_item(dungeon_key_item);
	dungeon_key.draw = false;
    }
}
var dungeon_key = new Actor(new Vector(0.5, 3.5), 0.5, 0.5, "key.png", false,
				 false, dungeon_key_interaction);
dungeon.add_actor(dungeon_key);

// The alchemist
function dungeon_alchemist_interaction () {
    console.log("dungeon alchemist interaction");
}
var dungeon_skeleton = new Actor(new Vector(4.5, 0.5), 0.5, 1.0, "red.png", false,
				 false, dungeon_alchemist_interaction);
dungeon.add_actor(dungeon_skeleton);

// The dungeon exit
var dungeon_door = new Actor(new Vector(9.5, 2.5), 0.5, 1.0, "red.png");
dungeon.add_actor(dungeon_door);

// The interaction box for the dungeon exit
function dungeon_door_attempt_unlock(){
    if(Inventory.contains(dungeon_key_item)){
	console.log("Used the key to unlock the door");
	dungeon_door.blocking = false;
	dungeon_door.draw = false;
    } else {
	console.log("The door is locked");
    }
}
var dungeon_door_hitbox = new Actor(new Vector(9.0, 2.25), 0.5, 1.5, "green.png",
				    false, false, dungeon_door_attempt_unlock);
dungeon.add_actor(dungeon_door_hitbox);
