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
  this._drawTitle(ctx);
  this._drawControlsHelp(ctx);
  this._pressEnterText.draw(ctx);
};

StartupScene.prototype._drawTitle = function (ctx) {
  ctx.fillStyle = "#ffff00";
  ctx.font = "bold 90px 'Lucida Console', Monaco, monospace"
  ctx.fillText("PAC-MAN", 76, 150);
};

StartupScene.prototype._drawControlsHelp = function (ctx) {
  ctx.fillStyle = "#dedede";
  ctx.font = "bold 14px 'Lucida Console', Monaco, monospace"
  ctx.fillText("CONTROL: ARROW KEYS", 187, 300);
};
