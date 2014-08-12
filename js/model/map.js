function Map(width, height, tileWidth, tileHeight) {
	this.base = Model;
	this.base.apply(this);

	this.tileWidth_ = tileWidth;
	this.tileHeight_ = tileHeight;
	this.width_ = width;
	this.height_ = height;
	this.tiles_ = [];

	for (var y = 0; y < this.height_; y++) {
		for (var x = 0; x < this.width_; x++) {
			this.tiles_[this.toLinearIndex_(x, y)] =
				new Tile(tileWidth, tileHeight);
		}
	}
	console.log('map constructed with ' + this.tiles_.length + ' tiles');
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
			var tile = this.getTile(x, y);
			if (tile) {
				f(tile, x, y);
			}
		}
	}
};


Map.prototype.forEachTileInRect = function(x, y, w, h, f) {
	var startX = this.toTileX_(x);
	var endX = this.toTileX_(w) + startX;
	var startY = this.toTileX_(y);
	var endY = this.toTileX_(h) + startY + 1;

	for (var y = startY; y <= endY; y++) {
		for (var x = startX; x <= endX; x++) {
			var tile = this.getTile(x, y);
			if (tile) {
				f(tile, x, y);
			}
		}
	}
};


Map.prototype.isInMap = function(x, y) {
	return x >= 0 && x < this.width_ && y >= 0 && y < this.height_;
};


Map.prototype.toTileX_ = function(x) {
	return Math.floor(x / this.tileWidth_);
};


Map.prototype.toTileY_ = function(x) {
	return Math.floor(y / this.tileHeight_);
};


Map.prototype.randomTileX = function() {
	return Math.floor(Math.random() * this.width_);
};


Map.prototype.randomTileY = function() {
	return Math.floor(Math.random() * this.height_);
};


Map.prototype.toLinearIndex_ = function(x, y) {
	return Math.floor(y * this.width_ + x);
};


Map.prototype.getTile = function(x, y) {
	if (this.isInMap(x, y)) {
		return this.tiles_[this.toLinearIndex_(x, y)];
	} else {
		return null;
	}
};