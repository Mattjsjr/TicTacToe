class Node {
    constructor(value, turn) {
        this.value = value;
        this.children = [];
        this.winVal = null;
        this.turn = turn;
    }

    getValue() {
        return this.value;
    }

    getChildren() {
        return this.children;
    }

    getWinVal() {
        return this.winVal;
    }

    getTurn(){
        return this.turn;
    }

    addChild(node) {
        this.children.push(node);
    }

}

class Tree {
    constructor(root) {
        this.root = root;
        this.turn = 'O';
    }

    switchTurn() {
        this.turn = this.turn === 'O' ? 'X' : 'O';
    }

    gameOver(positions) {

        const winPositions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [6, 4, 2]
        ]

        let tie = true;

        for (let pattern of winPositions) {
            let [a, b, c] = pattern;

            if (positions[a] === "" || positions[b] === "" || positions[c] === "") {
                tie = false;
            }

            if (positions[a] != "" && positions[a] === positions[b] && positions[b] == positions[c]) {
                if (positions[a] === 'O')
                    return -1;
                else
                    return 1
            }
        }

        if (tie) {
            return 0;
        }
        return null;
    }

    createTree(lastNode = this.root) {

        for (let i = 0; i < 9; i++) {
            let currentBoard = lastNode.getValue().slice();

            if (currentBoard[i] !== ""){
                continue;
            }

            currentBoard[i] = lastNode.getTurn();
            let newNode = new Node(currentBoard);
            newNode.winVal = this.gameOver(currentBoard);
            newNode.turn = lastNode.getTurn() === 'X' ? 'O':'X';
            lastNode.addChild(newNode);
            this.createTree(newNode);
        }
    }
}

export default { Tree, Node };