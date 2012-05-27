var NORMAL_PELLET_SIZE = TILE_SIZE / 5;
var NORMAL_PELLET_VALUE = 100;

function Pellet() {
  this._rect = new Rect({x: 0, y: 0, w: NORMAL_PELLET_SIZE, h: NORMAL_PELLET_SIZE});
}

Pellet.prototype.getRect = function () {
  return this._rect;
};

Pellet.prototype.draw = function (ctx) {
  ctx.fillStyle = "white";
  ctx.fillRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
};


/*--------------------------- Rect delegation --------------------------------*/

Pellet.prototype.setPosition = function (position) {
  this._rect.setPosition(position);
};

Pellet.prototype.getPosition = function () {
  return this._rect.getPosition();
};

Pellet.prototype.getX = function () {
  return this._rect.getX();
};

Pellet.prototype.getY = function () {
  return this._rect.getY();
};

Pellet.prototype.getLeft = function () {
  return this._rect.getLeft();
};

Pellet.prototype.getRight = function () {
  return this._rect.getRight();
};

Pellet.prototype.getTop = function () {
  return this._rect.getTop();
};

Pellet.prototype.getBottom = function () {
  return this._rect.getBottom();
};

Pellet.prototype.getWidth = function () {
  return this._rect.getWidth();
};

Pellet.prototype.getHeight = function () {
  return this._rect.getHeight();
};
