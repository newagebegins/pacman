function Game() {
  this._scene = new StartupScene(this);
  this._eventManager = new EventManager();
}

Game.prototype.getEventManager = function () {
  return this._eventManager;
};

Game.prototype.setScene = function (scene) {
  this._scene = scene;
};

Game.prototype.getScene = function () {
  return this._scene;
};

Game.prototype.keyPressed = function (key) {
  this._scene.keyPressed(key);
};

Game.prototype.tick = function () {
  this._scene.tick();
};

Game.prototype.draw = function (surface) {
  this._scene.draw(surface);
};
