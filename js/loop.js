var elapsed_time = 0;
var last_frame_time = window.performance.now();
var current_frame_time = 0;
var delta_s = 0;

var help_scene = new Scene(),
    help_scene_back = new Block(new Vector(0.3, 0.4),
					 0.40, 0.075);
var help_scene_renderables = [help_scene_back];
help_scene.set_renderables(help_scene_renderables);
help_scene.add_keyboard_event(" ", "press", function(){title_scene.show()});

// Show the title scene on start
title_scene.show();

function loop () {
    // Main game loop

    // Calculate duration of the last frame
    current_frame_time = window.performance.now();
    delta_s = (current_frame_time - last_frame_time)/1000;
    last_frame_time = current_frame_time;
    elapsed_time += delta_s;

    
    Update.callback();
    
    //TODO: look up canvas translate for camera movement

    // Write text
    //Text.draw();
}
