import Component from '../component';

class Ball extends Component {
    init(ballData) {
        this.name = ballData.name;
        this.width = ballData.width;
        this.height = ballData.height;
        this.speed = ballData.speed;
        this.health = ballData.health;
        this.texture = ballData.texture;
        this.spawnChance = ballData.spawnChance;
        this.points = ballData.points;
    }
}

export default Ball;