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
  var game, scene;
  
  beforeEach(function () {
    game = new Game();
    scene = new PlayScene(game);
    game.setScene(scene);
  });
  
  describe("constructor", function () {
    it("should initialize Ready message", function () {
      var readyMessage = scene.getReadyMessage();
      expect(readyMessage.getTimeToHide()).toBeGreaterThan(0);
    });
    
    it("should initialize Pacman", function () {
      var pacman = scene.getPacman();
      expect(pacman.getCurrentSpeed()).toBeGreaterThan(0);
      expect(pacman.getDirection()).toBeDefined();
    });
  });
  
  describe("#loadMap", function () {
    it("sample map", function () {
      var map = ['# .-1234',
                 '#C# OO  ',
                 '##.     '];
      scene.loadMap(map);
      
      var walls = scene.getWalls();
      expect(walls.length).toEqual(5);
      expect(walls[0].getPosition()).toEqual(new Position(0, 0));
      expect(walls[1].getPosition()).toEqual(new Position(0, TILE_SIZE));
      expect(walls[2].getPosition()).toEqual(new Position(TILE_SIZE * 2, TILE_SIZE));
      
      expect(scene.getPacman().getStartPosition()).toEqual(new Position(TILE_SIZE, TILE_SIZE));
      
      var pellets = scene.getPellets();
      expect(pellets.length).toEqual(4);
      expect(pellets[0] instanceof Pellet).toBeTruthy();
      expect(pellets[1] instanceof PowerPellet).toBeTruthy();
      
      expect(scene.getGate() instanceof Gate).toBeTruthy();
      expect(scene.getLairPosition()).toEqual(new Position(3 * TILE_SIZE ,TILE_SIZE));
      
      var ghosts = scene.getGhosts();
      expect(ghosts.length).toEqual(4);
      expect(ghosts[0].getName()).toEqual(GHOST_BLINKY);
      expect(ghosts[1].getName()).toEqual(GHOST_PINKY);
      expect(ghosts[2].getName()).toEqual(GHOST_INKY);
      expect(ghosts[3].getName()).toEqual(GHOST_CLYDE);
    });
    
    it("should identify and set wall images", function () {
      var map = ['################# ####',
                 '#               ###  #',
                 '#  ###  #   ###     ##',
                 '##  #  ###  # # #   # ',
                 ' #  #   #   ### #   ##',
                 '## ###          #    #',
                 '#                    #',
                 '# #   #     # #      #',
                 '# ## ##    ## ##     #',
                 '# #   #     # #      #',
                 '#       ###          #',
                 '######### ############'];
      scene.loadMap(map);
      
      expect(scene.getWallAtTile(0, 0).getImage()).toEqual('wall_tlc');
      expect(scene.getWallAtTile(12, 2).getImage()).toEqual('wall_tlc');
      
      expect(scene.getWallAtTile(21, 0).getImage()).toEqual('wall_trc');
      expect(scene.getWallAtTile(14, 2).getImage()).toEqual('wall_trc');
      
      expect(scene.getWallAtTile(0, 11).getImage()).toEqual('wall_blc');
      expect(scene.getWallAtTile(12, 4).getImage()).toEqual('wall_blc');
      expect(scene.getWallAtTile(10, 11).getImage()).toEqual('wall_blc');
      expect(scene.getWallAtTile(0, 3).getImage()).toEqual('wall_blc');
      
      expect(scene.getWallAtTile(21, 11).getImage()).toEqual('wall_brc');
      expect(scene.getWallAtTile(14, 4).getImage()).toEqual('wall_brc');
      expect(scene.getWallAtTile(8, 11).getImage()).toEqual('wall_brc');
      
      expect(scene.getWallAtTile(1, 0).getImage()).toEqual('wall_h');
      expect(scene.getWallAtTile(1, 11).getImage()).toEqual('wall_h');
      expect(scene.getWallAtTile(13, 4).getImage()).toEqual('wall_h');
      
      expect(scene.getWallAtTile(0, 1).getImage()).toEqual('wall_v');
      expect(scene.getWallAtTile(21, 1).getImage()).toEqual('wall_v');
      expect(scene.getWallAtTile(14, 3).getImage()).toEqual('wall_v');
      
      expect(scene.getWallAtTile(8, 2).getImage()).toEqual('wall_t');
      expect(scene.getWallAtTile(8, 4).getImage()).toEqual('wall_b');
      expect(scene.getWallAtTile(7, 3).getImage()).toEqual('wall_l');
      expect(scene.getWallAtTile(9, 3).getImage()).toEqual('wall_r');
      
      expect(scene.getWallAtTile(4, 2).getImage()).toEqual('wall_mt');
      expect(scene.getWallAtTile(4, 5).getImage()).toEqual('wall_mb');
      expect(scene.getWallAtTile(2, 8).getImage()).toEqual('wall_ml');
      expect(scene.getWallAtTile(6, 8).getImage()).toEqual('wall_mr');
    });
  });
  
  describe("#getWallAtTile", function () {
    it("should return a wall located at a requested tile", function () {
      var map = ['###',
                 '#  ',
                 '###'];
      scene.loadMap(map);
      
      expect(scene.getWallAtTile(0, 0).getPosition()).toEqual(new Position(0, 0));
      expect(scene.getWallAtTile(1, 0).getPosition()).toEqual(new Position(TILE_SIZE, 0));
      expect(scene.getWallAtTile(0, 1).getPosition()).toEqual(new Position(0, TILE_SIZE));
      expect(scene.getWallAtTile(1, 1)).toBeNull();
    });
  });
  
  it("should know its boundaries", function () {
    var map = ['###',
               '# #',
               '# #',
               '###'];
    scene.loadMap(map);
    
    var WIDTH = 3 * TILE_SIZE;
    var HEIGHT = 4 * TILE_SIZE;
    
    expect(scene.getWidth()).toEqual(WIDTH);
    expect(scene.getHeight()).toEqual(HEIGHT);
    expect(scene.getLeft()).toEqual(0);
    expect(scene.getRight()).toEqual(WIDTH - 1);
    expect(scene.getTop()).toEqual(0);
    expect(scene.getBottom()).toEqual(HEIGHT - 1);
  });
});

