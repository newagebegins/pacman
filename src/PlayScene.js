function PlayScene(game) {
  this._game = game;
}

PlayScene.prototype.getReadyMessage = function () {
  return new ReadyMessage();
};
