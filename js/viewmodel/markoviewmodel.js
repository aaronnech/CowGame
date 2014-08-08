function MarkoViewModel() {
	var WORLD_WIDTH = 800;
	var WORLD_HEIGHT = 600;
	var NUMBER_OF_X_TILES = 40;
	var NUMBER_OF_Y_TILES = 30;
	var TILE_HEIGHT = Math.floor(WORLD_HEIGHT / NUMBER_OF_Y_TILES);
	var TILE_WIDTH = Math.floor(WORLD_WIDTH / NUMBER_OF_X_TILES);

	this.base = ViewModel;
	this.base.apply(this);

	// Setup renderer
	this.pixiStage_ = new PIXI.Stage(0x66FF99);
	this.pixiRenderer_ = PIXI.autoDetectRenderer(WORLD_WIDTH, WORLD_HEIGHT);
	this.pixiWorld_ = new PIXI.DisplayObjectContainer();
	this.pixiStage_.addChild(this.pixiWorld_);
	document.body.appendChild(this.pixiRenderer_.view);

	// Camera
	this.camera_ = new Camera();
	this.cameraView_ = new CameraView(this.camera_, this.pixiStage_, this.pixiWorld_);
	var cameraContainer = this.cameraView_.getPixiStageMember();

	// Map
	this.map_ = new Map(
		NUMBER_OF_X_TILES,
		NUMBER_OF_Y_TILES,
		TILE_HEIGHT,
	    TILE_WIDTH);
	this.mapView_ = new MapView(this.map_, this.pixiWorld_);


	// Input processor
	// and input action bindings
	this.input_ = new Input();

	// Camera panning
	this.input_.bindKeyDownAction(
		Input.KEYS.UP, Action.ViewActions.PAN_UP);
	this.input_.bindKeyDownAction(
		Input.KEYS.DOWN, Action.ViewActions.PAN_DOWN);
	this.input_.bindKeyDownAction(
		Input.KEYS.RIGHT, Action.ViewActions.PAN_RIGHT);
	this.input_.bindKeyDownAction(
		Input.KEYS.LEFT, Action.ViewActions.PAN_LEFT);
}
MarkoViewModel.prototype = Object.create(ViewModel.prototype);

MarkoViewModel.prototype.render = function() {
	// Render the pixi stage
	this.pixiRenderer_.render(this.pixiStage_);
};


MarkoViewModel.prototype.update = function() {
	// Update the models that have to be updated
	// every game loop here
	this.input_.update();
};


MarkoViewModel.panCameraLeft = function() {
	this.camera_.panLeft();
};


MarkoViewModel.panCameraRight = function() {
	this.camera_.panRight();
};


MarkoViewModel.panCameraUp = function() {
	this.camera_.panUp();
};


MarkoViewModel.panCameraDown = function() {
	this.camera_.panDown();
};