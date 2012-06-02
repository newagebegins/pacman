var SoundManager = (function() {
  var sounds = {
    pellet1: null,
    pellet2: null,
  };
  
  for (var i in sounds) {
    var snd = new Audio("sounds/" + i + ".wav");
    sounds[i] = snd;
  }
  
  return {
    play: function (name) {
      sounds[name].play();
    },
    notify: function (event) {
      if (event.name == EVENT_PELLET_EATEN) {
        this.play(event.pacman.getEatenPelletSound());
      }
    }
  };
})();
