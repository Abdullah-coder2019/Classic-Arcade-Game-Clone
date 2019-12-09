

// Enemies our player must avoid
var enemyBug = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    
    this.x = x;
    this.y = y;
    this.speed = this.speedy();

    this.sprite = 'images/enemy-bug.png';
};
const maxSpeed = 900;
const minSpeed = 150;
const baseSpeed = 80;


enemyBug.prototype.speedy = function() {
    return Math.floor(Math.random() * (maxSpeed - minSpeed + 1) + baseSpeed);
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
enemyBug.prototype.update = function(dt) {
    if (this.x < 505) {
        this.x += this.speed * dt;
    } else {
        this.x = -100;
        this.speed = this.speedy();
    }

};
// score
enemyBug.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillStyle = "black";
    ctx.font = "1.5em Lucida Console";
    ctx.fillText("Points = " + player.playerPoints, 180, 20);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    this.playerPoints = 0;
};
// collision detection 
enemyBug.prototype.update = function(dt) {
    if (this.x < 505) {
        this.x += this.speed * dt;
    } else {
        this.x = -100;
        this.speed = this.speedy();
    }

    if ((player.x < this.x + 72) && (player.x + 72 > this.x) && (player.y < this.y + 72) && (player.y + 72 > this.y)) {
        player.reset();
    }
};

Player.prototype.update = function() {};
// reset to player starting position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;

};
Player.prototype.finish = function() {
    this.x = 200;
    this.y = 400;
    this.playerPoints = 0;

};
Player.prototype.pointsScored = function() {
    this.playerPoints += 1;
    if (this.playerPoints == 3) {
        alert("Well Done! Play Again!");
        this.finish();
    }
    this.reset();

};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(keyPress) {
    if (keyPress == "down") {
        if (this.y < 400) {
            this.y = this.y + 90;
        }
    } else if (keyPress == "right") {
        if (this.x < 350) {
            this.x = this.x + 90;
        }
    } else if (keyPress == "up") {
        if (this.y > 40) {
            this.y -= 90

        } else {
            this.pointsScored();
        }
    } else if (keyPress == "left") {
        if (this.x > 50) {
            this.x = this.x - 90;
        }
    }

};

var allEnemies = [new enemyBug(0, 40),
    new enemyBug(0, 120),
    new enemyBug(0, 220)
];
var player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


