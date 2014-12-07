import Screen = require('../screen/screen')

class Game {
    private running : boolean;
    private oneFrameTime : any;
    private lastUpdate : any;

    private screens : any;

    private currentScreen : Screen;

    public pixiStage : any; // Protected
    public pixiRenderer : any; // Protected
    public pixiWorld : any; // Protected

    constructor(displayWidth : number, displayHeight : number, domId : string) {
        this.running = false;
        this.oneFrameTime = null;
        this.lastUpdate = null;

        // Screen Management
        this.screens = {};

        // Setup renderer
        this.pixiStage = new PIXI.Stage(0x000000);
        this.pixiRenderer = PIXI.autoDetectRenderer(displayWidth, displayHeight);
        this.pixiWorld = new PIXI.DisplayObjectContainer();
        this.pixiStage.addChild(this.pixiWorld);
        document.getElementById(domId)
            .appendChild(this.pixiRenderer.view);
        document.getElementById(domId).style.position = 'relative';
    }

    public onRender() {
        throw new Error('Abstact Method called!');
    }

    public onUpdate(delta) {
        throw new Error('Abstact Method called!');
    }

    public addScreen(name : string, screen : Screen) {
        this.screens[name] = screen;
    }

    public getScreen(name : string) {
        return this.screens[name];
    }

    public getCurrentScreen() {
        return this.currentScreen;
    }

    public setScreen(name : string) {
        if (this.currentScreen) {
            this.currentScreen.onExitScreen(() => {
                this.currentScreen = this.nameToScreen(name);
                this.currentScreen.onEnterScreen();
            });
        } else {
            this.currentScreen = this.nameToScreen(name);
            this.currentScreen.onEnterScreen();
        }
    }

    private nameToScreen(name : string) : Screen {
        return <Screen> this.screens[name];
    }

    private render() {
        if (this.currentScreen)
            this.currentScreen.onRender();
        this.onRender();
    }

    private update(delta) {
        if (this.currentScreen)
            this.currentScreen.onUpdate(delta);
        this.onUpdate(delta);
    }

    public run(fps) {
        var self = this;
        function loop() {
            var delta = 1;
            if (self.lastUpdate) {
                var now = Date.now();
                delta = now - self.lastUpdate;
                self.lastUpdate = now;
            } else {
                self.lastUpdate = Date.now();
            }

            if (!self.running) {
                // end
            } else {
                setTimeout(function() {
                    requestAnimationFrame(loop);
                    self.update(delta);
                    self.render();
                }, self.oneFrameTime);
            }
        }

        this.oneFrameTime = 1000 / fps;
        this.running = true;
        loop();
    }
}

export = Game;