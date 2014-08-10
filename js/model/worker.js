function Worker(x, y) {
	this.base = Model;
	this.base.apply(this);

	this.x_ = x;
	this.y_ = y;
	this.stateManager_ = null;
}
window.inherits(Worker, Model);


Worker.prototype.getX = function() {
	return this.x_;
};


Worker.prototype.getY = function() {
	return this.y_;
};