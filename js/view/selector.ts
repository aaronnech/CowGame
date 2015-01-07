import Input = require('../input/input');
import Camera = require('../model/camera');
import PixiView = require('./pixiview');
import PhysicalModel = require('../model/physicalmodel');
import Constants = require('../util/constants');

class Selector extends PixiView {
    private static CLICK_THRESHOLD : number = 10;
    private static BULK_SELECT_ENABLED : boolean = false;

    private input : Input;
    private camera : Camera;
    private startX : number;
    private startY : number;
    private currentX : number;
    private currentY : number;
    private selectables : any;
    private selected : any;
    private dragging : boolean;

    constructor(input, camera, pixiStage) {
        this.dragging = false;
        this.input = input;
        this.camera = camera;
        this.startX = 0;
        this.startY = 0;
        this.selectables = [];
        this.selected = [];
        super([camera], pixiStage);
    }

    public makePixiStageMember() {
        if (this.dragging && Selector.BULK_SELECT_ENABLED) {
            var graphics = new PIXI.Graphics();
            var color = 0xFF0000;
            graphics.lineStyle(5, color);
            graphics.drawRect(
                    this.startX,
                    this.startY,
                    this.currentX - this.startX,
                    this.currentY - this.startY);
            return graphics;
        }
        return null;
    }

    public notify() {
        // Do something?
    }

    public handleDragging() {
        if (this.dragging) {
            var x = this.input.getMouseX();
            var y = this.input.getMouseY();
            this.onDragMove(x, y);
        }
    }

    public onStartDrag() {
        this.startX = this.input.getMouseX();
        this.startY = this.input.getMouseY();
        this.dragging = true;
    }

    public onFinishDrag() {
        this.dragging = false;
        this.redrawPixiStageMember();
        if ((Math.abs(this.currentX - this.startX) +
             Math.abs(this.currentY - this.startY)) <= Selector.CLICK_THRESHOLD) {
            console.log("CLICK NOT DRAG");
            var x = Math.floor((this.startX + this.camera.getX()) / Constants.TILE_WIDTH);
            var y = Math.floor((this.startY + this.camera.getY()) / Constants.TILE_HEIGHT);
            this.selectAtCoordinates(x, y);
        } else if (Selector.BULK_SELECT_ENABLED) {
            console.log("DRAG NOT CLICK");
            var x1 = Math.floor((this.startX + this.camera.getX()) / Constants.TILE_WIDTH);
            var y1 = Math.floor((this.startY + this.camera.getY()) / Constants.TILE_HEIGHT);
            var x2 = Math.floor((this.currentX + this.camera.getX()) / Constants.TILE_WIDTH);
            var y2 = Math.floor((this.currentY + this.camera.getY()) / Constants.TILE_HEIGHT);
            this.selectAtArea(x1, y1, x2, y2);
        }
    }

    public onDragMove(currentX, currentY) {
        if (currentX != this.currentX || currentY != this.currentY) {
            this.currentX = currentX;
            this.currentY = currentY;
            this.redrawPixiStageMember();
        }
    }

    public getSelected() {
        return this.selected;
    }

    public addSelectables(collection) {
        this.selectables.push(collection);
    }

    public deselectAll() {
        // deselect all
        while (this.selected.length > 0) {
            this.selected.pop().onDeselect();
        }
    }

    public addToSelected(selectable : PhysicalModel) {
        this.selected.push(selectable);
        selectable.onSelect();
    }

    public selectAtCoordinates(x, y) {
        console.log('Selecting at coordinates ' + x + ',' + y);
        this.deselectAll();
        console.log('deselected existing..');

        // select new selectable
        console.log('checking all selectable spacial hashes (' + this.selectables.length + ' total)');
        for (var i = 0; i < this.selectables.length; i++) {
            var inArea = this.selectables[i].getAll(x, y);
            console.log('found ' + inArea.length + ' selectables');
            console.log(this.selectables);
            for (var j = 0; j < inArea.length; j++) {
                var candidate : PhysicalModel = <PhysicalModel> (inArea[j]);
                var cx = candidate.getX();
                var cy = candidate.getY();
                if (x >= cx && x < cx + candidate.getWidth() &&
                    y >= cy && y < cy + candidate.getHeight()) {
                    this.addToSelected(candidate);
                    return candidate;
                }
            }
        }
        return null;
    }

    public selectAtArea(x1, y1, x2, y2) {
        this.deselectAll();

        var minX = Math.min(x1, x2);
        var minY = Math.min(y1, y2);
        var maxX = Math.max(x1, x2);
        var maxY = Math.max(y1, y2);

        // select new selectable
        for (var i = 0; i < this.selectables.length; i++) {
            var inArea = this.selectables[i].getAll(x1, y1).concat(this.selectables[i].getAll(x2, y2));
            for (var i = 0; i < inArea.length; i++) {
                var candidate = inArea[i];
                if (candidate.getX() >= minX && candidate.getX() <= maxX &&
                    candidate.getY() >= minY && candidate.getY() <= maxY) {
                    this.addToSelected(candidate);
                }
            }
        }
    }

    public onMouseDown() {
        if (!this.dragging) {
            this.onStartDrag();
        }
    }

    public onMouseUp() {
        if (this.dragging) {
            this.onFinishDrag();
        }
    }
}

export = Selector;