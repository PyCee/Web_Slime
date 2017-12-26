class Battle {
    constructor (enemy_party, callback=function(){}) {
	this.enemy_party = enemy_party;
	this.callback = callback;
    }
    reset () {
	// Restore health to enemy party
	for(var i = 0; i < this.enemy_party.characters.length; ++i){
	    this.enemy_party.characters[i].heal_damage(999);
	}
    }
    fight () {
	this.reset();
	// Set enemy party
	combat.enemy_party = this.enemy_party;
	combat.battle = this;
	// Switch to combat scene
	combat.scene.show();
    }
}
