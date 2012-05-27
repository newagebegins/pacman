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
  switch (this._requestedDirection) {
    case DIRECTION_RIGHT:
      this._x++;
      break;
    case DIRECTION_LEFT:
      this._x--;
      break;
    case DIRECTION_UP:
      this._y--;
      break;
    case DIRECTION_DOWN:
      this._y++;
      break;
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
