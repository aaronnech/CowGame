import Constants = require('../util/constants');
import Camera = require('../model/camera');
import Turret = require('../model/turret');
import PixiView = require('./pixiview');

class TurretView extends PixiView {
    private static IMAGE_BASE =  PIXI.Texture.fromImage('img/building.turret_base.png');

    private turret : Turret;
    private camera : Camera;
    private sprite : any;

    constructor(turretModel, cameraModel, pixiStage) {
        this.turret = turretModel;
        this.camera = cameraModel;

        this.sprite = new PIXI.Sprite(TurretView.IMAGE_BASE);
        super([turretModel, cameraModel], pixiStage);
    }

    public makePixiStageMember() {
        var selectedContainer = new PIXI.DisplayObjectContainer();
        var x = this.turret.getX() * Constants.TILE_WIDTH;
        var y = this.turret.getY() * Constants.TILE_HEIGHT;
        if (this.camera.modelInView(this.turret)) {
            this.sprite.visible = true;
            this.sprite.position.x = x;
            this.sprite.position.y = y;
            if (this.turret.isSelected()) {
                selectedContainer.addChild(PixiView.getBoundingBox(this.turret, 0xFF0000));
            }
        } else {
            this.sprite.visible = false;
        }
        selectedContainer.addChild(this.sprite);
        return selectedContainer;
    }

    public notify() {
        this.redrawPixiStageMember();
    }
}

export = TurretView;
