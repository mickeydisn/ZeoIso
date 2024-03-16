
function MapMatris() {



}


MapMatris.prototype = {

  get : function(x, y) {
    if (x < 0 || x > this.maxIdx || y < 0 || y > this.maxIdx) return -1;
    return this.map[x + this.size * y];
  },

  getI : function() {
    return this.map[i];
  },

  get256: function(x, y) {
    return Math.round(this.get(x, y) * 256);
  },

  getI256: function(i) {
    return Math.round(this.get(i) * 256);
  },

  get100: function(x, y) {
    return Math.round(this.get(x, y) * 100);
  },

  set : function(x, y, val) {
    this.map[x + this.size * y] = val;
  },

  set256 : function(x, y, val) {
    this.map[x + this.size * y] = val / 256;
  },

  set100 : function(x, y, val) {
    this.map[x + this.size * y] = val / 100;
  },


  // -----------------------

  initEmpty : function(size) {
    this.size = size;
    this.maxIdx = this.size - 1;
    this.map = new Float32Array(this.size * this.size);
  },


  simplex : null,
  noise : function (x=0, y=0) {
      var f0 = 1/ 4;
      return (this.simplex.noise2D(f0 * x, f0 * y) + 1) / 2;
      //  var x = Math.sin(this.seed++) * 10000;
      //   return x - Math.floor(x);
  },

  // https://www.npmjs.com/package/simplex-noise
  generateSimplex : function(powerSize, seed='42', cx=0, cy=0, zoom=0, grain=0) {
    var size = Math.pow(2, powerSize + zoom);
    var zoom = Math.pow(2, zoom);
    var grain = Math.pow(2, grain);

    this.seed = seed;
    this.simplex = new SimplexNoise(seed);

    var fa = 1/ 20;
    var f0 = 1/ 8;
    var f1 = 2/ 3;
    var f2 = 1.5;

    console.log('size', size);

    this.initEmpty(size);
    var x, y, xi, yi, lvl;
    for (x=0; x < size; x+=1) {
      for (y=0; y < size; y+=1) {

        xi = (x - x % grain) / zoom;
        yi = (y - y % grain) / zoom;

        lvl = this.noise(f0 * (xi + cx / zoom), f0 * (yi + cy / zoom));
        lvl += this.noise(f1 * (xi + cx / zoom), f1 * (yi + cy / zoom)) / 8;
        lvl += this.noise(f1 * (xi + cx / zoom), f1 * (yi + cy / zoom)) / 16;

        lvl += this.noise(fa * (xi + cx / zoom), fa * (yi + cy / zoom)) / 4;

        lvl /= 1 + 1/8 + 1/ 16 + 1/4;
        this.set(x,  y, lvl);
      }
    }

//    this.normaliseMap()

  },

  generateSimplexFlore : function(powerSize, seed='42', cx=0, cy=0) {
    var size = Math.pow(2, powerSize);

    this.seed = seed;
    this.simplex = new SimplexNoise(seed);

    var f0 = 1 / 8;
    var f1 = 2 / 3;
    var f2 = 1.5;

    console.log('size', size);

    this.initEmpty(size);
    var x, y, lvl;
    for (x=0; x < size; x+=1) {
      for (y=0; y < size; y+=1) {
        xi = (x - x % 1) / 16;
        yi = (y - y % 1) / 16;
        lvl = this.noise(f0 * (xi + cx / 16), f0 * (yi + cy / 16));
        lvl += this.noise(f1 * (xi + cx / 16), f1 * (yi + cy / 16)) / 8;
        lvl += this.noise(f1 * (xi + cx / 16), f1 * (yi + cy / 16)) / 16;
        lvl /= 1 + 1/8 + 1/ 16;
        this.set(x,  y, lvl);
      }
    }

  },

  // -----------------------

  normaliseMap : function() {
    var max = 0;
    var min = 0;
    for (var i = 0; i < this.size * this.size; i++) {
        max = this.map[i] < max ? max : this.map[i];
        min = this.map[i] > min ? min : this.map[i];
    }
    var val = 0;
    var a = -min;
    var b = max - min;
    // val = (this.map[0] + a) / b;
    for (var i = 0; i < this.size * this.size; i++) {
        this.map[i] = (this.map[i] + a) / b;
    }
  },

  filterBlure : function(size = 3) {
    var x, y, ix, iy, k, val, sum, count;
    var scroll = (size-size%2) / 2 
    var newMap = new Float32Array(this.size * this.size);
    sizepower = size * size;

    for (y = 0; y < this.size; y++) {
      for (x = 0; x < this.size; x++) {
        count = sum = val = 0;
        for (k = 0; k < sizepower; k++) {
          ix = - scroll + x + k % size 
          iy = - scroll + y + (k-k%size)/size
          val = this.get(ix, iy);
          if (val >= 0) {
            count += 1;
            sum += val;
          }
        }
        newMap[x + this.size * y] = sum / count;
      }
    }
    this.map = newMap;

  }


}

