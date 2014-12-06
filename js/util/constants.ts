class Constants {
    public static DISPLAY_WIDTH : number = 800;
    public static DISPLAY_HEIGHT : number = 600;
    public static WORLD_WIDTH : number = 2688;
    public static WORLD_HEIGHT : number = 768;
    public static TILE_HEIGHT : number = 32;
    public static TILE_WIDTH : number = 32;
    public static NUMBER_OF_X_TILES : number =
        Constants.WORLD_WIDTH / Constants.TILE_WIDTH;
    public static NUMBER_OF_Y_TILES : number =
        Constants.WORLD_HEIGHT / Constants.TILE_HEIGHT;
    public static BUCKET_SIZE : number = 40;
    public static APP_CONTEXT_DOM_ID : string = 'app';

    public static BUTTON_IDS : any = {
        BUY_SILO : 'buy-silo',
        BUY_COW : 'buy-cow',
        PLAY : 'play'
    };

    public static SCREENS : any = {
        MENU : 'menu',
        GAME : 'game'
    };
}

export = Constants;