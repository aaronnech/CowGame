window.inherits = function(child, parent) {
	function temp() {};
	temp.prototype = parent.prototype;
	child.prototype = new temp();
	child.prototype.constructor = child;
};