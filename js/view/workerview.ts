import Constants = require('../util/constants');
import Camera = require('../model/camera');
import Worker = require('../model/worker');
import PixiView = require('./pixiview');
import PathGenerator = require('../util/pathgenerator');

class WorkerView extends PixiView {
    private static IMAGE =  PIXI.Texture.fromImage('img/cow.png');
    private static IMAGE_ACTIVE =  PIXI.Texture.fromImage('img/cow_hl.png');

    private worker : Worker;
    private camera : Camera;
    private sprite : any;
    private activeSprite : any;

    constructor(workerModel, cameraModel, pixiStage) {
        this.worker = workerModel;
        this.camera = cameraModel;

        this.sprite = new PIXI.Sprite(WorkerView.IMAGE);
        this.activeSprite = new PIXI.Sprite(WorkerView.IMAGE_ACTIVE);
        this.sprite.pivot.x = this.activeSprite.pivot.x = 9;
        this.sprite.pivot.y = this.activeSprite.pivot.y = 16;
        var rotations = [Math.PI / 2, 3 * Math.PI / 2,  Math.PI, 0];
        this.sprite.rotation = this.activeSprite.rotation = rotations[Math.floor(Math.random() * rotations.length)];
        super([workerModel, cameraModel], pixiStage);
    }

    public makePixiStageMember() {
        var x = this.worker.getX() * Constants.TILE_WIDTH + 9;
        var y = this.worker.getY() * Constants.TILE_HEIGHT + 16;
        if (this.camera.modelInView(this.worker)) {
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
                        this.activeSprite.rotation = Math.PI / 2;
                        break;
                    case PathGenerator.ManhattanDirection.MOVE_WEST:
                        moveMultiplierX = -1;
                        this.sprite.rotation = 3 * Math.PI / 2;
                        this.activeSprite.rotation = 3 * Math.PI / 2;
                        break;
                    case PathGenerator.ManhattanDirection.MOVE_SOUTH:
                        moveMultiplierY = 1;
                        this.sprite.rotation = Math.PI;
                        this.activeSprite.rotation = Math.PI;
                        break;
                    case PathGenerator.ManhattanDirection.MOVE_NORTH:
                        moveMultiplierY = -1;
                        this.sprite.rotation = 0;
                        this.activeSprite.rotation = 0;
                        break;
                }
                moveDeltaX =
                    moveMultiplierX * moveProgress * Constants.TILE_WIDTH;
                moveDeltaY =
                    moveMultiplierY * moveProgress * Constants.TILE_HEIGHT;
            }
            this.sprite.visible = !this.worker.isSelected();
            this.activeSprite.visible = this.worker.isSelected();
            this.sprite.position.x = x + moveDeltaX;
            this.sprite.position.y = y + moveDeltaY;
            this.activeSprite.position.x = x + moveDeltaX;
            this.activeSprite.position.y = y + moveDeltaY;
        } else {
            this.sprite.visible = false;
            this.activeSprite.visible = false;
        }
        return this.worker.isSelected() ? this.activeSprite : this.sprite;
    }


    public notify() {
        this.redrawPixiStageMember();
    }
}

export = WorkerView;