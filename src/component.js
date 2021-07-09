class Component {
    constructor({ game, loader, resources }) {
        this.paused = false;

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

    preUpdate(timestamp) {
        if (!this.paused) {
            this.update(timestamp);
        }
    }

    update(timestamp) {
        this.components.forEach(component => component.preUpdate(timestamp));
    }

    preDraw() {
        if (!this.paused) {
            this.draw();
        }
    }

    draw() {
        this.components.forEach(component => component.preDraw());
    }

    newComponent(component) {
        const newComponent = new component({
            game: this.game,
            loader: this.loader,
            resources: this.resources
        });

        this.components.push(newComponent);

        return newComponent;
    }

    pause() {
        this.paused = true;
    }

    unpause() {
        this.paused = false;
    }
}

export default Component;