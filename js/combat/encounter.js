class Encounter {
    constructor (enemy_party, callback=function(){}) {
	this.enemy_party = enemy_party;
	this.callback = callback;
    }
    reset () {
	// Restore health to enemy party
	for(var i = 0; i < this.enemy_party.characters.length; ++i){
	    this.enemy_party.characters[i].reset();
	}
    }
    start () {
	this.reset();
	Combat.encounter = this;
	Combat.scene.show();
    }
}
