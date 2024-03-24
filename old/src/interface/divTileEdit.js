

function TileEdit (parentDiv, world){
  this.parentDiv = parentDiv;
  this.world = world;
  this.init();
}
TileEdit.prototype = {

  world : null,
  parentDiv : null,
  canvas : null,
  color : [0, 0, 0, 255],

  colors : [
      [0, 0, 0, 0],
      [255, 255, 255, 255],
      [192, 192, 192, 255],
      [128, 128, 128, 255],
      [64,  64,  64, 255],
      [32,  32,  32, 255],
      [128,  32,  64, 255],
      [32,  32, 128, 255],
    ],


  createCanva (parent) {
    return parent.append('canvas')
      .style('background', 'transparent')
      .style('image-rendering', 'pixelated')
      .style('position', 'absolute')
      .style('top', '0px')
      .style('left', '0px')
  },

  editBuilding: function(x, y){
    var imgDataBlack = new ImageData(1, 1);
    imgDataBlack.data.set(this.color, 0);
    this.canvas.node().getContext("2d").putImageData(imgDataBlack, x, y);

    console.log( this.canvas.node().toDataURL());

  },

  setColor: function(x) {
    this.color = this.colors[x];
  },

  init : function () {

    this.parentDiv
      .style("vertical-align", "middle")
      .style("text-align", "center")

    var boundingRec = this.parentDiv.node().getBoundingClientRect();
    var size = boundingRec.width ;
    size -= size % 16; 

    // Box
    var cavnasDiv = this.parentDiv
      .append("div")
      .style('background-color', '#44AA44')
      .style("position", "relative")
      .style("padding", "0px")
      .style("height", size + 'px')
      .style("width", size + 'px')

    // Back  
    var scale = size / 64;
    this.canvasBack = this.createCanva(cavnasDiv)
      .attr('height', 64)
      .attr('width', 64)
      .style("transform", 'translate('+ (size / 2 - 32) +'px,'+ (size / 2 - 32) +'px) scale(' + scale  +')');

    // Building  
    var scalePixel = scale * 4;
    this.canvas = this.createCanva(cavnasDiv)
      .attr('height', 16)
      .attr('width', 16)
      .style('opacity', 0.75)
      .style("transform", 'translate('+ (size / 2 - 8) +'px,'+ (size / 2 - 8) +'px) scale(' + scalePixel  +')');


    /* / Edit Color - Actif to get DateValue String of image .
    // Active Editable :

    var editBuilding = this.editBuilding.bind(this);
    this.canvas.on('click', function () {
      var pos = d3.mouse(this);
      var x = pos[0], y = pos[1];
      x /= scalePixel, y /= scalePixel;
      x -= x % 1, y -= y % 1;
      console.log(pos, x, y);
      editBuilding(x, y, [0, 0, 0, 255]);
    })

    var cavnasEdit = this.parentDiv
      .append("div")
      .style("margin-top", "20px")
      .style("height", 32 + 'px')
      .style("width", size + 'px')


    var scaleEdit = size / 8;
    this.canvasEdit = this.createCanva(cavnasEdit)
      .attr('height', 1)
      .attr('width', 8)
      .style("position", "relative")
      .style("transform", 'translate('+ 0  +'px,'+ 0 +'px) scale(' + scaleEdit  +')');

    var imgData = new ImageData(8, 1);
    imgData.data.set(this.colors.flat(), 0)

    this.canvasEdit.node().getContext("2d").putImageData(imgData, 0, 0);
    var setColor = this.setColor.bind(this);
    this.canvasEdit.on('click', function () {
      var pos = d3.mouse(this);
      var x = pos[0], y = pos[1];
      x /= scaleEdit, y /= scaleEdit;
      x -= x % 1, y -= y % 1;
      setColor(x)
    })

    /* ! Edit */

    this.draw(0, 0);

  },


  draw : function (cx, cy, image=null) {
    var size = 64;

    var imgData = new ImageData(size, size);
    var x, y, i;
    for (x = 0; x < size; x += 1) {
      for (y = 0; y < size; y += 1) {
          i = 4 * (y * size + x)
          imgData.data.set(this.world.getColor(x + cx * size , y + cy * size , 1/4, 1), i);
      }
    }
    this.canvasBack.node().getContext("2d").putImageData(imgData, 0, 0);

    if (image != null) {
      this.canvas.node().getContext('2d').drawImage(image, 0, 0);
    }

  }

}