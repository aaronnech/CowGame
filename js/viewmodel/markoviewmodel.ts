import ViewModel = require('./viewmodel');
import Action = require('../controller/action');
import Input = require('../input/input');
import Camera = require('../model/camera');
import CameraView = require('../view/cameraview');
import Map = require('../model/map');
import MapView = require('../view/mapview');
import Worker = require('../model/worker');
import WorkerView = require('../view/workerview');
import WorkerColony = require('../model/workercolony');
import ResourceManager = require('../model/resourcemanager');
import BuildingManager = require('../model/buildingmanager');
import Selector = require('../view/selector');
import PathGenerator = require('../util/pathgenerator');

class MarkoViewModel extends ViewModel {
    public static DISPLAY_WIDTH : number = 800;
    public static DISPLAY_HEIGHT : number = 600;
    public static WORLD_WIDTH : number = 16384;
    public static WORLD_HEIGHT : number = 16384;
    public static TILE_HEIGHT : number = 32;
    public static TILE_WIDTH : number = 32;
    public static NUMBER_OF_X_TILES : number =
        MarkoViewModel.WORLD_WIDTH / MarkoViewModel.TILE_WIDTH;
    public static NUMBER_OF_Y_TILES : number =
        MarkoViewModel.WORLD_HEIGHT / MarkoViewModel.TILE_HEIGHT;

    private pixiStage : any;
    private pixiRenderer : any;
    private pixiWorld : any;

    private input : Input;

    private camera : Camera;
    private cameraView : CameraView;

    private map : Map;
    private mapView : MapView;

    private pathGenerator : PathGenerator;

    private colony : WorkerColony;
    private resourceManager : ResourceManager;
    private buildingManager : BuildingManager;

    private selector : Selector;

	constructor() {
        super();
        console.log('CREATING MARKO GAME..');

        console.log('SETTING UP RENDERER / CANVAS ELEMENT..');
        // Setup renderer
        this.pixiStage = new PIXI.Stage(0x339933);
        this.pixiRenderer = PIXI.autoDetectRenderer(
            MarkoViewModel.DISPLAY_WIDTH, MarkoViewModel.DISPLAY_HEIGHT);
        this.pixiWorld = new PIXI.DisplayObjectContainer();
        this.pixiStage.addChild(this.pixiWorld);
        document.body.appendChild(this.pixiRenderer.view);

        console.log('INITIALIZING INPUT..');
        // Input processor
        this.input = new Input(this.pixiRenderer.view);

        console.log('INITALIZING CAMERA..');
        // Camera
        this.camera = new Camera(
            MarkoViewModel.WORLD_WIDTH,
            MarkoViewModel.WORLD_HEIGHT,
            MarkoViewModel.DISPLAY_WIDTH,
            MarkoViewModel.DISPLAY_HEIGHT);
        this.cameraView = new CameraView(this.camera, this.pixiStage, this.pixiWorld);
        var cameraContainer = this.cameraView.getPixiStageMember();

        console.log('INITIALIZING MAP..');
        // Map
        this.map = new Map(
            MarkoViewModel.NUMBER_OF_X_TILES,
            MarkoViewModel.NUMBER_OF_Y_TILES,
            MarkoViewModel.TILE_HEIGHT,
            MarkoViewModel.TILE_WIDTH);
        this.mapView = new MapView(this.map, this.camera, this.pixiWorld);

        console.log('CREATING PATH GENERATOR..');
        this.pathGenerator = PathGenerator.getInstance(this.map);

        console.log('SPAWNING COLONY..');
        // Place a colony down (test for now)
        this.colony = new WorkerColony(this.map);
        for (var i = 0; i < 100; i++) {
            var worker = new Worker();
            var workerView = new WorkerView(worker, this.camera, this.pixiWorld);
            this.colony.addWorker(worker);
            worker.onStateChange();
        }

        console.log('CREATING RESOURCE MANAGER..');
        this.resourceManager = new ResourceManager(this.map);

        console.log('SPAWNING INITIAL RESOURCES..');
        this.resourceManager.spawnInitial();

        console.log('CREATING BUILDING MANAGER..');
        this.buildingManager = new BuildingManager(this.map);

        console.log('INITIALIZING SELECT HANDLER..');
        // Create select handler
        this.selector = new Selector(this.input, this.camera);
        this.selector.addSelectables(this.colony.getWorkers());

        console.log('BINDING INPUT..');
        // Map interaction
        this.input.bindMouseHitAction(
            Input.Mouse.LEFT, Action.ViewActions.CLICK_MAP, undefined);

        // Camera panning
        this.input.bindKeyDownAction(
            Input.Keys.UP, Action.ViewActions.PAN_UP, undefined);
        this.input.bindKeyDownAction(
            Input.Keys.DOWN, Action.ViewActions.PAN_DOWN, undefined);
        this.input.bindKeyDownAction(
            Input.Keys.RIGHT, Action.ViewActions.PAN_RIGHT, undefined);
        this.input.bindKeyDownAction(
            Input.Keys.LEFT, Action.ViewActions.PAN_LEFT, undefined);

        // Hero moving
        this.input.bindKeyDownAction(
            Input.Keys.W, Action.ViewActions.MOVE_UP, undefined);
        this.input.bindKeyDownAction(
            Input.Keys.S, Action.ViewActions.MOVE_DOWN, undefined);
        this.input.bindKeyDownAction(
            Input.Keys.D, Action.ViewActions.MOVE_RIGHT, undefined);
        this.input.bindKeyDownAction(
            Input.Keys.A, Action.ViewActions.MOVE_LEFT, undefined);

        console.log('ATTACHING CAMERA..');
        // Move the camera to the starting position
        this.camera.moveX(MarkoViewModel.WORLD_WIDTH / 2);
        this.camera.moveY(MarkoViewModel.WORLD_HEIGHT / 2);

        console.log('READY..');
    }

    public render() {
        // Render the pixi stage
        this.pixiRenderer.render(this.pixiStage);
    }

    public update() {
        // Update the models that have to be updated
        // every game loop here
        this.input.update();
        this.colony.update();
        this.camera.update();
    }

    public clickMap() {
        this.selector.onClickMap();
    }

    public panCameraLeft() {
        this.camera.panLeft();
    }

    public panCameraRight() {
        this.camera.panRight();
    }

    public panCameraUp() {
        this.camera.panUp();
    }

    public panCameraDown() {
        this.camera.panDown();
    }
}

export = MarkoViewModel;