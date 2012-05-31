function StartupScene(game) {
  this._game = game;
  this._pressEnterText = new PressEnterText();
}

StartupScene.prototype.keyPressed = function (key) {
  if (key == KEY_ENTER) {
    this._game.setScene(new PlayScene(this._game));
  }
};

StartupScene.prototype.tick = function () {
  this._pressEnterText.tick();
};

StartupScene.prototype.draw = function (ctx) {
  this._pressEnterText.draw(ctx);
};
