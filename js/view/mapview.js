function MapView(mapModel, cameraModel, pixiStage) {
	this.base = PixiView;
	this.base.apply(this, [[mapModel, cameraModel], pixiStage]);
}
window.inherits(MapView, PixiView);

MapView.prototype.makePixiStageMember = function() {
	var graphics = new PIXI.Graphics();
	var map = this.getModels()[0];
	var camera = this.getModels()[1];
	var camX = camera.getX();
	var camY = camera.getY();
	var camW = camera.getWidth();
	var camH = camera.getHeight();

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