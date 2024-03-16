require([
  './scripts/simplex-noise.js',
  './scripts/tiledCanvas.js',

  './scripts/utils.js',

  './src/data/biomes.js',
  './src/data/items.js',

  './src/core/objectCity.js',

  './src/core/factoryGenerator.js',
  './src/core/factoryBiomes.js',
  './src/core/factoryCity.js',
  './src/core/cityNode.js',
  './src/core/cityRoad.js',

  './src/world.js',

  './src/interfaceMap.js',
  './src/interfaceMenu.js',

  './src/interface/boxJsonEdit.js',

  './src/interface/buttomZoom.js',

  './src/interface/divBioInfo.js',
  './src/interface/divTileEdit.js',

  './src/interface/boxTile.js',
  './src/interface/boxBuildings.js',


], () => {


function Main() {

  this.seed = "mickey";
  this.init();
}



Main.prototype = {

  myGApi: null,
  word : null,
  interfaceMap : null,
  interfaceMenu: null,


  init : function() {

    this.initBody();

    console.log('== Main ==');
    // this.myGApi = new MyGoogleApi();
    // var loadWord = this.loadWord.bind(this);
    // this.myGApi.loadWorld(loadWord);
    this.loadWord()
  },

 
  initBody: function() {

    var body = d3.select('body');

    body
      .style('background-color', '#DEDEDE')

   var mainCenter = body.append("div")
      .attr('id', "mainCenter")
      .style('display', "inline-flex")
      .style('justify-content', "start")
      .style('flex-direction', "column")
      .style('align-items', "center")
      .style('height', "100vh")
      .style('width', "80vw")
      .style('border', "1px solid #F009")
      .style('text-align', "center")

    var centerHead = mainCenter.append('div')
      .attr('id', "mainMenuHead")
      .style('display', "flex")
      .style('flex-direction', "row")
      .style('justify-content', "space-between")
      .style('align-items', "stretch")
      .style('height', "2.5em")
      .style('width', "80vw")
      .style('border', "1px solid #F009")

    var centerCadre = mainCenter.append('div')
      .style('display', "flex")
      .style('justify-content', "center")
      .style('align-items', "center")
      .style('height', "100vh")
      .style('width', "80vw")
      .style('overflow', "hidden")
      .style('border', "1px solid #F009")

   var mainMap = centerCadre.append("div")
      .attr('id', "mainMap")

/*
   var mainMenuRight = body.append("div")
      .attr('id', "mainMenuRight")
      .style('display', "inline-flex")
      .style('justify-content', "start")
      .style('flex-direction', "column")
      .style('align-items', "stretch")
      .style('height', "100vh")
      .style('width', "20vw")
      .style('overflow', "scroll")
      .style('border', "1px solid #F009")
*/

    var divLoggin = d3.select('#mainConnection')
    centerHead.node().appendChild(divLoggin.node())

    divLoggin
      .style('display', "inline-flex")
      .style('align-items', "center")
      .style('color', "#FFF")
      .style('text-align', "center")
      .style('font-size', "1.2em")
      .style('font-weight', "bold")
      .style('text-shadow', "2px 2px #999")
      .style('padding-left', "1vw")

    centerHead.append('div')
      .style('display', "inline-flex")
      .style('align-items', "center")
      .style('color', "#FFF")
      .style('text-align', "center")
      .style('font-size', "1.2em")
      .style('font-weight', "bold")
      .style('text-shadow', "2px 2px #999")
      .style('padding', "1vw")
      .text('XFLR6_87SD')

  },


 loadWord: function() {
    console.log("== Load World ==")
    this.initWord();
    this.initInterfaceMap();
    this.initInterfaceMenu();
    this.initBuilding();
    // this.loop(this, 0);
  },


  initWord: function () {
    console.log('== Init World ==');
    console.log(GAME_ITEMS)
    // console.log(this.myGApi.biomeMatrix)
    // this.world = new World( this.myGApi );
    this.world = new World();

  },


  initInterfaceMap: function() {

    console.log('== Init Interface ==');

    var mainDiv = d3.select('#mainMap');
    var interfaceMap = new InterfaceMap(
      mainDiv,
      this.world,
    );
    interfaceMap.init();

    // -----------------------------------
    //  Body Keybord . 
    // -----------------------------------

    var keyPressed = {};
    d3.select('body')  
      .on('keypress', function() {
        interfaceMap.keyControle(d3.event.key);
      })
      .on('keydown', function() {
        keyPressed[d3.event.key] = true;
      })
      .on('keyup', function() {
        keyPressed[d3.event.key] = false;
      });

    // add pressed key loop. 
    var keyControle = function() {
      interfaceMap.keyLoopControle(keyPressed);
    };
    d3.timer(keyControle);  

  },

  initInterfaceMenu: function() {

    var divMenuHead = d3.select('#mainMenuHead');
    var divMenuRight = d3.select('#mainMenuRight');
    var interfaceMenu = new InterfaceMenu(
      divMenuHead,
      divMenuRight,
      this.world,
    );

  },

  initBuilding: function() {

    var factoryCity = new FactoryCity(this.world);

    factoryCity.addCity("Home", 74 , -95)
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    sleep(2000).then(() => {
      this.world.interfaceMap.clearBuilding();
      this.world.interfaceMap.drawAllBuilding();
      this.world.interfaceMenu.onClickTile(70,-100);
      this.world.interfaceMap.moveTo(74,-95);
      // this.world.interfaceMenu.refrechBuildings();
    });

  },



}


new Main();
  

});