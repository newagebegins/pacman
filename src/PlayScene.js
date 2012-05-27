function PlayScene(game) {
  this._game = game;
  
  this._readyMessage = new ReadyMessage();
  this._readyMessage.setVisibilityDuration(100);
  
  this._pacman = new Pacman(this);
  this._pacman.setSpeed(1);
  this._pacman.requestNewDirection(DIRECTION_RIGHT);
}

PlayScene.prototype.tick = function () {
  this._readyMessage.tick();
  this._pacman.tick();
};

PlayScene.prototype.getReadyMessage = function () {
  return this._readyMessage;
};

PlayScene.prototype.getPacman = function () {
  return this._pacman;
};
