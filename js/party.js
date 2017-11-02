class Party {
    constructor () {
	this.characters = [];
    }
    add_member (character, display_message=false) {
	this.characters.push(character);
	if(display_message){
	    // Display the message 'character.name has joined the party!'
	}
    }
    remove_member (character, display_message=false) {
	var index = this.characters.indexOf(character);
	this.characters.splice(index, 1);
	if(display_message){
	    // Display the message 'character.name has left the party...'
	}
    }
}
