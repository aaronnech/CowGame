import Model = require('./model');
import Map = require('./map');
import GrainSupply = require('./grainsupply');
import SpacialHash = require('../util/spacialhash');
import Worker = require('./worker');
import Constants = require('../util/constants');

class WorkerColony extends Model {

    private map : Map;
    private grainSupply : GrainSupply;
    private workers : SpacialHash;
    private workersArray : any;

    constructor(mapModel : Map, grainSupply : GrainSupply) {
        super();
        this.map = mapModel;
        this.grainSupply = grainSupply;
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
        var x = this.grainSupply.getX() - 1;
        var y = this.grainSupply.getY() - 1;
        workerModel.setX(x);
        workerModel.setY(y);
        this.workers.add(x, y, workerModel);
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

            // Update spacial hashing
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