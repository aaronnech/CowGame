function Worker() {
	this.base = Model;
	this.base.apply(this);

	this.x_ = 0;
	this.y_ = 0;
	this.states_ = [];
	for (var key in WorkerState.Types) {
		this.states_[key] = new WorkerState(key, null);
	}
	this.stateManager_ = new MarkovChain(Object.keys(WorkerState.Types));
}
window.inherits(Worker, Model);


Worker.prototype.update = function(workers) {
	this.updateMarkovChain(workers.getAll(this.x_, this.y_));
};


Worker.prototype.getWidth = function() {
	return 1;
};


Worker.prototype.getHeight = function() {
	return 1;
};


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

Worker.prototype.setState = function(stateType, data, opt_probability) {
	this.states_[stateType].setData(data);
	if (opt_probability) {
		this.stateManager_.setProbability(stateType, opt_probability);
	}
};

Worker.prototype.getMarkovChain = function() {
	return this.stateManager_;
};

Worker.prototype.updateMarkovChain = function(neighbors) {
	for (var tail in WorkerState.Types) {
		for (var head in WorkerState.Types) {
			var average = 0.0;
			for (var i = 0; i < neighbors.length; i++) {
				neighbor = neighbors[i];
				average += neighbor.getMarkovChain().getProbability(tail, head);
			}

			var current = this.stateManager_.getProbability(tail, head);
			average = (average + current) / (neighbors.length + 1.0);
			var delta = average - current;
			current = average;

			this.stateManager_.setProbability(tail, head, current);

			var sum = 0.0;
			for (var other in WorkerState.Types) {
				if (other != tail) {
					sum += this.stateManager_.getProbability(tail, other);
				}
			}

			for (var other in WorkerState.Types) {
				if (other != tail) {
					var currentProbability = this.stateManager_.getProbability(tail, other);
					var result = currentProbability - (currentProbability / sum) * delta;
					this.stateManager_.setProbability(tail, other, result);
				}
			}
		}
	}
};
