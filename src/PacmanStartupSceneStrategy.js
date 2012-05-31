function PacmanStartupSceneStrategy(pacman, scene) {
  this._pacman = pacman;
  this._scene = scene;
}

PacmanStartupSceneStrategy.prototype.tick = function () {
  this._pacman.advanceFrame();
  this._pacman.move();
  
  if (this._pacman.getX() >= 440) {
    this._pacman.setDirection(DIRECTION_LEFT);
  }
  else if (this._pacman.getX() < 90) {
    this._pacman.setDirection(DIRECTION_RIGHT);
  }
};
