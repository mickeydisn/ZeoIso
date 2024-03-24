

function FactoryCity(world) {
    this.world = world;
    this.world.factoryCity = this;
    this.itemCounter = 0;
    this.init();
  }
  
  
FactoryCity.prototype = {

    openList: null,
    selectX: null,
    selectY: null,


    defaultCityParam : {
        mainRoad : {
            count : 70,
            color : "#000000",
            length: 32,
            size : 5,

            alphaStep : 32,
            powerIter : 20,
            powerCost : 1,

            lvlDeviationCount: 4,
            lvlDefviationAlpha: 2,        
        },
        crossingRoad : {
            color : "#000000",
            length: 32,
            size : 6,

            alphaStep : 4,
            powerCondition :20,
            powerIter : 10,
            powerCost : -4,

            lvlDeviationCount: 2,
            lvlDefviationAlpha: 2,        
        },
        subRoad : {
            count : 140,
            color : "#000000",
            length: 32,
            size : 2,
            alphaStep : 4,
            powerCondition : 5,
            powerCost : 1,
            powerIter : 1,
            lvlDeviationCount: 2,
            lvlDefviationAlpha: 2,        
        },
        connectRoad : {
            count : 200,
            color : "#000000",
            length: 32,
            size : 1,

            alphaStep : 4,
            // betaSetp : [...Array(16).keys()].map(x => 360 / 16 * x),
            // powerCondition : 5,
            powerCost : 1,
            powerIter : 1,
            lvlDeviationCount: 0,
            lvlDefviationAlpha: 0,        
        },
    },

    init : function (){
        console.log( 'Init Factory City')
        this.openList = [];

    },

    setSelectPosition: function (x, y) {
        this.selectX = x;
        this.selectY = y;
    },

    addCity : function (name, cx, cy) {
        //console.log('Add Building ')
        var build = new City(this.world, this.itemCounter, name, cx, cy, this.defaultCityParam);
        this.itemCounter += 1;
        this.openList.push(build);
    },

    removeCity: function (id) {
        this.openList = this.openList.filter(city => {return city.id != id});
    },

    refreshContext: function (){
        this.world.interfaceMap.drawAllBuilding();
        this.world.interfaceMenu.onClickTile(this.selectX, this.selectY);
        this.world.interfaceMenu.refrechBuildings();
    },


}
  
  
  