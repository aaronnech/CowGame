function WorkerView(workerModel, cameraModel, pixiStage) {
	this.base = PixiView;
	this.base.apply(this, [[workerModel, cameraModel], pixiStage]);
}
window.inherits(WorkerView, PixiView);

WorkerView.prototype.makePixiStageMember = function() {
	var worker = this.getModels()[0];
	var camera = this.getModels()[1];
	var x = worker.getX() * MarkoViewModel.TILE_WIDTH;
	var y = worker.getY() * MarkoViewModel.TILE_HEIGHT;
	if (camera.inView(x, y)) {
		// Calculate move deltas
		// for linear interopolation
		var moveDeltaX = 0;
		var moveDeltaY = 0;
		var moveProgress = worker.getMoveProgress();
		if (moveProgress != 0) {
			var direction = worker.getDirection();
			var moveMultiplierX = 0;
			var moveMultiplierY = 0;
			switch (direction) {
				case PathGenerator.ManhattanDirection.MOVE_EAST:
					moveMultiplierX = 1;
					break;
				case PathGenerator.ManhattanDirection.MOVE_WEST:
					moveMultiplierX = -1;
					break;
				case PathGenerator.ManhattanDirection.MOVE_SOUTH:
					moveMultiplierY = 1;
					break;
				case PathGenerator.ManhattanDirection.MOVE_NORTH:
					moveMultiplierY = -1;
					break;				
			}
			moveDeltaX =
				moveMultiplierX * moveProgress * MarkoViewModel.TILE_WIDTH;
			moveDeltaY =
				moveMultiplierY * moveProgress * MarkoViewModel.TILE_HEIGHT;
		}

		var graphics = new PIXI.Graphics();
		var color = worker.isSelected() ? 0xFF0000 : 0xFFFFFF;
		graphics.beginFill(color);
		graphics.drawRect(
			x + MarkoViewModel.TILE_WIDTH / 4 + moveDeltaX,
			y + MarkoViewModel.TILE_WIDTH / 4 + moveDeltaY,
			MarkoViewModel.TILE_WIDTH / 2,
			MarkoViewModel.TILE_HEIGHT / 2);
		graphics.endFill();
		return graphics;
	}
	return null;
};


WorkerView.prototype.notify = function() {
	this.redrawPixiStageMember();
};