describe("When Play scene is just started", function () {
  var game, playScene;
  
  beforeEach(function () {
    game = new Game();
    playScene = new PlayScene(game);
    game.setScene(playScene);
  });
  
  it("Ready message should be visible for a long time (while intro music is played)", function () {
    expect(playScene.getReadyMessage().getTimeToHide()).toEqual(READY_MESSAGE_DURATION_LONG);
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
  
  it("Pacman should have 2 lives", function () {
    expect(playScene.getPacman().getLivesCount()).toEqual(2);
  });
});

describe("When Play scene is started", function () {
  it("EVENT_PLAYSCENE_READY should be fired", function () {
    var game = new Game();
    var eventManager = game.getEventManager();
    spyOn(eventManager, 'fireEvent');
    var playScene = new PlayScene(game);
    game.setScene(playScene);
    expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': EVENT_PLAYSCENE_READY});
  });
});

describe("When on Play scene and Ready message is visible", function () {
  var map = ['###########',
             '#C 12     #',
             '# ##### #-#',
             '#  .    # #',
             '###########']
  var game, playScene;
  
  beforeEach(function () {
    game = new Game();
    playScene = new PlayScene(game);
    playScene.loadMap(map);
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

describe("Pacman movement", function () {
  var SPEED = 2;
  var game, playScene, pacman, INIT_X, INIT_Y;
  
  beforeEach(function () {
    game = new Game();
    playScene = new PlayScene(game);
    game.setScene(playScene);
    var map = ['    ###    ',
               '    # #    ',
               '    # #    ',
               '##### #####',
               '#    C    #',
               '##### #####',
               '    # #    ',
               '    # #    ',
               '    ###    '];
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
    expect(pacman.getPosition()).toEqual(new Position(INIT_X + SPEED, INIT_Y));
  });
  
  it("can move left", function () {
    game.keyPressed(KEY_LEFT);
    game.tick();
    expect(pacman.getPosition()).toEqual(new Position(INIT_X - SPEED, INIT_Y));
  });
  
  it("can move up", function () {
    game.keyPressed(KEY_UP);
    game.tick();
    expect(pacman.getPosition()).toEqual(new Position(INIT_X, INIT_Y - SPEED));
  });
  
  it("can move down", function () {
    game.keyPressed(KEY_DOWN);
    game.tick();
    expect(pacman.getPosition()).toEqual(new Position(INIT_X, INIT_Y + SPEED));
  });
});

describe("Pacman animation", function () {
  var game, playScene, pacman, INIT_X, INIT_Y;
  
  beforeEach(function () {
    game = new Game();
    playScene = new PlayScene(game);
    game.setScene(playScene);
    var map = ['    ###    ',
               '    # #    ',
               '    # #    ',
               '##### #####',
               '#    C    #',
               '##### #####',
               '    # #    ',
               '    # #    ',
               '    ###    '];
    playScene.loadMap(map);
    playScene.getReadyMessage().hide();
    pacman = playScene.getPacman();
  });
  
  it("move right", function () {
    game.keyPressed(KEY_RIGHT);
    expect(pacman.getCurrentFrame()).toEqual('pacman_1');
    game.tick();
    expect(pacman.getCurrentFrame()).toEqual('pacman_2r');
    game.tick();
    expect(pacman.getCurrentFrame()).toEqual('pacman_3r');
    game.tick();
    expect(pacman.getCurrentFrame()).toEqual('pacman_2r');
    game.tick();
    expect(pacman.getCurrentFrame()).toEqual('pacman_1');
    game.tick();
    expect(pacman.getCurrentFrame()).toEqual('pacman_2r');
  });
  
  it("move left", function () {
    game.keyPressed(KEY_LEFT);
    expect(pacman.getCurrentFrame()).toEqual('pacman_1');
    game.tick();
    expect(pacman.getCurrentFrame()).toEqual('pacman_2l');
    game.tick();
    expect(pacman.getCurrentFrame()).toEqual('pacman_3l');
    game.tick();
    expect(pacman.getCurrentFrame()).toEqual('pacman_2l');
    game.tick();
    expect(pacman.getCurrentFrame()).toEqual('pacman_1');
    game.tick();
    expect(pacman.getCurrentFrame()).toEqual('pacman_2l');
  });
  
  it("move up", function () {
    game.keyPressed(KEY_UP);
    expect(pacman.getCurrentFrame()).toEqual('pacman_1');
    game.tick();
    expect(pacman.getCurrentFrame()).toEqual('pacman_2u');
    game.tick();
    expect(pacman.getCurrentFrame()).toEqual('pacman_3u');
    game.tick();
    expect(pacman.getCurrentFrame()).toEqual('pacman_2u');
    game.tick();
    expect(pacman.getCurrentFrame()).toEqual('pacman_1');
    game.tick();
    expect(pacman.getCurrentFrame()).toEqual('pacman_2u');
  });
  
  it("move up", function () {
    game.keyPressed(KEY_DOWN);
    expect(pacman.getCurrentFrame()).toEqual('pacman_1');
    game.tick();
    expect(pacman.getCurrentFrame()).toEqual('pacman_2d');
    game.tick();
    expect(pacman.getCurrentFrame()).toEqual('pacman_3d');
    game.tick();
    expect(pacman.getCurrentFrame()).toEqual('pacman_2d');
    game.tick();
    expect(pacman.getCurrentFrame()).toEqual('pacman_1');
    game.tick();
    expect(pacman.getCurrentFrame()).toEqual('pacman_2d');
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
      expect(pacman.getPosition()).toEqual(new Position(INIT_POS.x - SPEED, INIT_POS.y));

      game.keyPressed(KEY_DOWN);
      game.tick();
      expect(pacman.getCurrentSpeed()).toEqual(SPEED);
      expect(pacman.getDirection()).toEqual(DIRECTION_LEFT);
      expect(pacman.getPosition()).toEqual(new Position(INIT_POS.x - SPEED * 2, INIT_POS.y));
    });
  });
});

describe("When Pacman collides with a pellet", function () {
  var map = ['C...'];
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
    expect(playScene.getPellets().length).toEqual(3);
    game.tick();
    expect(playScene.getPellets().length).toEqual(2);
  });
  
  it("EVENT_PELLET_EATEN event should be fired", function () {
    var eventManager = game.getEventManager();
    spyOn(eventManager, 'fireEvent');
    game.tick();
    expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': EVENT_PELLET_EATEN, 'pacman': pacman});
  });
  
  it("two played sounds should be switched after each eaten pellet", function () {
    expect(pacman.getEatenPelletSound()).toEqual('pellet1');
    game.tick();
    expect(pacman.getEatenPelletSound()).toEqual('pellet2');
    game.tick();
    expect(pacman.getEatenPelletSound()).toEqual('pellet1');
    game.tick();
    expect(pacman.getEatenPelletSound()).toEqual('pellet2');
  });
});

describe("When Pacman collides with a power pellet", function () {
  var map = ['###########',
             '#CO12     #',
             '# ##### #-#',
             '#  .    # #',
             '###########']
  var game, playScene, pacman, ghostNormal, ghostRunHome;
  
  beforeEach(function () {
    game = new Game();
    playScene = new PlayScene(game);
    game.setScene(playScene);
    playScene.loadMap(map);
    playScene.getReadyMessage().hide();
    pacman = playScene.getPacman();
    pacman.setSpeed(TILE_SIZE);
    pacman.requestNewDirection(DIRECTION_RIGHT);
    ghostNormal = playScene.getGhosts()[0];
    ghostRunHome = playScene.getGhosts()[1];
    ghostRunHome.runHome();
  });
  
  it("ghosts in Normal state should become vulnerable", function () {
    expect(ghostNormal.getState()).toEqual(GHOST_STATE_NORMAL);
    expect(ghostRunHome.getState()).toEqual(GHOST_STATE_RUN_HOME);
    game.tick();
    expect(ghostNormal.getState()).toEqual(GHOST_STATE_VULNERABLE);
    expect(ghostRunHome.getState()).toEqual(GHOST_STATE_RUN_HOME);
  });
  
  it("vulnareble ghosts should move slowly", function () {
    expect(ghostNormal.getCurrentSpeed()).toEqual(GHOST_SPEED_NORMAL);
    game.tick();
    expect(ghostNormal.getCurrentSpeed()).toEqual(GHOST_SPEED_SLOW);
  });
  
  it("EVENT_POWER_PELLET_EATEN event should be fired", function () {
    var eventManager = game.getEventManager();
    spyOn(eventManager, 'fireEvent');
    game.tick();
    expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': EVENT_POWER_PELLET_EATEN});
  });
});

describe("When Pacman collides with a power pellet", function () {
  it("vulnerability time and blink flag of already vulnerable ghosts should be reset", function () {
    var map = ['###########',
               '#CO O     #',
               '# ##### #-#',
               '#   1 . # #',
               '###########'];
    var game = new Game();
    var playScene = new PlayScene(game);
    game.setScene(playScene);
    playScene.loadMap(map);
    playScene.getReadyMessage().hide();
    
    var pacman = playScene.getPacman();
    pacman.setSpeed(TILE_SIZE);
    pacman.requestNewDirection(DIRECTION_RIGHT);
    
    var VULNERABILITY_DURATION = 10;
    var ghost = playScene.getGhosts()[0];
    ghost.setVulnerabilityDuration(VULNERABILITY_DURATION);
    ghost.setFlashingDuration(8);
    ghost.setBlinkDuration(1);
    
    expect(ghost.getVulnerableTimeLeft()).toEqual(0);
    game.tick();
    expect(ghost.getVulnerableTimeLeft()).toEqual(VULNERABILITY_DURATION - 1);
    game.tick();
    game.tick();
    expect(ghost.getVulnerableTimeLeft()).toEqual(VULNERABILITY_DURATION - 1);
    expect(ghost.getCurrentBodyFrame()).toEqual('vulnerable_2');
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

describe("Ghost animation", function () {
  var map = ['###########',
             '#  1      #',
             '# #### ## #',
             '# #  #  # #',
             '# #### ## #',
             '#         #',
             '###########'];
  var game, scene;
  
  beforeEach(function () {
    game = new Game();
    scene = new PlayScene(game);
    game.setScene(scene);
    scene.loadMap(map);
    scene.getReadyMessage().hide();
  });
  
  it("blinky", function () {
    var blinky = scene.getGhosts()[0];
    
    blinky.setDirection(DIRECTION_RIGHT);

    expect(blinky.getCurrentBodyFrame()).toEqual('blinky_1');
    expect(blinky.getCurrentEyesFrame()).toEqual('eyes_r');
    game.tick();
    expect(blinky.getCurrentBodyFrame()).toEqual('blinky_2');
    expect(blinky.getCurrentEyesFrame()).toEqual('eyes_r');
    game.tick();
    expect(blinky.getCurrentBodyFrame()).toEqual('blinky_1');
    expect(blinky.getCurrentEyesFrame()).toEqual('eyes_r');

    blinky.setDirection(DIRECTION_LEFT);
    
    game.tick();
    expect(blinky.getCurrentBodyFrame()).toEqual('blinky_2');
    expect(blinky.getCurrentEyesFrame()).toEqual('eyes_l');
  });
  
  it("vulnerable ghost", function () {
    var ghost = scene.getGhosts()[0];
    ghost.makeVulnerable();
    
    expect(ghost.getCurrentBodyFrame()).toEqual('vulnerable_1');
    game.tick();
    expect(ghost.getCurrentBodyFrame()).toEqual('vulnerable_2');
    game.tick();
    expect(ghost.getCurrentBodyFrame()).toEqual('vulnerable_1');
  });
});

describe("When Pacman touches a ghost", function () {
  var map = ['###########',
             '#C  1     #',
             '# ##### #-#',
             '# 23    # #',
             '###########']
  var game, scene, pacman, ghost;

  beforeEach(function() {
    game = new Game();
    scene = new PlayScene(game);
    game.setScene(scene);
    scene.loadMap(map);
    scene.getReadyMessage().hide();
    scene.getPacmanDiesPause().setDuration(0);

    pacman = scene.getPacman();
    pacman.requestNewDirection(DIRECTION_RIGHT);
    // remove from start position
    pacman.setPosition(new Position(TILE_SIZE * 2, TILE_SIZE));
    pacman.skipDiesAnimation();

    ghost = scene.getGhosts()[0];
    ghost.setCurrentSpeed(0);
    // remove from start position
    ghost.setPosition(new Position(TILE_SIZE * 3, TILE_SIZE));
  });
    
  describe("and ghost is not vulnerable", function () {
    it("Pacman should stay still for a certain amount of time", function () {
      scene.getPacmanDiesPause().setDuration(2);
      game.tick();
      var pacmanInitialPosition = pacman.getPosition();
      game.tick();
      expect(pacman.getPosition()).toEqual(pacmanInitialPosition);
      game.tick();
      expect(pacman.getPosition()).toEqual(pacmanInitialPosition);
    });
    
    it("Ghosts should stay still for a certain amount of time", function () {
      scene.getPacmanDiesPause().setDuration(2);
      game.tick();
      var ghostInitialPosition = ghost.getPosition();
      game.tick();
      expect(ghost.getPosition()).toEqual(ghostInitialPosition);
      game.tick();
      expect(ghost.getPosition()).toEqual(ghostInitialPosition);
    });
    
    it("Pacman Dies animation should be played", function () {
      var eventManager = game.getEventManager();
      spyOn(eventManager, 'fireEvent');
      
      pacman.playDiesAnimation();
      game.tick();
      game.tick();
      expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': EVENT_PACMAN_DIES_ANIMATION_STARTED});
      expect(ghost.isVisible()).toBeFalsy();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_1');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_1');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_1');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_2');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_2');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_2');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_3');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_3');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_3');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_4');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_4');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_4');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_5');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_5');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_5');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_6');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_6');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_6');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_7');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_7');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_7');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_8');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_8');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_8');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_9');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_9');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_9');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_10');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_10');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_10');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_11');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_11');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_11');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_11');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_11');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_12');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_12');
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_12');
      game.tick();
      expect(ghost.isVisible()).toBeFalsy();
      expect(pacman.getCurrentFrame()).toEqual('pacman_dies_12');
      
      game.tick();
      expect(ghost.isVisible()).toBeTruthy();
      expect(pacman.getDeathFrame()).toEqual(-1);
    });
    
    it("Pacman should be placed on its start position", function () {
      expect(pacman.getPosition()).not.toEqual(pacman.getStartPosition());
      game.tick();
      game.tick();
      expect(pacman.getPosition()).toEqual(pacman.getStartPosition());
    });
    
    it("Ghosts should be placed on their start positions", function () {
      expect(ghost.getPosition()).not.toEqual(ghost.getStartPosition());
      game.tick();
      game.tick();
      expect(ghost.getPosition()).toEqual(ghost.getStartPosition());
    });
    
    it("Cherry should be hidde", function () {
      var cherry = scene.getCherry();
      cherry.appear();
      game.tick();
      game.tick();
      expect(cherry.isVisible()).toBeFalsy();
    });
    
    it("Ready message should be visible", function () {
      expect(scene.getReadyMessage().isVisible()).toBeFalsy();
      game.tick();
      game.tick();
      expect(scene.getReadyMessage().isVisible()).toBeTruthy();
      expect(scene.getReadyMessage().getTimeToHide()).toEqual(READY_MESSAGE_DURATION_SHORT);
    });
    
    it("Pacman's mouth should be closed", function () {
      game.tick();
      game.tick();
      expect(pacman.getCurrentFrame()).toEqual('pacman_1');
    });
    
    it("Ghosts should be in Normal state and have normal speed", function () {
      var ghostVulnerable = scene.getGhosts()[1];
      ghostVulnerable.makeVulnerable();
      var ghostRunHome = scene.getGhosts()[2];
      ghostRunHome.runHome();
      game.tick();
      game.tick();
      expect(ghostVulnerable.getState()).toEqual(GHOST_STATE_NORMAL);
      expect(ghostRunHome.getState()).toEqual(GHOST_STATE_NORMAL);
      expect(ghostVulnerable.getCurrentSpeed()).toEqual(GHOST_SPEED_NORMAL);
      expect(ghostRunHome.getCurrentSpeed()).toEqual(GHOST_SPEED_NORMAL);
    });
    
    it("Pacman should lose one life", function () {
      expect(pacman.getLivesCount()).toEqual(2);
      game.tick();
      game.tick();
      expect(pacman.getLivesCount()).toEqual(1);
    });
    
    describe("and Pacman has no lives left", function () {
      it("startup screen should appear", function () {
        pacman.setLivesCount(0);
        game.tick();
        game.tick();
        expect(game.getScene() instanceof StartupScene).toBeTruthy();
      });
    });
  });
  
  describe("and ghost is vulnerable", function () {
    beforeEach(function() {
      ghost.makeVulnerable();
    });
    
    it('ghost should run home', function () {
      expect(ghost.getState()).toEqual(GHOST_STATE_VULNERABLE);
      game.tick();
      expect(ghost.getState()).toEqual(GHOST_STATE_RUN_HOME);
    });
    
    it("ghost's speed should increase", function () {
      expect(ghost.getCurrentSpeed()).toEqual(GHOST_SPEED_SLOW);
      game.tick();
      expect(ghost.getCurrentSpeed()).toEqual(GHOST_SPEED_FAST);
    });
    
    it("earned points message should appear, during that time pacman and ghosts should not move, pacman and touched ghost should be invisible", function () {
      var GHOST_SCORE_VALUE = 200;
      scene.setGhostScoreValue(GHOST_SCORE_VALUE);
      var pointsMessage = scene.getPointsMessage();
      pointsMessage.setVisibilityDuration(2);
      
      expect(pointsMessage.isVisible()).toBeFalsy();
      expect(pacman.isVisible()).toBeTruthy();
      expect(ghost.isVisible()).toBeTruthy();
      game.tick();
      
      var ghostPosition = ghost.getPosition();
      var pacmanPosition = pacman.getPosition();
      
      expect(pointsMessage.isVisible()).toBeTruthy();
      expect(pointsMessage.getValue()).toEqual(GHOST_SCORE_VALUE);
      expect(pointsMessage.getPosition()).toEqual(pacmanPosition);
      expect(pacman.isVisible()).toBeFalsy();
      expect(ghost.isVisible()).toBeFalsy();
      
      game.tick();
      
      expect(pointsMessage.isVisible()).toBeTruthy();
      expect(ghost.getPosition()).toEqual(ghostPosition);
      expect(pacman.getPosition()).toEqual(pacmanPosition);
      expect(pacman.isVisible()).toBeFalsy();
      expect(ghost.isVisible()).toBeFalsy();
      
      game.tick();
      
      expect(pointsMessage.isVisible()).toBeFalsy();
      expect(ghost.getPosition()).not.toEqual(ghostPosition);
      expect(pacman.getPosition()).not.toEqual(pacmanPosition);
      expect(pacman.isVisible()).toBeTruthy();
      expect(ghost.isVisible()).toBeTruthy();
    });
    
    it("EVENT_GHOST_EATEN event should be fired", function () {
      var eventManager = game.getEventManager();
      spyOn(eventManager, 'fireEvent');
      game.tick();
      expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': EVENT_GHOST_EATEN});
    });
  });
});

