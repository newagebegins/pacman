function PlayScene(game) {
  this._game = game;
  
  this._readyMessage = new ReadyMessage();
  this._readyMessage.setVisibilityDuration(100);
}

PlayScene.prototype.tick = function () {
  this._readyMessage.tick();
};

PlayScene.prototype.getReadyMessage = function () {
  return this._readyMessage;
};
