class Timeline {
    constructor (active=true) {

	// Elapsed time in seconds
	this.elapsed_time = 0.0;
	this.active = active;
    }
    get_elapsed_time () {return this.elapsed_time;}
    start () {this.active = true;}
    stop () {this.active = false;}
    reset () {this.elapsed_time = 0.0;}
    update (delta_s) {
	if(this.active){
	    this.elapsed_time += delta_s;
	}
    }
}
