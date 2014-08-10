function WorkerColony(mapModel) {
	this.map_ = mapModel;
	this.workers_ = new SpacialHash(
		this.map_.getWidth(),
		this.map_.getHeight(),
		9);
}
window.inherits(WorkerColony, Model);

WorkerColony.prototype.addWorker = function(workerModel) {
	var randomX = this.map_.randomTileX();
	var randomY = this.map_.randomTileY();
	workerModel.setX(randomX);
	workerModel.setY(randomY);
	this.workers_.add(randomX, randomY, workerModel);
};

WorkerColony.prototype.getWorkers = function() {
	return this.workers_;
};