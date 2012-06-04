var CHERRY_VALUE = 100;

function Cherry(scene) {
  this._scene = scene;
  this._appearanceInterval = 400;
  this._visibilityDuration = 200;
  this._eatenVisibilityDuration = 30;
  this._timer = 0;
  this._visible = false;
  this._eaten = false;
  this._rect = new Rect({x: 0, y: 0, w: TILE_SIZE, h: TILE_SIZE});
}

Cherry.prototype.setAppearanceInterval = function (interval) {
  this._appearanceInterval = interval;
};

Cherry.prototype.setVisibilityDuration = function (duration) {
  this._visibilityDuration = duration;
};

Cherry.prototype.setEatenVisibilityDuation = function (duration) {
  this._eatenVisibilityDuration = duration;
};

Cherry.prototype.appear = function () {
  this._visible = true;
  this._timer = 0;
};

Cherry.prototype.hide = function () {
  this._visible = false;
  this._eaten = false;
  this._timer = 0;
};

Cherry.prototype.isVisible = function () {
  return this._visible;
};

Cherry.prototype.isEaten = function () {
  return this._eaten;
};

Cherry.prototype.setPosition = function (position) {
  this._rect.setPosition(position);
};

Cherry.prototype.getPosition = function () {
  return this._rect.getPosition();
};

Cherry.prototype.getRect = function () {
  return this._rect;
};

Cherry.prototype.eat = function () {
  this._eaten = true;
  this._timer = 0;
};

Cherry.prototype.tick = function () {
  if (this._scene.isPause()) {
    return;
  }
  
  this._timer++;
  
  if (!this.isVisible() && this._timer >= this._appearanceInterval) {
    this.appear();
  }
  else if (this.isVisible() && !this.isEaten() && this._timer >= this._visibilityDuration) {
    this.hide();
  }
  else if (this.isVisible() && this.isEaten() && this._timer >= this._eatenVisibilityDuration) {
    this.hide();
  }
};

Cherry.prototype.draw = function (ctx) {
  if (!this.isVisible()) {
    return;
  }
  
  var x = this._scene.getX() + this._rect.getX();
  var y = this._scene.getY() + this._rect.getY();
  
  if (this.isEaten()) {
    ctx.fillStyle = "#2abac0";
    ctx.font = "bold 12px 'Lucida Console', Monaco, monospace"
    x -= 4;
    y += 12;
    ctx.fillText(CHERRY_VALUE, x, y);
  }
  else {
    ctx.drawImage(ImageManager.getImage('cherry'), x, y);
  }
};
