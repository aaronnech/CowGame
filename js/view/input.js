function Input(canvas) {
	var self = this;

	this.canvas_ = canvas;

	// Key states and bindings
	this.keyHitBindings_ = {};
	this.keyDownBindings_ = {};
	this.keyDownState_ = {};
	this.keyHitState_ = {};

	// Mouse states and bindings
	this.mouseHitState_ = [false, false];
	this.mouseHitBindings_ = [[], []];
    this.mouseX_ = 0;
    this.mouseY_ = 0;

	this.addBrowserEventListener_(document, 'keydown', function(e) {
	    var event = e || window.event;
	    var code = event.which || event.charCode || event.keyCode;
	    var mapKey = '' + code;

	    self.keyDownState_[mapKey] = true;
	});

	this.addBrowserEventListener_(document, 'keyup', function(e) {
	    var event = e || window.event;
	    var code = event.which || event.charCode || event.keyCode;
	    var mapKey = '' + code;

	    self.keyDownState_[mapKey] = false;
	    self.keyHitState_[mapKey] = true;
	});

	this.addBrowserEventListener_(this.canvas_, 'click', function(e) {
		self.mouseHitState_[Input.Mouse.LEFT] = true;
	});


	this.addBrowserEventListener_(this.canvas_, 'mousemove', function(e) {
        var rect = self.canvas_.getBoundingClientRect();
        self.mouseX_ = e.clientX - rect.left;
        self.mouseY_ = e.clientY - rect.top;
	});
}

Input.Mouse = {
	LEFT : 0,
	RIGHT : 1
};

Input.Keys = {
	RIGHT : '39',
	LEFT : '37',
	UP : '38',
	DOWN : '40'
};


Input.prototype.getMouseX = function() {
	return this.mouseX_;
};


Input.prototype.getMouseY = function() {
	return this.mouseY_;
};


Input.prototype.addBrowserEventListener_ =
		function(element, name, callback) {
    if (element.addEventListener) {
        element.addEventListener(name, callback, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + name, callback);
    } else {
        element["on" + name] = callback;
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

	// Handle mousehit events
	if (this.mouseHitState_[Input.Mouse.LEFT] && 
		this.mouseHitBindings_[Input.Mouse.LEFT]) {
		var bindings = this.mouseHitBindings_[Input.Mouse.LEFT];
		for (var i = 0; i < bindings.length; i++) {
			bindings[i].action.fire(this, bindings[i].data);
		}
	}

	if (this.mouseHitState_[Input.Mouse.RIGHT] && 
		this.mouseHitBindings_[Input.Mouse.RIGHT]) {
		var bindings = this.mouseHitBindings_[Input.Mouse.RIGHT];
		for (var i = 0; i < bindings.length; i++) {
			bindings[i].action.fire(this, bindings[i].data);
		}
	}
	this.mouseHitState_[Input.Mouse.LEFT] = false;
	this.mouseHitState_[Input.Mouse.RIGHT] = false;
};

Input.prototype.bindMapKeyToAction_ = function(mapKey, map, action, data) {
	if (!map[mapKey]) {
		map[mapKey] = [];
	}
	map[mapKey].push({'action' : action, 'data' : data});
};


Input.prototype.bindMouseHitAction = function(mouse, action, data) {
	this.bindMapKeyToAction_(mouse, this.mouseHitBindings_, action, data);
};


Input.prototype.bindKeyHitAction = function(key, action, data) {
	this.bindMapKeyToAction_(key, this.keyHitBindings_, action, data);
};


Input.prototype.bindKeyDownAction = function(key, action, data) {
	this.bindMapKeyToAction_(key, this.keyDownBindings_, action, data);
};