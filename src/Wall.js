function Wall() {
}

Wall.prototype.setPosition = function (position) {
  this._x = position.x;
  this._y = position.y;
};

Wall.prototype.getPosition = function () {
  return {x: this._x, y: this._y};
};

Wall.prototype.draw = function (ctx) {
  ctx.fillStyle = "blue";
  ctx.fillRect(this._x, this._y, TILE_SIZE, TILE_SIZE);
};
