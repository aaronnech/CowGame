function BuildingManager(mapModel) {
	this.map_ = mapModel;
	this.buildings_ = new SpacialHash(
		this.map_.getWidth(),
		this.map_.getHeight(),
		9);
	this.buildingsArray_ = [];
}
window.inherits(BuildingManager, Model);