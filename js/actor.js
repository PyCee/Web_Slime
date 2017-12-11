class Actor {
    constructor (position, size, sprite, blocking=true, movable=false,
		 update=function(){}, interaction=function(){}) {
	this.position = position;
	this.size = size;
	this.sprite = sprite;
	this.velocity = new Vector(0.0, 0.0);
	this.bounding_box = new Block(this.position, this.size);
	this.blocking = blocking;
	this.movable = movable;
	this.interaction = interaction;
    }
    update (delta_s) {}
    step_physics (actors, this_index) {
	if(!this.movable){
	    return;
	}
	this.position = this.position.add(this.velocity.scale(PHYSICS_UPDATE_DELTA_S));
	for(var i = 0; i < actors.length; ++i){

	    // Do not test for collision with self
	    if(i == this_index){
		continue;
	    }
	    // For each block in the list
	    if(!actors[i].blocking){
		continue;
	    }
	    var updated_bb = new Block(this.position, this.size);
	    var inter = actors[i].bounding_box.detect_intersection(updated_bb);
	    if(inter == block_relative_position.intersects){
		// If the actor's bounding box and the block intersect
		// Check the previous relative position and un-intersect the actor
		// Check where the actor was before the recent update
		// and press them against the wall

		var pre_inter =
		    actors[i].bounding_box.detect_intersection(this.bounding_box);
		
		switch(pre_inter){
		case block_relative_position.left:
		    this.position.x = actors[i].bounding_box.position.x - this.size.x;
		    break;
		case block_relative_position.right:
		    this.position.x = actors[i].bounding_box.position.x +
			actors[i].bounding_box.size.x;
		    break;
		case block_relative_position.above:
		    this.position.y = actors[i].bounding_box.position.y - this.size.y;
		    break;
		case block_relative_position.below:
		    this.position.y = actors[i].bounding_box.position.y +
			actors[i].bounding_box.size.y;
		    break;
		default:
		    break;
		}
		i = 0;
	    }
	}
	this.bounding_box = new Block(this.position, this.size);
	this.sprite.position = this.position;
    }
}
