function MarkovChain() {
	this.markovNodes_ = {};
}

/**
 * Returns whether or not a node is in the chain.
 *
 * @param  {MarkovNode} node - The node to check
 * @return {boolean} True if and only if the node is in the chain, false otherwise
 */
MarkovChain.prototype.isNodeInChain = function(node) {
    return (node in this.markovNodes_);
}

/**
 * Adds a MarkovNode into the chain.
 *
 * @param {MarkovNode} node - The node to add to the chain
 */
MarkovChain.prototype.addMarkovNode = function(node) {
    if (!this.isNodeInChain(node)) {
        this.markovNodes_[node] = [];
    }
}

/**
 * Adds a MarkovEdge and the head and tail of the edge (if necessary) into the chain.
 *
 * @param {MarkovEdge} edge - The edge to add to the chain
 */
MarkovChain.prototype.addMarkovEdge = function(edge) {
    var tail = edge.getTail();
    this.addMarkovNode(edge.getHead());
    this.addMarkovNode(tail);
    this.markovNodes_[tail].append(edge);
}

/**
 * Removes a MarkovEdge from the chain.
 *
 * @param  {MarkovEdge} edge - The edge to remove from the chain
 * @return {boolean} True if and only if the edge was removed, false otherwise
 */
MarkovChain.prototype.removeMarkovEdge = function(edge) {
    var tail = edge.getTail();
    if (this.isNodeInChain(tail)) {
        var edges = this.getMarkovEdges(tail);
        var index = edges.indexOf(edge);
        if (index > -1) {
            edges.splice(index, 1);
        }
    }
    return false;
}

/**
 * Returns the neighbors of the node in the chain.
 *
 * @param  {MarkovNode} node - The Markov node to get the edges for
 * @return {[MarkovEdge]} A list of the node's edges, {null} if the node is not in the chain
 */
MarkovChain.prototype.getMarkovEdges = function(node) {
    if (this.isNodeInChain(node)) {
        return this.markovNodes_[node];
    }
    return null;
}

/**
 * @return {[MarkovNode]} A list of nodes currently in the chain
 */
MarkovChain.prototype.getMarkovNodes = function() {
    return Object.keys(this.markovNodes_);
}
