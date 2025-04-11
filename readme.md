# Tic-Tac-Toe

### OBJECTIVE:

This project uses JavaScript, HTML, and CSS to create a tic-tac-toe game. A player can compete against an AI using either X or O. The project aims to:

- Utilize the minimax algorithm when the AI makes the decision.
- Determine win, lose, or draw.
- Be visually appealing and responsive.
- Be User friendly.

### GAME DESCRIPTION:

The user selects whether they want to play as X or O at the beginning of the game, the AI will be the opposite of what the user selects. Each player will take turns marking an empty square. The first player to place three of their characters sequentially in any direction, will win.

### MINIMAX ALGORITHM:

The minimax algorithm is used to create this program. When the program loads, it creates a game tree of the possibilities. When a leaf is reached because the game is ended, a value is assigned to that leaf based on the game state. If X wins, 1 is assigned, -1 for O, and 0 for a tie game. The minimax algorithm then assigns those values to every node in the tree based on whose turn it is. If the node represents X's turn, it will look at that node's children and choose the node that has the highest value. If the node represents O's turn, it will do the opposite and select the child node with the lowest value. This will continue until a leaf node is reached and the game ends.
