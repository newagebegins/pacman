var DIRECTION_RIGHT = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_UP = 3;
var DIRECTION_DOWN = 4;

function Pacman(scene) {
  this._scene = scene;
  
  this._x = 0;
  this._y = 0;
}

Pacman.prototype.tick = function () {
  if (!this._scene.getReadyMessage().isVisible()) {
    this._move();
  }
};

Pacman.prototype._move = function () {
  if (this._requestedDirection == DIRECTION_RIGHT) {
    this._x++;
  }
  else if (this._requestedDirection == DIRECTION_LEFT) {
    this._x--;
  }
  else if (this._requestedDirection == DIRECTION_UP) {
    this._y--;
  }
  else if (this._requestedDirection == DIRECTION_DOWN) {
    this._y++;
  }
};

Pacman.prototype.getPosition = function () {
  return {x: this._x, y: this._y};
};

Pacman.prototype.getX = function () {
  return this._x;
};

Pacman.prototype.getY = function () {
  return this._y;
};

Pacman.prototype.setSpeed = function (speed) {
  this._speed = speed;
};

Pacman.prototype.getSpeed = function () {
  return this._speed;
};

Pacman.prototype.keyPressed = function (key) {
  if (key == KEY_RIGHT) {
    this.requestNewDirection(DIRECTION_RIGHT);
  }
  else if (key == KEY_LEFT) {
    this.requestNewDirection(DIRECTION_LEFT);
  }
  else if (key == KEY_UP) {
    this.requestNewDirection(DIRECTION_UP);
  }
  else if (key == KEY_DOWN) {
    this.requestNewDirection(DIRECTION_DOWN);
  }
};

Pacman.prototype.requestNewDirection = function (direction) {
  this._requestedDirection = direction;
};

Pacman.prototype.getDirection = function () {
  return this._requestedDirection;
};

Pacman.prototype.draw = function (ctx) {
  var SIZE = 10;
  ctx.fillStyle = "yellow";
  ctx.fillRect(this._x, this._y, SIZE, SIZE);
};
