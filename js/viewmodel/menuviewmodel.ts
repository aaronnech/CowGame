import ViewModel = require('./viewmodel');
import DOMButtonManager = require('../view/dombuttonmanager');
import Screen = require('./screen');
import Constants = require('../util/constants');
import Action = require('../controller/action');

class MenuViewModel extends ViewModel implements Screen {
    private pixiStage : any;
    private pixiWorld : any;
    private buttonManager : DomButtonManager;

    constructor(pixiStage, pixiWorld) {
        this.pixiStage = pixiStage;
        this.pixiWorld = pixiWorld;
    }

    public onEnterScreen() {
        // Init
        console.log("Started main menu!");
        this.buttonManager = new DOMButtonManager(Constants.APP_CONTEXT_DOM_ID);
        this.buttonManager.addButton("Play", Constants.BUTTON_IDS.PLAY, 'btn', 20, 200);
        this.buttonManager.addClickAction(Constants.BUTTON_IDS.PLAY, Action.ViewActions.CLICK_BUTTON);
    }

    public onExitScreen(fn : Function) {
        console.log("Leaving main menu!");
        this.buttonManager.removeAll();
        fn();
    }

}

export = MenuViewModel;