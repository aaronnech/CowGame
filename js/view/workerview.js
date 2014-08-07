function WorkerView(workerModel, pixiStage) {
	this.base = PixiView;
	this.base.apply(this, workerModel, pixiStage);
}
WorkerView.prototype = Object.create(PixiView);

WorkerView.prototype.makePixiStageMember = function() {
	var graphics = new PIXI.Graphics();

	graphics.beginFill(0xFFFF00);
	graphics.lineStyle(5, 0xFF0000);
	graphics.drawRect(0, 0, 300, 200);

	return graphics;
};


WorkerView.prototype.notify = function() {
	this.redrawPixiStageMember();
};