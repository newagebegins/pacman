function PacmanDiesPause(scene) {
  this._scene = scene;
  this._duration = 15;
  this._timer = 0;
  this._active = false;
  this._pacman = scene.getPacman();
}

PacmanDiesPause.prototype.setDuration = function (duration) {
  this._duration = duration;
};

PacmanDiesPause.prototype.tick = function () {
  if (!this._active) {
    return;
  }
  this._timer++;
  if (this._timer > this._duration) {
    this._active = false;
    
    if (this._pacman._livesCount == 0) {
      this._pacman._game.setScene(new StartupScene(this._pacman._game));
      return;
    }
    this._pacman._livesCount--;
    this._pacman._scene.getReadyMessage().show();
    this._pacman.placeToStartPosition();
    this._pacman._frame = 0;
    this._pacman._scene.placeGhostsToStartPositions();
  }
};

PacmanDiesPause.prototype.activate = function () {
  this._timer = 0;
  this._active = true;
};

PacmanDiesPause.prototype.isActive = function () {
  return this._active;
};
