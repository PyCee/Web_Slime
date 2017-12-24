// Keeps track of our game time
var global_timeline = new Timeline();
var last_frame_time = window.performance.now();
var current_frame_time = 0;

// Show the title scene on start
tutorial.scene.show();

// Tell Update to update our scenes on start
Update.set(Update.type.scene);

function loop () {
    // Main game loop

    // Calculate duration of the last frame
    current_frame_time = window.performance.now();
    var delta_s = (current_frame_time - last_frame_time)/1000;
    last_frame_time = current_frame_time;
    global_timeline.update(delta_s);

    // Updates whatever is to be updated
    Update.fun(delta_s);
    
    // Write any dialogue
    Dialogue.write(delta_s);
}