describe("When ghost is in Run Home state", function () {
  it("it should move directly to the lair (a cell beneath the gate) and once there return to Normal state", function () {
    var game = new Game();
    var scene = new PlayScene(game);
    game.setScene(scene);
    var map = ['#######################',
               '#                     #',
               '# ##### ###-### ##### #',
               '# #   # #     # #   # #',
               '# #   # ####### ##### #',
               '# ##### #1    # #   # #',
               '#   #     ###     #   #',
               '#######################'];
    scene.loadMap(map);
    scene.getReadyMessage().hide();
    
    var ghost = scene.getGhosts()[0];
    ghost.runHome();
    ghost.setCurrentSpeed(TILE_SIZE);
    
    expect(ghost.getPosition()).toEqual(new Position(9 * TILE_SIZE, 5 * TILE_SIZE));
    game.tick();
    expect(ghost.getPosition()).toEqual(new Position(9 * TILE_SIZE, 6 * TILE_SIZE));
    game.tick();
    expect(ghost.getPosition()).toEqual(new Position(8 * TILE_SIZE, 6 * TILE_SIZE));
    game.tick();
    expect(ghost.getPosition()).toEqual(new Position(7 * TILE_SIZE, 6 * TILE_SIZE));
    game.tick();
    expect(ghost.getPosition()).toEqual(new Position(7 * TILE_SIZE, 5 * TILE_SIZE));
    game.tick();
    expect(ghost.getPosition()).toEqual(new Position(7 * TILE_SIZE, 4 * TILE_SIZE));
    game.tick();
    expect(ghost.getPosition()).toEqual(new Position(7 * TILE_SIZE, 3 * TILE_SIZE));
    game.tick();
    expect(ghost.getPosition()).toEqual(new Position(7 * TILE_SIZE, 2 * TILE_SIZE));
    game.tick();
    expect(ghost.getPosition()).toEqual(new Position(7 * TILE_SIZE, TILE_SIZE));
    game.tick();
    expect(ghost.getPosition()).toEqual(new Position(8 * TILE_SIZE, TILE_SIZE));
    game.tick();
    expect(ghost.getPosition()).toEqual(new Position(9 * TILE_SIZE, TILE_SIZE));
    game.tick();
    expect(ghost.getPosition()).toEqual(new Position(10 * TILE_SIZE, TILE_SIZE));
    game.tick();
    expect(ghost.getPosition()).toEqual(new Position(11 * TILE_SIZE, TILE_SIZE));
    game.tick();
    expect(ghost.getPosition()).toEqual(new Position(11 * TILE_SIZE, 2 * TILE_SIZE));
    game.tick();
    expect(ghost.getPosition()).toEqual(scene.getLairPosition());
    game.tick();
    expect(ghost.getState()).toEqual(GHOST_STATE_NORMAL);
    expect(ghost.getDirection()).toEqual(DIRECTION_UP);
    expect(ghost.getCurrentSpeed()).toEqual(GHOST_SPEED_NORMAL);
  });
});

