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
    slime: new Spritemap("slime.png", 1, 2),
    key: new Spritemap("key.png"),
    gate: new Spritemap("gate.png"),
    action_tackle: new Spritemap("action_tackle.png"),
    action_slime_them: new Spritemap("action_slime_them.png"),
    action_punch: new Spritemap("action_punch.png"),
    action_super_punch: new Spritemap("action_super_punch.png")
    //: new Spritemap(".png")
};
