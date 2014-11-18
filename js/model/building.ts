import Model = require('./model');
import SelectableModel = require('./selectablemodel');
import PhysicalModel = require('./physicalmodel');

class Building extends Model implements SelectableModel, PhysicalModel {
    private x : number;
    private y : number;
    private selected : boolean;

    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.selected = false;
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

    public getWidth() {
        throw new Error("Abstract, not yet implemented");
        return 0;
    }

    public getHeight() {
        throw new Error("Abstract, not yet implemented");
        return 0;
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
}

export = Building;