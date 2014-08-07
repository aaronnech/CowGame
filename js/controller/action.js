function Action() {
	this.bindings_ = [];
}


Action.NO_SOURCE = null;


Action.prototype.fire = function(source, data) {
	for (var i = 0; i < this.bindings_.length; i++) {
		this.bindings_[i].callback(source, data);
	}
};


Action.prototype.addBinding = function(binder, callback) {
	this.bindings_.push({
		'binder' : binder,
		'callback' : callback
	});
};


Action.prototype.removeAllBindings = function(binder) {
	this.bindings_ = this.bindings_.filter(function(binding) {
		return binding.binder != binder;
	});
};

Action.GameActions = {
	RENDER : new Action(),
	UPDATE : new Action(),
	STOP : new Action(),
	START : new Action()
}

Action.ViewActions = {
	START_DRAG_SELECT : new Action()
};