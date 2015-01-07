import Model = require('./model');
import Zombie = require('./zombie');
import ZombieView = require('../view/zombieview');
import Map = require('./map');
import SpacialHash = require('../util/spacialhash');
import Constants = require('../util/constants');

class ZombieManager extends Model {
    private map : Map;
    private zombies : SpacialHash;
    private zombiesArray : any;

    constructor(mapModel : Map) {
        super();
        this.map = mapModel;
        this.zombies = new SpacialHash(
            this.map.getWidth(),
            this.map.getHeight(),
            Constants.BUCKET_SIZE);
        this.zombiesArray = [];
    }

    public hitZombie(hit) {
        var index = this.zombiesArray.indexOf(hit);
        this.zombiesArray.splice(index, 1);
        this.zombies.remove(hit.getX(), hit.getY(), hit);
        hit.dispose();
    }

    public addZombie(zombieModel) {
        var x = this.grainSupply.getX() - 1;
        var y = this.grainSupply.getY() - 1;
        zombieModel.setX(x);
        zombieModel.setY(y);
        this.zombies.add(x, y, zombieModel);
        this.zombiesArray.push(zombieModel);
    }

    public getZombies() {
        return this.zombies;
    }

    private createRandomZombie() {
        var zombie = new Zombie();
    }

    public launchWave() {
        for (var i = 0; i < Constants.BASE_WAVE_SIZE; i++) {
            var zombie = new Zombie();
            new ZombieView();
        }
    }

    public getZombiesArray() {
        return this.zombiesArray;
    }

    public update() {
        for (var i = 0; i < this.zombiesArray.length; i++) {
            var zombie = this.zombiesArray[i];
            var beforeX = zombie.getX();
            var beforeY = zombie.getY();

            zombie.update(this.zombies);

            // Update spacial hashing
            var afterX = zombie.getX();
            var afterY = zombie.getY();
            if (beforeX != afterX || beforeY != afterY) {
                this.zombies.remove(beforeX, beforeY, zombie);
                this.zombies.add(afterX, afterY, zombie);
            }
        }
    }
}

export = ZombieManager;