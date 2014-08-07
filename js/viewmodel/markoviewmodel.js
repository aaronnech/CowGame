function MarkoViewModel() {
	this.base = ViewModel;
	this.base.apply(this);

	this.pixiStage_ = new PIXI.Stage(0x66FF99);
	this.pixiRenderer_ = PIXI.autoDetectRenderer(400, 300);
	document.body.appendChild(this.pixiRenderer_.view);
}
MarkoViewModel.prototype = Object.create(ViewModel.prototype);


MarkoViewModel.prototype.render = function() {
	this.pixiRenderer_.render(this.pixiStage_);
};


MarkoViewModel.prototype.update = function() {
	// Update the models every game loop here
};