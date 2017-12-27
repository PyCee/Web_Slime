class Spritemap {
    constructor (resource_s, rows=1, cols=1) {
	this.resource = load_resource("img", resource_s);
	this.resource_s = resource_s;
	this.rows = rows;
	this.cols = cols;
    }
    get () {
	return get_resource[this.resource_s];
    }
    get_sprite_width() {
	return this.resource.width / this.cols;
    }
    get_sprite_height() {
	return this.resource.height / this.rows;
    }
}
var Sprite = {
    black: new Spritemap("black.png"),
    red: new Spritemap("red.png"),
    green: new Spritemap("green.png"),
    blue: new Spritemap("blue.png"),
    title_start: new Spritemap("title_start.png"),
    title_test: new Spritemap("title_test.png"),
    slime: new Spritemap("slime.png", 1, 2),
    fighter: new Spritemap("fighter.png", 2, 2),
    training_dummy: new Spritemap("training_dummy.png", 1, 4),
    key: new Spritemap("key.png"),
    gate: new Spritemap("gate.png"),
    action_tackle: new Spritemap("action_tackle.png"),
    action_heal: new Spritemap("action_heal.png"),
    action_punch: new Spritemap("action_punch.png"),
    action_super_punch: new Spritemap("action_super_punch.png"),
    action_sit: new Spritemap("action_sit.png"),
    action_stare: new Spritemap("action_stare.png")
    //: new Spritemap(".png")
};
