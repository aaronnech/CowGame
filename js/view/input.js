function Input() {
	var self = this;
	this.keyHitBindings_ = {};
	this.keyDownBindings_ = {};
	this.keyDownState_ = {};
	this.keyHitState_ = {};

	this.addBrowserEventListener_('keydown', function(e) {
	    var event = e || window.event;
	    var code = event.which || event.charCode || event.keyCode;
	    var mapKey = '' + code;

	    self.keyDownState_[mapKey] = true;
	});

	this.addBrowserEventListener_('keyup', function(e) {
	    var event = e || window.event;
	    var code = event.which || event.charCode || event.keyCode;
	    var mapKey = '' + code;

	    self.keyDownState_[mapKey] = false;
	    self.keyHitState_[mapKey] = true;
	});
}


Input.Keys = {
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
	// Handle keydown events
	for (key in this.keyDownState_) {
		if (!this.keyDownState_.hasOwnProperty(key)) {
			continue;
		}
		if (this.keyDownState_[key] && this.keyDownBindings_[key]) {
	    	var bindings = this.keyDownBindings_[key];
	    	for (var i = 0; i < bindings.length; i++) {
	    		bindings[i].action.fire(this, bindings[i].data);
	    	}
		}
	}

	// Handle keyhit events
	for (key in this.keyHitState_) {
		if (!this.keyHitState_.hasOwnProperty(key)) {
			continue;
		}
		if (this.keyHitState_[key] && this.keyHitBindings_[key]) {
	    	var bindings = this.keyHitBindings_[key];
	    	for (var i = 0; i < bindings.length; i++) {
	    		bindings[i].action.fire(this, bindings[i].data);
	    	}
		}
		if (this.keyHitState_[key]) {
			this.keyHitState_[key] = false;
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
	this.bindMapKeyToAction_(key, this.keyHitBindings_, action, data);
};


Input.prototype.bindKeyDownAction = function(key, action, data) {
	this.bindMapKeyToAction_(key, this.keyDownBindings_, action, data);
};