describe("When vulnerable ghost collides with Pacman", function () {
  describe("and Pacman and a ghost move with normal speeds", function () {
    it("ghost should be at home in finite number of moves", function () {
      var game = new Game();
      var scene = new PlayScene(game);
      game.setScene(scene);
      var map = ['#############################',
                 '#                           #',
                 '# #### ###### ###### #### # #',
                 '# #  # #           # #  # # #',
                 '# #  #1# # ##-## # # #  # # #',
                 '# ####C# # #   # # # #### # #',
                 '#        # ##### #          #',
                 '# ######## ##### ########## #',
                 '#                           #',
                 '#############################'];
      scene.loadMap(map);
      scene.getReadyMessage().hide();
      scene.getPointsMessage().setVisibilityDuration(0);

      var pacman = scene.getPacman();
      pacman.requestNewDirection(DIRECTION_RIGHT);

      var ghost = scene.getGhosts()[0];
      ghost.makeVulnerable();
      ghost.setDirection(DIRECTION_DOWN);

      game.tick();
      game.tick();

      expect(ghost.getState()).toEqual(GHOST_STATE_RUN_HOME);

      for (var i = 0; i <= 55; i++) {
        game.tick();
      }

      expect(ghost.getState()).toEqual(GHOST_STATE_NORMAL);
    });
  });
});

