function CameraView(cameraModel, pixiStage, world) {
	this.base = PixiView;
	this.base.apply(this, [[cameraModel], pixiStage]);

	this.world_ = world;
}
window.inherits(CameraView, PixiView);

CameraView.prototype.makePixiStageMember = function() {
	return new PIXI.DisplayObjectContainer();
};


CameraView.prototype.notify = function() {
	var camera = this.getModels()[0];
	this.world_.position.x = -camera.getX();
	this.world_.position.y = -camera.getY();
};