class Renderable {
    constructor (position, size, render_element){
	this.position = position;
	this.size = size;
	this.render_element = render_element;
    }
    hide () {this.render_element.hide();}
    show () {this.render_element.show();}
    update_render_element (delta_s) {
	this.render_element.update(delta_s);
    }
    display () {
	this.render_element.draw(this.position, this.size);
    }
}
