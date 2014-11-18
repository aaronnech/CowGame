import Model = require('./model');
import Tile = require('./tile');

class Map extends Model {
    private tileWidth : number;
    private tileHeight : number;
    private width : number;
    private height : number;
    private tiles : Tile[];

    constructor(width, height, tileWidth, tileHeight) {
        super();

        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.width = width;
        this.height = height;
        this.tiles = [];

        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                this.tiles[this.toLinearIndex(x, y)] =
                    new Tile(tileWidth, tileHeight);
            }
        }
        console.log('map constructed with ' + this.tiles.length + ' tiles');
        console.log('map dimensions: (w,h) = (' + this.width + ',' + this.height + ')');
    }

    public getWidth() {
        return this.width;
    }

    public getHeight() {
        return this.height;
    }

    public forEachTile(f) {
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                var tile = this.getTile(x, y);
                if (tile) {
                    f(tile, x, y);
                }
            }
        }
    }

    public forEachTileInRect(x, y, w, h, f) {
        var startX = this.toTileX(x);
        var endX = this.toTileX(w) + startX;
        var startY = this.toTileX(y);
        var endY = this.toTileX(h) + startY + 1;

        for (var i = startY; i <= endY; i++) {
            for (var j = startX; j <= endX; j++) {
                var tile = this.getTile(j, i);
                if (tile) {
                    f(tile, j, i);
                }
            }
        }
    }

    public isInMap(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    public toTileX(x) {
        return Math.floor(x / this.tileWidth);
    }

    public toTileY(y) {
        return Math.floor(y / this.tileHeight);
    }

    public randomTileX() {
        return Math.floor(Math.random() * this.width);
    }

    public randomTileY() {
        return Math.floor(Math.random() * this.height);
    }

    private toLinearIndex(x, y) {
        return Math.floor(y * this.width + x);
    }

    public getTile(x, y) {
        if (this.isInMap(x, y)) {
            return this.tiles[this.toLinearIndex(x, y)];
        } else {
            return null;
        }
    }
}

export = Map;