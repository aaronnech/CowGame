function MarkovNode() {

}

/**
 * Returns true if and only if other is equivalent to this node.
 *
 * @param  {MarkovNode} other - The other node to compare
 * @return {boolean} True if and only if the other node is equivalent
 */
MarkovNode.prototype.equals = function(other) {
    return other && this == other;
}

MarkovNode.NodeStates = {
    RENDER : new MarkovNode(),
    UPDATE : new MarkovNode(),
    STOP : new MarkovNode(),
    START : new MarkovNode()
}