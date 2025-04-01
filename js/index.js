import TreeModule from "./tree.js";

document.addEventListener("DOMContentLoaded", () =>{

    function reset(squares){
        squares.forEach(square =>{
            square.textContent = "";
        })
    }

    function squaresToList(squares){
        let positions = [];
        squares.forEach(square => {
            positions.push(square.textContent);
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

    let root = new TreeModule.Node(Array(9).fill());
    let tree = new TreeModule.Tree(root);
    let currentNode = root;

    // User chooses X or O
    selectors.forEach(selector => {
        selector.addEventListener("click", (event) =>{
            selected = event.target.textContent;
            console.log(selected);
            board.style.display = "none";
        });
    });

    // User chooses a square
    squares.forEach(square => {
        square.addEventListener("click", () => {
            square.textContent = selected

            let currentBoard = squaresToList(squares)
            for(let i = 0; i < 9; i++){
                if(currentBoard == currentNode.getChildren()[i]){
                    currentNode = currentNode.getChildren()[i];
                    break;
                }
            }

            /* if (gameOver(squares)){
                gameOverBoard.style.display = "block";
                mainHeader.textContent = "Game Over";
            } */
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