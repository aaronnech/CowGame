import Constants = require('../util/constants');
import Camera = require('../model/camera');
import Worker = require('../model/worker');
import PixiView = require('./pixiview');
import PathGenerator = require('../util/pathgenerator');

class WorkerView extends PixiView {
    private static IMAGE =  PIXI.Texture.fromImage('img/cow.png');

    private worker : Worker;
    private camera : Camera;
    private sprite : any;

    constructor(workerModel, cameraModel, pixiStage) {
        this.worker = workerModel;
        this.camera = cameraModel;

        this.sprite = new PIXI.Sprite(WorkerView.IMAGE);
        this.sprite.pivot.x = 9;
        this.sprite.pivot.y = 16;
        var rotations = [Math.PI / 2, 3 * Math.PI / 2,  Math.PI, 0];
        this.sprite.rotation = rotations[Math.floor(Math.random() * rotations.length)];
        super([workerModel, cameraModel], pixiStage);
    }

    public makePixiStageMember() {
        var selectedContainer = new PIXI.DisplayObjectContainer();
        var x = this.worker.getX() * Constants.TILE_WIDTH + 9;
        var y = this.worker.getY() * Constants.TILE_HEIGHT + 16;
        if (this.camera.modelInView(this.worker)) {
            this.sprite.visible = true;
            var deltas = this.getMoveDeltas();
            this.sprite.position.x = x + deltas.x;
            this.sprite.position.y = y + deltas.y;
            selectedContainer.addChild(this.sprite);
            if (this.worker.isSelected()) {
                selectedContainer.addChild(PixiView.getBoundingBox(this.worker, 0xFF0000));
            }
        } else {
            this.sprite.visible = false;
        }
        return selectedContainer;
    }

    private getMoveDeltas() {
        // Calculate move deltas
        // for linear interopolation
        var moveDeltaX = 0;
        var moveDeltaY = 0;
        var moveProgress = this.worker.getMoveProgress();
        if (moveProgress != 0) {
            var direction = this.worker.getDirection();
            var moveMultiplierX = 0;
            var moveMultiplierY = 0;
            switch (direction) {
                case PathGenerator.ManhattanDirection.MOVE_EAST:
                    moveMultiplierX = 1;
                    this.sprite.rotation = Math.PI / 2;
                    break;
                case PathGenerator.ManhattanDirection.MOVE_WEST:
                    moveMultiplierX = -1;
                    this.sprite.rotation = 3 * Math.PI / 2;
                    break;
                case PathGenerator.ManhattanDirection.MOVE_SOUTH:
                    moveMultiplierY = 1;
                    this.sprite.rotation = Math.PI;
                    break;
                case PathGenerator.ManhattanDirection.MOVE_NORTH:
                    moveMultiplierY = -1;
                    this.sprite.rotation = 0;
                    break;
            }
            moveDeltaX =
                moveMultiplierX * moveProgress * Constants.TILE_WIDTH;
            moveDeltaY =
                moveMultiplierY * moveProgress * Constants.TILE_HEIGHT;
        }
        return {x : moveDeltaX, y : moveDeltaY};
    }


    public notify() {
        this.redrawPixiStageMember();
    }
}

export = WorkerView;