describe("Power pellet", function () {
  it("should blink", function () {
    var game = new Game();
    var scene = new PlayScene(game);
    game.setScene(scene);
    var map = ['O'];
    scene.loadMap(map);
    scene.getReadyMessage().hide();
    var powerPellet = scene.getPellets()[0];
    powerPellet.setBlinkDuration(2);
    
    expect(powerPellet.isVisible()).toBeTruthy();
    game.tick();
    expect(powerPellet.isVisible()).toBeTruthy();
    
    game.tick();
    expect(powerPellet.isVisible()).toBeFalsy();
    game.tick();
    expect(powerPellet.isVisible()).toBeFalsy();
    
    game.tick();
    expect(powerPellet.isVisible()).toBeTruthy();
    game.tick();
    expect(powerPellet.isVisible()).toBeTruthy();
  });
});

describe("When Ghost is Vulnerable", function () {
  it("it should become Normal after a certain amount of time", function () {
    var game = new Game();
    var scene = new PlayScene(game);
    game.setScene(scene);
    var map = ['#####',
               '#1  #',
               '# # #',
               '#   #',
               '#####'];
    scene.loadMap(map);
    scene.getReadyMessage().hide();
    var ghost = scene.getGhosts()[0];
    ghost.setVulnerabilityDuration(10);
    ghost.setFlashingDuration(5);
    ghost.setBlinkDuration(2);
    ghost.makeVulnerable();
    
    expect(ghost.getVulnerableTimeLeft()).toEqual(10);
    expect(ghost.isBlink()).toEqual(false);
    expect(ghost.getCurrentBodyFrame()).toEqual('vulnerable_1');
    game.tick();
    expect(ghost.getVulnerableTimeLeft()).toEqual(9);
    expect(ghost.isBlink()).toEqual(false);
    expect(ghost.getCurrentBodyFrame()).toEqual('vulnerable_2');
    game.tick();
    expect(ghost.getVulnerableTimeLeft()).toEqual(8);
    expect(ghost.isBlink()).toEqual(false);
    expect(ghost.getCurrentBodyFrame()).toEqual('vulnerable_1');
    game.tick();
    expect(ghost.getVulnerableTimeLeft()).toEqual(7);
    expect(ghost.isBlink()).toEqual(false);
    expect(ghost.getCurrentBodyFrame()).toEqual('vulnerable_2');
    game.tick();
    expect(ghost.getVulnerableTimeLeft()).toEqual(6);
    expect(ghost.isBlink()).toEqual(false);
    expect(ghost.getCurrentBodyFrame()).toEqual('vulnerable_1');
    game.tick();
    expect(ghost.getVulnerableTimeLeft()).toEqual(5);
    expect(ghost.isBlink()).toEqual(true);
    expect(ghost.getCurrentBodyFrame()).toEqual('vulnerable_2b');
    game.tick();
    expect(ghost.getVulnerableTimeLeft()).toEqual(4);
    expect(ghost.isBlink()).toEqual(true);
    expect(ghost.getCurrentBodyFrame()).toEqual('vulnerable_1b');
    game.tick();
    expect(ghost.getVulnerableTimeLeft()).toEqual(3);
    expect(ghost.isBlink()).toEqual(false);
    expect(ghost.getCurrentBodyFrame()).toEqual('vulnerable_2');
    game.tick();
    expect(ghost.getVulnerableTimeLeft()).toEqual(2);
    expect(ghost.isBlink()).toEqual(false);
    expect(ghost.getCurrentBodyFrame()).toEqual('vulnerable_1');
    game.tick();
    expect(ghost.getVulnerableTimeLeft()).toEqual(1);
    expect(ghost.isBlink()).toEqual(true);
    expect(ghost.getCurrentBodyFrame()).toEqual('vulnerable_2b');
    game.tick();
    expect(ghost.getVulnerableTimeLeft()).toEqual(0);
    expect(ghost.getState()).toEqual(GHOST_STATE_NORMAL);
    expect(ghost.isBlink()).toEqual(false);
  });
});

