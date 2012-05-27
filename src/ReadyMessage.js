function ReadyMessage() {}

ReadyMessage.prototype.setVisibilityDuration = function (duration) {
  this._timeToHide = duration;
};

ReadyMessage.prototype.getTimeToHide = function () {
  return this._timeToHide;
};

ReadyMessage.prototype.isVisible = function () {
  return this._timeToHide > 0;
};

ReadyMessage.prototype.tick = function () {
  if (this.isVisible()) {
    this._timeToHide--;
  }
};
