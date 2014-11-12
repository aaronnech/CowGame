import Model = require('./model');

class WorkerState extends Model {
    private data : any;
    private type : any;

    public static Types:any = {
        MOVE_TO: "MOVE_TO"
    }

    constructor(type, data) {
        super();
        this.data = data;
        this.type = type;
    }

    public getData = function() {
        return this.data;
    }

    public setData = function(data) {
        this.data = data;
    }

    public getType = function() {
        return this.type;
    }

    public setType = function(type) {
        this.type = type;
    }
}

export = WorkerState;