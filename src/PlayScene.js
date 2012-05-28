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
  
  for (var ghost in this._ghosts) {
    this._ghosts[ghost].setRandomDirectionNotBlockedByWall();
  }
  
  this._score = 0;
}

PlayScene.prototype.tick = function () {
  this._readyMessage.tick();
  this._pacman.tick();
  
  for (var ghost in this._ghosts) {
    this._ghosts[ghost].tick();
  }
};

PlayScene.prototype.draw = function (ctx) {
  this._readyMessage.draw(ctx);
  this._pacman.draw(ctx);
  
  for (var wall in this._walls) {
    this._walls[wall].draw(ctx);
  }
  
  for (var pellet in this._pellets) {
    this._pellets[pellet].draw(ctx);
  }
  
  for (var ghost in this._ghosts) {
    this._ghosts[ghost].draw(ctx);
  }
  
  this._gate.draw(ctx);
  this._drawScore(ctx);
};

PlayScene.prototype._drawScore = function (ctx) {
  var SCORE_X = 0;
  var SCORE_Y = 200;
  ctx.fillStyle = "red";
  ctx.font = "bold 14px 'Lucida Console', Monaco, monospace"
  var text = "SCORE: " + this._score;
  ctx.fillText(text, SCORE_X, SCORE_Y);
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
  this._pellets = [];
  this._ghosts = [];
  
  for (var row = 0; row < map.length; ++row) {
    for (var col = 0; col < map[row].length; ++col) {
      var tile = map[row][col];
      var position = {x: col * TILE_SIZE, y: row * TILE_SIZE};
      
      if (tile == '#') {
        var wall = new Wall();
        wall.setPosition(position);
        this._walls.push(wall);
      }
      else if (tile == '.') {
        var pellet = new Pellet();
        position.x += (TILE_SIZE - NORMAL_PELLET_SIZE) / 2 + 1;
        position.y += (TILE_SIZE - NORMAL_PELLET_SIZE) / 2 + 1;
        pellet.setPosition(position);
        this._pellets.push(pellet);
      }
      else if (tile == '-') {
        var gate = new Gate();
        position.y += (TILE_SIZE - GATE_HEIGHT) / 2 + 1;
        gate.setPosition(position);
        this._gate = gate;
      }
      else if (tile == 'C') {
        this._pacman.setStartPosition(position);
        this._pacman.setPosition(position);
      }
      else if (tile == '1' || tile == '2' || tile == '3' || tile == '4') {
        var name;
        if (tile == '1') {
          name = GHOST_BLINKY;
        }
        else if (tile == '2') {
          name = GHOST_PINKY;
        }
        else if (tile == '3') {
          name = GHOST_INKY;
        }
        else if (tile == '4') {
          name = GHOST_CLYDE;
        }
        var ghost = new Ghost(name, this);
        ghost.setPosition(position);
        ghost.setStartPosition(position);
        this._ghosts.push(ghost);
      }
    }
  }
};

PlayScene.prototype.getWalls = function () {
  return this._walls;
};

PlayScene.prototype.getPellets = function () {
  return this._pellets;
};

PlayScene.prototype.removePellet = function (pellet) {
  for (var i = 0; i < this._pellets.length; ++i) {
    if (this._pellets[i] === pellet) {
      this._pellets.splice(i, 1);
      return;
    }
  }
};

PlayScene.prototype.getGate = function () {
  return this._gate;
};

PlayScene.prototype.getGhosts = function () {
  return this._ghosts;
};

PlayScene.prototype.getCurrentLevel = function () {
  return this._currentLevel;
};

PlayScene.prototype.getScore = function () {
  return this._score;
};

PlayScene.prototype.increaseScore = function (amount) {
  this._score += amount;
};

PlayScene.prototype._getMapForCurrentLevel = function () {
  if (this._currentLevel == 1) {
    return  ['#############################',
             '#                           #',
             '# #### ###### ###### #### # #',
             '# #  # #     1     # #  # # #',
             '# #  # # # ##-## # # #  # # #',
             '# #### # # #234# # # #### # #',
             '#        # ##### #          #',
             '# ######## ##### ########## #',
             '#C  ................        #',
             '#############################'];
  }
  return [];
};
