import Model = require('./model');
import Map = require('./map');
import SpacialHash = require('../util/spacialhash');
import Resource = require('./resource');

class ResourceManager extends Model {
    private map : Map;
    private resources : SpacialHash;
    private resourcesArray : Resource[];


    constructor(mapModel : Map) {
        super();
        this.map = mapModel;
        this.resources = new SpacialHash(
            this.map.getWidth(),
            this.map.getHeight(),
            9);
        this.resourcesArray = [];
    }

    public spawnInitial() {
        // TODO :  construct random Resources
    }
}

export = ResourceManager;