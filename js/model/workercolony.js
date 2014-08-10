function WorkerColony(mapModel) {
	this.map_ = mapModel;
	this.workers_ = [];
}
window.inherits(WorkerColony, Model);

WorkerColony.prototype.addWorker = function(workerModel) {
	var randomX = this.map_.randomTileX();
	var randomY = this.map_.randomTileY();
	workerModel.setX(randomX);
	workerModel.setY(randomY);
	this.workers_.push(workerModel);
};