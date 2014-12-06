import Controller = require('./controller');
import Action = require('./action');
import MarkoViewModel = require('../viewmodel/markoviewmodel');
import Constants = require('../util/constants');

class ClientController extends Controller {
    private viewModel : MarkoViewModel;

    constructor(game) {
        super(game);
        this.viewModel = new MarkoViewModel();
    }

    public setBindings() {
        this.bind(Action.GameActions.RENDER, this.onRender);
        this.bind(Action.GameActions.UPDATE, this.onUpdate);

        this.bind(Action.ViewActions.PAN_UP, this.panCameraUp);
        this.bind(Action.ViewActions.PAN_DOWN, this.panCameraDown);
        this.bind(Action.ViewActions.PAN_LEFT, this.panCameraLeft);
        this.bind(Action.ViewActions.PAN_RIGHT, this.panCameraRight);

        this.bind(Action.ViewActions.MOUSE_UP_MAP, this.mouseUpMap);
        this.bind(Action.ViewActions.MOUSE_DOWN_MAP, this.mouseDownMap);
        this.bind(Action.ViewActions.RIGHT_CLICK_MAP, this.rightClickMap);

        this.bind(Action.ViewActions.CLICK_BUTTON, this.clickButton);
    }

    public onRender() {
        this.viewModel.render();
    }

    public onUpdate() {
        this.viewModel.update();
    }

    public clickButton(source, id : string) {
        switch(id) {
            case Constants.BUTTON_IDS.BUY_SILO:
                console.log('Clicked buy silo!');
                break;
            case Constants.BUTTON_IDS.BUY_COW:
                console.log('Clicked buy cow!');
                break;
            case Constants.BUTTON_IDS.PLAY:
                console.log('Clicked play!');
                this.viewModel.setScreen(Constants.SCREENS.GAME);
                break;
        }
    }

    public panCameraUp() {
        if (this.viewModel.getCurrentScreenName() == Constants.SCREENS.GAME) {
            var vm : GameViewModel = <GameViewModel> this.viewModel.getCurrentScreen();
            vm.panCameraUp();
        }
    }

    public panCameraDown() {
        if (this.viewModel.getCurrentScreenName() == Constants.SCREENS.GAME) {
            var vm : GameViewModel = <GameViewModel> this.viewModel.getCurrentScreen();
            vm.panCameraDown();
        }
    }

    public panCameraLeft() {
        if (this.viewModel.getCurrentScreenName() == Constants.SCREENS.GAME) {
            var vm : GameViewModel = <GameViewModel> this.viewModel.getCurrentScreen();
            vm.panCameraLeft();
        }
    }

    public panCameraRight() {
        if (this.viewModel.getCurrentScreenName() == Constants.SCREENS.GAME) {
            var vm : GameViewModel = <GameViewModel> this.viewModel.getCurrentScreen();
            vm.panCameraRight();
        }
    }

    public mouseUpMap() {
        if (this.viewModel.getCurrentScreenName() == Constants.SCREENS.GAME) {
            var vm : GameViewModel = <GameViewModel> this.viewModel.getCurrentScreen();
            vm.mouseUpMap();
        }
    }

    public mouseDownMap() {
        if (this.viewModel.getCurrentScreenName() == Constants.SCREENS.GAME) {
            var vm : GameViewModel = <GameViewModel> this.viewModel.getCurrentScreen();
            vm.mouseDownMap();
        }
    }

    public rightClickMap() {
        if (this.viewModel.getCurrentScreenName() == Constants.SCREENS.GAME) {
            var vm : GameViewModel = <GameViewModel> this.viewModel.getCurrentScreen();
            vm.rightClickMap();
        }
    }
}

export = ClientController;