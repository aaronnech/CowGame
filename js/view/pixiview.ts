import Model = require('../model/model');
import PhysicalModel = require('../model/physicalmodel');
import Camera = require('../model/camera');
import Constants = require('../util/constants');

class PixiView {
    private models : Model[];
    private pixiStage : any;
    private pixiChild : any;

    constructor(models, pixiStage) {
        this.models = models;
        for (var i = 0; i < models.length; i++) {
            this.models[i].subscribeView(this);
        }

        this.pixiStage = pixiStage;

        this.pixiChild = this.makePixiStageMember();
        if (this.pixiChild) {
            this.pixiStage.addChild(this.pixiChild);
        }
    }

    public getModels() {
        return this.models;
    }

    public getPixiStageMember() {
        return this.pixiChild;
    }

    public redrawPixiStageMember() {
        if (this.pixiChild) {
            this.pixiStage.removeChild(this.pixiChild);
        }
        this.pixiChild = this.makePixiStageMember();
        if (this.pixiChild) {
            this.pixiStage.addChild(this.pixiChild);
        }
    }

    public dispose() {
        if (this.pixiChild) {
            this.pixiStage.removeChild(this.pixiChild);
        }
        for (var i = 0; i < this.models.length; i++) {
            this.models[i].removeView(this);
        }
    }

    public makePixiStageMember() {
        throw new Error('This method is abstract');
        return null;
    }

    public notify() {
        throw new Error('This method is abstract');
        return null;
    }

    public static getBoundingBox(model : PhysicalModel, color : number) {
        var graphics = new PIXI.Graphics();
        graphics.lineStyle(5, color);
        var x : number = model.getX() * Constants.TILE_WIDTH;
        var y : number = model.getY() * Constants.TILE_HEIGHT;
        var w : number = model.getWidth() * Constants.TILE_WIDTH;
        var h : number = model.getHeight() * Constants.TILE_HEIGHT;
        graphics.drawRect(x, y, w, h);
        return graphics;
    }
}

export = PixiView;