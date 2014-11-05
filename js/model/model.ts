function Model() {
	this.views_ = [];
}


Model.prototype.subscribeView = function(view) {
	this.views_.push(view);
};

Model.prototype.removeView = function(view) {
	var index = this.views_.indexOf(view);
	if (index != -1) {
		this.views_.splice(index, 1);
	}
};

Model.prototype.notifyChange = function() {
	for (var i = 0; i < this.views_.length; i++) {
		this.views_[i].notify();
	}
};

Model.prototype.dispose = function() {
	for (var i = 0; i < this.views_.length; i++) {
		this.views_[i].dispose();
	}
	this.views_ = [];
};