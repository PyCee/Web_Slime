class Inventory_Item {
    constructor (name="INVENTORY_ITEM", description="DESC") {
	this.name = name;
	this.description = description;
    }
}

var Inventory = {
    items: [],
    contains: function(item) {
	return Inventory.items.indexOf(item) != -1;
    },
    add_item: function (item) {
	Inventory.items.push(item);
    },
    remove_item: function (item) {
	var index = Inventory.items.indexOf(item);
	Inventory.items.splice(index, 1);
    }
};
