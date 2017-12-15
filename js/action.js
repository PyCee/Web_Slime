var Action_Type = {
    Enemy_Single: 0,
    Enemy_All: 1,
    Ally_Single: 2,
    Ally_All: 3
};
class Action {
    constructor (name, type, fun, resource_s="black.png") {
	this.name = name;
	this.type = type;
	this.fun = fun;
	this.resource_s = resource_s;
	load_resource("img", resource_s);
    }
    complete (target) {
	this.fun(target);
    }
}
