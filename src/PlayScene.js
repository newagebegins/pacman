var TILE_SIZE = 10;

function PlayScene(game) {
  this._game = game;
  
  this._readyMessage = new ReadyMessage();
  this._readyMessage.setVisibilityDuration(50);
  
  this._pacman = new Pacman(this);
  this._pacman.setSpeed(2);
  this._pacman.requestNewDirection(DIRECTION_RIGHT);
  
  this._currentLevel = 1;
  this.loadMap(this._getMapForCurrentLevel());
}

PlayScene.prototype.tick = function () {
  this._readyMessage.tick();
  this._pacman.tick();
};

PlayScene.prototype.draw = function (ctx) {
  this._readyMessage.draw(ctx);
  this._pacman.draw(ctx);
  
  for (var wall in this._walls) {
    this._walls[wall].draw(ctx);
  }
};

PlayScene.prototype.keyPressed = function (key) {
  this._pacman.keyPressed(key);
};

PlayScene.prototype.getReadyMessage = function () {
  return this._readyMessage;
};

PlayScene.prototype.getPacman = function () {
  return this._pacman;
};

PlayScene.prototype.loadMap = function (map) {
  this._walls = [];
  for (var row = 0; row < map.length; ++row) {
    for (var col = 0; col < map[row].length; ++col) {
      var tile = map[row][col];
      var position = {x: col * TILE_SIZE, y: row * TILE_SIZE};
      if (tile == '#') {
        var wall = new Wall();
        wall.setPosition(position);
        this._walls.push(wall);
      }
      else if (tile == 'C') {
        this._pacmanStartPosition = position;
        this._pacman.setPosition(this._pacmanStartPosition);
      }
    }
  }
};

PlayScene.prototype.getWalls = function () {
  return this._walls;
};

PlayScene.prototype.getPacmanStartPosition = function () {
  return this._pacmanStartPosition;
};

PlayScene.prototype.getCurrentLevel = function () {
  return this._currentLevel;
};

PlayScene.prototype._getMapForCurrentLevel = function () {
  if (this._currentLevel == 1) {
    return  ['#############################',
             '#                           #',
             '# #### ###### ###### #### # #',
             '# #  # #           # #  # # #',
             '# #  # # # ## ## # # #  # # #',
             '# #### # # #   # # # #### # #',
             '#        # ##### #          #',
             '# ######## ##### ########## #',
             '#C                          #',
             '#############################'];
  }
};
