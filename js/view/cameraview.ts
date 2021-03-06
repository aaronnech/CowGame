import Model = require('../model/model');
import Camera = require('../model/camera');
import PixiView = require('./pixiview');

class CameraView extends PixiView {
    private world : any;
    private camera : Camera;

    constructor(cameraModel : Camera, pixiStage : any, world : any) {
        this.world = world;
        this.camera = cameraModel;
        super([cameraModel], pixiStage);
    }

    public makePixiStageMember() {
        return new PIXI.DisplayObjectContainer();
    }

    public notify() {
        this.world.position.x = -this.camera.getX();
        this.world.position.y = -this.camera.getY();
    }
}

export = CameraView;