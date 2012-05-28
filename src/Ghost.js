var GHOST_BLINKY = 'blinky';
var GHOST_PINKY = 'pinky';
var GHOST_INKY = 'inky';
var GHOST_CLYDE = 'clyde';

function Ghost(name, scene) {
  this._name = name;
  this._scene = scene;
  this._sprite = new Sprite(scene);
  this._sprite.setRect(new Rect({x: 0, y: 0, w: TILE_SIZE, h: TILE_SIZE}));
  this._sprite.setCurrentSpeed(2);
}

Ghost.prototype.getName = function () {
  return this._name;
};

Ghost.prototype.setStartPosition = function (position) {
  this._startPosition = position;
};

Ghost.prototype.getStartPosition = function () {
  return this._startPosition;
};

Ghost.prototype.tick = function () {
  if (!this._scene.getReadyMessage().isVisible()) {
    this._sprite.move(this._sprite.getDirection());
    this._handleCollisionsWithWalls();
  }
};

Ghost.prototype._handleCollisionsWithWalls = function () {
  var touchedWall = this._sprite.getTouchedWall();
  if (touchedWall != null) {
    this._sprite.resolveCollisionWithWall(touchedWall);
    this.setRandomDirectionNotBlockedByWall();
  }
};

Ghost.prototype.getDirectionsNotBlockedByWall = function () {
  var directions = [DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP, DIRECTION_DOWN];
  var notBlockedDirections = [];
  for (var i in directions) {
    if (!this._sprite.willCollideWithWallIfMovedInDirection(directions[i])) {
      notBlockedDirections.push(directions[i]);
    }
  }
  return notBlockedDirections;
};

Ghost.prototype.setRandomDirectionNotBlockedByWall = function () {
  var directions = this.getDirectionsNotBlockedByWall();
  this._sprite.setDirection(directions[Math.floor(Math.random() * directions.length)]);
};

Ghost.prototype.draw = function (ctx) {
  if (this._name == GHOST_BLINKY) {
    ctx.fillStyle = "#ff0000";
  }
  else if (this._name == GHOST_PINKY) {
    ctx.fillStyle = "#ffb8de";
  }
  else if (this._name == GHOST_INKY) {
    ctx.fillStyle = "#00ffde";
  }
  else if (this._name == GHOST_CLYDE) {
    ctx.fillStyle = "#ffb847";
  }
  ctx.fillRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
};


/*--------------------------- Sprite delegation --------------------------------*/

Ghost.prototype.getRect = function () {
  return this._sprite.getRect();
};

Ghost.prototype.getDirection = function () {
  return this._sprite.getDirection();
};

Ghost.prototype.getCurrentSpeed = function () {
  return this._sprite.getCurrentSpeed();
};

Ghost.prototype.setPosition = function (position) {
  this._sprite.setPosition(position);
};

Ghost.prototype.getPosition = function () {
  return this._sprite.getPosition();
};

Ghost.prototype.getX = function () {
  return this._sprite.getX();
};

Ghost.prototype.getY = function () {
  return this._sprite.getY();
};

Ghost.prototype.getLeft = function () {
  return this._sprite.getLeft();
};

Ghost.prototype.getRight = function () {
  return this._sprite.getRight();
};

Ghost.prototype.getTop = function () {
  return this._sprite.getTop();
};

Ghost.prototype.getBottom = function () {
  return this._sprite.getBottom();
};

Ghost.prototype.getWidth = function () {
  return this._sprite.getWidth();
};

Ghost.prototype.getHeight = function () {
  return this._sprite.getHeight();
};
