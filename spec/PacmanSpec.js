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
      var map = ['###',
                 '#C#',
                 '###'];
      playScene.loadMap(map);
      var walls = playScene.getWalls();
      
      expect(walls.length).toEqual(8);
      
      expect(walls[0].getPosition()).toEqual({x: 0, y: 0});
      expect(walls[1].getPosition()).toEqual({x: TILE_SIZE, y: 0});
      expect(walls[2].getPosition()).toEqual({x: TILE_SIZE * 2, y: 0});
      expect(walls[3].getPosition()).toEqual({x: 0, y: TILE_SIZE});
      expect(walls[4].getPosition()).toEqual({x: TILE_SIZE * 2, y: TILE_SIZE});
      
      expect(playScene.getPacmanStartPosition()).toEqual({x: TILE_SIZE, y: TILE_SIZE});
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
    readyMessage.setVisibilityDuration(VISIBILITY_DURATION);
    
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
    expect(playScene.getPacman().getPosition()).toEqual(playScene.getPacmanStartPosition());
  });
});

describe("When on Play scene and Ready message is visible", function () {
  it("Pacman should not move until Ready message is hidden", function () {
    var VISIBILITY_DURATION = 2;
    var game = new Game();
    var playScene = new PlayScene(game);
    game.setScene(playScene);
    var map = ['#####',
               '## ##',
               '# C #',
               '## ##',
               '#####'];
    playScene.loadMap(map);
    var pacman = playScene.getPacman();
    var readyMessage = playScene.getReadyMessage();
    readyMessage.setVisibilityDuration(VISIBILITY_DURATION);
    var initialPosition = pacman.getPosition();
    
    expect(readyMessage.isVisible()).toBeTruthy();
    expect(pacman.getPosition()).toEqual(initialPosition);
    
    game.tick();
    
    expect(readyMessage.isVisible()).toBeTruthy();
    expect(pacman.getPosition()).toEqual(initialPosition);
    
    game.tick();
    
    expect(readyMessage.isVisible()).toBeFalsy();
    expect(pacman.getPosition()).not.toEqual(initialPosition);
  });
});

describe("ReadyMessage", function () {
  describe("#hide", function () {
    it("should hide message", function () {
      var message = new ReadyMessage();
      message.setVisibilityDuration(10);
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
