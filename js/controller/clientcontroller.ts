import Controller = require('./controller');
import Action = require('./action');
import Constants = require('../util/constants');

class ClientController extends Controller {
    constructor(game) {
        super(game);
    }

    public setBindings() {
        this.bindToScreen(Action.ViewActions.PAN_UP, Constants.SCREENS.GAME, 'panCameraUp');
        this.bindToScreen(Action.ViewActions.PAN_DOWN, Constants.SCREENS.GAME, 'panCameraDown');
        this.bindToScreen(Action.ViewActions.PAN_LEFT, Constants.SCREENS.GAME, 'panCameraLeft');
        this.bindToScreen(Action.ViewActions.PAN_RIGHT, Constants.SCREENS.GAME, 'panCameraRight');

        this.bindToScreen(Action.ViewActions.MOUSE_UP_MAP, Constants.SCREENS.GAME, 'mouseUpMap');
        this.bindToScreen(Action.ViewActions.MOUSE_DOWN_MAP, Constants.SCREENS.GAME, 'mouseDownMap');
        this.bindToScreen(Action.ViewActions.RIGHT_CLICK_MAP, Constants.SCREENS.GAME, 'rightClickMap');

        this.bind(Action.ViewActions.CLICK_BUTTON, this.clickButton);
    }

    public clickButton(source, id : string) {
        switch(id) {
            case Constants.BUTTON_IDS.BUY_SILO:
                console.log('Clicked buy silo!');
                this.callScreenAction(Constants.SCREENS.GAME, 'startPlace', [0]);
                break;
            case Constants.BUTTON_IDS.BUY_COW:
                console.log('Clicked buy cow!');
                this.callScreenAction(Constants.SCREENS.GAME, 'makeWorker');
                break;
            case Constants.BUTTON_IDS.PLAY:
                console.log('Clicked play!');
                this.game.setScreen(Constants.SCREENS.GAME);
                break;
        }
    }
}

export = ClientController;