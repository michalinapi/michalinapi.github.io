const character = document.getElementById("character")
const block = document.getElementById("block")
const score = document.getElementById("score")
const gameover = document.getElementById("gameover")

let cnt = 0;

function jump() {
    if (character.classList != "animate") {
        character.classList.add("animate");
    }

    setTimeout(function() {
        character.classList.remove("animate");
    }, 500)
}

window.addEventListener("keydown", function(event) {
    if (event.code == "Space") {
        jump();
    }
})  

var lastPosition = -100;

setInterval(function() {
    const characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));

    if (blockLeft > 0 && blockLeft < 20) {
        if (characterTop >= 130) {
            block.classList.remove("block-move");
            block.style.display = "none";
            // alert("You lose!")
            gameover.style.display = "flex";
            cnt = 0;
        } else if (lastPosition <= 0 || lastPosition >= 20) {
            cnt ++;
        }
    } 

    lastPosition = blockLeft;
}, 10)


setInterval(function() {
    score.textContent = "" + cnt;
}, 10)

function start() {
    block.style.display = "block";
    gameover.style.display = "none";

    block.classList.add("block-move");
}