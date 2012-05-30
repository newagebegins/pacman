var GATE_HEIGHT = TILE_SIZE / 4;

function Gate(scene) {
  this._scene = scene;
  this._rect = new Rect({x: 0, y: 0, w: TILE_SIZE, h: GATE_HEIGHT});
}

Gate.prototype.getRect = function () {
  return this._rect;
};

Gate.prototype.draw = function (ctx) {
  var x = this._scene.getX() + this.getX();
  var y = this._scene.getY() + this.getY();
  
  ctx.fillStyle = "#ffb8de";
  ctx.fillRect(x, y, this.getWidth(), this.getHeight());
};


/*--------------------------- Rect delegation --------------------------------*/

Gate.prototype.setPosition = function (position) {
  this._rect.setPosition(position);
};

Gate.prototype.getPosition = function () {
  return this._rect.getPosition();
};

Gate.prototype.getX = function () {
  return this._rect.getX();
};

Gate.prototype.getY = function () {
  return this._rect.getY();
};

Gate.prototype.getLeft = function () {
  return this._rect.getLeft();
};

Gate.prototype.getRight = function () {
  return this._rect.getRight();
};

Gate.prototype.getTop = function () {
  return this._rect.getTop();
};

Gate.prototype.getBottom = function () {
  return this._rect.getBottom();
};

Gate.prototype.getWidth = function () {
  return this._rect.getWidth();
};

Gate.prototype.getHeight = function () {
  return this._rect.getHeight();
};
