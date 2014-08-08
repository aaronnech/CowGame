function Camera() {
	this.base = Model;
	this.base.apply(this);

	this.x_ = 0;
	this.y_ = 0;
}
window.inherits(Camera, Model);