describe("When Pacman goes off the map", function () {
  describe("it should appear from the opposite site of the map", function () {
    var game, scene, pacman;
    
    beforeEach(function () {
      game = new Game();
      scene = new PlayScene(game);
      game.setScene(scene);
      scene.getReadyMessage().hide();
      pacman = scene.getPacman();
    });
    
    it("right", function () {
      var map = ['#####',
                 '    C',
                 '#####'];
      scene.loadMap(map);
      pacman.requestNewDirection(DIRECTION_RIGHT);

      expect(pacman.getPosition()).toEqual(new Position(4 * TILE_SIZE, TILE_SIZE));
      game.tick();
      expect(pacman.getPosition()).toEqual(new Position(0, TILE_SIZE));
    });
    
    it("left", function () {
      var map = ['#####',
                 'C    ',
                 '#####'];
      scene.loadMap(map);
      pacman.requestNewDirection(DIRECTION_LEFT);

      expect(pacman.getPosition()).toEqual(new Position(0, TILE_SIZE));
      game.tick();
      expect(pacman.getPosition()).toEqual(new Position(4 * TILE_SIZE, TILE_SIZE));
    });
    
    it("up", function () {
      var map = ['#C#',
                 '# #',
                 '# #'];
      scene.loadMap(map);
      pacman.requestNewDirection(DIRECTION_UP);

      expect(pacman.getPosition()).toEqual(new Position(TILE_SIZE, 0));
      game.tick();
      expect(pacman.getPosition()).toEqual(new Position(TILE_SIZE, 2 * TILE_SIZE));
    });
    
    it("down", function () {
      var map = ['# #',
                 '# #',
                 '#C#'];
      scene.loadMap(map);
      pacman.requestNewDirection(DIRECTION_DOWN);

      expect(pacman.getPosition()).toEqual(new Position(TILE_SIZE, 2 * TILE_SIZE));
      game.tick();
      expect(pacman.getPosition()).toEqual(new Position(TILE_SIZE, 0));
    });
  });
});

