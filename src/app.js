import Engine from './engine';

Engine.launch(() => {
    Engine.loadScene('MAIN_MENU');
    Engine.update();
    Engine.draw();
});