
function MapTerrain(matris, zoom=1) {
  this.matris = matris;
  this.zoom = zoom;

  this.size = this.matris.size;

  this.width = this.size; //* this.zoom;
  this.height = this.size; //* this.zoom;

}

MapTerrain.prototype = {

  waterLvl : 0.25,
  style : {
    transparence : 32,
  },

  // -----------------------

  getScallXY(x, y) {
    var xs = (x - x % this.zoom) / this.zoom;
    var ys = (y - y % this.zoom) / this.zoom; 
    return [xs, ys];  
  },

  getI(i) {
    var zsize = this.zoom * this.size;
    var y = (i - i % zsize) / zsize;
    var x = i % zsize; 
    // console.log((x - x % this.zoom) / this.zoom, y)
    var ival = this.matris.get256((x - x % this.zoom) / this.zoom, (y - y % this.zoom)  / this.zoom);
    return ival - ival % 8;
  },

  isCenter(i) {
    var zsize = this.zoom * this.size;
    var y = (i - i % zsize) / zsize;
    var x = i % zsize; 
    return x % this.zoom == this.zoom / 2 && y % this.zoom == this.zoom / 2 ;

  },

  draw : function(ctx) {
    var imgData = ctx.createImageData(this.width * this.zoom, this.height * this.zoom);

    var i, lvl;
    for (i = 0; i < imgData.data.length; i += 4) {
        lvl = 256 - this.getI(i / 4);
        imgData.data[i+0] = lvl; 
        imgData.data[i+1] = lvl;
        imgData.data[i+2] = lvl;
        imgData.data[i+3] = this.isCenter(i / 4) ? 255 : this.style.transparence;
    }
    ctx.putImageData(imgData, 0, 0);
  },

}

