
// TODO: erase these scenes. Make it so, on the first scene of each type of scene,
//   the dialogue will show the instructions (rather than having special inst. scenes)
var tutorial = {
    exp_scene: new Scene("Exploration Tutorial", 1.0, function(){
	var exp_text = [
	    "wasd will move the player character",
	    "space will interact with the world (and exit this screen)"
	];
	Dialogue.set(exp_text);
    }, function(delta_s){}),
    com_scene: new Scene("Exploration Tutorial", 1.0, function(){
	var com_text = [
	    "a and d will change selection",
	    "spacebar will make the selection (and exit this screen)"
	];
	Dialogue.set(com_text);
    }, function(delta_s){})
};
tutorial.exp_scene.add_keyboard_event(" ", "press", function(){
    Dialogue.reset();
    dungeon.set(new Vector(1.0, 1.5));
});
tutorial.com_scene.add_keyboard_event(" ", "press", function(){
    Dialogue.reset();
    test_b.fight();
    //combat.scene.show();
});
