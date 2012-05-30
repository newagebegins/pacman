var ImageManager = (function() {
  var images = {
    wall_h: null,
    wall_v: null,
    wall_tlc: null,
    wall_trc: null,
    wall_blc: null,
    wall_brc: null,
    wall_t: null,
    wall_b: null,
    wall_l: null,
    wall_r: null,
    pacman_1: null,
    pacman_2l: null,
    pacman_3l: null,
    pacman_2r: null,
    pacman_3r: null,
    pacman_2u: null,
    pacman_3u: null,
    pacman_2d: null,
    pacman_3d: null
  };
  
  for (var i in images) {
    var img = new Image();
    img.src = 'images/' + i + '.png';
    images[i] = img;
  }
  
  return {
    getImage: function (name) {
      return images[name];
    }
  };
})();
