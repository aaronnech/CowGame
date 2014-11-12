import Model = require('./model');

class Tile extends Model {
    private color : number;
    private width : number;
    private height : number;
    private isOccupied : boolean;

    constructor(width, height) {
        super();
        this.isOccupied = false;
        this.color = Math.random() > 0.5 ? null : 0x33AA33;
        this.width = width;
        this.height = height;
    }

    public getWidth() {
        return this.width;
    }


    public getHeight() {
        return this.height;
    }


    public getColor() {
        return this.color;
    }


    public getIsOccupied() {
        return this.isOccupied;
    }
}

export = Tile;