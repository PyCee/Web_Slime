
class Timeline {
    constructor (active=true) {
	this.elapsed_time = 0.0;
	this.active = active;
    }
    start () {this.active = true;}
    stop () {this.active = false;}
    update (delta_s) {
	if(this.active){
	    this.elapsed_time += delta_s;
	}
    }
}
