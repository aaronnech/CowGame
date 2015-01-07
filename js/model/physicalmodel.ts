interface PhysicalModel {
    getX() : number;
    getY() : number;
    setX(x : number) : void;
    setY(y : number) : void;
    getWidth() : number;
    getHeight() : number;
    onSelect() : void;
}

export = PhysicalModel;