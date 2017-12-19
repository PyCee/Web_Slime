class Party {
    constructor (characters=[]) {
	this.characters = characters;
    }
    add_member (character, display_message=false) {
	this.characters.push(character);
    }
    remove_member (character, display_message=false) {
	var index = this.characters.indexOf(character);
	this.characters.splice(index, 1);
    }
}
