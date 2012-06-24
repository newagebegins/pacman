var SoundManager = (function() {
  var sounds = {
    pellet1: null,
    pellet2: null,
    powerpellet: null,
    eatghost: null,
    pacman_dies: null,
    intro: null,
    eatfruit: null
  };
  
  for (var i in sounds) {
    var snd = new Audio("sounds/" + i + ".ogg");
    sounds[i] = snd;
  }
  
  return {
    notify: function (event) {
      if (event.name == EVENT_PELLET_EATEN) {
        sounds[event.pacman.getEatenPelletSound()].play();
      }
      else if (event.name == EVENT_POWER_PELLET_EATEN) {
        sounds.powerpellet.play();
      }
      else if (event.name == EVENT_GHOST_EATEN) {
        sounds.eatghost.play();
      }
      else if (event.name == EVENT_PACMAN_DIES_ANIMATION_STARTED) {
        sounds.pacman_dies.play();
      }
      else if (event.name == EVENT_PLAYSCENE_READY) {
        sounds.intro.play();
      }
      else if (event.name == EVENT_CHERRY_EATEN) {
        sounds.eatfruit.play();
      }
    }
  };
})();
