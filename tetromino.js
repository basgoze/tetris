/**
 * Created by ahmet.basgoze on 8/23/2023.
 */


 class Tetromino {

    constructor() {
        this.x = 4;
        this.y = 0;
        this.shape = getRandomShape();
        //this.level = level; // Pass the current level when creating a Tetromino
        this.color = this.getRandomColor();
    }

    getRandomColor() {
        //const colors = ["#FF5733", "#33FF57", "#5733FF", "#FF0033", "#33FFFF"];
        const colors = ["green", "brown", "red", "maroon", "blue","gray","coral","darkviolet","limegreen"];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    //constructor() {
    //    this.x = 4;
    //    this.y = 0;
    //    this.shape = getRandomShape();
    //}


    rotate() {
        const originalShape = this.shape;
        const newShape = [];
        const rows = originalShape.length;
        const cols = originalShape[0].length;

        for (let col = 0; col < cols; col++) {
            const newRow = [];
            for (let row = rows - 1; row >= 0; row--) {
                newRow.push(originalShape[row][col]);
            }
            newShape.push(newRow);
        }

        // Check if the rotated shape is within bounds
        if (this.isValidMove(this.x, this.y, newShape)) {
            this.shape = newShape;
            updateGameBoard();
        }
    }

    isValidMove(newX, newY, newShape) {
        for (let row = 0; row < newShape.length; row++) {
            for (let col = 0; col < newShape[row].length; col++) {
                if (newShape[row][col] && (newX + col < 0 || newX + col >= COLS || newY + row >= ROWS)) {
                    return false; // Outside boundaries
                }
                if (newShape[row][col] && board[newY + row][newX + col]) {
                    return false; // Collides with another block
                }
            }
        }
        return true;
    }


    clear() {


        // Clear previous position
        const cells1 = document.getElementsByClassName("cell");
        for (let i = 0; i < cells1.length; i++) {
            cells1[i].classList.remove("active");
            if (!cells1[i].classList.contains("passive"))
                cells1[i].style.backgroundColor = ""; // Set the background color
            else
                cells1[i].style.backgroundColor = ""; // Set the background color
        }
    }

    placeOnBoard() {
        for (let row = 0; row < this.shape.length; row++) {
            for (let col = 0; col < this.shape[row].length; col++) {
                if (this.shape[row][col] === 1) {
                    board[this.y + row][this.x + col] = 1;
                    colorBoard[this.y + row][this.x + col] = this.color;
                }
            }
        }
        updateGameBoard(); // Update the visual game board
    }

    moveDown() {
        if(!this.isValidMove(this.x,this.y+1,this.shape))
            return;
        this.y++;
    }

    moveLeft() {
        if(!this.isValidMove(this.x-1,this.y,this.shape))
            return;
        this.x--;
    }

    moveRight() {
        if(!this.isValidMove(this.x+1,this.y,this.shape))
            return;
        this.x++;
    }



    render() {

        this.clear();
        const cells = document.getElementsByClassName("cell");
        for (let row = 0; row < this.shape.length; row++) {
            for (let col = 0; col < this.shape[row].length; col++) {
                const cellIndex = (this.y + row) * COLS + (this.x + col);
                if (this.shape[row][col] === 1) {
                    cells[cellIndex].classList.add("active");
                    cells[cellIndex].style.backgroundColor = this.color; // Set the background color
                }
                else {
                    cells[cellIndex].classList.remove("active");
                    cells[cellIndex].style.backgroundColor = ""; // Set the background color
                }
            }
        }
    }
}