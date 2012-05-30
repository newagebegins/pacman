var TILE_SIZE = 16;

function PlayScene(game) {
  this._game = game;
  
  this._readyMessage = new ReadyMessage();
  this._readyMessage.setVisibilityDuration(50);
  this._readyMessage.show();
  
  this._pacman = new Pacman(this, game);
  this._pacman.setSpeed(4);
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
  
  for (var pellet in this._pellets) {
    if (this._pellets[pellet] instanceof PowerPellet) {
      this._pellets[pellet].tick();
    }
  }
};

PlayScene.prototype.draw = function (ctx) {
  for (var wall in this._walls) {
    this._walls[wall].draw(ctx);
  }
  
  for (var pellet in this._pellets) {
    this._pellets[pellet].draw(ctx);
  }
  
  for (var ghost in this._ghosts) {
    this._ghosts[ghost].draw(ctx);
  }
  
  this._pacman.draw(ctx);
  
  this._gate.draw(ctx);
  this._drawScore(ctx);
  this._drawLives(ctx);
  this._readyMessage.draw(ctx);
};

PlayScene.prototype._drawScore = function (ctx) {
  var SCORE_X = 0;
  var SCORE_Y = 200;
  ctx.fillStyle = "red";
  ctx.font = "bold 14px 'Lucida Console', Monaco, monospace"
  var text = "SCORE: " + this._score;
  ctx.fillText(text, SCORE_X, SCORE_Y);
};

PlayScene.prototype._drawLives = function (ctx) {
  var x = 0;
  var width = 18
  var y = 220;
  
  for (var i = 0; i < this._pacman.getLivesCount(); ++i) {
    ctx.drawImage(ImageManager.getImage('pacman_3l'), x + i * width, y);
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
  this._pellets = [];
  this._ghosts = [];
  
  var num_rows = map.length;
  var num_cols = map[0].length;
  
  for (var row = 0; row < num_rows; ++row) {
    for (var col = 0; col < num_cols; ++col) {
      var tile = map[row][col];
      var position = new Position(col * TILE_SIZE, row * TILE_SIZE);
      
      if (tile == '#') {
        var wall = new Wall(this._getWallImage(map, row, col));
        wall.setPosition(position);
        this._walls.push(wall);
      }
      else if (tile == '.') {
        var pellet = new Pellet();
        pellet.setPosition(position);
        this._pellets.push(pellet);
      }
      else if (tile == 'O') {
        var powerPellet = new PowerPellet();
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

PlayScene.prototype._getWallImage = function (map, row, col) {
  var num_rows = map.length;
  var num_cols = map[0].length;
  var last_row = num_rows - 1;
  var last_col = num_cols - 1;
  
  if ((col > 0 && col < last_col) &&
      (map[row][col-1] == '#' && map[row][col+1] == '#') &&
      ((row == 0 || map[row-1][col] != '#') && (row == last_row || map[row+1][col] != '#'))) {
    return 'wall_h';
  }
  else if ((row > 0 && row < last_row) &&
      (map[row-1][col] == '#' && map[row+1][col] == '#') &&
      ((col == 0 || map[row][col-1] != '#') && (col == last_col || map[row][col+1] != '#'))) {
    return 'wall_v';
  }
  else if ((col < last_col && row < last_row) &&
      (map[row][col+1] == '#' && map[row+1][col] == '#') &&
      ((col == 0 || map[row][col-1] != '#') && (row == 0 || map[row-1][col] != '#'))) {
    return 'wall_tlc';
  }
  else if ((col > 0 && row < last_row) &&
      (map[row][col-1] == '#' && map[row+1][col] == '#') &&
      ((col == last_col || map[row][col+1] != '#') && (row == 0 || map[row-1][col] != '#'))) {
    return 'wall_trc';
  }
  else if ((col < last_col && row > 0) &&
      (map[row][col+1] == '#' && map[row-1][col] == '#') &&
      ((col == 0 || map[row][col-1] != '#') && (row == last_row || map[row+1][col] != '#'))) {
    return 'wall_blc';
  }
  else if ((col > 0 && row > 0) &&
      (map[row][col-1] == '#' && map[row-1][col] == '#') &&
      ((col == last_col || map[row][col+1] != '#') && (row == last_row || map[row+1][col] != '#'))) {
    return 'wall_brc';
  }
  else if ((row < last_row) &&
      (map[row+1][col] == '#') &&
      ((row == 0 || map[row-1][col] != '#') && (col == 0 || map[row][col-1] != '#') && (col == last_col || map[row][col+1] != '#'))) {
    return 'wall_t';
  }
  else if ((row > 0) &&
      (map[row-1][col] == '#') &&
      ((row == last_row || map[row+1][col] != '#') && (col == 0 || map[row][col-1] != '#') && (col == last_col || map[row][col+1] != '#'))) {
    return 'wall_b';
  }
  else if ((col < last_col) &&
      (map[row][col+1] == '#') &&
      ((col == 0 || map[row][col-1] != '#') && (row == 0 || map[row-1][col] != '#') && (row == last_row || map[row+1][col] != '#'))) {
    return 'wall_l';
  }
  else if ((col > 0) &&
      (map[row][col-1] == '#') &&
      ((col == last_col || map[row][col+1] != '#') && (row == 0 || map[row-1][col] != '#') && (row == last_row || map[row+1][col] != '#'))) {
    return 'wall_r';
  }
  
  return null;
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
             '# ########       ########## #',
             '#C  .......#####....       O#',
             '############   ##############'];
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

PlayScene.prototype.getWallAtTile = function (col, row) {
  var position = new Position(col * TILE_SIZE, row * TILE_SIZE);
  for (var wall in this._walls) {
    if (this._walls[wall].getPosition().equals(position)) {
      return this._walls[wall];
    }
  }
  return null;
};
