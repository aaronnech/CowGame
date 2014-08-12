function WorkerView(workerModel, cameraModel, pixiStage) {
	this.camera_ = cameraModel;
	this.camera_.subscribeView(this);

	this.lastInView_ = false;

	this.base = PixiView;
	this.base.apply(this, [workerModel, pixiStage]);
}
window.inherits(WorkerView, PixiView);

WorkerView.prototype.makePixiStageMember = function() {
	var worker = this.getModel();
	var x = worker.getX() * MarkoViewModel.TILE_WIDTH;
	var y = worker.getY() * MarkoViewModel.TILE_HEIGHT;
	if (this.camera_.inView(x, y)) {
		this.lastInView_ = true;
		var graphics = new PIXI.Graphics();
		graphics.beginFill(0xFFFFFF);
		graphics.drawRect(
			x + MarkoViewModel.TILE_WIDTH / 4,
			y + MarkoViewModel.TILE_WIDTH / 4,
			MarkoViewModel.TILE_WIDTH / 2,
			MarkoViewModel.TILE_HEIGHT / 2);
		graphics.endFill();
		return graphics;
	}
	if(this.lastInView_) {
		console.log('left view!');
		this.lastInView_ = false;
	}
	return null;
};


WorkerView.prototype.notify = function() {
	this.redrawPixiStageMember();
};