class Game {
    private running : boolean;
    private oneFrameTime : any;
    private lastUpdate : any;

    constructor() {
        this.running = false;
        this.oneFrameTime = null;
        this.lastUpdate = null;
    }

    public onRender() {
        throw new Error('Abstact Method called!');
    }


    public onUpdate(delta) {
        throw new Error('Abstact Method called!');
    }

    public onStart() {
        throw new Error('Abstact Method called!');
    }

    public onShutDown() {
        throw new Error('Abstact Method called!');
    }

    private render() {
        this.onRender();
    }

    private update(delta) {
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
                self.onShutDown();
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
        this.onStart();
        loop();
    }
}

export = Game;