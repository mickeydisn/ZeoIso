
function divBioInfo (cellInfo){
  this.cellInfo = cellInfo;

  if (cellInfo != null ) {
      var lvl = this.cellInfo.lvl;
      var hydro = this.cellInfo.hydro;
      var temperature = this.cellInfo.temperature;
  } else {
      var lvl = 0;
      var hydro = 0;
      var temperature = 0;
  }

  this.getAttr = {
    'lvl' : {
        'icon' : 'fas fa-mountain', // poop',
        'value': Math.round(lvl - 64),
        'color': d3.interpolateBrBG(1 - lvl / 256),
    },
    'hydro' : {
        'icon' : 'fas fa-circle',
        'value': Math.round(hydro - 128),
        'color': d3.interpolateYlGn(hydro / 256),
    },
    'temperature' : {
        'icon' : 'fas fa-thermometer-half',
        'value': Math.round(temperature - 128),
        'color': d3.interpolateRdBu(1 - temperature / 256),
    },
  }

  // https://github.com/d3/d3-scale-chromatic

}
divBioInfo.prototype = {

  value : null,
  getAttr: null,

  tileBox : function (parentDiv) {

    var addParam = function (parentDiv, attr) {
      var param = parentDiv.append('span')
        .style('display', 'inline-flex')
        .style('flex-direction', 'column')
        .style('justify-content', 'center')
        .style('padding', '.6em')
        .style('color', attr.color)
      param.append('span')
        .style('display', 'inline-flex')
        .style('justify-content', 'center')
        .style('font-size', '1.5em')
        .attr('class', attr.icon);
      param.append('span')
        .style('display', 'inline-flex')
        .style('justify-content', 'center')
        .style('font-size', '.8em')
        .style('padding-top', '.1em')
        .text(attr.value)
    }

    // addParam(parentDiv, this.getAttr['lvl']);
    addParam(parentDiv, this.getAttr['hydro']);
    addParam(parentDiv, this.getAttr['temperature']);

  },


  lineBox : function (parentDiv) {

    var addParam = function (parentDiv, attr) {
      parentDiv.append('span')
        .style('display', 'inline-flex')
        .style('padding-left', '1em')
        .style('color', attr.color)
        .attr('class', attr.icon);
      parentDiv.append('span')
        .style('display', 'inline-flex')
        .style('padding-left', '.2em')
        .style('color', attr.color)
        .style('font-size', '.8em')
        .text(attr.value)
    }

    addParam(parentDiv, this.getAttr['hydro']);
    addParam(parentDiv, this.getAttr['temperature']);

  },



  d3lineBox : function (parentDiv) {

     parentDiv.append('span')
        .style('display', 'inline-flex')
        .style('padding-left', '.1em')
        .style('color', d => d3.interpolateYlGn(d.infoCell.hydro / 256))
        .attr('class', this.getAttr['hydro'].icon);
      parentDiv.append('span')
        .style('display', 'inline-flex')
        .style('width', '8vh')
        .style('padding-left', '.2em')
        .style('color', d => d3.interpolateYlGn(d.infoCell.hydro / 256))
        .style('font-size', '.9em')
        .text(d => Math.round(d.infoCell.hydro - 128))

     parentDiv.append('span')
        .style('display', 'inline-flex')
        .style('padding-left', '1em')
        .style('color', d => d3.interpolateRdBu(1 - d.infoCell.temperature / 256))
        .attr('class', this.getAttr['temperature'].icon);
      parentDiv.append('span')
        .style('display', 'inline-flex')
        .style('width', '8vh')
        .style('padding-left', '.2em')
        .style('color', d => d3.interpolateRdBu(1 - d.infoCell.temperature / 256))
        .style('font-size', '.9em')
        .text(d => Math.round(d.infoCell.temperature - 128))

  },

}



