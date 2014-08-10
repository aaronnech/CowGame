function WorkerColony(mapModel) {
	this.map_ = mapModel;
	this.workers_ = new SpacialHash(
		this.map_.getWidth(),
		this.map_.getHeight(),
		9);
	this.workersArray_ = [];
}
window.inherits(WorkerColony, Model);

WorkerColony.prototype.addWorker = function(workerModel) {
	var randomX = this.map_.randomTileX();
	var randomY = this.map_.randomTileY();
	workerModel.setX(randomX);
	workerModel.setY(randomY);
	this.workers_.add(randomX, randomY, workerModel);
	this.workersArray_.push(workerModel);
};

WorkerColony.prototype.getWorkers = function() {
	return this.workers_;
};

WorkerColony.prototype.update = function() {
	for (var i = 0; i < this.workersArray_.length; i++) {
		this.workersArray_[i].update(this.workers_);
	}
}