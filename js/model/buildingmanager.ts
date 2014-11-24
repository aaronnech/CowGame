import SpacialHash = require('../util/spacialhash');
import Map = require('./map');
import Model = require('./model');
import Building = require('./building');
import Constants = require('../util/constants');

class BuildingManager extends Model {
    private map : Map;
    private buildings : SpacialHash;
    private buildingsArray : Building[];

    constructor(mapModel : Map) {
        super();
        this.map = mapModel;
        this.buildings = new SpacialHash(
            this.map.getWidth(),
            this.map.getHeight(),
            Constants.BUCKET_SIZE);
        this.buildingsArray = [];
    }


    public addBuilding(buildingModel : Building) {
        this.buildings.add(buildingModel.getX(), buildingModel.getY(), buildingModel);
        this.buildingsArray.push(buildingModel);

    }

    public getBuildings() : Building[] {
        return this.buildingsArray;
    }
}

export = BuildingManager;