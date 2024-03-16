
function InterfaceMenu(divMenuHead, divMenuRight, world) {
    this.divMenuHead = divMenuHead;
    this.divMenuRight = divMenuRight;
    this.world = world;
    this.world.interfaceMenu = this;
    this.init();
}

InterfaceMenu.prototype = {

  divMain : null,
  divTile : null,
  divPlayer: null,
  divBuildings : null,
  divIcon : null,
  divPerfom : null,

  buttRun : null,
  boxTile : null,
  boxPlayer : null,

  init: function() {


    this.divMain = this.createEmptyBox(this.divMenuRight, 'Main');
    this.initMain();

    this.divBuildings = this.createEmptyBox(this.divMenuRight, 'Buildings');
    this.initBuildings();

    this.divTile = this.createEmptyBox(this.divMenuRight, 'Tile');
    this.initTile();



  },

  // -----------------

  initMain : function () {
    this.divMain
    .style("display", 'flex')
    .style('justify-content', 'center')

    // Zoom
    var divZoom = this.divMain.append('div')
      .style("display", 'flex')
      .style('justify-content', 'center')
      .style('align-items', 'center')
      .style("height", '2.5em')
      .style("padding", "5px")

    this.ButtomZoomGrain = new ButtomZoom(divZoom, this.world);
  },

  // -----------------
  initTile : function () {

    this.divTile
      .style("margin", "0px")
      .style("padding", "0px")
      .style("border-top", "2px solid #F009")
        .append('div')
        .style('font-size', '1.em')    
        .text('Pos 0, 0');

    this.boxTile = new BoxTile(this.divTile, this.world);

  },
  onClickTile: function (x, y) {
    this.boxTile.onClickTile(x, y);
  },


  initBuildings : function () {

    this.divBuildings
      .style("margin", "0px")
      .style("padding", "0px")
      .style("border-top", "2px solid #F009")
        .append('div')
        .style('font-size', '1.em')    
        .text('Buildings');

    this.boxBuildings = new BoxBuildings(this.divBuildings, this.world);
    // this.boxBuildings.refrech();

  },
  refrechBuildings: function(){
    this.boxBuildings.refrech();
  },


  // -----------------

  createIcon: function(div, icon) {
    return div.append("span")
      .style('font-size', '2em')
      .style('padding', '4px')
      .style('color', '#FFF')
      .append('li')
      .attr('class', icon)

  },

  initIcon : function () {

    
    this.createIcon(this.divIcon, 'fas fa-cannabis');
    this.createIcon(this.divIcon, 'fas fa-chevron-circle-right');
    this.createIcon(this.divIcon, 'fas fa-times-circle');
    this.createIcon(this.divIcon, 'fas fa-plus-circle');
    this.createIcon(this.divIcon, 'fas fa-stop-circle');
    this.createIcon(this.divIcon, 'fas fa-user-circle');
    this.createIcon(this.divIcon, 'fas fa-dot-circle');
    this.createIcon(this.divIcon, 'fas fa-exclamation-circle');
    this.createIcon(this.divIcon, 'fas fa-info-circle')
    this.createIcon(this.divIcon, 'fas fa-check-circle')
    this.createIcon(this.divIcon, 'fas fa-question-circle')

  },

  // 


  // -----------------


  createIconBox : function (div, icon) {

    var ndiv = div.append('div')
      .style("display", 'inline-flex')
      .style('justify-content', 'center')
      .style('flex-direction', 'column')
      .style('align-items', 'center')

      .style("width", '3em')
      .style("height", '2.5em')

      .style("border-left", "1px solid #FFF9")
      .style("padding", "5px")

    ndiv.append("div")
      .style('font-size', '1.5em')
      .style('color', '#FFF')
        .append('li')
        .attr('class', icon)
    
    ndiv.append("div")
      .style("font-size", "0.8em")
      .text(nFormatter(476355, 1));

    return ndiv;
  },

  createEmptyBox : function (mainDiv) {
    var box = mainDiv.append('div')
      .style("margin", "0px")
      .style("padding", "0px")
      .style("color", "#FFF")
      .style("font-size", "0.8em")
      .style("font-family", 'HelveticaNeue')
      .style("font-variant", 'petite-caps')
      .style('background-color', 'rgba(32, 32, 32, 100%)')
      return box;
  },

  createBox : function (mainDiv, title, icon=null) {

    if (icon == null) icon = 'fas fa-caret-right';

    var titleDiv = mainDiv.append('div')
      .style("margin", "0px")
      .style("padding", "0px")
      .style("border-top", "2px solid #F009")
      // .style("border-bottom", "1px solid #F00")

      .style("text-align", "left")

    titleDiv.append('div')
      .style("display", 'table-cell')
      .style("vertical-align", "middle")
      .style("text-align", "left")
      .style("margin", "0px")
      .style("padding", "5px")
        .append("span")
        .style('font-size', '1em')
        .style('color', '#F84')
          .append('li')
          .attr('class', icon)

    titleDiv.append('div')
      .style("display", 'table-cell')
      .style("vertical-align", "middle")
      .style("text-align", "left")
      .style('width', '100%')
      .style("margin", "0px")
      .style("padding", "5px")
        .style("color", "#F84")
        .style("font-size", "0.8em")
        .style("font-family", 'HelveticaNeue')
        .style("font-variant", 'petite-caps')
          .text(title)

    // ------

    var box = titleDiv.append('div')
      .style("border-top", "1px solid #F009")
      .style("margin-left", "4px")
      .style("padding", "0px")
      .style("padding-top", "4px")
      .style("padding-bottom", "10px")
      .style("text-align", "left")
        .style("color", "#FFF")
        .style("font-size", "0.8em")
        .style("font-family", 'HelveticaNeue')
        .style("font-variant", 'petite-caps')

    return box;
  },


}

