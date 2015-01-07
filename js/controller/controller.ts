import Action = require('./action');
import Game = require('../game/game');

class Controller {
    public game : Game; // Protected

    constructor(game) {
        this.game = game;
        this.setBindings();
    }

    public bind(action : Action, f : Function) {
        action.addBinding(this, f);
    }

    public bindToScreen(action : Action, screenName : string, screenFn : string) {
        action.addBinding(this, (source, data) => {
            this.handleScreenBinding(source, data, screenName, screenFn);
        });
    }

    public clearBindings(action : Action) {
        action.removeAllBindings(this);
    }

    public setBindings() {
        throw new Error('Abstact Method called!');
    }

    public callScreenAction(screenName : string, screenFn : string, args? : any) {
        var screen = this.game.getScreen(screenName);
        if (screen && this.game.getCurrentScreen() == screen) {
            screen[screenFn].apply(screen, args);
        }
    }

    private handleScreenBinding(source, data, screenName, screenFn) {
        this.callScreenAction(screenName, screenFn, [source, data]);
    }
}

export = Controller;