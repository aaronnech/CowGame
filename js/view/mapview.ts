import Camera = require('../model/camera');
import Map = require('../model/map');
import Tile = require('../model/tile');
import PixiView = require('./pixiview');

class MapView extends PixiView {
    private map : Map;
    private camera : Camera;

    constructor(mapModel : Map, cameraModel : Camera, pixiStage) {
        this.map = mapModel;
        this.camera = cameraModel;
        super([mapModel, cameraModel], pixiStage);
    }

    public makePixiStageMember() {
        // var graphics = new PIXI.Graphics();
        var camX = this.camera.getX();
        var camY = this.camera.getY();
        var camW = this.camera.getWidth();
        var camH = this.camera.getHeight();

        this.map.forEachTileInRect(camX, camY, camW, camH, function (tile, x, y) {
            // var width = tile.getWidth();
            // var height = tile.getHeight();
            // if (tile.getType() == Tile.TYPES.GRASS)
                // Do nothing since the default is grass.
            // }
        });

        return null;
    }


    public notify() {
        this.redrawPixiStageMember();
    }
}

export = MapView;