class SpacialHash {
    private width:number;
    private height:number;
    private granularity:number;
    private buckets:any;

    constructor(width, height, granularity) {
        this.width = width;
        this.height = height;
        this.granularity = granularity;
        this.buckets = {};
    }

    private hash(x, y) {
        var hashedX = Math.ceil(x / this.granularity);
        var hashedY = Math.ceil(y / this.granularity);
        var key = hashedX + ',' + hashedY;
        if (!this.buckets[key]) {
            this.buckets[key] = [];
        }
        return key;
    }

    public getAll(x, y) {
        return this.buckets[this.hash(x, y)];
    }

    public add(x, y, obj) {
        this.buckets[this.hash(x, y)].push(obj);
    }

    public remove = function (x, y, obj) {
        var array = this.buckets[this.hash(x, y)];
        var index = array.indexOf(obj);
        if (index != -1) {
            array.splice(index, 1);
        }
    }
}

export = SpacialHash;