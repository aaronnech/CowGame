import Action = require('../controller/action');

class Input {
    public static CLICK_THRESHOLD:number = 10;

    public static Mouse:any = {
        LEFT: 0,
        RIGHT: 1
    };

    public static Keys:any = {
        RIGHT: '39',
        LEFT: '37',
        UP: '38',
        DOWN: '40',
        A: '65',
        W: '87',
        S: '83',
        D: '68'
    };


    private canvas : any;

    private keyHitBindings : any;
    private keyDownBindings : any;
    private keyDownState : any;
    private keyHitState : any;

    private mouseMovedForClick : number;
    private mouseDownState : boolean[];
    private mouseHitState : boolean[];
    private mouseHitBindings : any;
    private mouseX : number;
    private mouseY : number;

    constructor(canvas) {
        this.canvas = canvas;

        // Key states and bindings
        this.keyHitBindings = {};
        this.keyDownBindings = {};
        this.keyDownState = {};
        this.keyHitState = {};

        // Mouse states and bindings
        this.mouseMovedForClick = 0;
        this.mouseDownState = [false, false]
        this.mouseHitState = [false, false];
        this.mouseHitBindings = [
            [],
            []
        ];
        this.mouseX = 0;
        this.mouseY = 0;

        this.addBrowserEventListener(document, 'keydown', (e) => {
            var event = e || window.event;
            var code = event.which || event.charCode || event.keyCode;
            var mapKey = '' + code;

            this.keyDownState[mapKey] = true;
        });

        this.addBrowserEventListener(document, 'keyup', (e) => {
            var event = e || window.event;
            var code = event.which || event.charCode || event.keyCode;
            var mapKey = '' + code;

            this.keyDownState[mapKey] = false;
            this.keyHitState[mapKey] = true;
        });

        this.addBrowserEventListener(this.canvas, 'mousedown', (e) => {
            this.mouseDownState[Input.Mouse.LEFT] = true;
            this.mouseMovedForClick = 0;
        });

        this.addBrowserEventListener(this.canvas, 'mouseup', (e) => {
            this.mouseDownState[Input.Mouse.LEFT] = false;
            if (this.mouseMovedForClick < Input.CLICK_THRESHOLD) {
                this.mouseHitState[Input.Mouse.LEFT] = true;
            }
        });

        this.addBrowserEventListener(this.canvas, 'mousemove', (e) => {
            var rect = this.canvas.getBoundingClientRect();
            var oldX = this.mouseX;
            var oldY = this.mouseY;
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
            this.mouseMovedForClick +=
                Math.abs(oldX - this.mouseX) + Math.abs(oldY - this.mouseY);
        });
    }

    public isMouseDown(button) {
        return this.mouseDownState[button];
    }


    public getMouseX() {
        return this.mouseX;
    }


    public getMouseY = function () {
        return this.mouseY;
    }


    public addBrowserEventListener(element, name, callback) {
        if (element.addEventListener) {
            element.addEventListener(name, callback, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + name, callback);
        } else {
            element["on" + name] = callback;
        }
    }


    public update() {
        // Handle keydown events
        for (var key in this.keyDownState) {
            if (!this.keyDownState.hasOwnProperty(key)) {
                continue;
            }
            if (this.keyDownState[key] && this.keyDownBindings[key]) {
                var bindings = this.keyDownBindings[key];
                for (var i = 0; i < bindings.length; i++) {
                    bindings[i].action.fire(this, bindings[i].data);
                }
            }
        }

        // Handle keyhit events
        for (var key in this.keyHitState) {
            if (!this.keyHitState.hasOwnProperty(key)) {
                continue;
            }
            if (this.keyHitState[key] && this.keyHitBindings[key]) {
                var bindings = this.keyHitBindings[key];
                for (var i = 0; i < bindings.length; i++) {
                    bindings[i].action.fire(this, bindings[i].data);
                }
            }
            if (this.keyHitState[key]) {
                this.keyHitState[key] = false;
            }
        }

        // Handle mousehit events
        if (this.mouseHitState[Input.Mouse.LEFT] &&
            this.mouseHitBindings[Input.Mouse.LEFT]) {
            var bindings = this.mouseHitBindings[Input.Mouse.LEFT];
            for (var i = 0; i < bindings.length; i++) {
                bindings[i].action.fire(this, bindings[i].data);
            }
        }

        if (this.mouseHitState[Input.Mouse.RIGHT] &&
            this.mouseHitBindings[Input.Mouse.RIGHT]) {
            var bindings = this.mouseHitBindings[Input.Mouse.RIGHT];
            for (var i = 0; i < bindings.length; i++) {
                bindings[i].action.fire(this, bindings[i].data);
            }
        }
        this.mouseHitState[Input.Mouse.LEFT] = false;
        this.mouseHitState[Input.Mouse.RIGHT] = false;
    }

    public bindMapKeyToAction(mapKey, map, action, data) {
        if (!map[mapKey]) {
            map[mapKey] = [];
        }
        map[mapKey].push({'action': action, 'data': data});
    }


    public bindMouseHitAction = function (mouse, action, data) {
        this.bindMapKeyToAction(mouse, this.mouseHitBindings, action, data);
    }


    public bindKeyHitAction = function (key, action, data) {
        this.bindMapKeyToAction(key, this.keyHitBindings, action, data);
    }


    public bindKeyDownAction = function (key, action, data) {
        this.bindMapKeyToAction(key, this.keyDownBindings, action, data);
    }
}

export = Input;