function PointsMessage(scene) {
  this._scene = scene;
  this._visibilityDuration = 30;
}

PointsMessage.prototype.tick = function () {
  if (this._timeToHide == 0) {
    return;
  }
  this._timeToHide--;
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

PointsMessage.prototype.show = function () {
  this._timeToHide = this._visibilityDuration;
};

PointsMessage.prototype.draw = function (ctx) {
  if (!this.isVisible()) {
    return;
  }
  
  ctx.fillStyle = "#2abac0";
  ctx.font = "bold 12px 'Lucida Console', Monaco, monospace"
  var x = this._scene.getX() + this._position.x;
  var y = this._scene.getY() + this._position.y;
  ctx.fillText(this._value, x, y);
};
