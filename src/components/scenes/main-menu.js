import * as PIXI from 'pixi.js';
import Scene from '../scene';
import Text from '../text';
import Button from '../button';
import { NewGameButton } from '../buttons/main-menu';
import SceneManager from '../managers/scene';

class MainMenuScene extends Scene {
    init() {
        super.init();

        const logoTexture = this.resources['SPLASH_LOGO'].texture;
        const logoSprite = new PIXI.Sprite(logoTexture);

        logoSprite.x = this.game.screen.width / 2 - logoTexture.baseTexture.width / 2;
        logoSprite.y = 50;
        this.scene.addChild(logoSprite);

        const container = new PIXI.Container();

        const newGameButton = new Button('New Game', { fontSize: 20 });
        newGameButton.anchor.set(0.5, 0.5);
        newGameButton.on('click', () => {
            this.game.sceneManager.unloadScene('MAIN_MENU');
            this.game.sceneManager.loadScene('GAME');
        });

        const optionsButton = new Button('Options', { fontSize: 20 });
        optionsButton.anchor.set(0.5, 0.5);
        optionsButton.y = 50;

        container.addChild(newGameButton);
        container.addChild(optionsButton);

        container.x = this.game.screen.width / 2;
        container.y = this.game.screen.height / 2;

        this.scene.addChild(container);

        const versionText = new Text('version 0.0.1', { fontSize: 10 });
        versionText.anchor.set(0, 1);
        versionText.x = 16;
        versionText.y = this.game.screen.height - 16;
        this.scene.addChild(versionText);

        const authorButton = new Button('Bobby Avoine', { fontSize: 10,  });
        authorButton.anchor.set(1, 1);
        authorButton.x = this.game.screen.width - 16;
        authorButton.y = this.game.screen.height - 16;
        this.scene.addChild(authorButton);
    }
}

export default MainMenuScene;