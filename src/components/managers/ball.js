import Manager from '../manager';
import MediumBall from '../balls/medium';
import FastBall from '../balls/fast';
import { getRandomInt } from '../../utils/math';

class BallManager extends Manager {
    init() {
        this.balls = [];
        this.balls.push(this.newComponent(MediumBall));
        this.balls.push(this.newComponent(FastBall));
    }

    getRandomBall() {
        const sortedBalls = this.balls.sort((a, b) => a.spawnChance - b.spawnChance);

        let randomBall;
    
        for (let i = 0; i < sortedBalls.length; i++) {
            const sortedBall = sortedBalls[i];
    
            if (getRandomInt(1, 100) <= sortedBall.spawnChance) {
                randomBall = sortedBall;
                break;
            }
        }
    
        return randomBall;
    }
}

export default BallManager;