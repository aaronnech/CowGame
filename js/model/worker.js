function Worker() {
	this.base = Model;
	this.base.apply(this);

	this.x_ = 0;
	this.y_ = 0;
	this.canUpdateState_ = false;
	this.walkTimer_ = 0;

	this.states_ = {};
	for (var key in WorkerState.Types) {
		this.states_[key] = new WorkerState(key, null);
	}
	this.stateManager_ = new MarkovChain(Object.keys(WorkerState.Types));

	// Test move state (remove later)
	var stateName = WorkerState.Types.MOVE_TO;
	this.states_[stateName].setData({x : 10, y : 10});
	this.stateManager_.setCurrentState(stateName);
}
window.inherits(Worker, Model);

Worker.SPEED = 0.1;

Worker.prototype.update = function(workers) {
	// this.updateMarkovChain(workers.getAll(this.x_, this.y_));
	this.doStateAction();
	if (this.canUpdateState_) {
		this.stateManager_.update();
		this.onStateChange();
	}
};


Worker.prototype.onStateChange = function() {
	var state =
		this.states_[this.stateManager_.getCurrentState()];
	var data = state.getData();
	var type = state.getType();
	if (data) {
		switch (type) {
			case WorkerState.Types.MOVE_TO:
				PathGenerator.getInstance().
					makePath(
							this.x_,
							this.y_,
							data.x,
							data.y,
							function(path) {
						//console.log(path);
						data.iterator = path;
						state.setData(data);
					});
				break;
		}
	}
};


Worker.prototype.doStateAction = function() {
	var state =
		this.states_[this.stateManager_.getCurrentState()];
	var data = state.getData();
	var type = state.getType();
	if (data) {
		switch (type) {
			case WorkerState.Types.MOVE_TO:
				if (data.iterator) {
					this.moveTowards(data.iterator);
				}
				break;
		}
	}
};


Worker.prototype.moveTowards = function(pathIterator) {
	if (pathIterator.length > 0) {
		if (this.walkTimer_ >= 1) {
			var direction = pathIterator.shift();
			this.walkTimer_ = 0;
			PathGenerator.getInstance().movePhysicalModel(this, direction);
			this.notifyChange();
		}
		this.walkTimer_ += Worker.SPEED;
	}
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
			// Calculate an average probability matrix
			var average = 0.0;
			for (var i = 0; i < neighbors.length; i++) {
				neighbor = neighbors[i];
				average += neighbor.getMarkovChain().getProbability(tail, head);
			}

			// Set the current probability to the average, and calculate
			// the delta needed to make this change.
			var current = this.stateManager_.getProbability(tail, head);
			average = (average + current) / (neighbors.length + 1.0);
			var delta = average - current;
			this.stateManager_.setProbability(tail, head, average);

			// Calculate the sum of all the other probabilities besides
			// the one we set
			var sum = 0.0;
			for (var other in WorkerState.Types) {
				if (other != tail) {
					sum += this.stateManager_.getProbability(tail, other);
				}
			}

			// Calculate a contribution (defined as how much
			// of a percentage of the total probability each takes up)
			// and multiply the delta by this contribution.
			// The product of this contribution and the delta will be added to the probability
			// such that the entire delta is distributed across the other probabilities
			// and it still adds up to 1.
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
