function PacmanDiesStrategy(pacman) {
  this._pacman = pacman;
}

PacmanDiesStrategy.prototype.tick = function () {
  this._pacman.advanceDeathFrame();
  
  if (this._pacman.getDeathFrame() > PACMAN_DIES_FRAMES_COUNT ||
      this._pacman.shouldSkipDiesAnimation()) {
    this._pacman.diesAnimationCompleted();
  }
};
