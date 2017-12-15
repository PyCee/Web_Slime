class Selection {
    constructor (selections, loop = false) {
	if(selections.length < 1){
	    console.log("Attempting to make selection of length < 1");
	}
	this.loop = loop;
	this.options = selections;
	this.selected_i = 0;
    }
    reset () {
	this.selected_i = 0;
    }
    next () {
	++this.selected_i;
	if(this.selected_i > this.options.length-1){
	    if(this.loop){
		this.selected_i -= this.options.length;
		console.log
	    } else{
		this.selected_i = this.options.length-1;
	    }
	}
	return this.get();
    }
    previous () {
	--this.selected_i;
	if(this.selected_i < 0){
	    if(this.loop){
		this.selected_i += this.options.length;
	    } else{
		this.selected_i = 0;
	    }
	}
	return this.get();
    }
    get () {
	return this.options[this.selected_i];
    }
    get_index () {
	return this.selected_i;
    }
}
