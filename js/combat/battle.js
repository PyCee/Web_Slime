class Battle {
    constructor (enemy_party) {
	this.enemy_party = enemy_party;
    }
    reset () {
	// Restore health to enemy party
    }
    fight () {
	// Set enemy party
	combat.enemy_party = this.enemy_party;
	// Switch to combat scene
	combat.scene.show();
    }
}
