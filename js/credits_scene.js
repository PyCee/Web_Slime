var credits_scene = new Scene("Credits", 1.0);
credits_scene.add_keyboard_event(" ", "press", function(){
    //title_scene.show();
    combat.scene.show();
});
