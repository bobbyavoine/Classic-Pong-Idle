import * as PIXI from 'pixi.js';
import Screen from '../screen';
import Player from '../player';
import BallManager from '../managers/ball';
import { getRandomInt, getRandomMultiplier } from '../../utils/math';
import { boxesIntersect } from '../../utils/collision';

class GameScreen extends Screen {
    init() {
        this.ballsInGame = [];
        this.paddles = [];
        this.ballSpawnInterval = 1000;
        this.gameLoopLastTimestamp = 0;

        this.player = this.newComponent(Player);
        this.ballManager = this.newComponent(BallManager);

        const urlParams = new URLSearchParams(window.location.search);
        const totalPaddles = urlParams.get('paddles') || 1;
    
        for (let i = 0; i < totalPaddles; i++) {
            const paddle = new PIXI.Sprite(this.resources['MEDIUM_BALL'].texture);
            this.game.stage.addChild(paddle);
    
            if (i == 0) {
                paddle.height = 64;
                paddle.x = 16;
                paddle.y = 800 / 2 - paddle.height / 2;
            }
    
            if (i == 1) {
                paddle.height = 64;
                paddle.x = 800 - 16 - paddle.width;
                paddle.y = 800 / 2 - paddle.height / 2;
            }
    
            if (i == 2) {
                paddle.width = 64;
                paddle.x = 800 / 2 - paddle.width / 2;
                paddle.y = 16;
            }
    
            if (i == 3) {
                paddle.width = 64;
                paddle.x = 800 / 2 - paddle.width / 2;
                paddle.y = 800 - 16 - paddle.height;
            }
    
            paddle.vx = 0;
            paddle.vy = 0;
    
            this.paddles.push(paddle);
        }
    }

    update(timestamp) {
        const timestampDiff = timestamp - this.gameLoopLastTimestamp;

        if (timestampDiff >= this.ballSpawnInterval) {
            this.gameLoopLastTimestamp = timestamp + timestampDiff - this.ballSpawnInterval;

            const ball = {...this.ballManager.getRandomBall()};

            ball.sprite = new PIXI.Sprite(this.resources[ball.texture].texture);

            this.game.stage.addChild(ball.sprite);
            
            ball.sprite.x = getRandomInt(200, 600);
            ball.sprite.y = getRandomInt(200, 600);

            ball.sprite.vx = ball.speed * getRandomMultiplier();
            ball.sprite.vy = ball.speed * getRandomMultiplier();

            this.ballsInGame.push(ball);
        }

        if (this.ballsInGame.length) {
            for (let i = this.ballsInGame.length - 1; i >= 0; i--) {
                const ball = this.ballsInGame[i];

                ball.sprite.x += ball.sprite.vx;
                ball.sprite.y += ball.sprite.vy;

                if (ball.sprite.x + ball.sprite.vx + ball.sprite.width >= 800 || ball.sprite.x + ball.sprite.vx <= 0
                    || ball.sprite.y + ball.sprite.vy <= 0 || ball.sprite.y + ball.sprite.vy + ball.sprite.height >= 800) {
                    this.game.stage.removeChild(ball.sprite);

                    this.ballsInGame.splice(i, 1);
                }
                
                this.paddles.forEach(paddle => {
                    if (boxesIntersect(paddle, ball.sprite)) {
                        if (ball.health > 0) {
                            ball.sprite.vx *= -1;
                            ball.health--;
                        } else {
                            this.game.stage.removeChild(ball.sprite);
                            this.ballsInGame.splice(i, 1);
                        }
                        
                        this.player.points += ball.points;
                    }
                });
            }
        }

        if (this.paddles.length) {
            this.paddles.forEach(paddle => {
                let closestDistance = 800;
                let closestBall = null;

                this.ballsInGame.forEach(ball => {
                    const distance = Math.sqrt((paddle.x - ball.sprite.x) * (paddle.x - ball.sprite.x) + (paddle.y - ball.sprite.y) * (paddle.y - ball.sprite.y));

                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestBall = ball;
                    }
                });

                if (closestBall) {
                    if (paddle.y < closestBall.sprite.y) {
                        paddle.vy = 2;
                    } else if (paddle.y > closestBall.sprite.y) {
                        paddle.vy = -2;
                    }
        
                    if (paddle.y + paddle.vy <= 0 || paddle.y + paddle.vy + paddle.height >= 800) {
                        paddle.vy = 0;
                    }
        
                    if (paddle.vy > 2) {
                        paddle.vy = 2;
                    }
        
                    paddle.y += paddle.vy;
                }
            });
        }
    }
}

export default GameScreen;