function ResourceManager(mapModel) {
	this.map_ = mapModel;
	this.resources_ = new SpacialHash(
		this.map_.getWidth(),
		this.map_.getHeight(),
		9);
	this.resourcesArray_ = [];
}
window.inherits(ResourceManager, Model);

ResourceManager.prototype.spawnInitial = function() {
	// TODO: construct random Resources
};