describe("When Ghost goes off the map", function () {
  describe("it should appear from the opposite site of the map", function () {
    var game, scene;
    
    beforeEach(function () {
      game = new Game();
      scene = new PlayScene(game);
      game.setScene(scene);
      scene.getReadyMessage().hide();
    });
    
    it("right", function () {
      var map = ['#####',
                 '    1',
                 '#####'];
      scene.loadMap(map);
      var ghost = scene.getGhosts()[0];
      ghost.setDirection(DIRECTION_RIGHT);

      expect(ghost.getPosition()).toEqual(new Position(4 * TILE_SIZE, TILE_SIZE));
      game.tick();
      expect(ghost.getPosition()).toEqual(new Position(0, TILE_SIZE));
    });
    
    it("left", function () {
      var map = ['#####',
                 '1    ',
                 '#####'];
      scene.loadMap(map);
      var ghost = scene.getGhosts()[0];
      ghost.setDirection(DIRECTION_LEFT);

      expect(ghost.getPosition()).toEqual(new Position(0, TILE_SIZE));
      game.tick();
      expect(ghost.getPosition()).toEqual(new Position(4 * TILE_SIZE, TILE_SIZE));
    });
    
    it("up", function () {
      var map = ['#1#',
                 '# #',
                 '# #'];
      scene.loadMap(map);
      var ghost = scene.getGhosts()[0];
      ghost.setDirection(DIRECTION_UP);

      expect(ghost.getPosition()).toEqual(new Position(TILE_SIZE, 0));
      game.tick();
      expect(ghost.getPosition()).toEqual(new Position(TILE_SIZE, 2 * TILE_SIZE));
    });
    
    it("down", function () {
      var map = ['# #',
                 '# #',
                 '#1#'];
      scene.loadMap(map);
      var ghost = scene.getGhosts()[0];
      ghost.setDirection(DIRECTION_DOWN);

      expect(ghost.getPosition()).toEqual(new Position(TILE_SIZE, 2 * TILE_SIZE));
      game.tick();
      expect(ghost.getPosition()).toEqual(new Position(TILE_SIZE, 0));
    });
  });
});

describe("When Pacman eats Ghosts", function () {
  it("next eaten Ghost should increase the Score twice as much as the previous one", function () {
    var game = new Game();
    var scene = new PlayScene(game);
    game.setScene(scene);
    scene.getReadyMessage().hide();
    var map = ['#########',
               '#C1234  #',
               '# ##-## #',
               '# #   # #',
               '# ##### #',
               '#       #',
               '#########'];
    scene.loadMap(map);
    scene.setGhostScoreValue(200);
    scene.getPointsMessage().setVisibilityDuration(0);
    
    var pacman = scene.getPacman();
    pacman.setSpeed(TILE_SIZE);
    pacman.requestNewDirection(DIRECTION_RIGHT);
    
    var ghosts = scene.getGhosts();
    for (var i in ghosts) {
      ghosts[i].makeVulnerable();
      ghosts[i].setCurrentSpeed(0);
    }
    
    expect(scene.getScore()).toEqual(0);
    game.tick();
    expect(scene.getScore()).toEqual(200);
    game.tick();
    expect(scene.getScore()).toEqual(200 + 400);
    game.tick();
    expect(scene.getScore()).toEqual(200 + 400 + 800);
    game.tick();
    expect(scene.getScore()).toEqual(200 + 400 + 800 + 1600);
  });
});

describe("When Pacman eats a Power Pellet", function () {
  it("multiple eaten ghosts bonus should be reset", function () {
    var game = new Game();
    var scene = new PlayScene(game);
    game.setScene(scene);
    scene.getReadyMessage().hide();
    var map = ['#########',
               '#C12O34 #',
               '# ##-## #',
               '# #   # #',
               '# ##### #',
               '# .     #',
               '#########'];
    scene.loadMap(map);
    scene.setGhostScoreValue(200);
    scene.getPointsMessage().setVisibilityDuration(0);
    
    var pacman = scene.getPacman();
    pacman.setSpeed(TILE_SIZE);
    pacman.requestNewDirection(DIRECTION_RIGHT);
    
    var ghosts = scene.getGhosts();
    for (var i in ghosts) {
      ghosts[i].makeVulnerable();
      ghosts[i].setCurrentSpeed(0);
    }
    
    expect(scene.getScore()).toEqual(0);
    game.tick();
    expect(scene.getScore()).toEqual(200);
    game.tick();
    expect(scene.getScore()).toEqual(200 + 400);
    game.tick();
    expect(scene.getScore()).toEqual(200 + 400 + 50);
    game.tick();
    expect(scene.getScore()).toEqual(200 + 400 + 50 + 200);
    game.tick();
    expect(scene.getScore()).toEqual(200 + 400 + 50 + 200 + 400);
  });
});

describe("When all pellets on the level are eaten", function () {
  var map = ['####',
             'C.O ',
             '####'];
  var game, scene, pacman;
  
  beforeEach(function () {
    game = new Game();
    scene = new PlayScene(game);
    game.setScene(scene);
    scene.getReadyMessage().hide();
    scene.loadMap(map);
    
    pacman = scene.getPacman();
    pacman.setSpeed(TILE_SIZE);
    pacman.requestNewDirection(DIRECTION_RIGHT);
  });
  
  it("next level should be loaded", function () {
    expect(scene.getCurrentLevel()).toEqual(1);
    game.tick();
    game.tick();
    expect(scene.getCurrentLevel()).toEqual(2);
    expect(scene.getGhosts()[0].getDirection()).toBeDefined();
    expect(pacman.getCurrentFrame()).toEqual('pacman_1');
  });
  
  it("Ready message should be shown", function () {
    expect(scene.getReadyMessage().isVisible()).toBeFalsy();
    game.tick();
    game.tick();
    expect(scene.getReadyMessage().isVisible()).toBeTruthy();
  });
});

