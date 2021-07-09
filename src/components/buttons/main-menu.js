import Button from '../button';

class NewGameButton extends Button {
    init() {
        super.init();

        this.text = 'New Game';
        this.style.fontSize = 20;
        this.anchor.set(0.5, 0.5);
    }

    onClick() {
        this.game.sceneManager.unload('MAIN_MENU');
        this.game.sceneMANAGER.load('GAME');
    }
}

export { NewGameButton };