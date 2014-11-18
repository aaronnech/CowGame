import Model = require('../model/model');
import Camera = require('../model/camera');

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
}

export = PixiView;