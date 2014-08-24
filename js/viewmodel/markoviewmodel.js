function MarkoViewModel() {
	this.base = ViewModel;
	this.base.apply(this);

	console.log('CREATING MARKO GAME..');

	console.log('SETTING UP RENDERER..');
	// Setup renderer
	this.pixiStage_ = new PIXI.Stage(0x339933);
	this.pixiRenderer_ = PIXI.autoDetectRenderer(
		MarkoViewModel.DISPLAY_WIDTH, MarkoViewModel.DISPLAY_HEIGHT);
	this.pixiWorld_ = new PIXI.DisplayObjectContainer();
	this.pixiStage_.addChild(this.pixiWorld_);
	document.body.appendChild(this.pixiRenderer_.view);

	console.log('INITIALIZING INPUT..');
	// Input processor
	this.input_ = new Input(this.pixiRenderer_.view);

	console.log('INITALIZING CAMERA..');
	// Camera
	this.camera_ = new Camera(
		MarkoViewModel.WORLD_WIDTH,
		MarkoViewModel.WORLD_HEIGHT,
		MarkoViewModel.DISPLAY_WIDTH,
		MarkoViewModel.DISPLAY_HEIGHT);
	this.cameraView_ = new CameraView(this.camera_, this.pixiStage_, this.pixiWorld_);
	var cameraContainer = this.cameraView_.getPixiStageMember();

	console.log('INITIALIZING MAP..');
	// Map
	this.map_ = new Map(
		MarkoViewModel.NUMBER_OF_X_TILES,
		MarkoViewModel.NUMBER_OF_Y_TILES,
		MarkoViewModel.TILE_HEIGHT,
	    MarkoViewModel.TILE_WIDTH);
	this.mapView_ = new MapView(this.map_, this.camera_, this.pixiWorld_);

	console.log('CREATING PATH GENERATOR..');
	this.pathGenerator_ = PathGenerator.getInstance(this.map_);

	console.log('SPAWNING COLONY..');
	// Place a colony down (test for now)
	this.colony_ = new WorkerColony(this.map_);
	for (var i = 0; i < 100; i++) {
		var worker = new Worker();
		var workerView = new WorkerView(worker, this.camera_, this.pixiWorld_);
		this.colony_.addWorker(worker);
		worker.onStateChange();
	}

	console.log('CREATING RESOURCE MANAGER..');
	this.resourceManager_ = new ResourceManager(this.map_);

	console.log('CREATING BULLET MANAGER..');
	this.bulletManager_ = new BulletManager(this.map_, this.colony_);

	console.log('SPAWNING INITIAL RESOURCES..');
	this.resourceManager_.spawnInitial();

	console.log('CREATING BUILDING MANAGER..');
	this.buildingManager_ = new BuildingManager(this.map_);


	console.log('SPAWNING HERO..');
	var startX = Math.floor(MarkoViewModel.NUMBER_OF_X_TILES / 2);
	var startY = Math.floor(MarkoViewModel.NUMBER_OF_Y_TILES / 2);
	this.hero_ = new Hero(this.bulletManager_, startX, startY);
	this.heroView_ = new HeroView(this.hero_, this.camera_, this.pixiWorld_);

	console.log('INITIALIZING SELECT HANDLER..');
	// Create select handler
	this.selector_ = new Selector(this.input_, this.camera_);
	this.selector_.addSelectables(this.colony_.getWorkers());

	console.log('BINDING INPUT..');
	// Map interaction
	this.input_.bindMouseHitAction(
		Input.Mouse.LEFT, Action.ViewActions.CLICK_MAP);

	// Camera panning
	this.input_.bindKeyDownAction(
		Input.Keys.UP, Action.ViewActions.PAN_UP);
	this.input_.bindKeyDownAction(
		Input.Keys.DOWN, Action.ViewActions.PAN_DOWN);
	this.input_.bindKeyDownAction(
		Input.Keys.RIGHT, Action.ViewActions.PAN_RIGHT);
	this.input_.bindKeyDownAction(
		Input.Keys.LEFT, Action.ViewActions.PAN_LEFT);

	// Hero moving
	this.input_.bindKeyDownAction(
		Input.Keys.W, Action.ViewActions.MOVE_UP);
	this.input_.bindKeyDownAction(
		Input.Keys.S, Action.ViewActions.MOVE_DOWN);
	this.input_.bindKeyDownAction(
		Input.Keys.D, Action.ViewActions.MOVE_RIGHT);
	this.input_.bindKeyDownAction(
		Input.Keys.A, Action.ViewActions.MOVE_LEFT);

	console.log('ATTACHING CAMERA..');
	// Move the camera to the starting position
	this.camera_.moveX(MarkoViewModel.WORLD_WIDTH / 2);
	this.camera_.moveY(MarkoViewModel.WORLD_HEIGHT / 2);

	console.log('READY..');
}
MarkoViewModel.prototype = Object.create(ViewModel.prototype);

