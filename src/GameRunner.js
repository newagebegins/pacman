var FPS = 24;
var CANVAS_WIDTH = 540;
var CANVAS_HEIGHT = 484;

function GameRunner() {
  this._ctx = this._createCanvasContext();
  this._game = new Game();
  this._keyboard = new Keyboard(this._game);
  
  this._game.getEventManager().addSubscriber(SoundManager,
    [EVENT_PELLET_EATEN,
     EVENT_POWER_PELLET_EATEN,
     EVENT_GHOST_EATEN,
     EVENT_PACMAN_DIES_ANIMATION_STARTED,
     EVENT_PLAYSCENE_READY,
     EVENT_CHERRY_EATEN]);
}

GameRunner.prototype.run = function () {
  var that = this;
  setInterval(function () { that._gameLoop(); }, 1000 / FPS);
};

GameRunner.prototype._createCanvasContext = function () {
  var CANVAS_ID = 'canvas';
  $('<canvas id="' + CANVAS_ID + '" width="' + CANVAS_WIDTH + '" height="' + CANVAS_HEIGHT + '"></canvas>').appendTo('#main');
  var canvas = document.getElementById(CANVAS_ID);
  return canvas.getContext('2d');
};

GameRunner.prototype._gameLoop = function () {
  this._keyboard.handleKeypresses();
  this._game.tick();
  
  this._clearCanvas();
  this._game.draw(this._ctx);
};

GameRunner.prototype._clearCanvas = function () {
  this._ctx.fillStyle = "black";
  this._ctx.fillRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
};
