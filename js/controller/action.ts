class Action {
    private bindings : any;

    public static NO_SOURCE : any = null;

    public static GameActions : any = {
        RENDER : new Action(),
        UPDATE : new Action(),
        STOP : new Action(),
        START : new Action()
    }

    public static ViewActions : any = {
        PAN_RIGHT : new Action(),
        PAN_LEFT : new Action(),
        PAN_UP : new Action(),
        PAN_DOWN : new Action(),
        MOVE_RIGHT : new Action(),
        MOVE_LEFT : new Action(),
        MOVE_UP : new Action(),
        MOVE_DOWN : new Action(),
        CLICK_MAP : new Action()
    }

    constructor() {
        this.bindings = [];
    }

    public fire = function(source, data) {
        for (var i = 0; i < this.bindings.length; i++) {
            this.bindings[i].callback.apply(
                this.bindings[i].binder, source, data);
        }
    }


    public addBinding = function(binder, callback) {
        this.bindings.push({
            'binder' : binder,
            'callback' : callback
        });
    }


    public removeAllBindings = function(binder) {
        this.bindings = this.bindings.filter(function(binding) {
            return binding.binder != binder;
        });
    }
}

export = Action;