import Camera = require('../model/camera');
import Worker = require('../model/worker');
import PixiView = require('./pixiview');
import PathGenerator = require('../util/pathgenerator');
import MarkoViewModel = require('../viewmodel/markoviewmodel');

class WorkerView extends PixiView {
    private worker : Worker;
    private camera : Camera;

    constructor(workerModel, cameraModel, pixiStage) {
        super([workerModel, cameraModel], pixiStage);
        this.worker = workerModel;
        this.camera = cameraModel;
    }

    public makePixiStageMember() {
        var x = this.worker.getX() * MarkoViewModel.TILE_WIDTH;
        var y = this.worker.getY() * MarkoViewModel.TILE_HEIGHT;
        if (this.camera.inView(x, y)) {
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
                        break;
                    case PathGenerator.ManhattanDirection.MOVE_WEST:
                        moveMultiplierX = -1;
                        break;
                    case PathGenerator.ManhattanDirection.MOVE_SOUTH:
                        moveMultiplierY = 1;
                        break;
                    case PathGenerator.ManhattanDirection.MOVE_NORTH:
                        moveMultiplierY = -1;
                        break;
                }
                moveDeltaX =
                    moveMultiplierX * moveProgress * MarkoViewModel.TILE_WIDTH;
                moveDeltaY =
                    moveMultiplierY * moveProgress * MarkoViewModel.TILE_HEIGHT;
            }

            var graphics = new PIXI.Graphics();
            var color = this.worker.isSelected() ? 0xFF0000 : 0xFFFFFF;
            graphics.beginFill(color);
            graphics.drawRect(
                x + MarkoViewModel.TILE_WIDTH / 4 + moveDeltaX,
                y + MarkoViewModel.TILE_WIDTH / 4 + moveDeltaY,
                MarkoViewModel.TILE_WIDTH / 2,
                MarkoViewModel.TILE_HEIGHT / 2);
            graphics.endFill();
            return graphics;
        }
        return null;
    }


    public notify() {
        this.redrawPixiStageMember();
    }
}

export = WorkerView;