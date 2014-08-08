function Camera() {
	this.base = Model;
	this.base.apply(this);

	this.x_ = 0;
	this.y_ = 0;
}
window.inherits(Camera, Model);


Camera.prototype.getX = function() {
	return this.x_;
};


Camera.prototype.getY = function() {
	return this.y_;
};


Camera.prototype.moveX = function(x) {
	this.x_ -= x;
	this.notifyChange();
};


Camera.prototype.moveY = function(y) {
	this.y_ -= y;
	this.notifyChange();
};