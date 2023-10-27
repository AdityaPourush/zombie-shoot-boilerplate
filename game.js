// Iteration 1: Declare variables required for this game

let gameBody = document.getElementById("game-body");
let timerBox = document.getElementById("timer");

let zombieId = 0;

let zombieImages = [
    "zombie-1.png",
    "zombie-2.png",
    "zombie-3.png",
    "zombie-4.png",
    "zombie-5.png",
    "zombie-6.png",
]

// Iteration 1.2: Add shotgun sound

let shotgunSound = new Audio("./assets/shotgun.wav"); // to load an audio to a variable
gameBody.addEventListener("click", () => {
    shotgunSound.pause();  // to stop the previous sound
    shotgunSound.currentTime = 0; // to reset the sound to 0
    shotgunSound.play(); // to play the sound
})

// Iteration 1.3: Add background sound

let bgm = new Audio("./assets/bgm.mp3");
bgm.play();
bgm.loop = true;  // to loop the sound

// Iteration 1.4: Add lives

let lives = 4;

// Iteration 2: Write a function to make a zombie

function makeZombie(){
    // <img src="./assets/zombie-1.png" class="zombie-image" alt="">
    let zombie = document.createElement("img");
    let zomImg = zombieImages[getRandomInt(0, zombieImages.length)];
    zombie.classList.add("zombie-image");
    zombie.id = `zombie-${zombieId}`;
    zombie.src = `./assets/${zomImg}`;
    zombie.style.transform = `translateX(${getRandomInt(10, 90)}vw)`;
    zombie.style.animationDuration = `${getRandomInt(3, 6)}s`;
    gameBody.append(zombie);

    zombie.addEventListener('click', () => {
        zombieKill(zombie);
    })
}

// makeZombie();

// Iteration 3: Write a function to check if the player missed a zombie

function checkCollosion (){
    let zombie = document.getElementById(`zombie-${zombieId}`);
    if (zombie.getBoundingClientRect().top <= 0){
        lives--;
    let zombie = document.getElementById(`zombie-${zombieId}`);
        zombieKill(zombie);
    }
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed

function zombieKill(zombie){
    zombie.style.display = "none";
    zombieId++;
    makeZombie();
}

// Iteration 5: Creating timer

function startTimer(){
    let time = 60;
    timerBox.textContent = time;
    setInterval(() => {
        time--;
        timerBox.textContent = time;

        checkCollosion();

        if (lives == 0){
            window.location.href = "./game-over.html";
        }

        if (time == 0){
            window.location.href = "./win.html";
        }
    }, 1000)
}

startTimer();
// Iteration 6: Write a code to start the game by calling the first zombie

makeZombie();

// Iteration 7: Write the helper function to get random integer

function getRandomInt(min, max) {
    let randomInt = Math.floor(Math.random() * (max - min) + min);
    return randomInt;
}
