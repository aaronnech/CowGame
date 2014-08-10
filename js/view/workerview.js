function WorkerView(workerModel, cameraModel, pixiStage) {
	this.camera_ = cameraModel;
	this.camera_.subscribeView(this);

	this.base = PixiView;
	this.base.apply(this, [workerModel, pixiStage]);
}
window.inherits(WorkerView, PixiView);

WorkerView.prototype.makePixiStageMember = function() {
	var graphics = new PIXI.Graphics();
	var worker = this.getModel();
	var x = worker.getX() * MarkoViewModel.TILE_WIDTH;
	var y = worker.getY() * MarkoViewModel.TILE_HEIGHT;
	if (this.camera_.inView(x, y)) {
		graphics.beginFill(0xFFFFFF);
		graphics.drawRect(
			x,
			y,
			MarkoViewModel.TILE_WIDTH,
			MarkoViewModel.TILE_HEIGHT);
		graphics.endFill();
		return graphics;
	}
	return null;
};


WorkerView.prototype.notify = function() {
	this.redrawPixiStageMember();
};