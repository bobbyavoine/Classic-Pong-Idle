import * as PIXI from 'pixi.js';

class Engine {
    static game = {};
    static screens = {};
    static loader = PIXI.Loader.shared;
    static resources = Engine.loader.resources;

    static load(callback) {
        PIXI.Loader.shared.add('MEDIUM_BALL', './assets/balls/medium.png');
        PIXI.Loader.shared.add('FAST_BALL', './assets/balls/fast.png');
        PIXI.Loader.shared.add('BLACKHOLE_BALL', './assets/balls/blackhole.png');
        PIXI.Loader.shared.add('BULLET_BALL', './assets/balls/bullet.png');
        PIXI.Loader.shared.add('MAGNET_BALL', './assets/balls/bullet.png');
        PIXI.Loader.shared.add('SPIKES_BALL', './assets/balls/spikes.png');
        PIXI.Loader.shared.load(callback);
    }

    static launch(callback) {
        Engine.setupNewGame();

        Engine.game = new PIXI.Application({
            width: 800,
            height: 800
        });

        const gameHtmlElement = document.querySelector('#game');

        gameHtmlElement.appendChild(Engine.game.view);

        Engine.game.renderer.backgroundColor = 0xFFFFFF;

        Engine.load(callback);
    }

    static setupNewGame() {
        Engine.game.points = 0;
    }

    static newScreen(screenName, screen) {
        if (!Engine.screens[screenName]) {
            Engine.screens[screenName] = new screen({
                game: Engine.game,
                loader: Engine.loader,
                resources: Engine.resources
            });
        }
    }

    static update() {
        const updateLoop = (timestamp = 0) => {
            if (Object.keys(Engine.screens).length) {
                for (const screenName in Engine.screens) {
                    Engine.screens[screenName].update(timestamp);
                }
            }
        
            requestAnimationFrame(updateLoop);
        }
        
        updateLoop();
    }

    static draw() {

    }
}

export default Engine;