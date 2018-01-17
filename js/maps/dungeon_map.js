var Dungeon = {};
Dungeon.width = 5.0;
Dungeon.height = Dungeon.width * canvas_dimensions.aspect_ratio.multiplier;

Dungeon.key_item = new Inventory_Item("dungeon key", "key on the ground");
Dungeon.key = new Actor(new Vector(3.5, 1.5), new Vector(0.5, 0.5),
			new Animation(Sprite.key), 1, false);
Dungeon.gate = new Actor(new Vector(2.0, 0.0), new Vector(0.75, 1.0),
			 new Animation(Sprite.gate));

Dungeon.gate_unlock_hitbox = new Block(new Vector(2.0, 1.0),
				       new Vector(0.75, 0.05));
Dungeon.exit_hitbox = new Block(new Vector(2.0, 0.0),
				new Vector(0.75, 0.01));

Dungeon.top_left_wall = new Actor(new Vector(0.0, 0.0),
				  new Vector(2, 1.0),
				  new Animation(Sprite.black));
Dungeon.top_right_wall = new Actor(new Vector(2.75, 0.0),
				   new Vector(2.25, 1.0),
				   new Animation(Sprite.black));
Dungeon.bottom_wall = new Actor(new Vector(0.0, Dungeon.height - 0.3),
				new Vector(Dungeon.width, 0.3),
				new Animation(Sprite.black));
Dungeon.left_wall = new Actor(new Vector(0.0, 0.0),
			      new Vector(0.5, Dungeon.height),
			      new Animation(Sprite.black));
Dungeon.right_wall = new Actor(new Vector(Dungeon.width - 0.5, 0.0),
			       new Vector(0.5, Dungeon.height),
			       new Animation(Sprite.black));
// Key pickup event
Dungeon.key_pickup_test = function() {
    return Dungeon.key.bounding_box.intersects(slime.bounding_box);
};
Dungeon.key_pickup_callback = function () {
    Dialogue.set(["Picked up a key!"], 1.5);
    Inventory.add_item(Dungeon.key_item);
    Dungeon.key.hide();
};
Dungeon.key_pickup_event = new Event(Dungeon.key_pickup_test,
				     Dungeon.key_pickup_callback);
// Gate unlock event
Dungeon.gate_unlock_test = function () {
    return Dungeon.gate_unlock_hitbox.intersects(slime.bounding_box) &&
	Inventory.contains(Dungeon.key_item);
};
Dungeon.gate_unlock_callback = function () {
    Dungeon.gate.blocking = false;
    Dungeon.gate.hide();
    //TODO = play animation for gate opening
    Dialogue.set(["You unlocked the gate"], 2);
};
Dungeon.gate_unlock_event = new Event(Dungeon.gate_unlock_test,
				      Dungeon.gate_unlock_callback);
// Gate locked warning event
Dungeon.gate_warning_test = function () {
    return Dungeon.gate_unlock_hitbox.intersects(slime.bounding_box) &&
	!Inventory.contains(Dungeon.key_item);
};
Dungeon.gate_warning_callback = function () {
    Dialogue.set(["The exit is locked..."], 2);
};
Dungeon.door_warning_event = new Event(Dungeon.gate_warning_test,
				       Dungeon.gate_warning_callback);
// Map exit event to Corridor
Dungeon.exit_test = function () {
    return Dungeon.exit_hitbox.intersects(slime.bounding_box);
};
Dungeon.exit_callback = function () {
    Corridor.map.set(new Vector(5.75, 6.25));
};
Dungeon.exit_event = new Event(Dungeon.exit_test, Dungeon.exit_callback, true);

Dungeon.map = new Map(Dungeon.width);
Dungeon.map.set_actors([
    slime,
    Dungeon.top_right_wall,
    Dungeon.top_left_wall,
    Dungeon.bottom_wall,
    Dungeon.left_wall,
    Dungeon.right_wall,
    Dungeon.key,
    Dungeon.gate]);
Dungeon.map.set_events([
    Dungeon.key_pickup_event,
    Dungeon.gate_unlock_event,
    Dungeon.door_warning_event,
    Dungeon.exit_event]);

