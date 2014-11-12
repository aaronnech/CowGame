import PixiView = require('../view/pixiview');

class Model {
    private views : PixiView[];

    constructor() {
        this.views = [];
    }

    public subscribeView(view) {
        this.views.push(view);
    }

    public removeView(view) {
        var index = this.views.indexOf(view);
        if (index != -1) {
            this.views.splice(index, 1);
        }
    }

    public notifyChange() {
        for (var i = 0; i < this.views.length; i++) {
            this.views[i].notify();
        }
    }

    public dispose() {
        for (var i = 0; i < this.views.length; i++) {
            this.views[i].dispose();
        }
        this.views = [];
    }
}

export = Model;