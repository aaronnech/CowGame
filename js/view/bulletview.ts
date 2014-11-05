function BulletView(bulletModel, cameraModel, pixiStage) {
	this.base = PixiView;
	this.base.apply(this, [[bulletModel, cameraModel], pixiStage]);
}
window.inherits(BulletView, PixiView);

BulletView.prototype.makePixiStageMember = function() {
	var worker = this.getModels()[0];
	var camera = this.getModels()[1];
	var x = Math.floor(worker.getX() * MarkoViewModel.TILE_WIDTH);
	var y = Math.floor(worker.getY() * MarkoViewModel.TILE_HEIGHT);
	if (camera.inView(x, y)) {
		var graphics = new PIXI.Graphics();
		var color = 0x000000;
		graphics.beginFill(color);
		graphics.drawRect(
			x,
			y,
			MarkoViewModel.TILE_WIDTH / 4,
			MarkoViewModel.TILE_HEIGHT / 4);
		graphics.endFill();
		return graphics;
	}
	return null;
};


BulletView.prototype.notify = function() {
	this.redrawPixiStageMember();
};