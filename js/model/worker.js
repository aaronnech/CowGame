function Worker() {
	this.base = Model;
	this.base.apply(this);

	this.x_ = 0;
	this.y_ = 0;
	// Markov stuff
	// this.stateManager_ = new MarkovChain();
}
window.inherits(Worker, Model);


Worker.prototype.getX = function() {
	return this.x_;
};


Worker.prototype.getY = function() {
	return this.y_;
};

Worker.prototype.setX = function(x) {
	this.x_ = x;
};


Worker.prototype.setY = function(y) {
	this.y_ = y;
};