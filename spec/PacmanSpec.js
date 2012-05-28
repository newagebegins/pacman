describe("When game is just started", function () {
  it("Startup scene should be active", function () {
    var game = new Game();
    expect(game.getScene() instanceof StartupScene).toBeTruthy();
  });
});

describe("When on Startup scene", function () {
  var game;
  
  beforeEach(function () {
    game = new Game();
  });
  
  describe("and Enter key is pressed", function () {
    it("Play scene should be active", function () {
      game.keyPressed(KEY_ENTER);
      expect(game.getScene() instanceof PlayScene).toBeTruthy();
    });
  });
  
  describe("and key other than Enter is pressed", function () {
    it("Startup scene should remain active", function () {
      game.keyPressed(KEY_UP);
      expect(game.getScene() instanceof StartupScene).toBeTruthy();
    });
  });
});

describe("Game", function () {
  describe("#draw", function () {
    it("should delegate call to scene", function () {
      var game = new Game();
      var scene = game.getScene();
      spyOn(scene, 'draw');
      var surface = {};
      game.draw(surface);
      expect(scene.draw).toHaveBeenCalledWith(surface);
    });
  });
});

describe("PlayScene", function () {
  var game, playScene;
  
  beforeEach(function () {
    game = new Game();
    playScene = new PlayScene(game);
    game.setScene(playScene);
  });
  
  describe("constructor", function () {
    it("should initialize Ready message", function () {
      var readyMessage = playScene.getReadyMessage();
      expect(readyMessage.getTimeToHide()).toBeGreaterThan(0);
    });
    
    it("should initialize Pacman", function () {
      var pacman = playScene.getPacman();
      expect(pacman.getCurrentSpeed()).toBeGreaterThan(0);
      expect(pacman.getDirection()).toBeDefined();
    });
  });
  
  describe("#loadMap", function () {
    it("sample map", function () {
      var map = ['# .-1234',
                 '#C#OO   ',
                 '##.     '];
      playScene.loadMap(map);
      
      var walls = playScene.getWalls();
      expect(walls.length).toEqual(5);
      expect(walls[0].getPosition()).toEqual({x: 0, y: 0});
      expect(walls[1].getPosition()).toEqual({x: 0, y: TILE_SIZE});
      expect(walls[2].getPosition()).toEqual({x: TILE_SIZE * 2, y: TILE_SIZE});
      
      expect(playScene.getPacman().getStartPosition()).toEqual({x: TILE_SIZE, y: TILE_SIZE});
      
      var pellets = playScene.getPellets();
      expect(pellets.length).toEqual(4);
      expect(pellets[0] instanceof Pellet).toBeTruthy();
      expect(pellets[1] instanceof PowerPellet).toBeTruthy();
      
      expect(playScene.getGate() instanceof Gate).toBeTruthy();
      
      var ghosts = playScene.getGhosts();
      expect(ghosts.length).toEqual(4);
      expect(ghosts[0].getName()).toEqual(GHOST_BLINKY);
      expect(ghosts[1].getName()).toEqual(GHOST_PINKY);
      expect(ghosts[2].getName()).toEqual(GHOST_INKY);
      expect(ghosts[3].getName()).toEqual(GHOST_CLYDE);
    });
  });
});

