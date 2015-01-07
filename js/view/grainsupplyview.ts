import Constants = require('../util/constants');
import Camera = require('../model/camera');
import GrainSupply = require('../model/grainsupply');
import PixiView = require('./pixiview');

class GrainSupplyView extends PixiView {
    private static IMAGE =  PIXI.Texture.fromImage('img/building.mainbase.png');
    private static IMAGE_ACTIVE =  PIXI.Texture.fromImage('img/cow_hl.png');

    private grainSupply : GrainSupply;
    private camera : Camera;
    private sprite : any;
    private activeSprite : any;

    constructor(grainSupplyModel, cameraModel, pixiStage) {
        this.grainSupply = grainSupplyModel;
        this.camera = cameraModel;

        this.sprite = new PIXI.Sprite(GrainSupplyView.IMAGE);
        this.activeSprite = new PIXI.Sprite(GrainSupplyView.IMAGE_ACTIVE);
        super([grainSupplyModel, cameraModel], pixiStage);
    }

    public makePixiStageMember() {
        var selectedContainer = new PIXI.DisplayObjectContainer();
        var x = this.grainSupply.getX() * Constants.TILE_WIDTH;
        var y = this.grainSupply.getY() * Constants.TILE_HEIGHT;
        if (this.camera.modelInView(this.grainSupply)) {
            this.sprite.visible = true;
            this.sprite.position.x = x;
            this.sprite.position.y = y;
            if (this.grainSupply.isSelected()) {
                selectedContainer.addChild(PixiView.getBoundingBox(this.grainSupply, 0xFF0000));
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

export = GrainSupplyView;
