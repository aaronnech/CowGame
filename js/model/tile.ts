import Model = require('./model');

class Tile extends Model {
    private static TYPES : any = {
        GRASS : 1
    };

    private type : number;
    private width : number;
    private height : number;
    private isOccupied : boolean;

    constructor(width, height) {
        super();
        this.isOccupied = false;
        this.type = Tile.TYPES.GRASS;
        this.width = width;
        this.height = height;
    }

    public getWidth() {
        return this.width;
    }


    public getHeight() {
        return this.height;
    }


    public getType() {
        return this.type;
    }


    public getIsOccupied() {
        return this.isOccupied;
    }
}

export = Tile;