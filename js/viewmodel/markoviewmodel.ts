import ViewModel = require('./viewmodel');
import GameViewModel = require('./gameviewmodel');
import MenuViewModel = require('./menuviewmodel');
import Constants = require('../util/constants');

class MarkoViewModel extends ViewModel {
    private pixiStage : any;
    private pixiRenderer : any;
    private pixiWorld : any;


    private gameViewModel : GameViewModel;
    private menuViewModel : MenuViewModel;

    private currentScreen : Screen;

	constructor() {
        super();
        console.log('CREATING MARKO GAME..');

        console.log('SETTING UP RENDERER / CANVAS ELEMENT..');
        // Setup renderer
        this.pixiStage = new PIXI.Stage(0x339933);
        this.pixiRenderer = PIXI.autoDetectRenderer(
            Constants.DISPLAY_WIDTH, Constants.DISPLAY_HEIGHT);
        this.pixiWorld = new PIXI.DisplayObjectContainer();
        this.pixiStage.addChild(this.pixiWorld);
        document.getElementById(Constants.APP_CONTEXT_DOM_ID)
            .appendChild(this.pixiRenderer.view);
        document.getElementById(Constants.APP_CONTEXT_DOM_ID).style.position = 'relative';


        // Setup screens (sub view models)
        this.gameViewModel = new GameViewModel(this.pixiStage, this.pixiWorld, this.pixiRenderer);
        this.menuViewModel = new MenuViewModel(this.pixiStage, this.pixiWorld);

        // Set initial screen to menu
        this.currentScreen = this.menuViewModel;
        this.currentScreen.onEnterScreen();
    }

    public render() {
        // Render the pixi stage
        this.pixiRenderer.render(this.pixiStage);
    }

    public update() {
        if (this.getCurrentScreenName() == Constants.SCREENS.GAME) {
            (<GameViewModel> this.currentScreen).update();
        }
    }

    public getCurrentScreen() {
        return <ViewModel> this.currentScreen;
    }

    public setScreen(name : string) {
        this.currentScreen.onExitScreen(() => {
            this.currentScreen = this.nameToScreen(name);
            this.currentScreen.onEnterScreen();
        });
    }

    public getCurrentScreenName() {
        return this.screenToName(this.currentScreen);
    }

    private nameToScreen(name : string) {
        if (name == Constants.SCREENS.GAME) {
            return this.gameViewModel;
        } else if (name == Constants.SCREENS.MENU) {
            return this.menuViewModel;
        }
        return null;
    }

    private screenToName(viewModel : ViewModel) {
        if (viewModel == this.gameViewModel) {
            return Constants.SCREENS.GAME;
        } else if (viewModel == this.menuViewModel) {
            return Constants.SCREENS.MENU;
        }
        return null;
    }
}

export = MarkoViewModel;