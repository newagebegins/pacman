var KEY_ENTER = 13;
var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;

function Keyboard(game) {
  this._game = game;
  this._keys = {};
  this._listen();
}

Keyboard.prototype._listen = function () {
  var that = this;
  $(document).keydown(function (event) {
    that._keys[event.which] = true;
    event.preventDefault();
  });
  $(document).keyup(function (event) {
    that._keys[event.which] = false;
    event.preventDefault();
  });
};

Keyboard.prototype.handleKeypresses = function () {
  for (var key in this._keys) {
    if (this._keys[key]) {
      this._game.keyPressed(key);
    }
  }
};
