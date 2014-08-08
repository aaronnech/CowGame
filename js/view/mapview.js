function MapView(mapModel, pixiStage) {
	this.base = PixiView;
	this.base.apply(this, [mapModel, pixiStage]);
}
window.inherits(MapView, PixiView);

MapView.prototype.makePixiStageMember = function() {
	var graphics = new PIXI.Graphics();
	var map = this.getModel();
	map.forEachTile(function(tile, x, y) {
		var width = tile.getWidth();
		var height = tile.getHeight();
		graphics.beginFill(tile.getColor());
		graphics.drawRect(x * width, y * height, width - 1, height - 1);
	});

	return graphics;
};


MapView.prototype.notify = function() {

};