const dino = document.querySelector(".dino");
const background = document.querySelector(".background")
let isJumping = false;
let position = 0;
let score = 0;
let hightScore = 0;


let handleKeyDown = (e) => {

    if (e.keyCode === 40) {
        lowerDino();
    } else if (e.keyCode === 32 || e.keyCode === 38){
        if(!isJumping){
            jump();
        }
    }
    
}

let handleKeyUp = (e) => {
    if (e.keyCode === 40) {
        upDino();
    }
}

let jump = () => {
    isJumping = true;

    audio = returnSound("assets/audio/Jump.ogg");
    audio.play();

    let upInterval = setInterval(() => {
        if(position >= 150){
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if(position === 0){
                    clearInterval(downInterval)
                    isJumping = false;
                }else{
                    position -= 20;

                    dino.style.bottom = `${position}px`;
                }
            }, 25 + 9.8)
        } else{
            position += 20;

            dino.style.bottom = `${position}px`;
        }
    }, 25 + 9.8);
}

let createCactus = () => {
    const cactus = document.createElement("div");
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = `${1000}px`;
    background.appendChild(cactus);

    let leftCactusInterval = setInterval(() => {
        if(cactusPosition < -60) {
            clearInterval(leftCactusInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 120 && position < 60) {
            // Game over
            setHighScore();

            clearInterval(leftCactusInterval);
            
            audio = returnSound("assets/audio/fatalDamageCactusSound.ogg");
            audio.play();

            clearInterval(incrementScoreInterval);

            clearInterval(musicaAmbienteInterval);
            audio = returnSound("assets/audio/MusicaAmbiente.ogg");
            audio.pause();

            document.body.innerHTML = '<h1 class="game-over">Fim de jogo<br><a href="index.html" style="text-decoration:none;" class="game-over">Tente novamente!<br><img src="assets/reload.png"></a><h1>';
        } else {
            cactusPosition -= 10;
            cactus.style.left = `${cactusPosition}px`;
        }
    }, 20);

    setTimeout(createCactus, randomTime);
};

/* let createBird = () => {
    const bird = document.createElement("div");
    let birdPosition = 1000;
    let randomTime = Math.random() * 6000;
    let randomPlaceBird = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

    bird.classList.add('bird');
    bird.style.left = `${1000}px`;
    background.appendChild(bird);

    let leftBirdInterval = setInterval(() => {
        if(birdPosition < -60){
            clearInterval(leftBirdInterval);
            background.removeChild(bird);
        } else if (birdPosition > 0 && birdPosition < 120 && position < 60) {
            // Game over

            clearInterval(leftBirdInterval);

            audio = returnSound("assets/audio/fatalDamageBirdSound.ogg");
            audio.play();

            clearInterval(incrementScoreInterval);

            clearInterval(musicaAmbienteInterval);
            audio = returnSound("assets/audio/MusicaAmbiente.ogg");
            audio.pause();

            document.body.innerHTML = '<h1 class="game-over">Fim de jogo<br><a href="index.html" style="text-decoration:none;" class="game-over">Tente novamente!<br><img src="assets/reload.png"></a><h1>';            
        } else {
            birdPosition -= 10;
            bird.style.left = `${birdPosition}px`;
        }
    }, 20);

    setTimeout(createBird, randomTime);
}; */

let lowerDino = () => {
    dino.setAttribute("class","dinoLowered");
};

let upDino = () => {
    dino.setAttribute("class", "dino");
};

let incrementScore = () => {
    let htmlScore = document.querySelector(".score");
    score += 1;
    htmlScore.innerHTML = `Pontuação: ${score}`;
};

let setHighScore = () => {
    if(score > hightScore){
        localStorage.setItem('highScore', score);
    }
}

let getHighScore = () => {
    hightScore = localStorage.getItem('highScore');
    return hightScore;
}

let returnSound = (pathMusic) => {
    let audio = new Audio(pathMusic);
    return audio;
}

let stopSound = (audio) => {
    audio.pause();
}

let musicaAmbienteInterval = setInterval(() => {
    audio = returnSound("assets/audio/MusicaAmbiente.ogg");
    audio.play();
}, 326000);
let incrementScoreInterval = setInterval(incrementScore, 25 + 9.8)

document.querySelector(".highScore").innerHTML += ` ${getHighScore()}`;

createCactus();

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
