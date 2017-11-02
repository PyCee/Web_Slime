var player_party = new Party();
var enemy_party = new Party();

var slime_character = new Character("Slime", new Sprite(
    new Vector(0,0), 100, 100,"green.png"));
player_party.add_member(slime_character);

var combat = {
    scene: new Scene("Combat", 1.0)
    
};
