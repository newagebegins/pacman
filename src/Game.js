var KEY_ENTER = 1;
var KEY_UP = 2;

function Game() {
  this._scene = new StartupScene(this);
}

Game.prototype.setScene = function (scene) {
  this._scene = scene;
};

Game.prototype.getScene = function () {
  return this._scene;
};

Game.prototype.keyPressed = function (key) {
  this._scene.keyPressed(key);
};
