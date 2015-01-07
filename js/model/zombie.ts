import Model = require('./model');
import MarkovChain = require('../util/markovchain');
import PathGenerator = require('../util/pathgenerator');
import MarkovState = require('./markovstate');
import SelectableModel = require('./selectablemodel');
import PhysicalModel = require('./physicalmodel');

class Zombie extends Model implements SelectableModel, PhysicalModel {
    public static SPEED : number = 0.1;

    private selected : boolean;

    private x : number;
    private y : number;

    private currentWalkingDirection : any;
    private walkTimer : number;

    private canUpdateState : boolean;
    private states : any;

    private stateManager : MarkovChain;

    constructor() {
        super();
        // selection state
        this.selected = false;

        // coordinate state
        this.x = 0;
        this.y = 0;

        // Walk state
        this.currentWalkingDirection = null;
        this.walkTimer = 0;

        // Markov chain decision making state manager
        this.canUpdateState = false;
        this.states = {}
        for (var key in MarkovState.Types) {
            this.states[key] = new MarkovState(key, null);
        }
        this.stateManager = new MarkovChain(Object.keys(MarkovState.Types));

        // Do nothing initially
        var stateName = MarkovState.Types.DO_NOTHING;
        this.states[stateName].setData(undefined);
        this.stateManager.setCurrentState(stateName);
        this.onStateChange();
    }

    public update(workers) {
        // this.updateMarkovChain(workers.getAll(this.x, this.y));
        this.doStateAction(workers);
        if (this.canUpdateState) {
            // this.stateManager.update();
            // this.onStateChange();
        }
    }

    public onStateChange() {
        var state =
            this.states[this.stateManager.getCurrentState()];
        var data = state.getData();
        var type = state.getType();
        if (data) {
            switch (type) {
                case MarkovState.Types.DO_NOTHING:
                    break;
                case MarkovState.Types.MOVE_TO :
                    console.log("Setting path!");
                    PathGenerator.getInstance().
                        makePath(
                        this.x,
                        this.y,
                        data.x,
                        data.y,
                        (path) => {
                            console.log("calculated!");
                            data.iterator = path;
                            state.setData(data);
                        });
                    break;
            }
        }
    }

    public doStateAction(workers) {
        var state =
            this.states[this.stateManager.getCurrentState()];
        var data = state.getData();
        var type = state.getType();
        if (data) {
            switch (type) {
                case MarkovState.Types.DO_NOTHING:
                    break;
                case MarkovState.Types.MOVE_TO :
                    if (data.iterator && data.iterator.length > 0) {
                        this.moveTowards(data.iterator);
                    } else {
                        this.currentWalkingDirection = null;
                    }
                    break;
            }
        }
    }

    public moveTowards(pathIterator) {
        this.currentWalkingDirection = pathIterator[0];
        this.walkTimer += Worker.SPEED;
        if (this.walkTimer >= 1) {
            var direction = pathIterator.shift();
            this.walkTimer = 0;
            PathGenerator.getInstance().movePhysicalModel(this, direction);
        }
        this.notifyChange();
    }

    public isSelected() {
        return this.selected;
    }

    public onSelect() {
        this.selected = true;
        this.notifyChange();
    }

    public onDeselect() {
        this.selected = false;
        this.notifyChange();
    }

    public getDirection() {
        return this.currentWalkingDirection;
    }

    public getMoveProgress() {
        return this.walkTimer;
    }

    public getWidth() {
        return 1;
    }

    public getHeight() {
        return 1;
    }

    public getX() {
        return this.x;
    }

    public getY() {
        return this.y;
    }

    public setX(x) {
        this.x = x;
    }

    public setY(y) {
        this.y = y;
    }

    public setStateProbability(stateType, data, optprobability) {
        this.states[stateType].setData(data);
        if (optprobability) {
            // this.stateManager.setProbability(stateType, optprobability);
        }
    }


    public getMarkovChain() {
        return this.stateManager;
    }

    public startMove(toX : number, toY : number) {
        var stateName = MarkovState.Types.MOVE_TO;
        this.states[stateName].setData({x :  toX, y :  toY});
        this.stateManager.setCurrentState(stateName);
        this.onStateChange();
    }

    public updateMarkovChain(neighbors) {
        for (var tail in MarkovState.Types) {
            for (var head in MarkovState.Types) {
                // Calculate an average probability matrix
                var average = 0.0;
                for (var i = 0; i < neighbors.length; i++) {
                    var neighbor = neighbors[i];
                    average += neighbor.getMarkovChain().getProbability(tail, head);
                }

                // Set the current probability to the average, and calculate
                // the delta needed to make this change.
                var current = this.stateManager.getProbability(tail, head);
                average = (average + current) / (neighbors.length + 1.0);
                var delta = average - current;
                this.stateManager.setProbability(tail, head, average);

                // Calculate the sum of all the other probabilities besides
                // the one we set
                var sum = 0.0;
                for (var other in MarkovState.Types) {
                    if (other != tail) {
                        sum += this.stateManager.getProbability(tail, other);
                    }
                }

                // Calculate a contribution (defined as how much
                // of a percentage of the total probability each takes up)
                // and multiply the delta by this contribution.
                // The product of this contribution and the delta will be added to the probability
                // such that the entire delta is distributed across the other probabilities
                // and it still adds up to 1.
                for (var other in MarkovState.Types) {
                    if (other != tail) {
                        var currentProbability = this.stateManager.getProbability(tail, other);
                        var result = currentProbability - (currentProbability / sum) * delta;
                        this.stateManager.setProbability(tail, other, result);
                    }
                }
            }
        }
    }
}

export = Zombie;