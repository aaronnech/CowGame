function ClientController(game) {
	this.base = Controller;
	this.base.apply(this, [game]);

	this.viewModel_ = new MarkoViewModel();
}
window.inherits(ClientController, Controller);


ClientController.prototype.setBindings = function() {
	this.bind(Action.GameActions.RENDER, this.onRender);
	this.bind(Action.GameActions.UPDATE, this.onUpdate);

	this.bind(Action.ViewActions.START_DRAG_SELECT, this.onDragStart);
};


ClientController.prototype.onRender = function() {
	this.viewModel_.render();
};


ClientController.prototype.onUpdate = function() {
	this.viewModel_.update();
};


ClientController.prototype.onDragStart = function() {
	console.log('drag start');
};


ClientController.prototype.onClickScreen = function() {
	console.log('Hello');
};