function Model() {
	this.views_ = [];
}


Model.prototype.subscribeView = function(view) {
	this.views_.push(view);
};


Model.prototype.notifyChange = function() {
	for (var i = 0; i < this.views_.length; i++) {
		this.views_[i].notify();
	}
};