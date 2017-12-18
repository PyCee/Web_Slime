
// A selection that manages selecting options on the home screen
var title_selection = new Selection(["Start", "Credits"]);

var title_scene = new Scene("Title", 1.0, function(){
    title_selection.reset();
    arrow.position = new Vector(arrow.position.x, 0.2);
});

var title_scene_start_sel = new Renderable(new Vector(0.3, 0.2), new Vector(0.4, 0.075),
					   new Animation("black", Sprite.black));

var title_scene_test_sel = new Renderable(new Vector(0.3, 0.3), new Vector(0.4, 0.075),
					  new Animation("black", Sprite.black));

var arrow = new Renderable(new Vector(0.15, 0.2), new Vector(0.1, 0.075),
			   new Animation("black", Sprite.black));

title_scene.set_renderables([arrow, title_scene_start_sel, title_scene_test_sel]);

title_scene.add_keyboard_event("w", "press", function(){
    // When 'w' is pressed
    // Select the above option
    //console.log("w press");
    switch(title_selection.previous()){
    case title_selection.options[0]:
	arrow.position = new Vector(arrow.position.x, 0.2);
	break;
    case title_selection.options[1]:
	arrow.position = new Vector(arrow.position.x, 0.3);
	break;
    default:
	break;
    }
});

title_scene.add_keyboard_event("s", "press", function(){
    // When 's' is pressed
    // Select the below option
    switch(title_selection.next()){
    case title_selection.options[0]:
	arrow.position = new Vector(arrow.position.x, 0.2);
	break;
    case title_selection.options[1]:
	arrow.position = new Vector(arrow.position.x, 0.3);
	break;
    default:
	break;
    }
});

title_scene.add_keyboard_event(" ", "press", function(){
    // When 'spacebar' is pressed
    // Complete an action depending on the selection
    switch(title_selection.get()){
    case title_selection.options[0]:
	console.log("Starting game");
	tutorial.exp_scene.show(new Vector(1.0, 1.5));
	break;
    case title_selection.options[1]:
	tutorial.com_scene.show();
	break;
    default:
	break;
    }
});
