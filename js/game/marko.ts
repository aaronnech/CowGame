import Game = require('./game');
import Action = require('../controller/action');
import ClientController = require('../controller/clientcontroller');
import MenuScreen = require('../screen/menuscreen');
import GameScreen = require('../screen/gamescreen');
import Constants = require('../util/constants');

class Marko extends Game {
    private controller : ClientController;
    private gameScreen : GameScreen;
    private menuScreen : MenuScreen;

    constructor() {
        super(Constants.DISPLAY_WIDTH, Constants.DISPLAY_HEIGHT, Constants.APP_CONTEXT_DOM_ID);
        this.controller = new ClientController(this);

        this.gameScreen = new GameScreen(this.pixiStage, this.pixiWorld, this.pixiRenderer);
        this.menuScreen = new MenuScreen(this.pixiStage, this.pixiWorld);

        this.addScreen(Constants.SCREENS.GAME, this.gameScreen);
        this.addScreen(Constants.SCREENS.MENU, this.menuScreen);
        this.setScreen(Constants.SCREENS.MENU);
    }

    public onRender() {
    }

    public onUpdate(delta) {

    }
}

export = Marko;