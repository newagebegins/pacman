var GHOST_BLINKY = 'blinky';
var GHOST_PINKY = 'pinky';
var GHOST_INKY = 'inky';
var GHOST_CLYDE = 'clyde';

function Ghost(name) {
  this._name = name;
  this._rect = new Rect({x: 0, y: 0, w: TILE_SIZE, h: TILE_SIZE});
}

Ghost.prototype.getName = function () {
  return this._name;
};

Ghost.prototype.getRect = function () {
  return this._rect;
};

Ghost.prototype.setStartPosition = function (position) {
  this._startPosition = position;
};

Ghost.prototype.getStartPosition = function () {
  return this._startPosition;
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


/*--------------------------- Rect delegation --------------------------------*/

Ghost.prototype.setPosition = function (position) {
  this._rect.setPosition(position);
};

Ghost.prototype.getPosition = function () {
  return this._rect.getPosition();
};

Ghost.prototype.getX = function () {
  return this._rect.getX();
};

Ghost.prototype.getY = function () {
  return this._rect.getY();
};

Ghost.prototype.getLeft = function () {
  return this._rect.getLeft();
};

Ghost.prototype.getRight = function () {
  return this._rect.getRight();
};

Ghost.prototype.getTop = function () {
  return this._rect.getTop();
};

Ghost.prototype.getBottom = function () {
  return this._rect.getBottom();
};

Ghost.prototype.getWidth = function () {
  return this._rect.getWidth();
};

Ghost.prototype.getHeight = function () {
  return this._rect.getHeight();
};
