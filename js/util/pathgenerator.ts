import Model = require('../model/model');
import Map = require('../model/map');

class PathGenerator {
    private static instance:PathGenerator = null;
    public static ManhattanDirection = {
        MOVE_NORTH: 0,
        MOVE_WEST: 1,
        MOVE_SOUTH: 2,
        MOVE_EAST: 3
    };

    private map:Map;
    private pathFinder:any;

    public constructor(mapModel) {
        var self = this;
        // TODO: if other objects go on the map
        // then also pass to constructor to use in grid building.
        if (PathGenerator.instance) {
            throw new Error('Singleton already constructed');
        }

        this.map = mapModel;

        console.log('constructing path finder..');
        this.pathFinder = null;

        console.log('Building collision map..');
        this.updateCollisionMap();

        console.log('setting path generator instance');
        PathGenerator.instance = this;
    }


    public static getInstance(optmapModel) {
        if (PathGenerator.instance) {
            return PathGenerator.instance;
        }
        if (!optmapModel) {
            throw 'No map model provided for construction!';
        }
        return new PathGenerator(optmapModel);
    }


    public buildCollisionMap() {
        // Build a 2d array here and return it. 0 means
        // passable, 1 means not passable (blocked).
        var result = [];
        console.log('building map now');
        // Construct a base map that mirrors the map model
        this.map.forEachTile(function (tile, x, y) {
            if (result.length <= y) {
                result.push([]);
            }
            result[y][x] = 0;
        });

        console.log('done building map');
        console.log('collision map is dimension ' + result[0].length + ',' + result.length);

        // TODO: add not-passable entities
        return result;
    }


    public updateCollisionMap() {
        // TODO: use buildCollisionMap to hook up pathfinder.
    }


    public makePath(x1, y1, x2, y2, callback) {
        // Shortest path algorithm here..
        // return a path iterator.
        if (this.map.isInMap(x1, y1) &&
            this.map.isInMap(x2, y2)) {
            // this.pathFinder.findPath(x1, y1, x2, y2, function(path) {
            // 	console.log('path calculated from ' + x1 + ',' + y1 + ' to ' + x2 + ',' + y2);
            //     if (path === null) {
            //         callback(null);
            //     } else {
            //     	var result = [];
            //     	var current = {x : x1, y : y1}
            //     	for (var i = 0; i < path.length; i++) {
            //     		var next = path[i];
            //     		// check if horizontal or vertical
            //     		if(current.x - next.x != 0) {
            //     			if (current.x > next.x) {
            //     				result.push(
            //     					PathGenerator.ManhattanDirection.MOVEWEST);
            //     			} else {
            //     				result.push(
            //     					PathGenerator.ManhattanDirection.MOVEEAST);
            //     			}
            //     		} else {
            //     			if (current.y > next.y) {
            //     				result.push(
            //     					PathGenerator.ManhattanDirection.MOVENORTH);
            //     			} else {
            //     				result.push(
            //     					PathGenerator.ManhattanDirection.MOVESOUTH);
            //     			}
            //     		}
            //     		current = next;
            //     	}
            //     	callback(result);
            //     }
            // });
        }
    }


    public movePhysicalModel(model, direction) {
        switch (direction) {
            case PathGenerator.ManhattanDirection.MOVE_NORTH:
                model.setY(model.getY() - 1);
                break;
            case PathGenerator.ManhattanDirection.MOVE_SOUTH:
                model.setY(model.getY() + 1);
                break;
            case PathGenerator.ManhattanDirection.MOVE_WEST:
                model.setX(model.getX() - 1);
                break;
            case PathGenerator.ManhattanDirection.MOVE_EAST:
                model.setX(model.getX() + 1);
                break;
        }
    }
}

export = PathGenerator;