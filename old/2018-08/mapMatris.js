
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

  copyZoom : function(matris, zoom) {
    this.size = matris.size * zoom;
    this.maxIdx = this.size - 1;
    this.map = new Float32Array(this.size * this.size);

    for (var y = 0; y < matris.size; y++) {
      for (var x = 0; x < matris.size; x++) {
        var val = matris.get(x, y);
        for(var k = 0; k < zoom; k++) {
          for(var v = 0; v < zoom; v++) {
            this.set(x * zoom + k, y * zoom + v, val);   
          }
        }
      }
    }
  },

  simplex : null,
  noise : function (x=0, y=0) {
      var f0 = 1/ 4;
      return (this.simplex.noise2D(f0 * x, f0 * y) + 1) / 2;
      //  var x = Math.sin(this.seed++) * 10000;
      //   return x - Math.floor(x);
  },

  // https://github.com/maxogden/voxel-perlin-terrain/blob/master/index.js
  // https://www.npmjs.com/package/simplex-noise
  generateSimplex : function(powerSize, seed='42', cx=0, cy=0) {
    var size = Math.pow(2, powerSize);

    this.seed = seed;
    this.simplex = new SimplexNoise(seed);

    var f0 = 1/ 8;
    var f1 = 2 / 3;
    var f2 = 1.5;

    console.log('size', size);

    this.initEmpty(size);
    var x, y, lvl;
    for (x=0; x < size; x+=1) {
      for (y=0; y < size; y+=1) {
        lvl = this.noise(f0 * (x + cx), f0 * (y + cy));
        lvl += this.noise(f1 * (x + cx), f0 * (y + cy)) / 8;
        lvl += this.noise(f2 * (x + cx), f0 * (y + cy)) / 16;
        lvl /= 1 + 1/8 + 1/ 16;
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

    /*
    console.log("Flore Blure 6.4.");
    this.filterBlure(6);
    this.filterBlure(4);
    console.log("Flore Blure 3...");
    this.filterBlure(3);
    this.filterBlure(3);
    this.filterBlure(3);
    console.log("New Flore");
    */
//    this.normaliseMap()

  },


  generate : function(powerSize, roughness, seed=42) {
    this.seed = seed;
    this.simplex = new SimplexNoise(seed);

    size = Math.pow(2, powerSize) + 1;
    this.initEmpty(size);

    var self = this;
    this.set(0, 0, this.noise(0, 0));
    this.set(this.maxIdx, 0, this.noise(this.maxIdx, 0));
    this.set(this.maxIdx, this.maxIdx, this.noise(this.maxIdx, this.maxIdx));
    this.set(0, this.maxIdx, this.noise(0, this.maxIdx));

    divide(this.maxIdx);

    this.normaliseMap()


    function divide(size) {
      var x, y, half = size / 2;
      var scale = roughness * size;
      if (half < 1) return;
      for (y = half; y < self.maxIdx; y += size) {
        for (x = half; x < self.maxIdx; x += size) {
          square(x, y, half, self.noise(x, y) * scale * 2 - scale);
        }
      }
      for (y = 0; y <= self.maxIdx; y += half) {
        for (x = (y + half) % size; x <= self.maxIdx; x += size) {
          diamond(x, y, half, self.noise(x, y) * scale * 2 - scale);
        }
      }
      divide(size / 2);
    }
    function average(values) {
      var valid = values.filter(function(val) { return val !== -1; });
      var total = valid.reduce(function(sum, val) { return sum + val; }, 0);
      return total / valid.length;
    }
    function square(x, y, size, offset) {
      var ave = average([
        self.get(x - size, y - size),   // upper left
        self.get(x + size, y - size),   // upper right
        self.get(x + size, y + size),   // lower right
        self.get(x - size, y + size)    // lower left
      ]);
      self.set(x, y, ave + offset);
    }
    function diamond(x, y, size, offset) {
      var ave = average([
        self.get(x, y - size),      // top
        self.get(x + size, y),      // right
        self.get(x, y + size),      // bottom
        self.get(x - size, y)       // left
      ]);
      self.set(x, y, ave + offset);
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

