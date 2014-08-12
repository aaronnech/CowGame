function Selector(input, camera) {
	this.input_ = input;
	this.camera_ = camera;
	this.selectables_ = [];
	this.selected_ = [];
};


Selector.prototype.addSelectables = function(collection) {
	this.selectables_.push(collection);
};


Selector.prototype.selectAtCoordinates = function(x, y) {
	this.selected_ = [];
	for (var i = 0; i < this.selectables_.length; i++) {
		var inArea = this.selectables_[i].getAll(x, y);
		for (var i = 0; i < inArea.length; i++) {
			if(inArea[i].getX() == x &&
				inArea[i].getY() == y) {
				return inArea[i];
			}
		}
	}
	return null;
}

Selector.prototype.onClickMap = function() {
	var clickX = this.input_.getMouseX();
	var clickY = this.input_.getMouseY();
	clickX += this.camera_.getX();
	clickY += this.camera_.getY();
	clickX = Math.floor(clickX / MarkoViewModel.TILE_WIDTH);
	clickY = Math.floor(clickY / MarkoViewModel.TILE_HEIGHT);
	console.log(this.selectAtCoordinates(clickX, clickY));
};