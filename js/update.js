var Update = {
    type: {
	none: 0,
	scene: 1,
	alert: 2
    },
    curr_type: 0,
    
    get: function () {
	return Update.callback;
    },
    set: function (type) {
	Update.curr_type = type;
    },
    fun: function (delta_s) {
	switch(Update.curr_type){
	case Update.type.none:
	    break;
	case Update.type.scene:
	    curr_scene.update(delta_s);
	    break;
	case Update.type.alert:
	    Alert.draw();
	    break;
	default:
	    break;
	}
    }
};
