var DIRECTION_RIGHT = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_UP = 3;
var DIRECTION_DOWN = 4;

function Pacman(scene) {
  this._scene = scene;
  this._rect = new Rect({x: 0, y: 0, w: TILE_SIZE, h: TILE_SIZE});
}

Pacman.prototype.getRect = function () {
  return this._rect;
};

Pacman.prototype.setSpeed = function (speed) {
  this._speed = speed;
};

Pacman.prototype.getCurrentSpeed = function () {
  return this._currentSpeed;
};

Pacman.prototype.requestNewDirection = function (direction) {
  if (this._willCollideWithWallIfMovedInDirection(direction)) {
    return;
  }
  this._direction = direction;
  this._currentSpeed = this._speed;
};

Pacman.prototype.getDirection = function () {
  return this._direction;
};

Pacman.prototype.tick = function () {
  if (!this._scene.getReadyMessage().isVisible()) {
    this._move(this._direction);
    this._handleCollisionsWithWalls();
    this._handleCollisionsWithPellets();
  }
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

Pacman.prototype._move = function (direction) {
  if (direction == DIRECTION_RIGHT) {
    this._rect.move({x: this._currentSpeed, y: 0});
  }
  else if (direction == DIRECTION_LEFT) {
    this._rect.move({x: -this._currentSpeed, y: 0});
  }
  else if (direction == DIRECTION_UP) {
    this._rect.move({x: 0, y: -this._currentSpeed});
  }
  else if (direction == DIRECTION_DOWN) {
    this._rect.move({x: 0, y: this._currentSpeed});
  }
};

Pacman.prototype._willCollideWithWallIfMovedInDirection = function (direction) {
  var result = false;
  var currentPosition = this.getPosition();
  this._move(direction);
  if (this._getTouchedWall() != null) {
    result = true;
  }
  this.setPosition(currentPosition);
  return result;
};

Pacman.prototype._handleCollisionsWithWalls = function () {
  var touchedWall = this._getTouchedWall();
  if (touchedWall != null) {
    this._resolveCollisionWithWall(touchedWall);
    this._currentSpeed = 0;
  }
};

Pacman.prototype._getTouchedWall = function () {
  var walls = this._scene.getWalls();
  for (var wall in walls) {
    if (this._collidedWith(walls[wall])) {
      return walls[wall];
    }
  }
  return null;
};

Pacman.prototype._collidedWith = function (other) {
  return this._rect.intersectsRect(other.getRect());
};

Pacman.prototype._resolveCollisionWithWall = function (wall) {
  var moveX = 0;
  var moveY = 0;
  if (this._direction == DIRECTION_RIGHT) {
    moveX = this.getRight() - wall.getLeft() + 1;
  }
  else if (this._direction == DIRECTION_LEFT) {
    moveX = this.getLeft() - wall.getRight() - 1;
  }
  else if (this._direction == DIRECTION_UP) {
    moveY = this.getTop() - wall.getBottom() - 1;
  }
  else if (this._direction == DIRECTION_DOWN) {
    moveY = this.getBottom() - wall.getTop() + 1;
  }
  this._rect.move({x: -moveX, y: -moveY});
};

Pacman.prototype._handleCollisionsWithPellets = function () {
  var pellets = this._scene.getPellets();
  for (var pellet in pellets) {
    if (this._collidedWith(pellets[pellet])) {
      this._scene.increaseScore(NORMAL_PELLET_VALUE);
      this._scene.removePellet(pellets[pellet]);
      return;
    }
  }
};

Pacman.prototype.draw = function (ctx) {
  ctx.fillStyle = "yellow";
  ctx.fillRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
};


/*--------------------------- Rect delegation --------------------------------*/

Pacman.prototype.setPosition = function (position) {
  this._rect.setPosition(position);
};

Pacman.prototype.getPosition = function () {
  return this._rect.getPosition();
};

Pacman.prototype.getX = function () {
  return this._rect.getX();
};

Pacman.prototype.getY = function () {
  return this._rect.getY();
};

Pacman.prototype.getLeft = function () {
  return this._rect.getLeft();
};

Pacman.prototype.getRight = function () {
  return this._rect.getRight();
};

Pacman.prototype.getTop = function () {
  return this._rect.getTop();
};

Pacman.prototype.getBottom = function () {
  return this._rect.getBottom();
};

Pacman.prototype.getWidth = function () {
  return this._rect.getWidth();
};

Pacman.prototype.getHeight = function () {
 return  this._rect.getHeight();
};
