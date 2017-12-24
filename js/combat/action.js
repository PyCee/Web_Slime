var Action_Type = {
    Enemy_Single: 0,
    Enemy_All: 1,
    Ally_Single: 2,
    Ally_All: 3
};
class Action {
    constructor (name, type, fun, character_animation, display_animation=null) {
	this.name = name;
	this.type = type;
	this.fun = fun;
	this.character_animation = character_animation;
	this.display_animation = display_animation;
    }
    complete (target) {
	this.fun(target);
    }
    complete_all (target_array) {
	for(var i = 0; i < target_array.length; ++i){
	    // For each target in target_array
	    // Complete action on target
	    this.complete(target_array[i]);
	}
    }
}
