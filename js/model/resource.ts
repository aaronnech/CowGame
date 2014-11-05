function Resource(type) {
	this.type_ = type;
}
window.inherits(Resource, Model);

Resource.Type = {
	TREE : 0,
	ROCK : 1
};