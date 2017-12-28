class Text extends Renderable {
    constructor (position, size, text, color="#002211") {
	super(position, size, null);
	this.text = text;
	this.color = color;
    }
    hide(){}
    show(){}
    set_animation(){}
    update_animation(){}
    display () {
	ctx.textBaseline = "top";
	var pos = this.position.scale(scene_scale);
	ctx.fillStyle = this.color;
	ctx.font = (scene_scale * this.size.y) + "px Arial";
	ctx.fillText(this.text, pos.x, pos.y);
    }
}
