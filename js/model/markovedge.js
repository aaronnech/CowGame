/**
 * A MarkovEdge represents a directed edge consisting of a head and a tail MarkovNode.
 *
 * @param {MarkovNode} head - The head node of the edge
 * @param {MarkovNode} tail - The tail node of the edge
 * @param {double} probability - The probability of this edge being taken
 */
function MarkovEdge(head, tail, probability) {
    this.head_ = head;
    this.tail_ = tail;
    this.probability_ = probability;
}

/**
 * @return {double} The probability of this edge being taken from tail to head.
 */
MarkovEdge.prototype.getProbability = function() {
    return this.probability_;
}

/**
 * @param {double} probability - The new probability of this edge
 */
MarkovEdge.prototype.setProbability = function(probability) {
    this.probability_ = probability;
}

/**
 * @return {MarkovNode} The head node of this edge
 */
MarkovEdge.prototype.getHead = function() {
    return this.head_;
}

/**
 * @return {MarkovNode} The tail node of this edge
 */
MarkovEdge.prototype.getTail = function() {
    return this.tail_;
}

/**
 * Returns true if and only if other is equivalent to this edge.
 *
 * @param  {MarkovEdge} other - The other edge to compare
 * @return {boolean} True if and only if the other edge is equivalent
 */
MarkovEdge.prototype.equals = function(other) {
    return other && this.head_.equals(other.getHead())
        && this.tail_.equals(other.getTail())
        && this.probability_ == other.getProbability();
}

