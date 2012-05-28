var POWER_PELLET_SIZE = TILE_SIZE / 2;

function PowerPellet() {
  this._rect = new Rect({x: 0, y: 0, w: POWER_PELLET_SIZE, h: POWER_PELLET_SIZE});
}

PowerPellet.prototype.getRect = function () {
  return this._rect;
};

PowerPellet.prototype.getValue = function () {
  return 300;
};

PowerPellet.prototype.draw = function (ctx) {
  ctx.fillStyle = "white";
  ctx.fillRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
};


/*--------------------------- Rect delegation --------------------------------*/

PowerPellet.prototype.setPosition = function (position) {
  this._rect.setPosition(position);
};

PowerPellet.prototype.getPosition = function () {
  return this._rect.getPosition();
};

PowerPellet.prototype.getX = function () {
  return this._rect.getX();
};

PowerPellet.prototype.getY = function () {
  return this._rect.getY();
};

PowerPellet.prototype.getLeft = function () {
  return this._rect.getLeft();
};

PowerPellet.prototype.getRight = function () {
  return this._rect.getRight();
};

PowerPellet.prototype.getTop = function () {
  return this._rect.getTop();
};

PowerPellet.prototype.getBottom = function () {
  return this._rect.getBottom();
};

PowerPellet.prototype.getWidth = function () {
  return this._rect.getWidth();
};

PowerPellet.prototype.getHeight = function () {
  return this._rect.getHeight();
};
