var board
var score = 0
var rows = 4
var columns = 4
var copyBoard = []

window.onload = function() {
    setGame();
}

function newGame() {
    let text = "Are you sure you want to start a new game?"
    if (confirm(text)) {
        setGame()
    }
    return
}

function setGame() {
    score = 0
    document.getElementById("board").innerHTML = ""

    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div")
            tile.id = r.toString() + "-" + c.toString()
            let num = board[r][c]
            updateTile(tile, num)
            document.getElementById("board").append(tile)
        }
    }
    newTile()
    newTile()
}

function hasEmptyTile() {
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { //at least one zero in the board
                return true;
            }
        }
    }
    return false;
}

function newTile() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        //find random row and column to place a 2 in
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            if (Math.floor(Math.random()*10) < 1){
                board[r][c] = 4
                let tile = document.getElementById(r.toString() + "-" + c.toString())
                tile.innerText = "4"
                tile.classList.add("t4")
            } else {
                board[r][c] = 2
                let tile = document.getElementById(r.toString() + "-" + c.toString())
                tile.innerText = "2"
                tile.classList.add("t2")
            }
            found = true
        }
    }
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 4096) {
            tile.classList.add("t"+num.toString());
        } else {
            tile.classList.add("t8192");
        }                
    }
}
document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft()
        newTile()
        endGame()
    } else if (e.code == "ArrowRight") {
        slideRight()
        newTile()
        endGame()
    } else if (e.code == "ArrowUp") {
        slideUp()
        newTile()
        endGame()
    } else if (e.code == "ArrowDown") {
        slideDown()
        newTile()
        endGame()
    }
    document.getElementById("score").innerText = score
})

function filterZero(row) {
    return row.filter(num => num != 0)
}

function slide(row) {
    row = filterZero(row)

    for (let i = 0; i<row.length-1; i++) {
        if (row[i] == row[i+1]) {
            row[i] *= 2
            row[i+1] = 0
            score += row[i]
        }
    }

    row = filterZero(row)

    while (row.length < columns) {
        row.push(0)
    }

    return row
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r]
        row = slide(row)
        board[r] = row
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString())
            let num = board[r][c]
            updateTile(tile, num)
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r]
        row.reverse()
        row = slide(row)
        row.reverse()
        board[r] = row
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString())
            let num = board[r][c]
            updateTile(tile, num)
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c],  board[2][c],  board[3][c]]
        row = slide(row)
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r]
            let tile = document.getElementById(r.toString() + "-" + c.toString())
            let num = board[r][c]
            updateTile(tile, num)
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c],  board[2][c],  board[3][c]]
        row.reverse()
        row = slide(row)
        row.reverse()
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r]
            let tile = document.getElementById(r.toString() + "-" + c.toString())
            let num = board[r][c]
            updateTile(tile, num)
        }
    }
}

function slideLeftTest() {
    for (let r = 0; r < rows; r++) {
        let row = copyBoard[r]
        row = slide(row)
        copyBoard[r] = row
    }
    return
}

function slideRightTest() {
    for (let r = 0; r < rows; r++) {
        let row = copyBoard[r]
        row.reverse()
        row = slide(row)
        row.reverse()
        copyBoard[r] = row
    }
    return
}

function slideUpTest() {
    for (let c = 0; c < columns; c++) {
        let row = [copyBoard[0][c], copyBoard[1][c],  copyBoard[2][c],  copyBoard[3][c]]
        row = slide(row)
        for (let r = 0; r < rows; r++) {
            copyBoard[r][c] = row[r]
        }
    }
    return
}

function slideDownTest() {
    for (let c = 0; c < columns; c++) {
        let row = [copyBoard[0][c], copyBoard[1][c],  copyBoard[2][c],  copyBoard[3][c]]
        row.reverse()
        row = slide(row)
        row.reverse()
        for (let r = 0; r < rows; r++) {
            copyBoard[r][c] = row[r]
        }
    }
    return
}

function arraysEqual() {
    for (let r = 0; r<rows; r++) {
        for (let c = 0; c<columns; c++) {
            if (board[r][c] != copyBoard[r][c]) {
                return false
            }
        }
    }
    return true
}

function endGame() {
    copyBoard = []
    for (let r = 0; r<rows; r++) {
        let row = []
        for (let c = 0; c<columns; c++) {
            row.push(board[r][c])
        }
        copyBoard.push(row)
    }
    slideLeftTest()
    if (arraysEqual() == false) {
        return
    }
    slideRightTest()
    if (arraysEqual() == false) {
        return
    }
    slideUpTest()
    if (arraysEqual() == false) {
        return
    }
    slideDownTest()
    if (arraysEqual() == false) {
        return
    }
    setGame()
}