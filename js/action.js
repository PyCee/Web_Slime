var Action_Type = {
    Enemy_Single: 0,
    Enemy_All: 1,
    Ally_Single: 2,
    Ally_All: 3
};
class Action {
    constructor (name, type, fun) {
	this.name = name;
	this.type = type;
	this.fun = fun;
    }
    complete (target) {
	this.fun(target);
    }
}
