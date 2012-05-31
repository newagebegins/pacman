function PowerPellet(scene) {
  this._scene = scene;
  this._rect = new Rect({x: 0, y: 0, w: TILE_SIZE, h: TILE_SIZE});
  this._blinkTimer = new BlinkTimer(13);
}

PowerPellet.prototype.getRect = function () {
  return this._rect;
};

PowerPellet.prototype.getValue = function () {
  return 50;
};

PowerPellet.prototype.setBlinkDuration = function (duration) {
  this._blinkTimer.setDuration(duration);
};

PowerPellet.prototype.isVisible = function () {
  return this._blinkTimer.isVisible();
};

PowerPellet.prototype.tick = function () {
  this._blinkTimer.tick();
};

PowerPellet.prototype.draw = function (ctx) {
  if (!this._blinkTimer.isVisible()) {
    return;
  }
  
  var x = this._scene.getX() + this.getX();
  var y = this._scene.getY() + this.getY();
  
  ctx.drawImage(ImageManager.getImage('power_pellet'), x, y);
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
