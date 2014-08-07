function MarkoViewModel() {
	this.base = ViewModel;
	this.base.apply(this);

	this.pixiStage_ = new PIXI.Stage(0x66FF99);
	this.pixiRenderer_ = PIXI.autoDetectRenderer(400, 300);
	document.body.appendChild(renderer.view);
}
MarkoViewModel.prototype = Object.create(ViewModel.prototype);


MarkoViewModel.prototype.render = function() {
	renderer.render(stage);
};


MarkoViewModel.prototype.update = function() {
	// Update the models every game loop here
};