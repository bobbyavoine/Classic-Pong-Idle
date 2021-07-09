import Engine from './engine';
import GameScreen from './components/screens/game'

Engine.launch(() => {
    Engine.newScreen('Game Screen', GameScreen);
    Engine.update();
    Engine.draw();
});