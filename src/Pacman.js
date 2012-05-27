function Pacman(scene) {
  this._scene = scene;
  
  this._x = 0;
  this._y = 0;
}

Pacman.prototype.tick = function () {
  if (!this._scene.getReadyMessage().isVisible()) {
    this._move();
  }
};

Pacman.prototype._move = function () {
  this._x++;
};

Pacman.prototype.getPosition = function () {
  return {x: this._x, y: this._y};
};
