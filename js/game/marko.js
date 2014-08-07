function Marko() {
	this.base = Game;
	this.base.apply(this, game);

	this.controller = new ClientController(this);
}
Marko.prototype = Object.create(Game.prototype);

Marko.prototype.onRender = function() {
	Action.GameActions.RENDER.fire(Action.NO_SOURCE);
};


Marko.prototype.onUpdate = function(delta) {
	Action.GameActions.UPDATE.fire(Action.NO_SOURCE, delta);
};


Marko.prototype.onStart = function() {
	Action.GameActions.START.fire(Action.NO_SOURCE);
};


Marko.prototype.onShutDown = function() {
	Action.GameActions.STOP.fire(Action.NO_SOURCE);
};