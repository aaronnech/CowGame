import Model = require('./model');

class Resource extends Model {
    private type : number;
    public static Type = {
        TREE : 0,
        ROCK : 1
    };

    constructor(type) {
        super();
        this.type = type;
    }
}

export = Resource;