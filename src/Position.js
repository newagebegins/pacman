function Position(x, y) {
  this.x = x;
  this.y = y;
}

Position.prototype.equals = function (other) {
  return this.x == other.x && this.y == other.y;
};
