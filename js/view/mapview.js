function MapView(mapModel, cameraModel, pixiStage) {
	this.camera_ = cameraModel;
	this.camera_.subscribeView(this);

	this.base = PixiView;
	this.base.apply(this, [mapModel, pixiStage]);
}
window.inherits(MapView, PixiView);

MapView.prototype.makePixiStageMember = function() {
	var graphics = new PIXI.Graphics();
	var map = this.getModel();
	var camX = this.camera_.getX();
	var camY = this.camera_.getY();
	var camW = this.camera_.getWidth();
	var camH = this.camera_.getHeight();

	map.forEachTileInRect(camX, camY, camW, camH, function(tile, x, y) {
		if (tile.getColor()) {
			var width = tile.getWidth();
			var height = tile.getHeight();
			graphics.beginFill(tile.getColor());
			graphics.drawRect(x * width, y * height, width, height);
			graphics.endFill();
		}
	});

	return graphics;
};


MapView.prototype.notify = function() {
	this.redrawPixiStageMember();
};