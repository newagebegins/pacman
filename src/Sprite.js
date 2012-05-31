var DIRECTION_RIGHT = 'r';
var DIRECTION_LEFT = 'l';
var DIRECTION_UP = 'u';
var DIRECTION_DOWN = 'd';

function Sprite(scene) {
  this._scene = scene;
}

Sprite.prototype.setRect = function (rect) {
  this._rect = rect;
};

Sprite.prototype.getRect = function () {
  return this._rect;
};

Sprite.prototype.setDirection = function (direction) {
  this._direction = direction;
};

Sprite.prototype.getDirection = function () {
  return this._direction;
};

Sprite.prototype.setSpeed = function (speed) {
  this._speed = speed;
};

Sprite.prototype.getSpeed = function () {
  return this._speed;
};

Sprite.prototype.setCurrentSpeed = function (speed) {
  this._currentSpeed = speed;
  if (this._currentSpeed > this._speed) {
    throw new Error('Current speed should not be greater than speed');
  }
};

Sprite.prototype.getCurrentSpeed = function () {
  return this._currentSpeed;
};

Sprite.prototype.move = function (direction) {
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

/**
 * Check if sprite is out of map bounds and place it on the opposite side of
 * the map if necessary.
 */
Sprite.prototype.checkIfOutOfMapBounds = function () {
  if (this.getRight() > this._scene.getRight()) {
    this.setPosition(new Position(this._scene.getLeft(), this.getY()));
  }
  else if (this.getLeft() < this._scene.getLeft()) {
    this.setPosition(new Position(this._scene.getRight() - this.getWidth() + 1, this.getY()));
  }
  else if (this.getTop() < this._scene.getTop()) {
    this.setPosition(new Position(this.getX(), this._scene.getBottom() - this.getHeight() + 1));
  }
  else if (this.getBottom() > this._scene.getBottom()) {
    this.setPosition(new Position(this.getX(), this._scene.getTop()));
  }
};

Sprite.prototype.resolveCollisionWithWall = function (wall) {
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

Sprite.prototype.willCollideWithWallIfMovedInDirection = function (direction) {
  var result = false;
  var currentPosition = this.getPosition();
  this.move(direction);
  if (this.getTouchedWall() != null) {
    result = true;
  }
  this.setPosition(currentPosition);
  return result;
};

Sprite.prototype.getTouchedWall = function () {
  var walls = this._scene.getWalls();
  for (var wall in walls) {
    if (this.collidedWith(walls[wall])) {
      return walls[wall];
    }
  }
  return null;
};

Sprite.prototype.collidedWith = function (other) {
  return this._rect.intersectsRect(other.getRect());
};

Sprite.prototype.setStartPosition = function (position) {
  this._startPosition = position;
};

Sprite.prototype.getStartPosition = function () {
  return this._startPosition;
};

Sprite.prototype.placeToStartPosition = function () {
  this.setPosition(this._startPosition);
};


/*--------------------------- Rect delegation --------------------------------*/

Sprite.prototype.setPosition = function (position) {
  this._rect.setPosition(position);
};

Sprite.prototype.getPosition = function () {
  return this._rect.getPosition();
};

Sprite.prototype.getX = function () {
  return this._rect.getX();
};

Sprite.prototype.getY = function () {
  return this._rect.getY();
};

Sprite.prototype.getLeft = function () {
  return this._rect.getLeft();
};

Sprite.prototype.getRight = function () {
  return this._rect.getRight();
};

Sprite.prototype.getTop = function () {
  return this._rect.getTop();
};

Sprite.prototype.getBottom = function () {
  return this._rect.getBottom();
};

Sprite.prototype.getWidth = function () {
  return this._rect.getWidth();
};

Sprite.prototype.getHeight = function () {
  return this._rect.getHeight();
};
