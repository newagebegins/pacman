function Pacman(scene, game) {
  this._scene = scene;
  this._game = game;
  this._sprite = new Sprite(scene);
  this._sprite.setRect(new Rect({x: 0, y: 0, w: TILE_SIZE, h: TILE_SIZE}));
  this._visible = true;
  
  this._frames = [1,2,3,2];
  this._frame = 0;
  
  this._livesCount = 2;
}

Pacman.prototype.setLivesCount = function (lives) {
  this._livesCount = lives;
};

Pacman.prototype.getLivesCount = function () {
  return this._livesCount;
};

Pacman.prototype.setVisible = function (value) {
  this._visible = value;
};

Pacman.prototype.isVisible = function () {
  return this._visible;
};

Pacman.prototype.setFrame = function (frame) {
  this._frame = frame;
};

Pacman.prototype.requestNewDirection = function (direction) {
  if (this._sprite.willCollideWithWallIfMovedInDirection(direction)) {
    return;
  }
  this._sprite.setDirection(direction);
  this._sprite.setCurrentSpeed(this._sprite.getSpeed());
};

Pacman.prototype.tick = function () {
  if (this._scene.getReadyMessage().isVisible() ||
      this._scene.getPointsMessage().isVisible()) {
    return;
  }
  
  this._advanceFrame();
  this._sprite.move(this._sprite.getDirection());
  this._handleCollisionsWithWalls();
  this._handleCollisionsWithPellets();
  this._handleCollisionsWithGhosts();
};

Pacman.prototype._advanceFrame = function () {
  this._frame++;
  if (this._frame >= this._frames.length) {
    this._frame = 0;
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
      if (this._scene.getPellets().length == 0) {
        this._scene.nextLevel();
      }
      return;
    }
  }
};

Pacman.prototype._handleCollisionsWithGhosts = function () {
  var ghosts = this._scene.getGhosts();
  for (var i in ghosts) {
    var ghost = ghosts[i];
    if (this._sprite.collidedWith(ghost)) {
      if (ghost.getState() == GHOST_STATE_NORMAL) {
        if (this._livesCount == 0) {
          this._game.setScene(new StartupScene(this._game));
          return;
        }
        this._livesCount--;
        this._scene.getReadyMessage().show();
        this.placeToStartPosition();
        this._frame = 0;
        this._scene.placeGhostsToStartPositions();
        return;
      }
      else if (ghost.getState() == GHOST_STATE_VULNERABLE) {
        ghost.runHome();
        this._scene.addScoreForEatenGhost(ghost);
      }
    }
  }
};

Pacman.prototype.draw = function (ctx) {
  if (!this._visible) {
    return;
  }
  
  var x = this._scene.getX() + this.getX();
  var y = this._scene.getY() + this.getY();
  
  ctx.drawImage(ImageManager.getImage(this.getCurrentFrame()), x, y);
};

Pacman.prototype.getCurrentFrame = function () {
  var index = this._frames[this._frame];
  var direction = index > 1 ? this.getDirection() : '';
  return 'pacman_' + index + direction;
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
