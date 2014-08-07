function View(model) {
	this.model_ = model;
	this.model_.subscribeView(this);
}

View.prototype.notify = window.ABSTRACT_METHOD;