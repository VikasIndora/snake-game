const board = document.getElementById("board");

let boardArrangment = {};

let snake = [{ img: undefined }, { img: undefined }, { img: undefined }];

preGame();

function preGame() {
    setBoardArrangmentWithRows();
    setDivsOnBoard();
    setRowsInBoardArrangment();

    setSnakeOnBoard();
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
    document.getElementById("24").appendChild(snakeHead);
    // boardArrangment['row2'][3].appendChild(snakeHead);

    const snakeBody = document.createElement("img");
    snakeBody.src = "./assets/snake-img/body_horizontal.png";
    snakeBody.width = 25;
    snakeBody.height = 25;
    document.getElementById("23").appendChild(snakeBody);

    const snakeTail = document.createElement("img");
    snakeTail.src = "./assets/snake-img/tail_left.png";
    snakeTail.width = 25;
    snakeTail.height = 25;
    document.getElementById("22").appendChild(snakeTail);
}

function generateRandomFood() {
    let foodImage = document.createElement("img");
    foodImage.src = "./assets/apple.png";
    foodImage.width = 25;
    foodImage.height = 25;
    board.appendChild(foodImage);
}
