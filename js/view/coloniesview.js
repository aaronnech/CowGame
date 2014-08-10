function ColoniesView(mapModel, cameraModel, pixiStage) {
	this.map_ = mapModel;
	this.workerViews_ = [];
	for (var i = 0; i < 200; i++) {
		this.addWorker(cameraModel, pixiStage);
	}
}

ColoniesView.prototype.addWorker = function(cameraModel, pixiStage) {
	var randomX = this.map_.randomTileX();
	var randomY = this.map_.randomTileY();
	var model = new Worker(
		randomX,
		randomY);
	this.workerViews_.push(new WorkerView(model, cameraModel, pixiStage));
};