function Input() {
	this.keyHitBindings_ = {};
	this.keyDownBindings_ = {};
	this.keyDownState_ = {};

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

	this.addBrowserEventListener_('keydown', function(e) {
	    var event = e || window.event;
	    var code = event.which || event.charCode || event.keyCode;
	    var mapKey = '' + code;

	    this.keyDownState_[mapKey] = true;
	});

	this.addBrowserEventListener_('keyup', function(e) {
	    var event = e || window.event;
	    var code = event.which || event.charCode || event.keyCode;
	    var mapKey = '' + code;

	    this.keyDownState_[mapKey] = false;
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


Input.prototype.update = function() {
	for (key in this.keyDownState_) {
		if (!this.keyDownState_.hasOwnProperty(key)) {
			continue;
		}
		if (this.keyDownState_[key] && this.keyHitBindings_[key]) {
	    	var bindings = this.keyHitBindings_[key];
	    	for (var i = 0; i < bindings.length; i++) {
	    		bindings[i].action.fire(this, bindings[i].data);
	    	}
		}
	}
};


Input.prototype.bindMapKeyToAction_ = function(mapKey, map, action, data) {
	if (!map[mapKey]) {
		map[mapKey] = [];
	}
	map[mapKey].push({'action' : action, 'data' : data});
};


Input.prototype.bindKeyHitAction = function(key, action, data) {
	bindMapKeyToAction_(key, this.keyHitBindings_, action, data);
};


Input.prototype.bindKeyDownAction = function(key, action, data) {
	bindMapKeyToAction_(key, this.keyDownBindings_, action, data);
};