describe("When Play scene is just started", function () {
  var game, playScene;
  
  beforeEach(function () {
    game = new Game();
    playScene = new PlayScene(game);
    game.setScene(playScene);
  });
  
  it("Ready message should be visible for a certain amount of time", function () {
    var VISIBILITY_DURATION = 3;
    var readyMessage = playScene.getReadyMessage();
    readyMessage.setTimeToHide(VISIBILITY_DURATION);
    
    expect(readyMessage.isVisible()).toBeTruthy();
    expect(readyMessage.getTimeToHide()).toEqual(VISIBILITY_DURATION);
    
    game.tick();
    
    expect(readyMessage.isVisible()).toBeTruthy();
    expect(readyMessage.getTimeToHide()).toEqual(VISIBILITY_DURATION - 1);
    
    game.tick();
    
    expect(readyMessage.isVisible()).toBeTruthy();
    expect(readyMessage.getTimeToHide()).toEqual(VISIBILITY_DURATION - 2);
    
    game.tick();
    
    expect(readyMessage.isVisible()).toBeFalsy();
    expect(readyMessage.getTimeToHide()).toEqual(0);
    
    game.tick();
    
    expect(readyMessage.isVisible()).toBeFalsy();
    expect(readyMessage.getTimeToHide()).toEqual(0);
  });
  
  it("first level should be loaded", function () {
    expect(playScene.getCurrentLevel()).toEqual(1);
    expect(playScene.getWalls().length).toBeGreaterThan(0);
  });
  
  it("Pacman should be on the start position", function () {
    var pacman = playScene.getPacman();
    expect(pacman.getPosition()).toEqual(pacman.getStartPosition());
  });
  
  it("Score should be 0", function () {
    expect(playScene.getScore()).toEqual(0);
  });
  
  it("Ghosts should be on their start positions", function () {
    var ghosts = playScene.getGhosts();
    expect(ghosts[0].getPosition()).toEqual(ghosts[0].getStartPosition());
  });
  
  it("Ghosts should have non-zero speed", function () {
    var ghosts = playScene.getGhosts();
    expect(ghosts[0].getCurrentSpeed()).toBeGreaterThan(0);
  });
});

describe("When on Play scene and Ready message is visible", function () {
  var game, playScene;
  
  beforeEach(function () {
    game = new Game();
    playScene = new PlayScene(game);
    game.setScene(playScene);
  });
  
  it("Pacman should not move until Ready message is hidden", function () {
    var VISIBILITY_DURATION = 2;
    var pacman = playScene.getPacman();
    var readyMessage = playScene.getReadyMessage();
    readyMessage.setTimeToHide(VISIBILITY_DURATION);
    
    expect(readyMessage.isVisible()).toBeTruthy();
    expect(pacman.getPosition()).toEqual(pacman.getStartPosition());
    
    game.tick();
    
    expect(readyMessage.isVisible()).toBeTruthy();
    expect(pacman.getPosition()).toEqual(pacman.getStartPosition());
    
    game.tick();
    
    expect(readyMessage.isVisible()).toBeFalsy();
    expect(pacman.getPosition()).not.toEqual(pacman.getStartPosition());
  });
  
  it("Ghosts should not move until Ready message is hidden", function () {
    game.tick();
    var ghosts = playScene.getGhosts();
    expect(ghosts[0].getPosition()).toEqual(ghosts[0].getStartPosition());
  });
});

describe("When on Play scene and Ready message is hidden", function () {
  it("Ghosts should move", function () {
    var game = new Game();
    var playScene = new PlayScene(game);
    game.setScene(playScene);
    playScene.getReadyMessage().hide();
    
    game.tick();
    
    var ghost = playScene.getGhosts()[0];
    expect(ghost.getPosition()).not.toEqual(ghost.getStartPosition());
  });
});

describe("ReadyMessage", function () {
  describe("#hide", function () {
    it("should hide message", function () {
      var message = new ReadyMessage();
      message.setTimeToHide(10);
      expect(message.isVisible()).toBeTruthy();
      message.hide();
      expect(message.isVisible()).toBeFalsy();
    });
  });
});

describe("Pacman", function () {
  var SPEED = 2;
  var game, playScene, pacman, INIT_X, INIT_Y;
  
  beforeEach(function () {
    game = new Game();
    playScene = new PlayScene(game);
    game.setScene(playScene);
    var map = ['#####',
               '## ##',
               '# C #',
               '## ##',
               '#####'];
    playScene.loadMap(map);
    playScene.getReadyMessage().hide();
    pacman = playScene.getPacman();
    pacman.setSpeed(SPEED);
    INIT_X = pacman.getX();
    INIT_Y = pacman.getY();
  });
  
  it("can move right", function () {
    game.keyPressed(KEY_RIGHT);
    game.tick();
    expect(pacman.getPosition()).toEqual({x: INIT_X + SPEED, y: INIT_Y});
  });
  
  it("can move left", function () {
    game.keyPressed(KEY_LEFT);
    game.tick();
    expect(pacman.getPosition()).toEqual({x: INIT_X - SPEED, y: INIT_Y});
  });
  
  it("can move up", function () {
    game.keyPressed(KEY_UP);
    game.tick();
    expect(pacman.getPosition()).toEqual({x: INIT_X, y: INIT_Y - SPEED});
  });
  
  it("can move down", function () {
    game.keyPressed(KEY_DOWN);
    game.tick();
    expect(pacman.getPosition()).toEqual({x: INIT_X, y: INIT_Y + SPEED});
  });
});

