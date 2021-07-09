import * as PIXI from 'pixi.js';

class Text extends PIXI.Text {
    constructor(textContent, textStyle = {}) {
        if (!textStyle.fontFamily) {
            textStyle.fontFamily = 'Press Start 2P';
        }

        if (!textStyle.fontSize) {
            textStyle.fontSize = 16;
        }

        if (!textStyle.fill) {
            textStyle.fill = 0xFFFFFF;
        }

        super(textContent, textStyle);

        this.text = textContent;
        this.resolution = 3;
        this.initialFill = this.style.fill;
    }

    on(event, callback) {
        if (!this.interactive) {
            this.interactive = true;
        }

        super.on(event, e => {
            callback(e);
        });
    }
}

export default Text;