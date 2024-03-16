
function MapCanvas(mainDiv, id, width, height, world) {
  this.mainDiv = mainDiv;
  this.id = id; 
  this.width = width; 
  this.height = height;

  this.canvas = null;

  this.world = world;
  this.init();
}


MapCanvas.prototype = {

  init: function() {
    this.canvas = this.mainDiv.append('canvas');
    this.canvas
      .style('background', 'transparent')
      .style('position', 'absolute')
      .attr('id', this.id);

    this.canvas
      .attr('height', this.height)
      .attr('width', this.width)
      .style('top', (- this.height / 2) + 'px')
      .style('left', (- this.width / 2) + 'px');

  },

  getCanvas : function () {
    if (this.canvas == null) {
      this.init();
    }
    return this.canvas;
  },

  getCtx: function () {
    if (this.canvas == null) {
      this.init();
    }
    return this.canvas.node().getContext('2d');
  },

  drawClean: function () {
    var ctx = this.getCtx();

    var imgData = ctx.getImageData(0, 0, this.width, this.height);
    var i, lvl;
    for (i = 0; i < imgData.data.length; i += 4) {
          imgData.data[i+3] = imgData.data[i+3] > 1 ? imgData.data[i+3] - 1 : 0;
    };
    ctx.putImageData(imgData, 0, 0);

  },


  drawPoint: function (x, y, r, g, b, alpha=255) {
     var imgData = this.getCtx().createImageData(1, 1);
     imgData.data[0] = r; 
     imgData.data[1] = g;
     imgData.data[2] = b;
     imgData.data[3] = alpha;
     this.getCtx().putImageData(imgData, x, y);
  },


  drawSquare: function (x, y, r, g, b, alpha=255) {
     var imgData = this.getCtx().createImageData(3, 3);
     var i;
     for (i = 0; i < 36; i += 4) {
       imgData.data[i+0] = r; 
       imgData.data[i+1] = g;
       imgData.data[i+2] = b;
       imgData.data[i+3] = alpha;
     }
     this.getCtx().putImageData(imgData, x - 1, y - 1);
  },


}