interface Screen {
    onEnterScreen() : void;
    onExitScreen(f : Function) : void;
    onUpdate(delta : number) : void;
    onRender() : void;
}

export = Screen;