class Node {
    constructor(value, turn) {
        this.value = value;
        this.children = [];
        this.winVal = null;
        this.turn = turn;
        this.minmax = null;
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
        this.root.minmax = 1;
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
            if (lastNode.getTurn() === 'X'){
                newNode.turn = 'O';
                newNode.minmax = 0;
            } else {
                newNode.turn = 'X';
                newNode.minmax = 1;
            }
            lastNode.addChild(newNode);
            if (newNode.winVal == null){
                this.createTree(newNode);
            }
        }
    }

    assignScore(currentNode = this.root){

        let maximum;
        let minimum; 

        for(let node of currentNode.getChildren()){

            this.assignScore(node);

            if (node.getWinVal() >= maximum){
                maximum = node.getWinVal();
            }

            if (node.getWinVal() <= minimum){
                minimum = node.getWinVal();
            }
        }

        if (currentNode.getWinVal() == null){
            if (currentNode.minmax === 1){
                currentNode.winVal = maximum;
            } else {
                currentNode.winVal = minimum;
            } 
        }
        
    }
}

let root = new Node(['','','','','','','','',''], 'X');
let tree = new Tree(root);
tree.createTree()
tree.assignScore()
console.log("");
export default { Tree, Node };