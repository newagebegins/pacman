var PELLET_SIZE = 2;
var PELLET_POSITION_CORRECTION = 7;

function Pellet(scene) {
  this._scene = scene;
  this._rect = new Rect({x: 0, y: 0, w: PELLET_SIZE, h: PELLET_SIZE});
}

Pellet.prototype.getRect = function () {
  return this._rect;
};

Pellet.prototype.getValue = function () {
  return 10;
};

Pellet.prototype.draw = function (ctx) {
  var x = this._scene.getX() + this.getX() - PELLET_POSITION_CORRECTION;
  var y = this._scene.getY() + this.getY() - PELLET_POSITION_CORRECTION;
  
  ctx.drawImage(ImageManager.getImage('pellet'), x, y);
};


/*--------------------------- Rect delegation --------------------------------*/

Pellet.prototype.setPosition = function (position) {
  position.x += PELLET_POSITION_CORRECTION;
  position.y += PELLET_POSITION_CORRECTION;
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
