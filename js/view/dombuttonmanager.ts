import Action = require('../controller/action');

class DOMButtonManager {
    private buttons : any;
    private buttonsActions : any
    private appContext : any;
    private disabled : boolean;


    constructor(appContext : string) {
        this.buttons = {};
        this.buttonsActions = {};
        this.appContext = document.getElementById(appContext);
        this.disabled = false;
    }

    public removeAll() {
        for (var key in this.buttons) {
            if(this.buttons.hasOwnProperty(key)) {
                this.appContext.removeChild(this.buttons[key]);
            }
        }
    }

    public addButton(name : string, id : string, cls : string, x : number, y : number) {
        var btn = document.createElement('button');
        var text = document.createTextNode(name);
        btn.appendChild(text);
        btn.value = name;
        btn.className = cls;
        btn.id = id;
        btn.style.position = "absolute";
        btn.style.top = y + 'px';
        btn.style.left = x + 'px';
        btn.style.zIndex = '' + 2;
        this.appContext.appendChild(btn);
        this.buttons[id] = btn;
        this.buttonsActions[id] = [];
        this.addBrowserEventListener(btn, 'click', () => {
            if (!this.disabled) {
                for (var i : number = 0; i < this.buttonsActions[id].length; i++) {
                    this.buttonsActions[id][i].fire(this, id);
                }
            }
        });
    }

    public addClickAction(id : string, act : Action) {
        if (typeof this.buttonsActions[id] != 'undefined' && typeof act != 'undefined')
            this.buttonsActions[id].push(act);
    }

    public disableAllButtons() {
        for (var key in this.buttons) {
            if(this.buttons.hasOwnProperty(key)) {
                this.buttons[key].disabled = true;
            }
        }
        this.disabled = true;
    }

    public enableAllButtons() {
        for (var key in this.buttons) {
            if(this.buttons.hasOwnProperty(key)) {
                this.buttons[key].disabled = false;
            }
        }
        this.disabled = false;
    }

    private addBrowserEventListener(element, name, callback) {
        if (element.addEventListener) {
            element.addEventListener(name, callback, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + name, callback);
        } else {
            element["on" + name] = callback;
        }
    }
}

export = DOMButtonManager;