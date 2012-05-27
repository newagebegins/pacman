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
});

describe("When Play scene is just started", function () {
  it("Ready message should be visible", function () {
    var game = new Game();
    var playScene = new PlayScene(game);
    game.setScene(playScene);
    var readyMessage = playScene.getReadyMessage();
    expect(readyMessage.isVisible()).toBeTruthy();
  });
});
