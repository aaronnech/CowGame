import Constants = require('../util/constants');
import Camera = require('../model/camera');
import Zombie = require('../model/zombie');
import PixiView = require('./pixiview');
import PathGenerator = require('../util/pathgenerator');

class ZombieView extends PixiView {
    private static IMAGE =  PIXI.Texture.fromImage('img/cow.png');

    private zombie : Zombie;
    private camera : Camera;
    private sprite : any;

    constructor(zombieModel, cameraModel, pixiStage) {
        this.zombie = zombieModel;
        this.camera = cameraModel;

        this.sprite = new PIXI.Sprite(ZombieView.IMAGE);
        this.sprite.pivot.x = 9;
        this.sprite.pivot.y = 16;
        var rotations = [Math.PI / 2, 3 * Math.PI / 2,  Math.PI, 0];
        this.sprite.rotation = rotations[Math.floor(Math.random() * rotations.length)];
        super([zombieModel, cameraModel], pixiStage);
    }

    public makePixiStageMember() {
        var selectedContainer = new PIXI.DisplayObjectContainer();
        var x = this.zombie.getX() * Constants.TILE_WIDTH + 9;
        var y = this.zombie.getY() * Constants.TILE_HEIGHT + 16;
        if (this.camera.modelInView(this.zombie)) {
            this.sprite.visible = true;
            var deltas = this.getMoveDeltas();
            this.sprite.position.x = x + deltas.x;
            this.sprite.position.y = y + deltas.y;
            selectedContainer.addChild(this.sprite);
            if (this.zombie.isSelected()) {
                selectedContainer.addChild(PixiView.getBoundingBox(this.zombie, 0xFF0000));
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
        var moveProgress = this.zombie.getMoveProgress();
        if (moveProgress != 0) {
            var direction = this.zombie.getDirection();
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

export = ZombieView;