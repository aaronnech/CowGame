window.ABSTRACT_METHOD = function() {
	throw "ERROR: method not implemented";
};

window.inherits = function(child, parent) {
	function temp() {};
	temp.prototype = parent.prototype;
	child.prototype = new temp();
	child.prototype.constructor = child;
};