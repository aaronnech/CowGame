import Action = require('./action');

class Controller {
    constructor(game) {
        this.setBindings();
    }

    public bind(action : Action, f : Function) {
        action.addBinding(this, f);
    }

    public clearBindings(action : Action) {
        action.removeAllBindings(this);
    }

    public setBindings() {
        throw new Error('Abstact Method called!');
    }
}

export = Controller;