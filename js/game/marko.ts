import Game = require('./game');
import Action = require('../controller/action');
import ClientController = require('../controller/clientcontroller');

class Marko extends Game {
    private controller : ClientController;

    constructor() {
        super();
        this.controller = new ClientController(this);
    }

    public onRender() {
        Action.GameActions.RENDER.fire(Action.NO_SOURCE);
    }

    public onUpdate(delta) {
        Action.GameActions.UPDATE.fire(Action.NO_SOURCE, delta);
    }

    public onStart() {
        Action.GameActions.START.fire(Action.NO_SOURCE);
    }

    public onShutDown() {
        Action.GameActions.STOP.fire(Action.NO_SOURCE);
    }
}

export = Marko;