class Hacman {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        //i used type so we can make a difference later of which is pacman which enemy
        this.type = type;
    }
    //takes x coordinate of hacman
    getX() {
        return this.x;
    }
    //takes y coordinate of hacman
    getY() {
        return this.y;
    }
    //update live coordinate of hacman
    setCoordinates(x, y) {
        this.x = x;
        this.y = y;
    }

    moveLeft(map) {
        if (map[this.getY()][this.getX() - 1] != 0) {
            map[this.getY()][this.getX()] = 2;
            this.setCoordinates(this.getX() - 1, this.getY());
            map[this.getY()][this.getX()] = this.type;
        }
    }
    moveRight(map) {
        if (map[this.getY()][this.getX() + 1] != 0) {
            map[this.getY()][this.getX()] = 2;
            this.setCoordinates(this.getX() + 1, this.getY());
            map[this.getY()][this.getX()] = this.type;
        }
    }
    moveUp(map) {
        if (map[this.getY() - 1][this.getX()] != 0) {
            map[this.getY()][this.getX()] = 2;
            this.setCoordinates(this.getX(), this.getY() - 1);
            map[this.getY()][this.getX()] = this.type;
        }
    }
    moveDown(map) {
        if (map[this.getY() + 1][this.getX()] != 0) {
            map[this.getY()][this.getX()] = 2;
            this.setCoordinates(this.getX(), this.getY() + 1);
            map[this.getY()][this.getX()] = this.type;
        }
    }
}

class Enemy extends Hacman {
//generates a random number from 0-3 every number indicates a direction 
    randomDirection(map) {
        let random = Math.floor(Math.random() * 4);
        if (random == 0) {
            this.moveLeft(map);
        }
        else if (random == 1) {
            this.moveRight(map);
        }
        else if (random == 2) {
            this.moveUp(map);
        }
        else if (random == 3) {
            this.moveDown(map);
        }
    }


}

class GameController {

    constructor(board, hacman, map, enemy) {
        this.board = board;
        this.hacman = hacman;
        this.map = map;
        this.enemy = enemy;
    }

    getHacman() {
        return this.hacman;
    }
    getEnemy() {
        return this.enemy;
    }

    getMap() {
        return this.map;
    }

    generateMap() {

        this.board.innerHTML = "";

        // outer for loop to iterate through all the rows of the map
        for (let y = 0; y < map.length; y++) {

            // inner for loop to iterate through every column of the 
            // current row
            for (let x = 0; x < map[y].length; x++) {

                // read the value of the current tile
                let currentTile = map[y][x];

                // insert appropriate tile depending on the value
                if (currentTile === 0) {
                    this.board.innerHTML += '<div class="tile wall"></div>';
                }

                if (currentTile === 1) {
                    this.board.innerHTML += '<div class="tile dot"></div>';
                }

                if (currentTile === 2) {
                    this.board.innerHTML += '<div class="tile bg"></div>';
                }

                if (currentTile === 3) {
                    this.board.innerHTML += '<div class="tile hacman"></div>';
                }
                if (currentTile === 4) {
                    this.board.innerHTML += '<div class="tile enemy"></div>';
                }
                if (currentTile === 5) {
                    this.board.innerHTML += '<div class="tile ch"></div>';
                }
            }
            // insert a line break after every row to move to next line
            this.board.innerHTML += '<br>';
        }
    }
}


console.log("Hello Hacman");
map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0],
    [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 3, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 0],
    [0, 1, 5, 1, 1, 4, 1, 0, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
hacman = new Hacman(10, 3, 3);
enemy = new Enemy(5, 5, 4);

boardLocation = document.getElementById("grid")
console = new GameController(boardLocation, hacman, map, enemy);

// Input handling function takes a single parameter which is the 
// event that got triggered
function handleKeyDown(event) {
    // find out which key was pressed down
    let currentKey = event.code;
    map = console.getMap();
    // Update the map depending on which key weas pressed
    switch (currentKey) {
        case 'ArrowUp':
            console.getHacman().moveUp(map);
            break;
        case 'ArrowDown':
            console.getHacman().moveDown(map);
            break;
        case 'ArrowRight':
            console.getHacman().moveRight(map);
            break;
        case 'ArrowLeft':
            console.getHacman().moveLeft(map);
            break;
        default:
            break;
    }

    //make the enemy move by itself 
    console.getEnemy().randomDirection(map);

    // after updating the map and location of pacman, we need to redraw the map
    console.generateMap();
}


//Execution starts here
//create an event listener. When a key is pressed down, call handleKeyDown function
document.addEventListener("keydown", handleKeyDown);
//call generateMap to draw the initial starting map
console.generateMap();