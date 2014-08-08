function Tile(width, height) {
	this.isOccupied_ = false;
	this.color_ = 0x444444;
	this.width_ = width;
	this.height_ = height;
};

Tile.prototype.getWidth = function() {
	return this.width_;
};


Tile.prototype.getHeight = function() {
	return this.height_;
};


Tile.prototype.getColor = function() {
	return this.color_;
};


Tile.prototype.isOccupied = function() {
	return this.isOccupied_;
};