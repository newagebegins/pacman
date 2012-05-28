function Pacman(scene) {
  this._scene = scene;
  this._sprite = new Sprite(scene);
  this._sprite.setRect(new Rect({x: 0, y: 0, w: TILE_SIZE, h: TILE_SIZE}));
}

Pacman.prototype.requestNewDirection = function (direction) {
  if (this._sprite.willCollideWithWallIfMovedInDirection(direction)) {
    return;
  }
  this._sprite.setDirection(direction);
  this._sprite.setCurrentSpeed(this._sprite.getSpeed());
};

Pacman.prototype.tick = function () {
  if (!this._scene.getReadyMessage().isVisible()) {
    this._sprite.move(this._sprite.getDirection());
    this._handleCollisionsWithWalls();
    this._handleCollisionsWithPellets();
    this._handleCollisionsWithGhosts();
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

Pacman.prototype._handleCollisionsWithWalls = function () {
  var touchedWall = this._sprite.getTouchedWall();
  if (touchedWall != null) {
    this._sprite.resolveCollisionWithWall(touchedWall);
    this._sprite.setCurrentSpeed(0);
  }
};

Pacman.prototype._handleCollisionsWithPellets = function () {
  var pellets = this._scene.getPellets();
  for (var pellet in pellets) {
    if (this._sprite.collidedWith(pellets[pellet])) {
      this._scene.increaseScore(pellets[pellet].getValue());
      if (pellets[pellet] instanceof PowerPellet) {
        this._scene.makeGhostsVulnerable();
      }
      this._scene.removePellet(pellets[pellet]);
      return;
    }
  }
};

Pacman.prototype._handleCollisionsWithGhosts = function () {
  var ghosts = this._scene.getGhosts();
  for (var ghost in ghosts) {
    if (this._sprite.collidedWith(ghosts[ghost])) {
      this._scene.getReadyMessage().show();
      this.placeToStartPosition();
      this._scene.placeGhostsToStartPositions();
      return;
    }
  }
};

Pacman.prototype.draw = function (ctx) {
  ctx.fillStyle = "yellow";
  ctx.fillRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
};


/*--------------------------- Sprite delegation --------------------------------*/

Pacman.prototype.getRect = function () {
  return this._sprite.getRect();
};

Pacman.prototype.getDirection = function () {
  return this._sprite.getDirection();
};

Pacman.prototype.setSpeed = function (speed) {
  this._sprite.setSpeed(speed);
};

Pacman.prototype.getCurrentSpeed = function () {
  return this._sprite.getCurrentSpeed();
};

Pacman.prototype.setPosition = function (position) {
  this._sprite.setPosition(position);
};

Pacman.prototype.getPosition = function () {
  return this._sprite.getPosition();
};

Pacman.prototype.getX = function () {
  return this._sprite.getX();
};

Pacman.prototype.getY = function () {
  return this._sprite.getY();
};

Pacman.prototype.getLeft = function () {
  return this._sprite.getLeft();
};

Pacman.prototype.getRight = function () {
  return this._sprite.getRight();
};

Pacman.prototype.getTop = function () {
  return this._sprite.getTop();
};

Pacman.prototype.getBottom = function () {
  return this._sprite.getBottom();
};

Pacman.prototype.getWidth = function () {
  return this._sprite.getWidth();
};

Pacman.prototype.getHeight = function () {
  return this._sprite.getHeight();
};

Pacman.prototype.setStartPosition = function (position) {
  this._sprite.setStartPosition(position);
};

Pacman.prototype.getStartPosition = function () {
  return this._sprite.getStartPosition();
};

Pacman.prototype.placeToStartPosition = function () {
  this._sprite.placeToStartPosition();
};
