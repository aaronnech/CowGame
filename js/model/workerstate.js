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

WorkerState.Types = {
    MOVE_TO : "MOVE_TO"
};