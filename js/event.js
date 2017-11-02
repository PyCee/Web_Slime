class Event {
    constructor (trigger=function(){return 0;}, trigger_callback=function(){}) {
	this.trigger = trigger;
	this.trigger_callback = trigger_callback;
    }
    test () {
	if(this.trigger()){
	    this.trigger_callback();
	}
    }
}
