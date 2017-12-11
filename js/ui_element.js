class UI_Element {
    constructor (position, size, sprite){
	this.position = position;
	this.size = size;
	this.sprite = sprite;
    }
    display () {
	this.sprite.draw(this.position, this.size);
    }
}
