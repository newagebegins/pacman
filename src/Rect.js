function Rect(params) {
  this._x = params.x;
  this._y = params.y;
  this._w = params.w;
  this._h = params.h;
}

Rect.prototype.setPosition = function (position) {
  this._x = position.x;
  this._y = position.y;
};

Rect.prototype.getPosition = function () {
  return new Position(this._x, this._y);
};

Rect.prototype.getX = function () {
  return this._x;
};

Rect.prototype.getY = function () {
  return this._y;
};

Rect.prototype.getLeft = function () {
  return this._x;
};

Rect.prototype.getRight = function () {
  return this._x + this._w - 1;
};

Rect.prototype.getTop = function () {
  return this._y;
};

Rect.prototype.getBottom = function () {
  return this._y + this._h - 1;
};

Rect.prototype.getWidth = function () {
  return this._w;
};

Rect.prototype.getHeight = function () {
  return this._h;
};

Rect.prototype.move = function (vector) {
  this._x += vector.x;
  this._y += vector.y;
};

Rect.prototype.intersectsRect = function (other) {
  return !(this.getLeft() > other.getRight() ||
    this.getRight() < other.getLeft() ||
    this.getTop() > other.getBottom() ||
    this.getBottom() < other.getTop());
};
