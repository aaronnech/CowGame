function WorkerState(type, data) {
    this.data_ = data;
    this.type_ = type;
};

WorkerState.prototype.getData = function() {
    return this.data_;
};

WorkerState.prototype.setData = function(data) {
    this.data_ = data;
};

WorkerState.prototype.getType = function() {
    return this.type_;
};

WorkerState.prototype.setType = function(type) {
    this.type_ = type;
};

WorkerState.Types = {
    MOVE_TO : "MOVE_TO"
};