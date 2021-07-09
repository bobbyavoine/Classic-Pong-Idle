class Component {
    constructor({ game, loader, resources }) {
        if (game) {
            this.game = game;
        }

        if (loader) {
            this.loader = loader;
        }

        if (resources) {
            this.resources = resources;
        }

        this.components = [];

        this.init();
    }

    init() {

    }

    update(timestamp) {
        this.components.forEach(component => component.update(timestamp));
    }

    newComponent(component) {
        const newComponent = new component({
            game: this.game
        });

        this.components.push(newComponent);

        return newComponent;
    }
}

export default Component;