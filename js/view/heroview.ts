function HeroView(heroModel, cameraModel, pixiStage) {
	this.base = PixiView;
	this.base.apply(this, [[heroModel, cameraModel], pixiStage]);

	this.x_ = 0;
	this.y_ = 0;
}
window.inherits(HeroView, PixiView);

HeroView.prototype.makePixiStageMember = function() {
	var worker = this.getModels()[0];
	var camera = this.getModels()[1];
	this.x_ = worker.getX() * MarkoViewModel.TILE_WIDTH;
	this.y_ = worker.getY() * MarkoViewModel.TILE_HEIGHT;
	if (camera.inView(this.x_, this.y_)) {
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
		var color = 0x0000FF;
		graphics.beginFill(color);
		this.x_ += MarkoViewModel.TILE_WIDTH / 4 + moveDeltaX;
		this.y_ += MarkoViewModel.TILE_WIDTH / 4 + moveDeltaY;
		graphics.drawRect(
			this.x_,
			this.y_,
			MarkoViewModel.TILE_WIDTH / 2,
			MarkoViewModel.TILE_HEIGHT / 2);
		graphics.endFill();
		return graphics;
	}
	return null;
};


HeroView.prototype.getX = function() {
	return this.x_;
};


HeroView.prototype.getY = function() {
	return this.y_;
};


HeroView.prototype.notify = function() {
	this.redrawPixiStageMember();
};