MarkoViewModel.DISPLAY_WIDTH = 800;
MarkoViewModel.DISPLAY_HEIGHT = 600;
MarkoViewModel.WORLD_WIDTH = 16384;
MarkoViewModel.WORLD_HEIGHT = 16384;
MarkoViewModel.TILE_HEIGHT = 32;
MarkoViewModel.TILE_WIDTH = 32;
MarkoViewModel.NUMBER_OF_X_TILES =
	MarkoViewModel.WORLD_WIDTH / MarkoViewModel.TILE_WIDTH;
MarkoViewModel.NUMBER_OF_Y_TILES =
	MarkoViewModel.WORLD_HEIGHT / MarkoViewModel.TILE_HEIGHT;


MarkoViewModel.prototype.render = function() {
	// Render the pixi stage
	this.pixiRenderer_.render(this.pixiStage_);
};


MarkoViewModel.prototype.update = function() {
	// Update the models that have to be updated
	// every game loop here
	this.input_.update();
	this.colony_.update();
	this.hero_.update();
	this.bulletManager_.update();
	this.camera_.update();
};


MarkoViewModel.prototype.clickMap = function() {
	this.selector_.onClickMap();
	this.makeBullet(
		this.hero_.getX(),
		this.hero_.getY(),
		this.selector_.getLastMapClickX(),
		this.selector_.getLastMapClickY());
};

MarkoViewModel.prototype.makeBullet =
		function(sourceX, sourceY, destX, destY) {
	var deltaY = sourceY - destY;
	var deltaX = sourceX - destX;
	var angle = Math.atan2(deltaY, deltaX);
	var normalizedY = -1 * Math.sin(angle);
	var normalizedX = -1 * Math.cos(angle);
	var bullet = new Bullet();
	bullet.setX(sourceX + 0.5);
	bullet.setY(sourceY + 0.5);
	bullet.setDx(normalizedX);
	bullet.setDy(normalizedY);
	var bulletView = new BulletView(
		bullet, this.camera_, this.pixiWorld_);
	this.bulletManager_.addBullet(bullet);
};


MarkoViewModel.prototype.panCameraLeft = function() {
	this.camera_.panLeft();
};


MarkoViewModel.prototype.panCameraRight = function() {
	this.camera_.panRight();
};


MarkoViewModel.prototype.panCameraUp = function() {
	this.camera_.panUp();
};


MarkoViewModel.prototype.panCameraDown = function() {
	this.camera_.panDown();
};

MarkoViewModel.prototype.moveHeroLeft = function() {
	this.hero_.moveLeft();
};


MarkoViewModel.prototype.moveHeroRight = function() {
	this.hero_.moveRight();
};


MarkoViewModel.prototype.moveHeroUp = function() {
	this.hero_.moveUp();
};


MarkoViewModel.prototype.moveHeroDown = function() {
	this.hero_.moveDown();
};