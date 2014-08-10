/**
 * [MarkovChain description]
 * @param {[type]} states [description]
 */
function MarkovChain(states) {
	this.transitionMatrix_ = new Array(states.length);
    this.stateToIndex_ = [];
    this.indexToState_ = [];
    this.currentStateIndex_ = 0;

    for (var i = 0; i < states.length; i++) {
        this.transitionMatrix_[i] = new Array(states.length);
        /* Assign the state and index in the matrix */
        this.stateToIndex_[states[i]] = i;
        this.indexToState_[i] = states[i];

        for (var j = 0; j < states.length; j++) {
            this.transitionMatrix_[i][j] = 0.0;
        }
    }
};

MarkovChain.prototype.setProbability = function(tailState, headState, probability) {
    this.transitionMatrix_[this.stateToIndex_[tailState]][this.stateToIndex_[headState]] = probability;
};

MarkovChain.prototype.getProbability = function(tailState, headState) {
    return this.transitionMatrix_[this.stateToIndex_[tailState]][this.stateToIndex_[headState]];
};

MarkovChain.prototype.getNeighborProbabilities = function(state) {
    var index = this.stateToIndex_[state];
    var result = [];
    for (var i = 0; i < this.transitionMatrix_[index].length; i++) {
        result.push(this.transitionMatrix_[index][i]);
    }
    return result;
};

MarkovChain.prototype.setCurrentState = function(state) {
    this.currentStateIndex_ = this.stateToIndex_[state];
};

MarkovChain.prototype.getCurrentState = function() {
    return this.indexToState_(this.currentStateIndex_);
};

MarkovChain.prototype.update = function() {
    var probabilities = this.getNeighborProbabilities(this.indexToState_[this.currentStateIndex_]);
    for (var i = 1; i < probabilities.length; i++) {
        probabilities[i] += probabilities[i - 1];
    }

    var random = Math.random();
    for (var i = 0; i < probabilities.length; i++) {
        if (random < probabilities[i]) {
            this.currentStateIndex_ = i;
            return this.indexToState_[i];
        }
    }
};

MarkovChain.prototype.updateTransitionMatrix = function(transitionMatrix) {
    // Update this chain based on the input matrix
};

MarkovChain.prototype.getTransitionMatrix = function() {
    return this.transitionMatrix_;
};

MarkovChain.PossibleStates = {
    // ...
};