describe("Pacman shouldn't move through the walls", function () {
  var map = ['###',
              '#C#',
              '###'];
  var game, playScene, pacman, INITIAL_POS;

  beforeEach(function () {
    game = new Game();
    playScene = new PlayScene(game);
    game.setScene(playScene);
    playScene.loadMap(map);
    playScene.getReadyMessage().hide();
    pacman = playScene.getPacman();
    INITIAL_POS = pacman.getPosition();
  });

  it("when moving right", function () {
    checkDirection(KEY_RIGHT);
  });

  it("when moving left", function () {
    checkDirection(KEY_LEFT);
  });

  it("when moving up", function () {
    checkDirection(KEY_UP);
  });

  it("when moving down", function () {
    checkDirection(KEY_DOWN);
  });

  function checkDirection(directionKey) {
    game.keyPressed(directionKey);
    expect(pacman.getCurrentSpeed()).toBeGreaterThan(0);
    game.tick();
    expect(pacman.getCurrentSpeed()).toEqual(0);
    expect(pacman.getPosition()).toEqual(INITIAL_POS);
  }
});

describe("When Pacman is collided with wall and stopped and then is given a new direction", function () {
  it("Pacman should regain its speed", function () {
    var SPEED = 2;
    var game = new Game();
    var playScene = new PlayScene(game);
    game.setScene(playScene);
    var map = ['#####',
               '## ##',
               '#  C#',
               '## ##',
               '#####'];
    playScene.loadMap(map);
    playScene.getReadyMessage().hide();
    var pacman = playScene.getPacman();
    pacman.setSpeed(SPEED);
    
    game.keyPressed(KEY_RIGHT);
    game.tick();
    expect(pacman.getCurrentSpeed()).toEqual(0);
    
    game.keyPressed(KEY_LEFT);
    game.tick();
    expect(pacman.getCurrentSpeed()).toEqual(SPEED);
  });
});

describe("When Pacman is moving and is given a command to change direction", function () {
  describe("and this direction is blocked by a wall", function () {
    it("Pacman's current direction shouldn't change", function () {
      var SPEED = 2;
      var game = new Game();
      var playScene = new PlayScene(game);
      game.setScene(playScene);
      var map = ['#####',
                 '## ##',
                 '#  C#',
                 '## ##',
                 '#####'];
      playScene.loadMap(map);
      playScene.getReadyMessage().hide();
      var pacman = playScene.getPacman();
      pacman.setSpeed(SPEED);
      var INIT_POS = pacman.getPosition();

      game.keyPressed(KEY_LEFT);
      game.tick();
      expect(pacman.getCurrentSpeed()).toEqual(SPEED);
      expect(pacman.getDirection()).toEqual(DIRECTION_LEFT);
      expect(pacman.getPosition()).toEqual({x: INIT_POS.x - SPEED, y: INIT_POS.y});

      game.keyPressed(KEY_DOWN);
      game.tick();
      expect(pacman.getCurrentSpeed()).toEqual(SPEED);
      expect(pacman.getDirection()).toEqual(DIRECTION_LEFT);
      expect(pacman.getPosition()).toEqual({x: INIT_POS.x - SPEED * 2, y: INIT_POS.y});
    });
  });
});

