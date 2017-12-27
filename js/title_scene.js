var title = {
    // A selection that manages selecting options on the home screen
    scene: new Scene("Title", 1.0, function(){
	title.selection = new Selection([title.start, title.test]);
	title.selection.reset();
	title.reset_sel_indicator_position();
    }),
    start: new Renderable(new Vector(0.15, 0.4), new Vector(0.3, 0.075),
				    new Animation(Sprite.title_start)),
    test: new Renderable(new Vector(0.6, 0.4), new Vector(0.3, 0.075),
				   new Animation(Sprite.title_test)),
    selection: null,
    sel_indicator: new Renderable(new Vector(0.0, 0.4), new Vector(0.05, 0.075),
			  new Animation(Sprite.black)),
    reset_sel_indicator_position: function () {
	title.sel_indicator.position =
	    new Vector(title.selection.get().position.x - 0.055,
		       title.sel_indicator.position.y);
    },
};

title.scene.set_renderables([title.sel_indicator, title.start, title.test]);
title.scene.user_input.add_keyboard_event("a", "press", function(){
    title.selection.previous();
    title.reset_sel_indicator_position();
});
title.scene.user_input.add_keyboard_event("d", "press", function(){
    title.selection.next();
    title.reset_sel_indicator_position();
});
title.scene.user_input.add_keyboard_event(" ", "press", function(){
    // Complete an action depending on the selection
    switch(title.selection.get()){
    case title.start:
	console.log("Starting game");
	Dungeon.map.set(new Vector(1.0, 1.5));
	exploration.scene.show();
	break;
    case title.test:
	console.log("Testing features");
	Corridor.arena_exit_callback();
	exploration.scene.show();
	break;
    default:
	break;
    }
});
