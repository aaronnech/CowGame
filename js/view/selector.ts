function Selector(input, camera) {
	this.input_ = input;
	this.camera_ = camera;
	this.lastXPosition_ = 0;
	this.lastYPosition_ = 0;
	this.selectables_ = [];
	this.selected_ = [];
};


Selector.prototype.getLastMapClickX = function() {
	return this.lastXPosition_;
};


Selector.prototype.getLastMapClickY = function() {
	return this.lastYPosition_;
};


Selector.prototype.handleDragging = function() {
	var x = this.input_.getMouseX();
	var y = this.input_.getMouseY();
	var down = this.input_.isMouseDown(Input.Mouse.LEFT);
	if (down && !this.dragging_) {
		this.onStartDrag_();
	} else if (down && this.mouseMoved_) {
		this.onDragMove_();
	} else if (!down && this.dragging_) {
		this.onFinishDrag_();
	}
};


Selector.prototype.onStartDrag_ = function() {
	this.dragging_ = true;
};


Selector.prototype.onFinishDrag_ = function() {
	this.dragging_ = false;
};


Selector.prototype.onDragMove_ = function() {
	this.mouseMoved_ = false;
};


Selector.prototype.addSelectables = function(collection) {
	this.selectables_.push(collection);
};


Selector.prototype.deselectAll = function() {
	// deselect all
	while (this.selected_.length > 0) {
		this.selected_.pop().onDeselect();
	}
};


Selector.prototype.selectAtCoordinates = function(x, y) {
	this.deselectAll();

	// select new selectable
	for (var i = 0; i < this.selectables_.length; i++) {
		var inArea = this.selectables_[i].getAll(x, y);
		for (var i = 0; i < inArea.length; i++) {
			var candidate = inArea[i];
			if(candidate.getX() == x &&
				candidate.getY() == y) {
				this.selected_.push(candidate);
				return candidate;
			}
		}
	}
	return null;
}

Selector.prototype.onClickMap = function() {
	this.dragging_ = false;
	var clickX = this.input_.getMouseX();
	var clickY = this.input_.getMouseY();
	clickX += this.camera_.getX();
	clickY += this.camera_.getY();
	clickX = Math.floor(clickX / MarkoViewModel.TILE_WIDTH);
	clickY = Math.floor(clickY / MarkoViewModel.TILE_HEIGHT);
	var selected = this.selectAtCoordinates(clickX, clickY);
	if (selected) {
		selected.onSelect();
	}
	this.lastXPosition_ = clickX;
	this.lastYPosition_ = clickY;
};