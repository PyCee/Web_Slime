var resources = [];
var res_loaded = [];
var resource_path = "res/"

function load_resource (type, resource) {
    if(!resources[resource]){
	switch(type){
	case "img":
	    resources[resource] = new Image();
	    resources[resource].src = resource_path + resource;
	    break;
	default:
	    console.log("error::Attempted to load resource of unknown type: " + type);
	    break;
	}
    }
    return resources[resource];
}
function get_resource (resource) {
    if(!resources[resource]){
	console.log("error::Attempted to get unloaded resource: " + resource);
    }
    return resources[resource];
}
