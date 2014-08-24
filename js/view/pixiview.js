function PixiView(models, pixiStage) {
	this.models_ = models;
	for (var i = 0; i < models.length; i++) {
		this.models_[i].subscribeView(this);
	}

	this.pixiStage_ = pixiStage;

	this.pixiChild_ = this.makePixiStageMember();
	if (this.pixiChild_) {
		this.pixiStage_.addChild(this.pixiChild_);
	}
}


PixiView.prototype.getModels = function() {
	return this.models_;
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


PixiView.prototype.dispose = function() {
	if (this.pixiChild_) {
		this.pixiStage_.removeChild(this.pixiChild_);
	}
	for (var i = 0; i < this.models_.length; i++) {
		this.models_[i].removeView(this);
	}
};


PixiView.prototype.makePixiStageMember = window.ABSTRACT_METHOD;


PixiView.prototype.notify = window.ABSTRACT_METHOD;