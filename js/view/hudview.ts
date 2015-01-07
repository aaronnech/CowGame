import Constants = require('../util/constants');
import PixiView = require('./pixiview');

class HUDView extends PixiView {
    private static IMAGE_BASE =  PIXI.Texture.fromImage('img/hud.png');
    private sprite : any;

    constructor(pixiStage) {
        this.sprite = new PIXI.Sprite(HUDView.IMAGE_BASE);
        super([], pixiStage);
    }

    public makePixiStageMember() {
        this.sprite.visible = true;
        this.sprite.position.x = 0;
        this.sprite.position.y = 0;
        return this.sprite;
    }

    public notify() {
        this.redrawPixiStageMember();
    }
}

export = HUDView;
