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
import Building = require('../model/building');
import GrainSupply = require('../model/grainsupply');
import GrainSupplyView = require('../view/grainsupplyview');
import Turret = require('../model/turret');
import TurretView = require('../view/turretview');
import Selector = require('../view/selector');
import PathGenerator = require('../util/pathgenerator');
import Constants = require('../util/constants');
import Screen = require('./screen');
import HUDView = require('../view/hudview');

class GameScreen implements Screen {
    // Image for the base grass layer of the map
    private static IMAGE_GRASS = PIXI.Texture.fromImage('img/grass.png');

    private placeModeFade : any;
    private placingBuilding : Building;

    private hud : HUDView;

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
    private zombieManager : Zombie

    private selector : Selector;

    private buttonManager : DomButtonManager;

    private topText : any;

    constructor(pixiStage, pixiWorld, pixiRenderer) {
        this.pixiStage = pixiStage;
        this.pixiWorld = pixiWorld;
        this.pixiRenderer = pixiRenderer;

        // Grab fill rectangle
        this.placeModeFade = this.getFillRectangle(0x000000, 0.5);
    }

    private getFillRectangle(color : number, alpha : number) {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(color, alpha);
        graphics.drawRect(0, 0, Constants.DISPLAY_WIDTH, Constants.DISPLAY_HEIGHT);

        return graphics;
    }

    public onEnterScreen() {
        this.placingBuilding = null;

        // Setup Button Manager

        console.log('CREATING FPS COUNTER...');
        this.topText = new PIXI.Text('0 FPS / 0 DELTA');
        this.topText.x = Constants.DISPLAY_WIDTH / 2;
        this.topText.y = 10;
        this.pixiStage.addChild(this.topText);

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

        console.log('ADDING BASE GRASS BACKGROUND..');
        var backgroundSprite = new PIXI.TilingSprite(
            GameScreen.IMAGE_GRASS, Constants.WORLD_WIDTH, Constants.WORLD_HEIGHT);
        this.pixiWorld.addChild(backgroundSprite);

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
        this.colony = new WorkerColony(this.map, grainary);

        console.log('BUILDING COLLISION MAP..');
        this.pathGenerator.updateCollisionMap();

        console.log('INITIALIZING SELECT HANDLER..');
        // Create select handler
        this.selector = new Selector(this.input, this.camera, this.pixiStage);
        this.selector.addSelectables(this.colony.getWorkers());
        this.selector.addSelectables(this.buildingManager.getBuildings());

        console.log('CREATING BUTTON MANAGER..');
        this.buttonManager = new DomButtonManager(Constants.APP_CONTEXT_DOM_ID);

        console.log('ADDING BUTTONS..');
        this.buttonManager.addButton("Buy Silo", Constants.BUTTON_IDS.BUY_SILO, 'btn', 180, 540);
        this.buttonManager.addButton("Buy Cow", Constants.BUTTON_IDS.BUY_COW, 'btn', 300, 540);


        console.log('ADDING HUD..');
        this.hud = new HUDView(this.pixiStage);

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

    public onRender() {
        this.pixiRenderer.render(this.pixiStage);

    }

    public onUpdate(delta : number) {
        // Update the models that have to be updated
        // every game loop here
        this.input.update();
        this.colony.update();
        this.camera.update();
        this.selector.handleDragging();
        this.topText.setText(Math.round(1.0 / delta) + ' FPS');
        this.maybeUpdateBuildingPlacement();
    }

    public rightClickMap() {
        // Do something telling selected units to move
        var selected = this.selector.getSelected();
        var x = this.map.toTileX(this.input.getMouseX() + this.camera.getX());
        var y = this.map.toTileY(this.input.getMouseY() + this.camera.getY());
        console.log('right click at (' + x + ',' + y + ')');
        for (var i = 0; i < selected.length; i++) {
            if (typeof(selected[i].startMove) != 'undefined')
                selected[i].startMove(x, y);
        }
    }

    private maybeUpdateBuildingPlacement() {
        if (this.placingBuilding) {
            var oldX = this.placingBuilding.getX();
            var oldY = this.placingBuilding.getY();
            var x = this.map.toTileX(this.input.getMouseX() + this.camera.getX());
            var y = this.map.toTileY(this.input.getMouseY() + this.camera.getY());

            if (oldX != x || oldY != y) {
                this.placingBuilding.setX(x);
                this.placingBuilding.setY(y);
                this.placingBuilding.setLocationOkay(this.isPlaceOkay());
                this.placingBuilding.notifyChange();
            }
        }
    }

    public startPlace(buildingType : number) {
        console.log('START PLACE CALLED WITH TYPE ' + buildingType);
        this.pixiStage.addChild(this.placeModeFade);
        this.buttonManager.disableAllButtons();

        this.placingBuilding = new Turret();
        new TurretView(this.placingBuilding, this.camera, this.pixiWorld);

        this.selector.deselectAll();
        this.selector.addToSelected(this.placingBuilding);
    }

    public isPlaceOkay() {
        if (this.placingBuilding) {
            var buildings : Building[] = this.buildingManager.getBuildingsArray();
            for (var i = 0; i < buildings.length; i++) {
                if (buildings[i].overlaps(this.placingBuilding)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    public endPlace() {
        if (this.isPlaceOkay()) {
            this.buildingManager.addBuilding(this.placingBuilding);
            this.pathGenerator.updateCollisionMap();
        } else {
            this.placingBuilding.dispose();
        }

        this.placingBuilding = null;
        this.pixiStage.removeChild(this.placeModeFade);
        this.buttonManager.enableAllButtons();
        this.selector.deselectAll();
    }

    public makeWorker() {
        var worker = new Worker();
        var view = new WorkerView(worker, this.camera, this.pixiWorld);
        this.colony.addWorker(worker);
        worker.onStateChange();
        view.notify();
    }

    public mouseDownMap() {
        this.selector.onMouseDown();
    }

    public mouseUpMap() {
        if (this.placingBuilding) {
            this.endPlace();
        } else {
            this.selector.onMouseUp();
        }
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

export = GameScreen;