describe("When all pellets on the level are eaten", function () {
  describe("and this is the last level", function () {
    it("Startup scene should be shown", function () {
      var map = ['####',
                 'C.  ',
                 '####'];
      var maps = [map];
      var game = new Game();
      var scene = new PlayScene(game, maps);
      game.setScene(scene);
      scene.getReadyMessage().hide();

      var pacman = scene.getPacman();
      pacman.setSpeed(TILE_SIZE);
      pacman.requestNewDirection(DIRECTION_RIGHT);
      
      game.tick();
      
      expect(game.getScene() instanceof StartupScene).toBeTruthy();
    });
  });
});

describe("Event Manager", function () {
  it("should notify subscribers about events", function () {
    var EVENT_1 = {name: 'event_1'};
    var EVENT_2 = {name: 'event_2'};
    
    var eventManager = new EventManager();
    
    var subscriber1 = jasmine.createSpyObj('subscriber', ['notify']);
    var subscriber2 = jasmine.createSpyObj('subscriber', ['notify']);
    
    eventManager.addSubscriber(subscriber1, ['event_1']);
    eventManager.addSubscriber(subscriber2, ['event_1', 'event_2']);
    
    eventManager.fireEvent(EVENT_1);
    eventManager.fireEvent(EVENT_2);
    
    expect(subscriber1.notify).toHaveBeenCalledWith(EVENT_1);
    expect(subscriber2.notify).toHaveBeenCalledWith(EVENT_1);
    expect(subscriber1.notify).not.toHaveBeenCalledWith(EVENT_2);
    expect(subscriber2.notify).toHaveBeenCalledWith(EVENT_2);
  });
});

describe("Cherry", function () {
  var map = ['######',
             'C#   #',
             '######'];
  var game, scene, cherry, pacman;
  
  beforeEach(function () {
    game = new Game();
    scene = new PlayScene(game);
    game.setScene(scene);
    scene.getReadyMessage().hide();
    scene.loadMap(map);
    cherry = scene.getCherry();
    
    pacman = scene.getPacman();
    // Put Pacman in a closed room to protect Cherry from being eaten.
    pacman.setPosition({x: TILE_SIZE * 2, y: TILE_SIZE});
  });
  
  it("should appear after certain time intervals", function () {
    cherry.setAppearanceInterval(3);
    
    expect(cherry.isVisible()).toBeFalsy();
    game.tick();
    expect(cherry.isVisible()).toBeFalsy();
    game.tick();
    expect(cherry.isVisible()).toBeFalsy();
    game.tick();
    expect(cherry.isVisible()).toBeTruthy();
    game.tick();
    expect(cherry.isVisible()).toBeTruthy();
    
    cherry.hide();
    
    expect(cherry.isVisible()).toBeFalsy();
    game.tick();
    expect(cherry.isVisible()).toBeFalsy();
    game.tick();
    expect(cherry.isVisible()).toBeFalsy();
    game.tick();
    expect(cherry.isVisible()).toBeTruthy();
  });
  
  it("should be visible for a certain amount of time", function () {
    cherry.setAppearanceInterval(2);
    cherry.setVisibilityDuration(3);
    
    expect(cherry.isVisible()).toBeFalsy();
    game.tick();
    expect(cherry.isVisible()).toBeFalsy();
    game.tick();
    expect(cherry.isVisible()).toBeTruthy();
    game.tick();
    expect(cherry.isVisible()).toBeTruthy();
    game.tick();
    expect(cherry.isVisible()).toBeTruthy();
    game.tick();
    expect(cherry.isVisible()).toBeFalsy();
    game.tick();
    expect(cherry.isVisible()).toBeFalsy();
    game.tick();
    expect(cherry.isVisible()).toBeTruthy();
  });
  
  it("should appear on the Pacman's start position", function () {
    expect(cherry.getPosition()).toEqual(scene.getPacman().getStartPosition());
  });
});

describe("When Pacman touches Cherry", function () {
  var map = ['###',
             ' C ',
             '###'];
  var game, scene, cherry, pacman;
  
  beforeEach(function () {
    game = new Game();
    scene = new PlayScene(game);
    game.setScene(scene);
    scene.getReadyMessage().hide();
    scene.loadMap(map);
    
    cherry = scene.getCherry();
    cherry.appear();
    
    pacman = scene.getPacman();
    pacman.setSpeed(TILE_SIZE);
    pacman.setPosition({x: 0, y: TILE_SIZE});
    pacman.requestNewDirection(DIRECTION_RIGHT);
  });
  
  it("Cherry should know that it has been eaten", function () {
    expect(cherry.isEaten()).toBeFalsy();
    game.tick();
    expect(cherry.isEaten()).toBeTruthy();
  });
  
  it("should remain visible for a certain amount of time", function () {
    cherry.setEatenVisibilityDuation(3);
    
    expect(cherry.isVisible()).toBeTruthy();
    expect(cherry.isEaten()).toBeFalsy();
    
    game.tick();
    
    expect(cherry.isEaten()).toBeTruthy();
    expect(cherry.isVisible()).toBeTruthy();
    
    game.tick();
    
    expect(cherry.isVisible()).toBeTruthy();
    
    game.tick();
    
    expect(cherry.isVisible()).toBeFalsy();
    expect(cherry.isEaten()).toBeFalsy();
  });
  
  it("Score should increase", function () {
    expect(scene.getScore()).toEqual(0);
    game.tick();
    expect(scene.getScore()).toEqual(CHERRY_VALUE);
  });
  
  it("EVENT_CHERRY_EATEN should be fired", function () {
    var eventManager = game.getEventManager();
    spyOn(eventManager, 'fireEvent');
    game.tick();
    expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': EVENT_CHERRY_EATEN});
  });
  
  describe("and Cherry is already eaten", function () {
    it("nothing happens", function () {
      // Eat Cherry, then place Pacman back and try to eat it again.
      // Score should increase only once.
      game.tick();
      expect(scene.getScore()).toEqual(CHERRY_VALUE);
      
      pacman.setPosition({x: 0, y: TILE_SIZE});
      game.tick();
      expect(scene.getScore()).toEqual(CHERRY_VALUE);
    });
  });
});