describe("When Pacman collides with a pellet", function () {
  var map = ['C..'];
  var game, playScene, pacman, PELLET_VALUE;
  
  beforeEach(function () {
    game = new Game();
    playScene = new PlayScene(game);
    game.setScene(playScene);
    playScene.loadMap(map);
    playScene.getReadyMessage().hide();
    pacman = playScene.getPacman();
    pacman.setSpeed(TILE_SIZE);
    pacman.requestNewDirection(DIRECTION_RIGHT);
    PELLET_VALUE = playScene.getPellets()[0].getValue();
  });
  
  it("score should increase by pellet's value", function () {
    expect(playScene.getScore()).toEqual(0);
    game.tick();
    expect(playScene.getScore()).toEqual(PELLET_VALUE);
  });
  
  it("pellet should disappear", function () {
    expect(playScene.getPellets().length).toEqual(2);
    game.tick();
    expect(playScene.getPellets().length).toEqual(1);
  });
});

describe("Ghost", function () {
  describe("#getRandomDirectionNotBlockedByWall", function () {
    var game, playScene;
    
    beforeEach(function () {
      game = new Game();
      playScene = new PlayScene(game);
      game.setScene(playScene);
      playScene.getReadyMessage().hide();
    });
    
    it("test 1", function () {
      var map = ['###',
                 '#1 ',
                 '###'];
      checkResult(map, [DIRECTION_RIGHT]);
    });
    
    it("test 2", function () {
      var map = ['###',
                 ' 1#',
                 '###'];
      checkResult(map, [DIRECTION_LEFT]);
    });
    
    it("test 3", function () {
      var map = ['# #',
                 '#1#',
                 '###'];
      checkResult(map, [DIRECTION_UP]);
    });
    
    it("test 4", function () {
      var map = ['###',
                 '#1#',
                 '# #'];
      checkResult(map, [DIRECTION_DOWN]);
    });
    
    it("test 5", function () {
      var map = ['###',
                 ' 1 ',
                 '###'];
      checkResult(map, [DIRECTION_LEFT, DIRECTION_RIGHT]);
    });
    
    it("test 5", function () {
      var map = ['# #',
                 '#1#',
                 '# #'];
      checkResult(map, [DIRECTION_UP, DIRECTION_DOWN]);
    });
    
    it("test 6", function () {
      var map = ['# #',
                 ' 1 ',
                 '# #'];
      checkResult(map, [DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP, DIRECTION_DOWN]);
    });
    
    function checkResult(map, expectedDirections) {
      playScene.loadMap(map);
      var ghost = playScene.getGhosts()[0];
      expect(ghost.getDirectionsNotBlockedByWall()).toEqual(expectedDirections);
    }
  });
});

describe("When Pacman touches a ghost", function () {
  describe("and ghost is not vulnerable", function () {
    var map = ['C  1'];
    var game, playScene, pacman, ghost;
    
    beforeEach(function() {
      game = new Game();
      playScene = new PlayScene(game);
      game.setScene(playScene);
      playScene.loadMap(map);
      playScene.getReadyMessage().hide();
      
      pacman = playScene.getPacman();
      pacman.requestNewDirection(DIRECTION_RIGHT);
      // remove from start position
      pacman.setPosition({x: TILE_SIZE, y: 0});
      
      ghost = playScene.getGhosts()[0];
      ghost.setCurrentSpeed(0);
      // remove from start position
      ghost.setPosition({x: TILE_SIZE * 2, y: 0});
    });
    
    it("Ready message should be visible", function () {
      expect(playScene.getReadyMessage().isVisible()).toBeFalsy();
      game.tick();
      expect(playScene.getReadyMessage().isVisible()).toBeTruthy();
    });
    
    it("Pacman should be on the start position", function () {
      expect(pacman.getPosition()).not.toEqual(pacman.getStartPosition());
      game.tick();
      expect(pacman.getPosition()).toEqual(pacman.getStartPosition());
    });
    
    it("Ghosts should be on their start positions", function () {
      expect(ghost.getPosition()).not.toEqual(ghost.getStartPosition());
      game.tick();
      expect(ghost.getPosition()).toEqual(ghost.getStartPosition());
    });
  });
});
