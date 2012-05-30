function PowerPellet() {
  this._rect = new Rect({x: 0, y: 0, w: TILE_SIZE, h: TILE_SIZE});
  this._blinkDuration = 13;
  this._blinkTimer = 0;
  this._visible = true;
}

PowerPellet.prototype.getRect = function () {
  return this._rect;
};

PowerPellet.prototype.getValue = function () {
  return 300;
};

PowerPellet.prototype.setBlinkDuration = function (duration) {
  this._blinkDuration = duration;
};

PowerPellet.prototype.isVisible = function () {
  return this._visible;
};

PowerPellet.prototype.tick = function () {
  this._tickBlinkTimer();
};

PowerPellet.prototype._tickBlinkTimer = function () {
  this._blinkTimer++;
  if (this._blinkTimer == this._blinkDuration) {
    this._blinkTimer = 0;
    this._visible = !this._visible;
  }
};

PowerPellet.prototype.draw = function (ctx) {
  if (this._visible) {
    ctx.drawImage(ImageManager.getImage('power_pellet'), this.getX(), this.getY());
  }
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
