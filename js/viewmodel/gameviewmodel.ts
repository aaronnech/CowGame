import ViewModel = require('./viewmodel');
import Action = require('../controller/action');
import Input = require('../input/input');
import Camera = require('../model/camera');
import CameraView = require('../view/cameraview');
import DomButtonManager = require('../view/dombuttonmanager');
import Map = require('../model/map');
import MapView = require('../view/mapview');
import Worker = require('../model/worker');
import WorkerView = require('../view/workerview');
import WorkerColony = require('../model/workercolony');
import ResourceManager = require('../model/resourcemanager');
import BuildingManager = require('../model/buildingmanager');
import GrainSupply = require('../model/grainsupply');
import GrainSupplyView = require('../view/grainsupplyview');
import Selector = require('../view/selector');
import PathGenerator = require('../util/pathgenerator');
import Constants = require('../util/constants');
import Screen = require('./screen');

class GameViewModel extends ViewModel implements Screen {
    private pixiStage : any;
    private pixiWorld : any;
    private pixiRenderer : any;

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

    private buttonManager : DomButtonManager;

    constructor(pixiStage, pixiWorld, pixiRenderer) {
        super();
        this.pixiStage = pixiStage;
        this.pixiWorld = pixiWorld;
        this.pixiRenderer = pixiRenderer;
    }

    public onEnterScreen() {
        // Setup Button Manager

        console.log('INITIALIZING INPUT..');
        // Input processor
        this.input = new Input(this.pixiRenderer.view);

        console.log('INITALIZING CAMERA..');
        // Camera
        this.camera = new Camera(
            Constants.TILE_WIDTH,
            Constants.TILE_HEIGHT,
            Constants.WORLD_WIDTH,
            Constants.WORLD_HEIGHT,
            Constants.DISPLAY_WIDTH,
            Constants.DISPLAY_HEIGHT);
        this.cameraView = new CameraView(this.camera, this.pixiStage, this.pixiWorld);
        var cameraContainer = this.cameraView.getPixiStageMember();

        console.log('INITIALIZING MAP..');
        // Map
        this.map = new Map(
            Constants.NUMBER_OF_X_TILES,
            Constants.NUMBER_OF_Y_TILES,
            Constants.TILE_HEIGHT,
            Constants.TILE_WIDTH);
        this.mapView = new MapView(this.map, this.camera, this.pixiWorld);

        console.log('CREATING RESOURCE MANAGER..');
        this.resourceManager = new ResourceManager(this.map);

        console.log('SPAWNING INITIAL RESOURCES..');
        this.resourceManager.spawnInitial();

        console.log('CREATING BUILDING MANAGER..');
        this.buildingManager = new BuildingManager(this.map);

        console.log('CREATING PATH GENERATOR..');
        this.pathGenerator = PathGenerator.getInstance(this.map, this.buildingManager);

        console.log('ADDING STARTER GRAINARY BUILDING..');
        var grainary = new GrainSupply();
        new GrainSupplyView(grainary, this.camera, this.pixiWorld);
        grainary.setX(Constants.NUMBER_OF_X_TILES / 2);
        grainary.setY(Constants.NUMBER_OF_Y_TILES / 2);
        this.buildingManager.addBuilding(grainary);

        console.log('SPAWNING COLONY..');
        // Place a colony down (test for now)
        this.colony = new WorkerColony(this.map);
        for (var i = 0; i < 20; i++) {
            var worker = new Worker();
            new WorkerView(worker, this.camera, this.pixiWorld);
            this.colony.addWorker(worker);
            worker.onStateChange();
        }

        console.log('BUILDING COLLISION MAP..');
        this.pathGenerator.updateCollisionMap();

        console.log('INITIALIZING SELECT HANDLER..');
        // Create select handler
        this.selector = new Selector(this.input, this.camera, this.pixiStage);
        this.selector.addSelectables(this.colony.getWorkers());

        console.log('CREATING BUTTON MANAGER..');
        this.buttonManager = new DomButtonManager(Constants.APP_CONTEXT_DOM_ID);

        console.log('ADDING BUTTONS..');
        this.buttonManager.addButton("Buy Silo", Constants.BUTTON_IDS.BUY_SILO, 'btn', 20, 40);
        this.buttonManager.addButton("Buy Cow", Constants.BUTTON_IDS.BUY_COW, 'btn', 20, 20);


        console.log('BINDING INPUT..');
        // Buttons
        this.buttonManager.addClickAction(Constants.BUTTON_IDS.BUY_SILO, Action.ViewActions.CLICK_BUTTON);
        this.buttonManager.addClickAction(Constants.BUTTON_IDS.BUY_COW, Action.ViewActions.CLICK_BUTTON);

        // Map interaction
        this.input.bindLeftMouseDownAction(Action.ViewActions.MOUSE_DOWN_MAP, undefined);
        this.input.bindLeftMouseUpAction(Action.ViewActions.MOUSE_UP_MAP, undefined);
        this.input.bindMouseHitAction(Input.Mouse.RIGHT, Action.ViewActions.RIGHT_CLICK_MAP, undefined);

        // Camera panning
        this.input.bindKeyDownAction(
            Input.Keys.UP, Action.ViewActions.PAN_UP, undefined);
        this.input.bindKeyDownAction(
            Input.Keys.DOWN, Action.ViewActions.PAN_DOWN, undefined);
        this.input.bindKeyDownAction(
            Input.Keys.RIGHT, Action.ViewActions.PAN_RIGHT, undefined);
        this.input.bindKeyDownAction(
            Input.Keys.LEFT, Action.ViewActions.PAN_LEFT, undefined);

        console.log('ATTACHING CAMERA..');
        // Move the camera to the starting position
        this.camera.moveX(Constants.WORLD_WIDTH / 2);
        this.camera.moveY(Constants.WORLD_HEIGHT / 2);

        console.log('READY..');
    }

    public onExitScreen(fn : Function) {
        fn();
    }

    public update() {
        // Update the models that have to be updated
        // every game loop here
        this.input.update();
        this.colony.update();
        this.camera.update();
        this.selector.handleDragging();
    }

    public rightClickMap() {
        // Do something telling selected units to move
        var selected = this.selector.getSelected();
        var x = this.map.toTileX(this.input.getMouseX() + this.camera.getX());
        var y = this.map.toTileY(this.input.getMouseY() + this.camera.getY());
        console.log('right click at (' + x + ',' + y + ')');
        for (var i = 0; i < selected.length; i++) {
            selected[i].startMove(x, y);
        }
    }

    public mouseDownMap() {
        this.selector.onMouseDown();
    }

    public mouseUpMap() {
        this.selector.onMouseUp();
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

export = GameViewModel;