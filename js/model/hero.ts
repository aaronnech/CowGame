function Hero(bulletManager, x, y) {
	this.base = Model;
	this.base.apply(this);

	this.bulletManager_ = bulletManager;

	this.x_ = x;
	this.y_ = y;

	this.walkTimer_ = 0;
	this.currentWalkingDirection_ = null;
}
window.inherits(Hero, Model);


Hero.prototype.update = function() {
	if (this.currentWalkingDirection_ != null) {
		this.moveTowards(this.currentWalkingDirection_);
	}
};


Hero.prototype.moveTowards = function(direction) {
	this.walkTimer_ += Worker.SPEED;
	if (this.walkTimer_ >= 1) {
		this.walkTimer_ = 0;
		this.currentWalkingDirection_ = null;
		PathGenerator.getInstance().movePhysicalModel(this, direction);
	}
	this.notifyChange();
};


Hero.prototype.getMoveProgress = function() {
	return this.walkTimer_;
};


Hero.prototype.getDirection = function() {
	return this.currentWalkingDirection_;
};


Hero.prototype.getX = function() {
	return this.x_;
};


Hero.prototype.getY = function() {
	return this.y_;
};


Hero.prototype.setX = function(x) {
	this.x_ = x;
};


Hero.prototype.setY = function(y) {
	this.y_ = y;
};


Hero.prototype.moveLeft = function() {
	if (this.currentWalkingDirection_ == null) {
		this.currentWalkingDirection_ =
			PathGenerator.ManhattanDirection.MOVE_WEST;
	}
};


Hero.prototype.moveRight = function() {
	if (this.currentWalkingDirection_ == null) {
		this.currentWalkingDirection_ =
			PathGenerator.ManhattanDirection.MOVE_EAST;
	}
};


Hero.prototype.moveUp = function() {
	if (this.currentWalkingDirection_ == null) {
		this.currentWalkingDirection_ =
			PathGenerator.ManhattanDirection.MOVE_NORTH;
	}
};


Hero.prototype.moveDown = function() {
	if (this.currentWalkingDirection_ == null) {
		this.currentWalkingDirection_ =
			PathGenerator.ManhattanDirection.MOVE_SOUTH;
	}
};