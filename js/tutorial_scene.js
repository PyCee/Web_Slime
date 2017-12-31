
// TODO: erase these scenes. Make it so, on the first scene of each type of scene,
//   the dialogue will show the instructions (rather than having special inst. scenes)
var tutorial = {
    scene: new Scene("Tutorial", 1.0, function(){
	var text = [
	    "a and d will change selection (left/right)",
	    "space will interact with the selection (and exit this screen)",
	    "while exploring, wasd will move the character"
	];
	Dialogue.set(text);
    }, function(delta_s){})
};

tutorial.scene.user_input.add_keyboard_event(" ", "press", function(){
    Dialogue.reset();
    title.scene.show();
});
