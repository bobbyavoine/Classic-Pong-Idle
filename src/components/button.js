import Text from './text';

class Button extends Text {
    constructor(buttonText, buttonStyle) {
        super(buttonText, buttonStyle);

        this.init();
        this.onHover();
        this.onClick();
    }

    init() {
        
    }

    onHover() {
        this.on('pointerover', () => {
            this.style.fill = 0xF6E754;
        });

        this.on('pointerout', () => {
            this.style.fill = this.initialFill;
        });
    }

    onClick() {
        this.on('pointerup', () => {
            if (typeof this.action === 'function') {
                this.action();
            }
        });
    }
}

export default Button;