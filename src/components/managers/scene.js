import Manager from '../manager';
import MainMenuScene from '../scenes/main-menu';
import GameScene from '../scenes/game';

class SceneManager extends Manager {
    init() {
        super.init();

        this.scenes = {};
        this.scenes['MAIN_MENU'] = this.newComponent(MainMenuScene);
        this.scenes['GAME'] = this.newComponent(GameScene);
    }

    newScene(sceneName, scene) {
        if (!this.sceneExists(sceneName)) {
            this.scenes[sceneName] = this.newComponent(sceneName, scene);
        }
    }

    loadScene(sceneName) {
        if (this.sceneExists(sceneName)) {
            this.scenes[sceneName].visible = true;
            this.scenes[sceneName].unpause();
        }
    }

    unloadScene(sceneName) {
        if (this.sceneExists(sceneName)) {
            this.scenes[sceneName].visible = false;
            this.scenes[sceneName].pause();
        }
    }

    sceneExists(sceneName) {
        return this.scenes[sceneName] ? true : false;
    }
}

export default SceneManager;