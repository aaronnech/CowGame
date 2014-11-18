import Model = require('./model');
import PhysicalModel = require('./physicalmodel');

class Camera extends Model {
    public static PAN_SPEED : number = 10;

    private x : number;
    private y : number;
    private width : number;
    private height : number;
    private worldWidth : number;
    private worldHeight : number;
    private tileWidth : number;
    private tileHeight :number;
    private attached : any;

    constructor(tileWidth, tileHeight, worldWidth, worldHeight, width, height) {
        super();

        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;

        this.attached = null;
    }

    public update() {
        if (this.attached != null) {
            var x = this.attached.getX();
            var y = this.attached.getY();
            if (!this.inView(x, y)) {

            }
        }
    }


    public attach(view) {
        this.attached = view;
        var x = this.attached.getX();
        var y = this.attached.getY();
        var deltaX = x - this.x - this.width / 2;
        var deltaY = y - this.y - this.height / 2;
        if (deltaX != 0) {
            this.moveX(deltaX);
        }
        if (deltaY != 0) {
            this.moveY(deltaY);
        }
    }

    public detatch(view) {
        this.attached = null;
    }

    public inView(x, y) {
        return x >= this.x &&
            y >= this.y &&
            x <= this.x + this.width &&
            y <= this.y + this.height;
    }

    public modelInView(model : PhysicalModel) {
        var x = model.getX() * this.tileWidth;
        var y = model.getY() * this.tileHeight;
        var w = model.getWidth() * this.tileWidth;
        var h = model.getHeight() * this.tileHeight;
        return x + w >= this.x &&
            y + h >= this.y &&
            x <= this.x + this.width &&
            y <= this.y + this.height;
    }

    public panUp() {
        this.moveY(-Camera.PAN_SPEED);
    }

    public panDown() {
        this.moveY(Camera.PAN_SPEED);
    }

    public panLeft() {
        this.moveX(-Camera.PAN_SPEED);
    }

    public panRight() {
        this.moveX(Camera.PAN_SPEED);
    }

    public getX() {
        return this.x;
    }

    public getY() {
        return this.y;
    }

    public getWidth() {
        return this.width;
    }

    public getHeight() {
        return this.height;
    }

    public moveX(x) {
        var newX = this.x + x;
        if (newX < 0) {
            this.x = 0;
        } else if (newX > this.worldWidth - this.width) {
            this.x = this.worldWidth - this.width;
        } else {
            this.x = newX;
        }
        this.notifyChange();
    }

    public moveY(y) {
        var newY = this.y + y;
        if (newY < 0) {
            this.y = 0;
        } else if (newY > this.worldHeight - this.height) {
            this.y = this.worldHeight - this.height;
        } else {
            this.y = newY;
        }
        this.notifyChange();
    }
}

export = Camera;