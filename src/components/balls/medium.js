import Ball from '../ball';

class MediumBall extends Ball {
    init() {
        super.init({
            name: 'Medium Ball',
            width: 16,
            height: 16,
            speed: 1,
            health: 1,
            texture: 'MEDIUM_BALL',
            spawnChance: 100,
            points: 1
        });
    }
}

export default MediumBall;