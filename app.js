const board = document.getElementById("board");
let gameClock = 0;
const gameTimer = 1000;
let score = document.getElementById("currentScore").textContent;
let highScore = document.getElementById("highScore").textContent;

let boardArrangment = {};

let snake = [
    { img: null, divNo: null },
    { img: null, divNo: null },
    { img: null, divNo: null },
];

preGame();

function preGame() {
    setBoardArrangmentWithRows();
    setDivsOnBoard();
    setRowsInBoardArrangment();
    setSnakeOnBoard();
    createRandomFood();
}

function setBoardArrangmentWithRows() {
    for (let i = 1; i <= 20; i++) {
        boardArrangment[`row${i}`] = [];
    }
}

function setDivsOnBoard() {
    for (let i = 1; i <= 400; i++) {
        const block = document.createElement("div");
        block.setAttribute("id", i);
        board.appendChild(block);
    }
}

function setRowsInBoardArrangment() {
    for (let i = 1; i <= 20; i++) {
        for (let j = 1; j <= 20; j++) {
            let blockId = (i - 1) * 20 + j;
            boardArrangment[`row${i}`].push(
                document.getElementById(`${blockId}`)
            );
        }
    }
}

function setSnakeOnBoard() {
    const snakeHead = document.createElement("img");
    snakeHead.src = "./assets/snake-img/head_right.png";
    snakeHead.width = 25;
    snakeHead.height = 25;
    snakeHead.setAttribute("id", 24);
    document.getElementById("24").appendChild(snakeHead);
    // boardArrangment['row2'][3].appendChild(snakeHead);

    const snakeBody = document.createElement("img");
    snakeBody.src = "./assets/snake-img/body_horizontal.png";
    snakeBody.width = 25;
    snakeBody.height = 25;
    snakeBody.setAttribute("id", 23);
    document.getElementById("23").appendChild(snakeBody);

    const snakeTail = document.createElement("img");
    snakeTail.src = "./assets/snake-img/tail_left.png";
    snakeTail.width = 25;
    snakeTail.height = 25;
    snakeTail.setAttribute("id", 22);
    document.getElementById("22").appendChild(snakeTail);

    updateSnake(snakeHead, snakeTail);
}

function updateSnake(snakeHead, snakeTail) {
    //head
    snake[0]["divNo"] = +snakeHead.id;
    snake[0].img = snakeHead;
    //tail
    snake[snake.length - 1]["divNo"] = +snakeTail.id;
    snake[snake.length - 1].img = snakeTail;

    //body
    if (+score == 0) {
        snake[1].divNo = snake[snake.length - 1].divNo + 1;
        const snakeBody = document.createElement("img");
        snakeBody.src = "./assets/snake-img/body_horizontal.png";
        snakeBody.width = 25;
        snakeBody.height = 25;
        snake[1].img = snakeBody;
    }
}

function createRandomFood() {
    let randomNumber = calculateRandomNumber(400, 1);
    const apple = document.createElement("img");
    apple.src = "./assets/apple.png";
    apple.width = 25;
    apple.height = 25;
    document.getElementById(`${randomNumber}`).appendChild(apple);
}

function calculateRandomNumber(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function moveSnake() {
    // Clear the current position of the tail
    let tailDiv = document.getElementById(`${snake[snake.length - 1].divNo}`);
    tailDiv.innerHTML = null;

    // Shift each segment's position to the previous one, moving from tail to head
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i].divNo = snake[i - 1].divNo;
    }
    // Move the head forward
    snake[0].divNo += 1;

    // Update DOM elements for each snake segment based on the new divNo
    for (let segment of snake) {
        let divToAppend = document.getElementById(`${segment.divNo}`);
        divToAppend.innerHTML = null; // Clear previous content (if any)
        divToAppend.appendChild(segment.img); // Append the segment image
    }
}

const startButton = document.getElementById("start");
startButton.addEventListener("click", gameStart);

function gameStart() {
    updateGameClock();
    setInterval(() => {
        moveSnake();
    }, gameTimer);
}

function updateGameClock() {
    setInterval(() => {
        gameClock++;
    }, gameTimer);
}
