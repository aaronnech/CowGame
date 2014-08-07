function PixiView(model, pixiStage) {
	this.base = View;
	this.base.apply(this, model);

	this.pixiStage_ = pixiStage;

	this.pixiChild_ = this.makePixiStageMember();

	this.pixiStage_.addChild(this.pixiChild_);
}
PixiView.prototype = Object.create(View.prototype);


PixiView.prototype.getPixiStageMember = function() {
	return this.pixiChild_;
};


PixiView.prototype.redrawPixiStageMember = function() {
	this.pixiStage_.removeChild(this.pixiChild_);
	this.pixiChild_ = this.makePixiStageMember();
	this.pixiStage_.addChild(this.pixiChild_);
};


PixiView.prototype.makePixiStageMember = window.ABSTRACT_METHOD;


PixiView.prototype.notify = window.ABSTRACT_METHOD;