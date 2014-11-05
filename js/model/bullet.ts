function Bullet() {
	this.base = Model;
	this.base.apply(this);

	this.x_ = 0;
	this.y_ = 0;
	this.dx_ = 0;
	this.dy_ = 0;
}
window.inherits(Bullet, Model);

Bullet.SPEED = 0.5;


Bullet.prototype.update = function() {
	this.x_ += this.dx_ * Bullet.SPEED;
	this.y_ += this.dy_ * Bullet.SPEED;
	this.notifyChange();
};


Bullet.prototype.getX = function() {
	return this.x_;
};


Bullet.prototype.getY = function() {
	return this.y_;
};


Bullet.prototype.setX = function(x) {
	this.x_ = x;
};

Bullet.prototype.setY = function(y) {
	this.y_ = y;
};

Bullet.prototype.getDx = function() {
	return this.dx_;
};


Bullet.prototype.getDy = function() {
	return this.dy_;
};


Bullet.prototype.setDx = function(dx) {
	this.dx_ = dx;
};

Bullet.prototype.setDy = function(dy) {
	this.dy_ = dy;
};