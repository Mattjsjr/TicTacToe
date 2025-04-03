import TreeModule from "./tree.js";

document.addEventListener("DOMContentLoaded", () => {

    function reset(squares) {
        squares.forEach(square => {
            square.textContent = "";
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

    const selectors = document.querySelectorAll('.pregameSelect');
    const board = document.querySelector('.pregame');
    const squares = document.querySelectorAll('.squares');
    const gameOverBoard = document.querySelector('.gameover_board');
    const mainHeader = document.querySelector('#Main_Header');
    const resetButton = document.querySelector('#reset_button')

    let selected;
    let turn = 'X';

    let root = new TreeModule.Node(['','','','','','','','',''], 'X');
    let tree = new TreeModule.Tree(root);
    tree.createTree()
    let currentNode = root;

    // User chooses X or O
    selectors.forEach(selector => {
        selector.addEventListener("click", (event) => {
            selected = event.target.textContent;
            console.log(selected);
            board.style.display = "none";
        });
    });

    // User chooses a square
    squares.forEach(square => {
        square.addEventListener("click", () => {
            square.textContent = turn;
            turn = turn === 'X' ? 'O' : 'X';

            let currentBoard = squaresToList(squares);
            for (let i = 0; i < 9; i++) {
                if (JSON.stringify(currentBoard) == JSON.stringify(currentNode.getChildren()[i].getValue())) {
                    currentNode = currentNode.getChildren()[i];
                    break;
                }
            }

            if (currentNode.getWinVal() == 1){
                gameOverBoard.style.display = "block";
                mainHeader.textContent = "X Wins";
            }
            else if (currentNode.getWinVal() == -1){
                gameOverBoard.style.display = "block";
                mainHeader.textContent = "O Wins";
            }
            else if (currentNode.getWinVal() == 0){
                gameOverBoard.style.display = "block";
                mainHeader.textContent = "Tie";
            }

        })
    });

    // User clicks reset
    resetButton.addEventListener("click", () => {
        reset(squares);
        gameOverBoard.style.display = "none";
        mainHeader.textContent = "Tic Tac Toe";
        board.style.display = "flex";
    });

});