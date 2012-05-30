var GHOST_BLINKY = 'blinky';
var GHOST_PINKY = 'pinky';
var GHOST_INKY = 'inky';
var GHOST_CLYDE = 'clyde';

var GHOST_STATE_NORMAL = 'normal';
var GHOST_STATE_VULNERABLE = 'vulnerable';
var GHOST_STATE_RUN_HOME = 'run_home';

var GHOST_SPEED_FAST = 8;
var GHOST_SPEED_NORMAL = 4;
var GHOST_SPEED_SLOW = 2;

function Ghost(name, scene) {
  this._name = name;
  this._scene = scene;
  this._sprite = new Sprite(scene);
  this._sprite.setRect(new Rect({x: 0, y: 0, w: TILE_SIZE, h: TILE_SIZE}));
  this.setCurrentSpeed(GHOST_SPEED_NORMAL);
  this._state = GHOST_STATE_NORMAL;
  
  this._bodyFrames = [1,2];
  this._bodyFrame = 0;
}

Ghost.prototype.getName = function () {
  return this._name;
};

Ghost.prototype.tick = function () {
  if (this._scene.getReadyMessage().isVisible()) {
    return;
  }
  this._advanceBodyFrame();
  if (this._state == GHOST_STATE_RUN_HOME) {
    if (this.getPosition().equals(this._scene.getLairPosition())) {
      this.makeNormal();
      this._sprite.setDirection(DIRECTION_UP);
      return;
    }
    if (this.getPosition().equals(this._currentWaypoint)) {
      this._currentWaypoint = this._wayPoints.shift();
      this._setDirectionToCurrentWaypoint();
    }
    this._sprite.move(this.getDirection());
  }
  else {
    this._tryTurnCorner();
    this._sprite.move(this.getDirection());
    this._handleCollisionsWithWalls();
  }
};

Ghost.prototype._advanceBodyFrame = function () {
  this._bodyFrame++;
  if (this._bodyFrame >= this._bodyFrames.length) {
    this._bodyFrame = 0;
  }
};

Ghost.prototype._setDirectionToCurrentWaypoint = function () {
  if (this._currentWaypoint.x == this.getX()) {
    if (this._currentWaypoint.y > this.getY()) {
      this._sprite.setDirection(DIRECTION_DOWN);
    }
    else {
      this._sprite.setDirection(DIRECTION_UP);
    }
  }
  else {
    if (this._currentWaypoint.x > this.getX()) {
      this._sprite.setDirection(DIRECTION_RIGHT);
    }
    else {
      this._sprite.setDirection(DIRECTION_LEFT);
    }
  }
};

Ghost.prototype._tryTurnCorner = function () {
  if (getRandomInt(0, 1)) {
    return;
  }
  var possibleTurns = this._getPossibleTurns();
  if (possibleTurns.length == 0) {
    return;
  }
  this._sprite.setDirection(getRandomElementFromArray(possibleTurns));
};

Ghost.prototype._getPossibleTurns = function () {
  var result = [];
  if (this.getDirection() == DIRECTION_LEFT || this.getDirection() == DIRECTION_RIGHT) {
    if (!this._sprite.willCollideWithWallIfMovedInDirection(DIRECTION_UP)) {
      result.push(DIRECTION_UP);
    }
    if (!this._sprite.willCollideWithWallIfMovedInDirection(DIRECTION_DOWN)) {
      result.push(DIRECTION_DOWN);
    }
  }
  else {
    if (!this._sprite.willCollideWithWallIfMovedInDirection(DIRECTION_LEFT)) {
      result.push(DIRECTION_LEFT);
    }
    if (!this._sprite.willCollideWithWallIfMovedInDirection(DIRECTION_RIGHT)) {
      result.push(DIRECTION_RIGHT);
    }
  }
  return result;
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
  this._sprite.setDirection(getRandomElementFromArray(directions));
};

Ghost.prototype.getState = function () {
  return this._state;
};

Ghost.prototype.makeNormal = function () {
  this._state = GHOST_STATE_NORMAL;
  this.setCurrentSpeed(GHOST_SPEED_NORMAL);
};

Ghost.prototype.makeVulnerable = function () {
  if (this._state == GHOST_STATE_NORMAL) {
    this._state = GHOST_STATE_VULNERABLE;
    this.setCurrentSpeed(GHOST_SPEED_SLOW);
  }
};

Ghost.prototype.runHome = function () {
  this._state = GHOST_STATE_RUN_HOME;
  this.setCurrentSpeed(GHOST_SPEED_FAST);
  this._wayPoints = this._scene.getWaypointsToLairForGhost(this);
  this._currentWaypoint = this._wayPoints.shift();
  this.setPosition(this._currentWaypoint);
};

Ghost.prototype.draw = function (ctx) {
  if (this._state != GHOST_STATE_RUN_HOME) {
    ctx.drawImage(ImageManager.getImage(this.getCurrentBodyFrame()), this.getX(), this.getY());
  }
  if (this._state != GHOST_STATE_VULNERABLE) {
    ctx.drawImage(ImageManager.getImage(this.getCurrentEyesFrame()), this.getX(), this.getY());
  }
};

Ghost.prototype.getCurrentBodyFrame = function () {
  var index = this._bodyFrames[this._bodyFrame];
  var prefix = this._name;
  if (this._state == GHOST_STATE_VULNERABLE) {
    prefix = 'vulnerable';
  }
  return prefix + '_' + index;
};

Ghost.prototype.getCurrentEyesFrame = function () {
  return 'eyes_' + this.getDirection();
};


/*--------------------------- Sprite delegation --------------------------------*/

Ghost.prototype.getRect = function () {
  return this._sprite.getRect();
};

Ghost.prototype.setDirection = function (direction) {
  return this._sprite.setDirection(direction);
};

Ghost.prototype.getDirection = function () {
  return this._sprite.getDirection();
};

Ghost.prototype.setCurrentSpeed = function (speed) {
  this._sprite.setCurrentSpeed(speed);
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

Ghost.prototype.setStartPosition = function (position) {
  this._sprite.setStartPosition(position);
};

Ghost.prototype.getStartPosition = function () {
  return this._sprite.getStartPosition();
};

Ghost.prototype.placeToStartPosition = function () {
  this.makeNormal();
  this._sprite.placeToStartPosition();
};
