var Cutscene = {
    sequences: [],
    start: function (sequence) {
	Cutscene.sequences.push(sequence);
    },
    update: function (delta_s) {
	for(var i = 0; i < Cutscene.sequences.length; ++i){
	    Cutscene.sequences[i].update(delta_s);
	}
    }
};
class Sequence {
    constructor () {
	this.timeline = new Timeline();
	this.lerps = [];
    }
    update (delta_s) {
	var pre_update_time = this.timeline.get_elapsed_time();
	this.timeline.update(delta_s);
	var post_update_time = this.timeline.get_elapsed_time();
	
	for(var i = 0; i < this.lerps.length; ++i){
	    var pre_et = pre_update_time;
	    var post_et = post_update_time;
	    if(post_et > this.lerps[i].t1 && pre_et < this.lerps[i].t2){
		// If something is to be done
		if(pre_et < this.lerps[i].t1){pre_et = this.lerps[i].t1;}
		if(post_et > this.lerps[i].t2){post_et = this.lerps[i].t2;}
		this.lerps[i].update(pre_et - post_et);
	    }
	}
    }
    add_lerp (lerp) {
	this.lerps.push(lerp);
    }
}
class Lerp {
    constructor (t1, t2, delta_v, renderables) {
	this.t1 = t1;
	this.t2 = t2;
	this.delta_v = delta_v;
	this.renderables = renderables;
    }
    update (change) {
	var scale = change / (this.t2 - this.t1);
	var delta_v = this.delta_v.scale(scale);
	for(var j = 0; j < this.renderables.length; ++j){
	    this.renderables[j].set_position(this.renderables[j].position.add(delta_v));
	}
    }
}
