/**
 * [MarkovChain description]
 * @param {[type]} states [description]
 */
class MarkovChain {
    private transitionMatrix : any;
    private stateToIndex : any;
    private indexToState : any;
    private currentStateIndex : number;

    constructor(states) {
        this.transitionMatrix = new Array(states.length);
        this.stateToIndex = [];
        this.indexToState = [];
        this.currentStateIndex = 0;

        for (var i = 0; i < states.length; i++) {
            this.transitionMatrix[i] = new Array(states.length);
            /* Assign the state and index in the matrix */
            this.stateToIndex[states[i]] = i;
            this.indexToState[i] = states[i];

            for (var j = 0; j < states.length; j++) {
                this.transitionMatrix[i][j] = 0.0;
            }
        }
    }

    public setProbability(tailState, headState, probability) {
        this.transitionMatrix[this.stateToIndex[tailState]][this.stateToIndex[headState]] = probability;
    }

    public getProbability(tailState, headState) {
        return this.transitionMatrix[this.stateToIndex[tailState]][this.stateToIndex[headState]];
    }

    public getNeighborProbabilities(state) {
        var index = this.stateToIndex[state];
        var result = [];
        for (var i = 0; i < this.transitionMatrix[index].length; i++) {
            result.push(this.transitionMatrix[index][i]);
        }
        return result;
    }

    public setCurrentState(state) {
        this.currentStateIndex = this.stateToIndex[state];
    }

    public getCurrentState() {
        return this.indexToState[this.currentStateIndex];
    }

    public update() {
        var probabilities = this.getNeighborProbabilities(this.indexToState[this.currentStateIndex]);
        for (var i = 1; i < probabilities.length; i++) {
            probabilities[i] += probabilities[i - 1];
        }

        var random = Math.random();
        for (var i = 0; i < probabilities.length; i++) {
            if (random < probabilities[i]) {
                this.currentStateIndex = i;
                return this.indexToState[i];
            }
        }
    }

    public getTransitionMatrix() {
        return this.transitionMatrix;
    }
}

export = MarkovChain;