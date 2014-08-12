function PixiView(model, pixiStage) {
	this.model_ = model;
	this.model_.subscribeView(this);

	this.pixiStage_ = pixiStage;

	this.pixiChild_ = this.makePixiStageMember();
	if (this.pixiChild_) {
		this.pixiStage_.addChild(this.pixiChild_);
	}
}


PixiView.prototype.getModel = function() {
	return this.model_;
};


PixiView.prototype.getPixiStageMember = function() {
	return this.pixiChild_;
};


PixiView.prototype.redrawPixiStageMember = function() {
	if (this.pixiChild_) {
		this.pixiStage_.removeChild(this.pixiChild_);
	}
	this.pixiChild_ = this.makePixiStageMember();
	if (this.pixiChild_) {
		this.pixiStage_.addChild(this.pixiChild_);
	}
};


PixiView.prototype.makePixiStageMember = window.ABSTRACT_METHOD;


PixiView.prototype.notify = window.ABSTRACT_METHOD;