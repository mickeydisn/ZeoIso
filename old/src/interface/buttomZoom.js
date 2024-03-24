
function ButtomZoom (parentDiv, world){
  this.parentDiv = parentDiv;
  this.world = world;
  this.init();
}
ButtomZoom.prototype = {

  world : null,
  parentDiv : null,
  value : null,

  init : function () {


    // this.createIconBox(this.divMain, 'fas fa-globe');
    // this.createIconBox(this.divMain, 'fas fa-globe-americas');
    // this.createIconBox(this.divMain, 'fas fa-map-marked-alt');
    var zoom0 = this.parentDiv.append("span")
      .style('font-size', '1.3em')
      .style('padding', '.2em')
        .append('li')
        .attr('class', 'fas fa-map-marked-alt')

    zoom0.on('click', function () {
      this.world.interfaceMap.appliedZoomLvl(1/4, 16)
    }.bind(this));


    var zoom1 = this.parentDiv.append("span")
      .style('font-size', '1.3em')
      .style('padding', '.2em')
        .append('li')
        .attr('class', 'fas fa-map-marked-alt')

    zoom1.on('click', function () {
      this.world.interfaceMap.appliedZoomLvl(1/2, 16)
    }.bind(this));

    var zoom2 = this.parentDiv.append("span")
      .style('font-size', '1.3em')
      .style('padding', '.2em')
        .append('li')
        .attr('class', 'fas fa-globe-americas')

    zoom2.on('click', function () {
      this.world.interfaceMap.appliedZoomLvl(1, 16)
    }.bind(this));

    var zoom3 = this.parentDiv.append("span")
      .style('font-size', '1.3em')
      .style('padding', '.2em')
      //.style("display", 'inline-block')
      //.style('color', '#FFF')
        .append('li')
        .attr('class', 'fas fa-globe')

    zoom3.on('click', function () {
      this.world.interfaceMap.appliedZoomLvl(2, 16)
    }.bind(this));

    var zoom4 = this.parentDiv.append("span")
      .style('font-size', '1.3em')
      .style('padding', '.2em')
      //.style("display", 'inline-block')
      //.style('color', '#FFF')
        .append('li')
        .attr('class', 'fas fa-globe')

    zoom4.on('click', function () {
      this.world.interfaceMap.appliedZoomLvl(4, 16)
    }.bind(this));

    var zoom5 = this.parentDiv.append("span")
      .style('font-size', '1.3em')
      .style('padding', '.2em')
      //.style("display", 'inline-block')
      //.style('color', '#FFF')
        .append('li')
        .attr('class', 'fas fa-globe')

    zoom5.on('click', function () {
      this.world.interfaceMap.appliedZoomLvl(8, 16)
    }.bind(this));

  },
}