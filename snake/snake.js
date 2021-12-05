
const game = document.getElementById("game");
let direction = {x: 1, y: 0};

let lastDirection = "ArrowRight"

const SNAKE_SPEED = 5
var lastTime = 0

var snake = [
    {x: 10, y: 11},
    {x: 10, y: 12},
    {x: 10, y: 13},
];
const apple = {x: 15, y: 10};

window.addEventListener("keydown", e => {
    if (e.key == "ArrowUp") {
        if (lastDirection === "ArrowUp" || lastDirection === "ArrowDown") return
        direction = {x: 0, y: -1};
        lastDirection = "ArrowUp"
    } else if (e.key == "ArrowDown") {
        if (lastDirection === "ArrowUp" || lastDirection === "ArrowDown") return
        direction = {x: 0, y: 1};
        lastDirection = "ArrowDown"
    } else if (e.key == "ArrowLeft") {
        if (lastDirection === "ArrowLeft" || lastDirection === "ArrowRight") return
        direction = {x: -1, y: 0};
        lastDirection = "ArrowLeft"
    } else if (e.key == "ArrowRight") {
        if (lastDirection === "ArrowLeft" || lastDirection === "ArrowRight") return
        direction = {x: 1, y: 0};
        lastDirection = "ArrowRight"
    }
})

function generateApple() {

    while(true) {
        const x = Math.floor(1 + Math.random() * 20)
        const y = Math.floor(1 + Math.random() * 20)

        var atTheSnake = false
        for (const pos of snake) {
            if (pos.x === x && pos.y == y) {
                atTheSnake = true
                break
            }
        }

        if (!atTheSnake) {
            apple.x = x
            apple.y = y
            break
        }
    }

}

function drawSnake() {
    const last = { ...snake[snake.length - 1]}

    for (let i = snake.length - 2; i >= 0; i--) {
        snake[i + 1] = { ...snake[i] }
    }

    snake[0].x += direction.x
    snake[0].y += direction.y

    // check if the snake bites itself.
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[1].y) {
            alert("You lose, Click OK to try again.")
            snake = [{x: 10, y: 10}] 
        }
    }

    if (snake[0].x === apple.x && snake[0].y === apple.y) {
        snake.push(last)
        generateApple();
    }


    // check the head of the snake out of the game board.
    if (snake[0].x <= 0 || snake[0].x > 21 || snake[0].y <= 0 || snake[0].y > 21) {
        alert("You lose, Click OK to try again.")
        snake = [{x: 10, y: 10}]
    } else {
        snake.forEach(s => {
            const div = document.createElement("div");
            div.style.gridColumnStart = s.x;
            div.style.gridRowStart = s.y;
            div.classList.add('snake');
    
            game.appendChild(div)
        })
    }
}

function drawApple() {
    const div = document.createElement("div");
    div.style.gridColumnStart = apple.x;
    div.style.gridRowStart = apple.y;
    div.classList.add('food');
    game.appendChild(div) 
}

function main(currentTime) {
    window.requestAnimationFrame(main);

    if (currentTime - lastTime < 1000 / SNAKE_SPEED) return
    lastTime = currentTime

    game.innerHTML = "";
    drawSnake();
    drawApple();
    console.log(currentTime);
}


window.requestAnimationFrame(main);