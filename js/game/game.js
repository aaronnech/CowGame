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


Game.prototype.loop_ = function() {
	var delta = 1;
	if (this.lastUpdate_) {
	    var now = Date.now();
	    delta = now - lastUpdate;
	    lastUpdate = now;
	} else {
		this.lastUpdate_ = Date.now();
	}

	if (!this.running_) {
		clearInterval(this.loopInterval_);
		this.onShutDown();
	}
	this.update(delta);
	this.render();
};


Game.prototype.run = function(fps) {
	this.oneFrameTime_ = 1000 / fps;
	this.running_ = true;
	this.onStart();
	this.loopInterval_ = setInterval(this.loop_, this.oneFrameTime_);
};