function BulletManager(mapModel, colony) {
	this.map_ = mapModel;
	this.colony_ = colony;
	this.bullets_ = new SpacialHash(
		this.map_.getWidth(),
		this.map_.getHeight(),
		9);
	this.bulletsArray_ = [];
}
window.inherits(BulletManager, Model);

BulletManager.prototype.checkCollisions_ = function(bullet) {
	var x = Math.floor(bullet.getX());
	var y = Math.floor(bullet.getY());
	var workers = this.colony_.getWorkers();
	var inDanger = workers.getAll(x, y);
	for (var i = 0; i < inDanger.length; i++) {
		if (inDanger[i].getX() == x && inDanger[i].getY() == y) {
			this.colony_.hitWorker(inDanger[i]);
			this.removeBullet(bullet);
			break;
		}
	}
};

BulletManager.prototype.removeBullet = function(bullet) {
	var x = Math.floor(bullet.getX());
	var y = Math.floor(bullet.getY());
	var index = this.bulletsArray_.indexOf(bullet);
	this.bulletsArray_.splice(index, 1);
	this.bullets_.remove(x, y, bullet);
	bullet.dispose();
};

BulletManager.prototype.addBullet = function(bulletModel) {
	this.bullets_.add(
		Math.floor(bulletModel.getX()), Math.floor(bulletModel.getY()), bulletModel);
	this.bulletsArray_.push(bulletModel);
};


BulletManager.prototype.getBullets = function() {
	return this.bullets_;
};


BulletManager.prototype.update = function() {
	for (var i = 0; i < this.bulletsArray_.length; i++) {
		var bullet = this.bulletsArray_[i];
		var beforeX = Math.floor(bullet.getX());
		var beforeY = Math.floor(bullet.getY());

		this.bulletsArray_[i].update();

		var afterX = Math.floor(bullet.getX());
		var afterY = Math.floor(bullet.getY());
		if (beforeX != afterX || beforeY != afterY) {
			this.bullets_.remove(beforeX, beforeY, bullet);
			this.bullets_.add(afterX, afterY, bullet);
		}

		this.checkCollisions_(bullet);
	}
};