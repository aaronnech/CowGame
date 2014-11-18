import Building = require('./building');

class GrainSupply extends Building {
    private static INITIAL_SUPPLY : number = 500;
    private count;

    constructor() {
        super();
        this.count = GrainSupply.INITIAL_SUPPLY;
    }

    public getWidth() {
        return 6;
    }

    public getHeight() {
        return 6;
    }
}

export = GrainSupply;