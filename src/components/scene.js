import * as PIXI from 'pixi.js';
import Component from '../component';

class Scene extends Component {
    init() {
        super.init();
        
        this.pause();
        this.scene = new PIXI.Container();

        this.scene.width = this.game.screen.width;
        this.scene.height = this.game.screen.height;
        this.scene.visible = false;

        this.game.stage.addChild(this.scene);
    }

    get visible() {
        return this.scene.visible;
    }

    set visible(value) {
        this.scene.visible = value;
    }
}

export default Scene;