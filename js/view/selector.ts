import Input = require('../input/input');
import Camera = require('../model/camera');
import MarkoViewModel = require('../viewmodel/markoviewmodel');

class Selector {
    private input : Input;
    private camera : Camera;
    private lastXPosition : number;
    private lastYPosition : number;
    private selectables : any;
    private selected : any;
    private dragging : boolean;
    private mouseMoved : number;

    constructor(input, camera) {
        this.dragging = false;
        this.input = input;
        this.camera = camera;
        this.lastXPosition = 0;
        this.lastYPosition = 0;
        this.selectables = [];
        this.selected = [];
        this.mouseMoved = 0;
    }

    public getLastMapClickX() {
        return this.lastXPosition;
    }

    public getLastMapClickY() {
        return this.lastYPosition;
    }

    public handleDragging() {
        var x = this.input.getMouseX();
        var y = this.input.getMouseY();
        var down = this.input.isMouseDown(Input.Mouse.LEFT);
        if (down && !this.dragging) {
            this.onStartDrag();
        } else if (down && this.mouseMoved) {
            this.onDragMove();
        } else if (!down && this.dragging) {
            this.onFinishDrag();
        }
    }

    public onStartDrag() {
        this.dragging = true;
    }

    public onFinishDrag() {
        this.dragging = false;
    }

    public onDragMove() {
        this.mouseMoved = 0;
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

    public selectAtCoordinates(x, y) {
        this.deselectAll();

        // select new selectable
        for (var i = 0; i < this.selectables.length; i++) {
            var inArea = this.selectables[i].getAll(x, y);
            for (var i = 0; i < inArea.length; i++) {
                var candidate = inArea[i];
                if (candidate.getX() == x &&
                    candidate.getY() == y) {
                    this.selected.push(candidate);
                    return candidate;
                }
            }
        }
        return null;
    }

    public onClickMap() {
        this.dragging = false;
        var clickX = this.input.getMouseX();
        var clickY = this.input.getMouseY();
        clickX += this.camera.getX();
        clickY += this.camera.getY();
        clickX = Math.floor(clickX / MarkoViewModel.TILE_WIDTH);
        clickY = Math.floor(clickY / MarkoViewModel.TILE_HEIGHT);
        var selected = this.selectAtCoordinates(clickX, clickY);
        if (selected) {
            selected.onSelect();
        }
        this.lastXPosition = clickX;
        this.lastYPosition = clickY;
    }
}

export = Selector;