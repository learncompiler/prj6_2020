let board = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
]
let color = 2;

function set(id) {
    var x = Math.floor(id / 8);
    var y = id % 8;
    if(board[x][y] == 0) {
        if(move(x, y)) {
            console.log("test");
            var block = document.getElementById(id);
            let element = document.createElement("div");
            if(color == 1) element.setAttribute("class", "white");
            else if(color == 2) element.setAttribute("class", "black");
            board[x][y] = color;
            block.appendChild(element);
            color = 3 - color;
        }
    }
}

function move(x, y) {
    let ox = x,
        oy = y;

    let canMove = false;

    let directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, 1],
        [0, -1],
        [1, -1],
        [1, 0],
        [1, 1]
    ];

    if (board[x][y] !== 0) {
        return false;
    }

    for (direction of directions) {
        x = ox;
        y = oy;
        let directionCanMove = false;
        let hasOpposite = false;
        while (true) {
            x += direction[0];
            y += direction[1];
            if (x < 0 || x >= 8 || y < 0 || y >= 8) {
                break;
            }
            if (board[x][y] === 3 - color) {
                hasOpposite = true;
            }
            if (board[x][y] === color) {
                if (hasOpposite) directionCanMove = true;
                break;
            }
            if (board[x][y] === 0) {
                break;
            }
        }
        if (directionCanMove) {
            while (true) {
                x -= direction[0];
                y -= direction[1];
                if (x == ox && y == oy) break;
                board[x][y] = color;
                var id = x * 8 + y;
                var element = document.getElementById(id);
                while(element.hasChildNodes()) {
                    element.removeChild(element.firstChild);
                }
                let chess = document.createElement("div");
                if(color == 1) chess.setAttribute("class", "white");
                else if(color == 2) chess.setAttribute("class", "black");
                element.appendChild(chess);
            }
        }
        canMove = canMove || directionCanMove;
    }
    return canMove;
}