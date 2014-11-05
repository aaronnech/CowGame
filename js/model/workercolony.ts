function WorkerColony(mapModel) {
	this.map_ = mapModel;
	this.workers_ = new SpacialHash(
		this.map_.getWidth(),
		this.map_.getHeight(),
		9);
	this.workersArray_ = [];
}
window.inherits(WorkerColony, Model);


WorkerColony.prototype.hitWorker = function(hit) {
	var index = this.workersArray_.indexOf(hit);
	this.workersArray_.splice(index, 1);
	this.workers_.remove(hit.getX(), hit.getY(), hit);
	hit.dispose();
};

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
		var worker = this.workersArray_[i];
		var beforeX = worker.getX();
		var beforeY = worker.getY();

		this.workersArray_[i].update(this.workers_);

		var afterX = worker.getX();
		var afterY = worker.getY();
		if (beforeX != afterX || beforeY != afterY) {
			this.workers_.remove(beforeX, beforeY, worker);
			this.workers_.add(afterX, afterY, worker);
		}
	}
};