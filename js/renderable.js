class Renderable {
    constructor (position, size, idle_animation){
	this.position = position;
	this.size = size;
	this.idle_animation = idle_animation;
	this.animation = this.idle_animation;
    }
    hide () {this.animation.hide();}
    show () {this.animation.show();}
    set_animation (animation) {
	this.animation = animation;
	this.animation.reset();
    }
    set_idle () {
	this.set_animation(this.idle_animation);
    }
    update_animation (delta_s) {
	this.animation.update(delta_s);
    }
    display () {
	this.animation.draw(this.position, this.size);
    }
}
