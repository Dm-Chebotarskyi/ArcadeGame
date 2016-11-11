var cellWidth = 100;
var cellHeight = 82;

var win = false;

function getRandomStartX() {
    var number = Math.round(Math.random() * 10);
    if (number > 7) {
        number = number - 5;
    } else if (number < 2) {
        number = number + 4;
    }
    return number;
}

function getRandomSpeed() {
    var speed = Math.round(Math.random() * 1000);
    if (speed < 100) {
        speed = speed + 200;
    } else if (speed > 400) {
        speed = speed - 300;
    }
    return speed;
}

// Enemies our player must avoid
var Enemy = function(cellX, cellY, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = cellX * -100;
    this.y = cellY * cellHeight - 25;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    if (this.x > 500) {
        this.x = getRandomStartX() * -100;
        this.speed = getRandomSpeed();
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function addEnemies() {
    for (i = 1; i < 4; ++i) {
        var enemy = new Enemy(getRandomStartX(), i, getRandomSpeed());
        allEnemies.push(enemy);
    }
    for (i = 1; i < 4; ++i) {
        var enemy = new Enemy(getRandomStartX(), i, getRandomSpeed());
        allEnemies.push(enemy);
    }
}

// Player class
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.locX = 2 * cellWidth;
    this.locY = 5 * cellHeight - 10;
}

Player.prototype.update = function() {
    var currentCellX = this.locX / cellWidth;
    var currentCellY = (this.locY + 10) / cellHeight;
    for (i = 0; i < allEnemies.length; i++) {
        enemyCellX = Math.round((allEnemies[i].x + 30) / 100);
        enemyCellY = Math.round(allEnemies[i].y / 50 - 1);
        if (enemyCellY === 0) {
            enemyCellY = 1;
        }
        if (enemyCellX === currentCellX && enemyCellY === currentCellY) {
            player.reset();
        }
    }
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case "up":
            if (this.locY != -10) {
                this.locY = this.locY - 1 * cellHeight;
            }
            break;
        case "down":
            if (this.locY != 400) {
                this.locY = this.locY + 1 * cellHeight;
            }
            break;
        case "left":
            if (this.locX != 0) {
                this.locX = this.locX - 1 * cellWidth;
            }
            break;
        case "right":
            if (this.locX != 400) {
                this.locX = this.locX + 1 * cellWidth;
            }
            break;
        default:
            break;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.locX, this.locY);
    if (this.locY < 0) {
        alert("You win!!!");
        player.reset();
        win = false;
    }
}

Player.prototype.reset = function() {
    this.locX = 2 * cellWidth;
    this.locY = 5 * cellHeight - 10;
}

var allEnemies = [];

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

var player = new Player();
addEnemies();
