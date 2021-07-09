import * as PIXI from 'pixi.js';
import FontFaceObserver from 'fontfaceobserver';
import SceneManager from './components/managers/scene';

class Engine {
    static game = {};
    static loader = PIXI.Loader.shared;
    static resources = Engine.loader.resources;

    static load(callback) {
        const fontObserver = new FontFaceObserver('Press Start 2P');
        
        fontObserver.load().then(() => {
            Engine.loader.add('SPLASH_LOGO', './assets/logo.png');
            Engine.loader.add('MEDIUM_BALL', './assets/balls/medium.png');
            Engine.loader.add('FAST_BALL', './assets/balls/fast.png');
            Engine.loader.add('BLACKHOLE_BALL', './assets/balls/blackhole.png');
            Engine.loader.add('BULLET_BALL', './assets/balls/bullet.png');
            Engine.loader.add('MAGNET_BALL', './assets/balls/bullet.png');
            Engine.loader.add('SPIKES_BALL', './assets/balls/spikes.png');
            Engine.loader.load(callback);
        });
    }

    static launch(callback) {
        Engine.setupNewGame();

        Engine.game = new PIXI.Application({
            width: 1280,
            height: 960
        });

        const gameHtmlElement = document.querySelector('#game');

        gameHtmlElement.appendChild(Engine.game.view);

        Engine.game.renderer.backgroundColor = 0x000000;

        Engine.load(() => {
            Engine.game.sceneManager = new SceneManager({
                game: Engine.game,
                loader: Engine.loader,
                resources: Engine.resources
            });

            callback();
        });
    }

    static setupNewGame() {
        Engine.game.points = 0;
    }

    static loadScene(sceneName) {
        Engine.game.sceneManager.loadScene(sceneName);
    }

    static update() {
        const updateLoop = (timestamp = 0) => {
            Engine.game.sceneManager.preUpdate(timestamp);
        
            requestAnimationFrame(updateLoop);
        }
        
        updateLoop();
    }

    static draw() {
        const drawLoop = () => {
            Engine.game.sceneManager.preDraw();

            requestAnimationFrame(drawLoop);
        }

        drawLoop();
    }
}

export default Engine;