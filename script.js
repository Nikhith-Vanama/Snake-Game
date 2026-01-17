const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20; // Size of snake block
let snake = [{ x: 200, y: 200 }];
let dx = box;
let dy = 0;

let food = generateFood();

function generateFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
}

document.addEventListener("keydown", changeDirection);

function changeDirection(e) {
    if (e.key === "ArrowUp" && dy === 0) {
        dx = 0;
        dy = -box;
    }
    else if (e.key === "ArrowDown" && dy === 0) {
        dx = 0;
        dy = box;
    }
    else if (e.key === "ArrowLeft" && dx === 0) {
        dx = -box;
        dy = 0;
    }
    else if (e.key === "ArrowRight" && dx === 0) {
        dx = box;
        dy = 0;
    }
}

function gameLoop() {
    setTimeout(() => {
        update();
        draw();
        gameLoop();
    }, 120);
}

function update() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Wall collision
    if (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height
    ) {
        alert("Game Over 😢 Refresh to Play Again!");
        document.location.reload();
    }

    // Self collision
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            alert("Game Over 😢 Refresh to Play Again!");
            document.location.reload();
        }
    }

    snake.unshift(head);

    // Food eaten
    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
    } else {
        snake.pop();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? "#00ff99" : "#ffffff";
        ctx.fillRect(part.x, part.y, box, box);
    });

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
}

gameLoop();
