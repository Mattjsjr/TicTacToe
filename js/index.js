import TreeModule from "./tree.js";

document.addEventListener("DOMContentLoaded", () => {

    function reset(squares) {
        squares.forEach(square => {
            square.textContent = "";
            square.classList.remove("clicked");
        })
    }

    function squaresToList(squares) {
        let positions = [];
        squares.forEach(square => {
            if (square.textContent === undefined){
                positions.push("")
            }
            else{
                positions.push(square.textContent);
            }
            
        })
        return positions;
    }

    function checkGameOver(currentNode, gameOverBoard, mainHeader){
        if (currentNode.getGameOverVal() == 1){
            gameOverBoard.style.display = "block";
            mainHeader.textContent = "X Wins";
        }
        else if (currentNode.getGameOverVal() == -1){
            gameOverBoard.style.display = "block";
            mainHeader.textContent = "O Wins";
        }
        else if (currentNode.getGameOverVal() == 0){
            gameOverBoard.style.display = "block";
            mainHeader.textContent = "Tie";
        }
        else{
            gameOverBoard.style.display = "none";
        }
        
    }

    function gameDecide(currentNode, gameOverBoard){
        let nextNode;
        for(let child of currentNode.getChildren()){
            if (currentNode.getWinVal() === child.getWinVal()){
                nextNode = child;
                break
            } 
        }

        gameOverBoard.style.display = "block";
        let index = 0;
        squares.forEach(square => {
            if(square.textContent != nextNode.getValue()[index]){
                square.textContent = nextNode.getValue()[index];
                square.classList.add("clicked");
            }
            index++;
        })

        gameOverBoard.style.display = "none";
        return nextNode;
    }

    const selectors = document.querySelectorAll('.pregameSelect');
    const board = document.querySelector('.pregame');
    const squares = document.querySelectorAll('.squares');
    const gameOverBoard = document.querySelector('.gameover_board');
    const mainHeader = document.querySelector('#Main_Header');
    const resetButton = document.querySelector('#reset_button')

    let selected;
    let turn = 'X';
    let computerStarts;

    let root = new TreeModule.Node(['','','','','','','','',''], 'X');
    let tree = new TreeModule.Tree(root);
    tree.createTree()
    tree.assignScore()
    let currentNode = root;

    // User chooses X or O
    selectors.forEach(selector => {
        selector.addEventListener("click", (event) => {
            selected = event.target.textContent;
            board.style.display = "none";
            computerStarts = selected === 'X' ? false : true;
            turn = computerStarts ? 'O' : 'X';
            if (computerStarts){
                currentNode = gameDecide(currentNode, gameOverBoard);
            }
        });
    });

    // User chooses a square
    squares.forEach(square => {
        square.addEventListener("click", () => {

            if (square.classList.contains("clicked")){
                return;
            };

            // Adds user char to square clicked and makes it unavailable to click again
            square.textContent = turn;
            square.classList.add("clicked");

            // Converts squares to a list
            let currentBoard = squaresToList(squares);
            // Finds where we are in the tree 
            for (let child of currentNode.getChildren()) {
                if (JSON.stringify(currentBoard) == JSON.stringify(child.getValue())) {
                    currentNode = child;
                    break;
                }
            }
            
            // See if the game is over
            checkGameOver(currentNode, gameOverBoard, mainHeader);
            gameOverBoard.style.display = "block";

            // User makes a decision
            if (currentNode.getGameOverVal() === null){
                setTimeout(() => {
                    currentNode = gameDecide(currentNode, gameOverBoard);
                    checkGameOver(currentNode, gameOverBoard, mainHeader);
                }, 300);
            }
        })
    });

    // User clicks reset
    resetButton.addEventListener("click", () => {
        reset(squares);
        gameOverBoard.style.display = "none";
        mainHeader.textContent = "Tic Tac Toe";
        board.style.display = "flex";
        root = tree.root;
        currentNode = root;
        turn = 'X';
    });

});