function Game() {
	this.running_ = false;

	this.loopInterval_ = null;

	this.oneFrameTime_ = null;

	this.lastUpdate_ = null;
}

Game.prototype.onRender = window.ABSTRACT_METHOD;


Game.prototype.onUpdate = window.ABSTRACT_METHOD;


Game.prototype.onStart = window.ABSTRACT_METHOD;


Game.prototype.onShutDown = window.ABSTRACT_METHOD;


Game.prototype.render_ = function() {
	this.onRender();
};


Game.prototype.update_ = function(delta) {
	this.onUpdate(delta);
};


Game.prototype.run = function(fps) {
	var self = this;
	var loop = function() {
		var delta = 1;
		if (self.lastUpdate_) {
		    var now = Date.now();
		    delta = now - self.lastUpdate_;
		    self.lastUpdate_ = now;
		} else {
			self.lastUpdate_ = Date.now();
		}

		if (!self.running_) {
			clearInterval(self.loopInterval_);
			self.onShutDown();
		}
		self.update_(delta);
		self.render_();
	};

	this.oneFrameTime_ = 1000 / fps;
	this.running_ = true;
	this.onStart();
	this.loopInterval_ = setInterval(loop, this.oneFrameTime_);
};