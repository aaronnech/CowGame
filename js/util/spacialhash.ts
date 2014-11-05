function SpacialHash(width, height, granularity) {
	this.width_ = width;
	this.height_ = height;
	this.granularity_ = granularity;
	this.buckets_ = {};
}


SpacialHash.prototype.hash_ = function(x, y) {
	var hashedX = Math.ceil(x / this.granularity_);
	var hashedY = Math.ceil(y / this.granularity_);
	var key = hashedX + ',' + hashedY;
	if (!this.buckets_[key]) {
		this.buckets_[key] = [];
	}
	return key; 
};


SpacialHash.prototype.getAll = function(x, y) {
	return this.buckets_[this.hash_(x, y)];
};


SpacialHash.prototype.add = function(x, y, obj) {
	this.buckets_[this.hash_(x, y)].push(obj);
};


SpacialHash.prototype.remove = function(x, y, obj) {
	var array = this.buckets_[this.hash_(x, y)];
	var index = array.indexOf(obj);
	if (index != -1) {
		array.splice(index, 1);
	}
};