function ClientController(game) {
	this.base = Controller;
	this.base.apply(this, [game]);

	this.viewModel_ = new MarkoViewModel();
}
window.inherits(ClientController, Controller);


ClientController.prototype.setBindings = function() {
	var vm = this.viewModel_;
	this.bind(Action.GameActions.RENDER, vm.render);
	this.bind(Action.GameActions.UPDATE, vm.update);

	this.bind(Action.ViewActions.PAN_UP, vm.panCameraUp);
	this.bind(Action.ViewActions.PAN_DOWN, vm.panCameraDown);
	this.bind(Action.ViewActions.PAN_LEFT, vm.panCameraLeft);
	this.bind(Action.ViewActions.PAN_RIGHT, vm.panCameraRight);
};


ClientController.prototype.onRender = function() {
	this.viewModel_.render();
};


ClientController.prototype.onUpdate = function() {
	this.viewModel_.update();
};