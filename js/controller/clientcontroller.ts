function ClientController(game) {
	this.base = Controller;
	this.base.apply(this, [game]);

	this.viewModel_ = new MarkoViewModel();
}
window.inherits(ClientController, Controller);


ClientController.prototype.setBindings = function() {
	this.bind(Action.GameActions.RENDER, this.onRender);
	this.bind(Action.GameActions.UPDATE, this.onUpdate);

	this.bind(Action.ViewActions.PAN_UP, this.panCameraUp);
	this.bind(Action.ViewActions.PAN_DOWN, this.panCameraDown);
	this.bind(Action.ViewActions.PAN_LEFT, this.panCameraLeft);
	this.bind(Action.ViewActions.PAN_RIGHT, this.panCameraRight);

	this.bind(Action.ViewActions.CLICK_MAP, this.clickMap);

	this.bind(Action.ViewActions.MOVE_UP, this.moveUp);
	this.bind(Action.ViewActions.MOVE_DOWN, this.moveDown);
	this.bind(Action.ViewActions.MOVE_LEFT, this.moveLeft);
	this.bind(Action.ViewActions.MOVE_RIGHT, this.moveRight);
};


ClientController.prototype.onRender = function() {
	this.viewModel_.render();
};


ClientController.prototype.onUpdate = function() {
	this.viewModel_.update();
};


ClientController.prototype.panCameraUp = function() {
	this.viewModel_.panCameraUp();
};


ClientController.prototype.panCameraDown = function() {
	this.viewModel_.panCameraDown();
};


ClientController.prototype.panCameraLeft = function() {
	this.viewModel_.panCameraLeft();
};


ClientController.prototype.panCameraRight = function() {
	this.viewModel_.panCameraRight();
};


ClientController.prototype.moveUp = function() {
	this.viewModel_.moveHeroUp();
};


ClientController.prototype.moveDown = function() {
	this.viewModel_.moveHeroDown();
};


ClientController.prototype.moveLeft = function() {
	this.viewModel_.moveHeroLeft();
};


ClientController.prototype.moveRight = function() {
	this.viewModel_.moveHeroRight();
};


ClientController.prototype.clickMap = function() {
	this.viewModel_.clickMap();
};