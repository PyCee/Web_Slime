class Event {
    constructor (trigger=function(){return 0;}, trigger_callback=function(){},
		 repeat=false) {
	this.trigger = trigger;
	this.trigger_callback = trigger_callback;
	this.repeat = repeat;
	this.triggered_count = 0;
    }
    test () {
	if(this.repeat || !this.triggered_count){
	    if(this.trigger()){
		++this.triggered_count;
		this.trigger_callback();
	    }
	}
    }
}
