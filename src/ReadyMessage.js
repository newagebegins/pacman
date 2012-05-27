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

ReadyMessage.prototype.hide = function () {
  this._timeToHide = 0;
};

ReadyMessage.prototype.tick = function () {
  if (this.isVisible()) {
    this._timeToHide--;
  }
};

ReadyMessage.prototype.draw = function (ctx) {
  if (!this.isVisible()) {
    return;
  }
  
  ctx.fillStyle = "red";
  ctx.font = "bold 18px 'Lucida Console', Monaco, monospace"
  var text = "READY";
  var textWidth = ctx.measureText(text).width;
  // Draw text in the center of the canvas.
  var x = ctx.canvas.width / 2 - textWidth / 2;
  var y = ctx.canvas.height / 2;
  ctx.fillText(text, x, y);
};
