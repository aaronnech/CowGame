function WorkerState() {
	this.base = MarkovNode;
	this.base.apply(this);

}
WorkerState.prototype = Object.create(MarkovNode.prototype);