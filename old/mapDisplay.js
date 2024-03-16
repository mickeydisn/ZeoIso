
function MapCanvas(mainDiv, id, width, height) {
  this.mainDiv = mainDiv;
  this.id = id; 
  this.width = width; 
  this.height = height;
}


InterfaceMap.prototype = {

  createCtx: function() {
    var canvas = mainDiv.append('canvas');
    canvas
      .style('background', 'transparent')
      .style('position', 'absolute')
      .attr('id', this.id);

    canvas
      .attr('height', height)
      .attr('width', width)
      .style('top', (- height / 2) + 'px')
      .style('left', (- width / 2) + 'px');

    var ctx = canvas.node().getContext('2d');
    return ctx;
  },

}