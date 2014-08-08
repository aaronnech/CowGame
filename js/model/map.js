function Map(width, height, tileWidth, tileHeight) {
	this.base = Model;
	this.base.apply(this);

	this.width_ = width;
	this.height_ = height;
	this.tiles_ = [];
	for (var y = 0; y < this.height_; y++) {
		for (var x = 0; x < this.width_; x++) {
			this.tiles_[this.toLinearIndex_(x, y)] =
				new Tile(tileWidth, tileHeight);
		}
	}
}
window.inherits(Map, Model);


Map.prototype.getWidth = function() {
	return this.width_;
};


Map.prototype.getHeight = function() {
	return this.height_;
};


Map.prototype.forEachTile = function(f) {
	for (var y = 0; y < this.height_; y++) {
		for (var x = 0; x < this.width_; x++) {
			f(this.getTile(x, y), x, y);
		}
	}
};


Map.prototype.isInMap = function(x, y) {
	return x >= 0 && x < this.width_ && y >= 0 && y < this.height_;
};


Map.prototype.toLinearIndex_ = function(x, y) {
	return y * this._width + x;
};


Map.prototype.getTile = function(x, y) {
	if (this.isInMap(x, y)) {
		return this.tiles_[this.toLinearIndex_(x, y)];
	} else {
		return null;
	}
};