/**
 * [MarkovChain description]
 * @param {[type]} states [description]
 */
function MarkovChain(states) {
	this.transitionMatrix_ = new Array(states.length);
    this.stateToIndex_ = [];
    this.indexToState_ = [];
    for (var i = 0; i < states.length; i++) {
        this.transitionMatrix_[i] = new Array(states.length);
        /* Assign the state and index in the matrix */
        this.stateToIndex_[states[i]] = i;
        this.indexToState_[i] = states[i];
    }
}

MarkovChain.prototype.setProbability = function(tailState, headState, probability) {
    this.transitionMatrix_[this.stateToIndex_[tailState]][this.stateToIndex_[headState]] = probability;
}

MarkovChain.prototype.getProbability = function(tailState, headState) {
    return this.transitionMatrix_[this.stateToIndex_[tailState]][this.stateToIndex_[headState]];
}

MarkovChain.prototype.getNeighborStates = function(state) {
    var index = this.stateToIndex_[state];
    var result = {"states" : []};
    for (var i = 0; i < this.transitionMatrix_.length[index]; i++) {
        var probability = this.transitionMatrix_[index][i];
        if (probability) {
            result.states.push({"state" : this.indexToState_[i], "probability" : this.probability});
        }
    }
    return result;
};

MarkovChain.PossibleStates = {
    // ...
};