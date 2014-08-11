function PathGenerator(mapModel) {
	// TODO: if other objects go on the map
	// then also pass to constructor.
	if (PathGenerator.instance) {
		throw 'Singleton already construction'
	}

	this.map_ = mapModel;

	PathGenerator.instance = this;
};

PathGenerator.instance = null;


PathGenerator.prototype.makePath = function(x1, y1, x2, y2) {
	// Shortest path algorithm here..
	// return a path iterator.
};