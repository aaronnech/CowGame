function Camera(worldWidth, worldHeight, width, height) {
	this.base = Model;
	this.base.apply(this);

	this.x_ = 0;
	this.y_ = 0;
	this.width_ = width;
	this.height_ = height;
	this.worldWidth_ = worldWidth;
	this.worldHeight_ = worldHeight;
}
window.inherits(Camera, Model);


// In pixels per frame
Camera.PAN_SPEED = 10;


Camera.prototype.inView = function(x, y) {
	return x >= this.x_ &&
		y >= this.y_ &&
		x <= this.x_ + this.width_ &&
		y <= this.y_ + this.height_;
};


Camera.prototype.panUp = function() {
	this.moveY(-Camera.PAN_SPEED);
};


Camera.prototype.panDown = function() {
	this.moveY(Camera.PAN_SPEED);
};


Camera.prototype.panLeft = function() {
	this.moveX(-Camera.PAN_SPEED);
};


Camera.prototype.panRight = function() {
	this.moveX(Camera.PAN_SPEED);
};

Camera.prototype.getX = function() {
	return this.x_;
};


Camera.prototype.getY = function() {
	return this.y_;
};


Camera.prototype.getWidth = function() {
	return this.width_;
};


Camera.prototype.getHeight = function() {
	return this.height_;
};


Camera.prototype.moveX = function(x) {
	var newX = this.x_ + x;
	if (newX < 0) {
		this.x_ = 0;
	} else if (newX > this.worldWidth_ - this.width_) {
		this.x_ = this.worldWidth_ - this.width_;
	} else {
		this.x_ = newX;
	}
	this.notifyChange();
};


Camera.prototype.moveY = function(y) {
	var newY = this.y_ + y;
	if (newY < 0) {
		this.y_ = 0;
	} else if (newY > this.worldHeight_ - this.height_) {
		this.y_ = this.worldHeight_ - this.height_;
	} else {
		this.y_ = newY;
	}
	this.notifyChange();
};