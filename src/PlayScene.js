var TILE_SIZE = 10;

function PlayScene(game) {
  this._game = game;
  
  this._readyMessage = new ReadyMessage();
  this._readyMessage.setVisibilityDuration(50);
  this._readyMessage.show();
  
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
      var position = new Position(col * TILE_SIZE, row * TILE_SIZE);
      
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
      else if (tile == 'O') {
        var powerPellet = new PowerPellet();
        position.x += (TILE_SIZE - POWER_PELLET_SIZE) / 2 + 1;
        position.y += (TILE_SIZE - POWER_PELLET_SIZE) / 2 + 1;
        powerPellet.setPosition(position);
        this._pellets.push(powerPellet);
      }
      else if (tile == '-') {
        this._lairPosition = new Position(position.x, position.y + TILE_SIZE);
          
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

/**
 * Ghost Lair is a cell just under the cell where the gate is located.
 * When ghosts are in Run Home state they move to lair cell for revival.
 */
PlayScene.prototype.getLairPosition = function () {
  return this._lairPosition;
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

PlayScene.prototype.placeGhostsToStartPositions = function () {
  for (var ghost in this._ghosts) {
    this._ghosts[ghost].placeToStartPosition();
  }
};

PlayScene.prototype.makeGhostsVulnerable = function () {
  for (var ghost in this._ghosts) {
    this._ghosts[ghost].makeVulnerable();
  }
};

PlayScene.prototype._getMapForCurrentLevel = function () {
  if (this._currentLevel == 1) {
    return  ['#############################',
             '#O                         O#',
             '# #### ###### ###### #### # #',
             '# #  # #     1     # #  # # #',
             '# #  # # # ##-## # # #  # # #',
             '# #### # # #234# # # #### # #',
             '#       O# ##### #          #',
             '# ######## ##### ########## #',
             '#C  ................       O#',
             '#############################'];
  }
  return [];
};

PlayScene.prototype.getWaypointsToLairForGhost = function (ghost) {
  var result = [];
  var from = [this.pxToCoord(ghost.getX()), this.pxToCoord(ghost.getY())];
  var to = [this.pxToCoord(this._lairPosition.x), this.pxToCoord(this._lairPosition.y)];
  var wayPoints = AStar(this._getGrid(), from, to);
  for (var wp in wayPoints) {
    result.push(new Position(wayPoints[wp][0] * TILE_SIZE, wayPoints[wp][1] * TILE_SIZE));
  }
  return result;
};

PlayScene.prototype._getGrid = function () {
  var result = this._getEmptyGrid();
  for (var i = 0; i < this._walls.length; ++i) {
    var row = this.pxToCoord(this._walls[i].getY());
    var col = this.pxToCoord(this._walls[i].getX());
    result[row][col] = 1;
  }
  return result;
};

PlayScene.prototype.pxToCoord = function (px) {
  return Math.floor(px / TILE_SIZE);
};

PlayScene.prototype._getEmptyGrid = function () {
  var result = [];
  var numRows = this._getNumRows();
  var numCols = this._getNumCols();
  for (var r = 0; r < numRows; ++r) {
    var row = [];
    for (var c = 0; c < numCols; ++c) {
      row.push(0);
    }
    result.push(row);
  }
  return result;
};

PlayScene.prototype._getNumRows = function () {
  var result = -1;
  for (var i = 0; i < this._walls.length; ++i) {
    var row = this.pxToCoord(this._walls[i].getY());
    if (row > result) {
      result = row;
    }
  }
  return result + 1;
};

PlayScene.prototype._getNumCols = function () {
  var result = -1;
  for (var i = 0; i < this._walls.length; ++i) {
    var col = this.pxToCoord(this._walls[i].getX());
    if (col > result) {
      result = col;
    }
  }
  return result + 1;
};
