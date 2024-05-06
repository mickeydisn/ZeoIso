import { CITY_DEFAULT_PARAM } from "./config/defaultCity.js";


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


    defaultCityParam : CITY_DEFAULT_PARAM,

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
  
  
  