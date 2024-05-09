const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Creating a function to initialize the game

function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    
    // Emptying the boxes on UI
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // Again initialize the boxes with their default CSS 

        box.classList = `box box${index+1}`;
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "0";
    }
    else{
        currentPlayer = "X";
    }

    // Update Game Info Now
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "";

    winningPositions.forEach((position) => {

        // positions must be non-empty & same
        if(gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" && 
            gameGrid[position[2]] !== "" && gameGrid[position[0]] === gameGrid[position[1]]
            && gameGrid[position[1]] === gameGrid[position[2]]){

                // check if winner is X
                if(gameGrid[position[0]] === "X"){
                    answer = "X";
                }
                else{
                    answer = "0";
                }

                // Disable Pointer Events after getting a winner

                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

            // We have our winner now - for green background colour
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // we have a winner
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // Checking if Match Tied

    let count = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            count = count + 1;
        }
    });

    if(count === 9){
        gameInfo.innerText = `Match Tied!`;
        newGameBtn.classList.add("active");
    }
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // Swap Player Turn
        swapTurn();

        // check if some player won the game
        checkGameOver();
    }
}

boxes.forEach((box,index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);