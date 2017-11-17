class Action {
    constructor (name, todo=function(target){}) {
	this.name = name;
	this.todo = todo;
    }
    act (target) {
	this.todo(target);
    }
}
