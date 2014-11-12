import SpacialHash = require('../util/spacialhash');
import Map = require('./map');
import Model = require('./model');

class BuildingManager extends Model {
    private map : Map;
    private buildings : SpacialHash;
    private buildingsArray : any;

    constructor(mapModel : Map) {
        super();
        this.map = mapModel;
        this.buildings = new SpacialHash(
            this.map.getWidth(),
            this.map.getHeight(),
            9);
        this.buildingsArray = [];
    }
}

export = BuildingManager;