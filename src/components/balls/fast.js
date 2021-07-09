import Ball from '../ball';

class FastBall extends Ball {
    init() {
        super.init({
            name: 'Fast Ball',
            width: 8,
            height: 8,
            speed: 3,
            health: 0,
            texture: 'FAST_BALL',
            spawnChance: 50,
            points: 3
        });
    }
}

export default FastBall;