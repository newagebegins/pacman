describe("When game is just started", function () {
  it("startup scene should be active", function () {
    var game = new Game();
    expect(game.getScene() instanceof StartupScene).toBeTruthy();
  });
});

describe("When on startup scene", function () {
  var game;
  
  beforeEach(function () {
    game = new Game();
  });
  
  describe("and Enter key is pressed", function () {
    it("play scene should be active", function () {
      game.keyPressed(KEY_ENTER);
      expect(game.getScene() instanceof PlayScene).toBeTruthy();
    });
  });
  
  describe("and key other than Enter is pressed", function () {
    it("startup scene should remain active", function () {
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
