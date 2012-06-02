function PointsMessage(scene) {
  this._scene = scene;
  this._visibilityDuration = 15;
}

PointsMessage.prototype.tick = function () {
  if (this._timeToHide == 0) {
    return;
  }
  this._timeToHide--;
  if (this._timeToHide == 0) {
    this._ghost.setVisible(true);
    this._scene.getPacman().setVisible(true);
  }
};

PointsMessage.prototype.setVisibilityDuration = function (duration) {
  this._visibilityDuration = duration;
};

PointsMessage.prototype.isVisible = function () {
  return this._timeToHide > 0;
};

PointsMessage.prototype.setValue = function (value) {
  this._value = value;
};

PointsMessage.prototype.getValue = function () {
  return this._value;
};

PointsMessage.prototype.setPosition = function (position) {
  this._position = position;
};

PointsMessage.prototype.getPosition = function () {
  return this._position;
};

PointsMessage.prototype.setEatenGhost = function (ghost) {
  this._ghost = ghost;
};

PointsMessage.prototype.show = function () {
  this._timeToHide = this._visibilityDuration;
  this._ghost.setVisible(false);
  this._scene.getPacman().setVisible(false);
};

PointsMessage.prototype.draw = function (ctx) {
  if (!this.isVisible()) {
    return;
  }
  
  ctx.fillStyle = "#2abac0";
  ctx.font = "bold 12px 'Lucida Console', Monaco, monospace"
  var x = this._scene.getX() + this._position.x - 4;
  var y = this._scene.getY() + this._position.y + 12;
  ctx.fillText(this._value, x, y);
};
