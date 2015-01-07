import Building = require('./building');

class Turret extends Building {

    constructor() {
        super();
    }

    public getWidth() {
        return 2;
    }

    public getHeight() {
        return 2;
    }
}

export = Turret;