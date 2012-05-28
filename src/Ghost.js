function Ghost() {
  this._rect = new Rect({x: 0, y: 0, w: TILE_SIZE, h: TILE_SIZE});
}

Ghost.prototype.getRect = function () {
  return this._rect;
};

Ghost.prototype.draw = function (ctx) {
  ctx.fillStyle = "orange";
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
