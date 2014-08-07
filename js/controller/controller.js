function Controller(game) {
	this.setBindings();
}


Controller.prototype.bind = function(action, f) {
	action.addBinding(this, f);
};


Controller.prototype.clearBindings = function(action) {
	action.removeAllBindings(this);
};


Controller.prototype.setBindings = window.ABSTRACT_METHOD;