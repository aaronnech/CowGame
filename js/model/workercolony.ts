import Model = require('./model');
import Map = require('./map');
import SpacialHash = require('../util/spacialhash');
import Worker = require('./worker');
import Constants = require('../util/constants');

class WorkerColony extends Model {

    private map : Map;
    private workers : SpacialHash;
    private workersArray : any;

    constructor(mapModel : Map) {
        super();
        this.map = mapModel;
        this.workers = new SpacialHash(
            this.map.getWidth(),
            this.map.getHeight(),
            Constants.BUCKET_SIZE);
        this.workersArray = [];
    }

    public hitWorker(hit) {
        var index = this.workersArray.indexOf(hit);
        this.workersArray.splice(index, 1);
        this.workers.remove(hit.getX(), hit.getY(), hit);
        hit.dispose();
    }

    public addWorker(workerModel) {
        var randomX = this.map.randomTileX();
        var randomY = this.map.randomTileY();
        workerModel.setX(randomX);
        workerModel.setY(randomY);
        this.workers.add(randomX, randomY, workerModel);
        this.workersArray.push(workerModel);
    }


    public getWorkers() {
        return this.workers;
    }


    public update() {
        for (var i = 0; i < this.workersArray.length; i++) {
            var worker = this.workersArray[i];
            var beforeX = worker.getX();
            var beforeY = worker.getY();

            this.workersArray[i].update(this.workers);

            var afterX = worker.getX();
            var afterY = worker.getY();
            if (beforeX != afterX || beforeY != afterY) {
                this.workers.remove(beforeX, beforeY, worker);
                this.workers.add(afterX, afterY, worker);
            }
        }
    }
}

export = WorkerColony;