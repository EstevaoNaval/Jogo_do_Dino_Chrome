const background = document.querySelector(".background")
const score = document.querySelector(".score");
const highScore = document.querySelector(".highScore");

class Dino {
    #dinoHTML;
    #isJumping = false;
    #dinoPosition = 0;


    constructor(divDino) {
        this.#dinoHTML = divDino;
    };

    getDinoPosition() { 
        let dinoPosition = this.#dinoPosition;
        return dinoPosition;
    };

    getIsJumping() {
        let isJumping = this.#isJumping;
        return isJumping;
    }

    jump(){
        this.#isJumping = true;
        let dinoPosition = this.#dinoPosition;
        let dinoHTML = this.#dinoHTML;

        let upInterval = setInterval(() => {
            if(dinoPosition >= 150){
                clearInterval(upInterval);

                let downInterval = setInterval(() => {
                    if(dinoPosition === 0){
                        clearInterval(downInterval)
                        this.#isJumping = false;
                    }else{
                        dinoPosition -= 20;

                        dinoHTML.style.bottom = `${dinoPosition}px`;
                    }
                }, 25 + 9.8)
            } else{
                dinoPosition += 20;

                dinoHTML.style.bottom = `${dinoPosition}px`;
            }
        }, 25 + 9.8);

    };

    lowerDino() {
        let dinoHTML = this.#dinoHTML;
        dinoHTML.setAttribute("class","dinoLowered");
    };

    upDino() {
        let dinoHTML = this.#dinoHTML;
        dinoHTML.setAttribute("class", "dino");
    };
};

class Score {
    #score = 0;

    getHighScore() {
        let highScore = localStorage.getItem('highScore');
        return highScore;
    };

    setHighScore() {
        let score = this.#score;
        let highScore = localStorage.getItem('highScore') 

        if(score > parseInt(highScore)){
            localStorage.setItem('highScore', score);
        }
    };

    getScore() {
        let score = this.#score;
        return score 
    };

    setScore() { 
        let score = 0;
        score += 1;

        this.#score += score;
    };
}

class Obstacle {
    #obstacle = document.createElement("div");
    #nameClassObstacle;
    #obstaclePosition = 1000;
    #randomTime = Math.random() * 6000;

    constructor(nameObstacle, objScore, objDino, intervalScore) {
        this.#nameClassObstacle = nameObstacle;
        this.addClassObstacle();
        this.animateObstacle(objScore, objDino, intervalScore);

        setTimeout(() => {let objObstacle = new Obstacle(nameObstacle, objScore, objDino, intervalScore)}, this.#randomTime)
    }

    addClassObstacle() {
        let nameClassObstacle = this.#nameClassObstacle;
        let obstacle = this.#obstacle;

        obstacle.classList.add(nameClassObstacle);
        background.appendChild(obstacle);
        obstacle.style.left = `1000px`;
    }

    animateObstacle(objScore, objDino, intervalScore) {
        let obstaclePosition = this.#obstaclePosition;
        let obstacle = this.#obstacle;

        let intervalLeftObstacle = setInterval(() => {
            if(obstaclePosition < -60) {
                clearInterval(intervalLeftObstacle);
                background.removeChild(obstacle);
            } /* else if (obstaclePosition > 0 && obstaclePosition < 120 && objDino.getDinoPosition() < 60) {
                // Game over
                objScore.setHighScore();
    
                clearInterval(intervalLeftObstacle);
                clearInterval(intervalScore);
    
                document.body.innerHTML = '<h1 class="game-over">Fim de jogo<br><a href="index.html" style="text-decoration:none;" class="game-over">Tente novamente!<br><img src="assets/reload.png"></a><h1>';
            } */else {
                obstaclePosition -= 10;
                obstacle.style.left = `${obstaclePosition}px`;
            }

        }, 20)
    }
}

let handleKeyDown = (e) => {

    if(!objDino.getIsJumping()) {
        if(e.keyCode === 40) {
            objDino.lowerDino();
        } else if(e.keyCode === 32 || e.keyCode === 38) {
            objDino.jump();
        }
    }    
}

let handleKeyUp = (e) => {
    if (e.keyCode === 40) {
        objDino.upDino();
    }
}

objDino = new Dino(document.querySelector(".dino"));
objScore = new Score();

highScore.innerHTML = `Maior pontuação: ${objScore.getHighScore()}`;

let scoreInterval = setInterval(() => {
    objScore.setScore();
    score.innerHTML = `Pontuação: ${objScore.getScore()}`;
}, 34.8)

objCactus = new Obstacle("cactus", objScore, objDino, scoreInterval);

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
