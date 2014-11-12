import Controller = require('./controller');
import Action = require('./action');
import MarkoViewModel = require('../viewmodel/markoviewmodel');

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

        this.bind(Action.ViewActions.CLICK_MAP, this.clickMap);
    }

    public onRender() {
        this.viewModel.render();
    }

    public onUpdate() {
        this.viewModel.update();
    }

    public panCameraUp() {
        this.viewModel.panCameraUp();
    }

    public panCameraDown() {
        this.viewModel.panCameraDown();
    }

    public panCameraLeft() {
        this.viewModel.panCameraLeft();
    }

    public panCameraRight() {
        this.viewModel.panCameraRight();
    }

    public clickMap() {
        this.viewModel.clickMap();
    }
}

export = ClientController;