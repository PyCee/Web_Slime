
function jump () {
    if(actors[controlled_actor_index].falling == false){
	actors[controlled_actor_index].velocity.y -=
	    actors[controlled_actor_index].jump_power;
    }
}
function move_left () {
    actors[controlled_actor_index].velocity.x -=
	actors[controlled_actor_index].move_speed;
}
function move_right () {
    actors[controlled_actor_index].velocity.x +=
	actors[controlled_actor_index].move_speed;
}
