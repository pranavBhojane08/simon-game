let buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

// Start the game
document.addEventListener("keydown", function () {
    if (!started) {
        document.getElementById("level-title").textContent = "Level " + level;
        nextSequence();
        started = true;
    }
});

// User clicks a button
document.querySelectorAll(".btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
        let userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);

        playSound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length - 1);
    });
});

// Check user answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        document.body.classList.add("game-over");
        document.getElementById("level-title").textContent = "Game Over, Press Any Key to Restart";

        setTimeout(function () {
            document.body.classList.remove("game-over");
        }, 200);

        startOver();
    }
}

// Generate the next sequence
function nextSequence() {
    userClickedPattern = [];
    level++;
    document.getElementById("level-title").textContent = "Level " + level;

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    document.getElementById(randomChosenColor).classList.add("pressed");
    setTimeout(function () {
        document.getElementById(randomChosenColor).classList.remove("pressed");
    }, 100);

    playSound(randomChosenColor);
}

// Play sound for button press
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Animate button press
function animatePress(currentColor) {
    document.getElementById(currentColor).classList.add("pressed");
    setTimeout(function () {
        document.getElementById(currentColor).classList.remove("pressed");
    }, 100);
}

// Restart the game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
