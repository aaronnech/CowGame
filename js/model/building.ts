import Model = require('./model');
import SelectableModel = require('./selectablemodel');
import PhysicalModel = require('./physicalmodel');

class Building extends Model implements SelectableModel, PhysicalModel {
    private x : number;
    private y : number;
    private selected : boolean;
    private locationOkay : boolean;

    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.selected = false;
        this.locationOkay = true;
    }

    public overlaps(other : PhysicalModel) {
        var tw = this.getWidth();
        var th = this.getHeight();
        var rw = other.getWidth();
        var rh = other.getHeight();
        if (rw <= 0 || rh <= 0 || tw <= 0 || th <= 0) return false;
        var tx = this.getX();
        var ty = this.getY();
        var rx = other.getX();
        var ry = other.getY();
        rw += rx;
        rh += ry;
        tw += tx;
        th += ty;
        return ((rw < rx || rw > tx) &&
                (rh < ry || rh > ty) &&
                (tw < tx || tw > rx) &&
                (th < ty || th > ry));
    }

    public setLocationOkay(value : boolean) {
        this.locationOkay = value;
    }

    public getLocationOkay() {
        return this.locationOkay;
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