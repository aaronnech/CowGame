function Input() {
	this.keyHitBindings_ = [];

	// Listen to browser key presses
	this.addBrowserEventListener_('keypress', function(e) {
	    var event = e || window.event;
	    var code = event.which || event.charCode || event.keyCode;
	    var mapKey = '' + code;

	    if (this.keyHitBindings_[mapKey]) {
	    	var bindings = this.keyHitBindings_[mapKey];
	    	for (var i = 0; i < bindings.length; i++) {
	    		bindings[i].action.fire(this, bindings[i].data);
	    	}
	    }
	});
}


Input.KEYS = {
	RIGHT : '39',
	LEFT : '37',
	UP : '38',
	DOWN : '40'
};


Input.prototype.addBrowserEventListener_ = function(name, callback) {
    if (document.addEventListener) {
        document.addEventListener(name, callback, false);
    } else if (element.attachEvent) {
        document.attachEvent("on" + name, callback);
    } else {
        document["on" + name] = callback;
    }
};


Input.prototype.bindKeyHitAction = function(key, action, data) {
	if (!this.keyHitBindings_[key]) {
		this.keyHitBindings_[key] = [];
	}
	this.keyHitBindings_[key].push({'action' : action, 'data' : data});
};