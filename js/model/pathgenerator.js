function PathGenerator(mapModel) {
	// TODO: if other objects go on the map
	// then also pass to constructor, and use.
	// when calculating best paths.
	if (PathGenerator.instance) {
		throw 'Singleton already constructed';
	}

	this.map_ = mapModel;

	PathGenerator.instance = this;
};

PathGenerator.instance = null;


PathGenerator.prototype.makePath = function(x1, y1, x2, y2) {
	// Shortest path algorithm here..
	// return a path iterator.
	if (this.map_.isInMap(x1, y1) &&
		this.map_.isInMap(x2, y2)) {
		// TODO: For now, assume that
		// the shortest path is a d
	}
};


PathGenerator.prototype.movePhysicalModel = function(model, direction) {
	switch (direction) {
		case MOVE_NORTH:
			model.setY(model.getY() - 1);
			break;
		case MOVE_SOUTH:
			model.setY(model.getY() + 1);
			break;
		case MOVE_WEST:
			model.setX(model.getX() - 1);
			break;
		case MOVE_EAST:
			model.setX(model.getX() + 1);
			break;
	}
};


PathGenerator.ManhattanDirection = {
	MOVE_NORTH : 0,
	MOVE_WEST : 1,
	MOVE_SOUTH : 2,
	MOVE_EAST : 3
};