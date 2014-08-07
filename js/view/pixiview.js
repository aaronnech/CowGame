function PixiView(model, pixiStage) {
	this.base = View;
	this.base.apply(this, model);

	this.pixiStage_ = pixiStage;
}
PixiView.prototype = Object.create(View.prototype);


PixiView.prototype.notify = window.ABSTRACT_METHOD;