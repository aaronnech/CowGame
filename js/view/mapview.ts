import Camera = require('../model/camera');
import Map = require('../model/map');
import PixiView = require('./pixiview');

class MapView extends PixiView{
    private map : Map;
    private camera : Camera;

    constructor(mapModel : Map, cameraModel : Camera, pixiStage) {
        super([mapModel, cameraModel], pixiStage);
        this.map = mapModel;
        this.camera = cameraModel;
    }

    public makePixiStageMember() {
        var graphics = new PIXI.Graphics();
        var camX = this.camera.getX();
        var camY = this.camera.getY();
        var camW = this.camera.getWidth();
        var camH = this.camera.getHeight();

        this.map.forEachTileInRect(camX, camY, camW, camH, function (tile, x, y) {
            if (tile.getColor()) {
                var width = tile.getWidth();
                var height = tile.getHeight();
                graphics.beginFill(tile.getColor());
                graphics.drawRect(x * width, y * height, width, height);
                graphics.endFill();
            }
        });

        return graphics;
    }


    public notify() {
        this.redrawPixiStageMember();
    }
}

export = MapView;