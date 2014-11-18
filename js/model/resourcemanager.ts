import Model = require('./model');
import Map = require('./map');
import SpacialHash = require('../util/spacialhash');
import Resource = require('./resource');
import Constants = require('../util/constants');

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
            Constants.BUCKET_SIZE);
        this.resourcesArray = [];
    }

    public spawnInitial() {
        // TODO :  construct random Resources
    }
}

export = ResourceManager;