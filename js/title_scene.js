
// A selection that manages selecting options on the home screen
var title_selection = new Selection(["Start", "Credits"]);

var title_scene = new Scene("Title", 1.0, function(){
    title_selection.reset();
    arrow.position = new Vector(arrow.position.x, 0.2);
});
var title_scene_start_sel = new UI_Element(new Vector(0.3, 0.2), new Vector(0.4, 0.075),
					   new Sprite("black.png"));
var title_scene_test_sel = new UI_Element(new Vector(0.3, 0.3), new Vector(0.4, 0.075),
					  new Sprite("black.png"));
var arrow = new UI_Element(new Vector(0.15, 0.2), new Vector(0.1, 0.075),
			   new Sprite("black.png"));

title_scene.set_ui_elements([arrow, title_scene_start_sel, title_scene_test_sel]);

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
	dungeon.set();
	break;
    case title_selection.options[1]:
	//credits_scene.show();
	combat.scene.show();
	break;
    default:
	break;
    }
});
