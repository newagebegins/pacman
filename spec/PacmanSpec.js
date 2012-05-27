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
  describe("#keyPressed", function () {
    it("should delegate call to scene", function () {
      var KEY = KEY_ENTER;
      var game = new Game();
      var scene = game.getScene();
      spyOn(scene, 'keyPressed');
      game.keyPressed(KEY);
      expect(scene.keyPressed).toHaveBeenCalledWith(KEY);
    });
  });
  
  describe("#tick", function () {
    it("should delegate call to scene", function () {
      var game = new Game();
      var scene = game.getScene();
      spyOn(scene, 'tick');
      game.tick();
      expect(scene.tick).toHaveBeenCalled();
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
  });
  
  describe("#tick", function () {
    it("should delegate call to Ready message", function () {
      var readyMessage = playScene.getReadyMessage();
      spyOn(readyMessage, 'tick');
      playScene.tick();
      expect(readyMessage.tick).toHaveBeenCalled();
    });
    
    it("should delegate call to Pacman", function () {
      var pacman = playScene.getPacman();
      spyOn(pacman, 'tick');
      playScene.tick();
      expect(pacman.tick).toHaveBeenCalled();
    });
  });
});

describe("When Play scene is just started", function () {
  it("Ready message should be visible for a certain amount of time", function () {
    var VISIBILITY_DURATION = 3;
    var game = new Game();
    var playScene = new PlayScene(game);
    game.setScene(playScene);
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
});

describe("When on Play scene and Ready message is visible", function () {
  it("Pacman should not move until Ready message is hidden", function () {
    var VISIBILITY_DURATION = 2;
    var game = new Game();
    var playScene = new PlayScene(game);
    game.setScene(playScene);
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
