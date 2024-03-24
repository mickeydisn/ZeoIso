
function World() {

  this.size = Math.pow(2, 10);
  this.width = this.size;
  this.height = this.size;

  // this.myGApi = myGApi;
  // this.items = myGApi.items;
  // this.biomes = myGApi.biomesFactory;
  // this.biomeSelectMatrix = myGApi.biomeMatrix;

  this.items = GAME_ITEMS;
  this.biomes = new BiomesFactory();
  this.biomes.biomes =  GAME_BIOMES
  this.biomeSelectMatrix = GAME_BIOMES_MATRIS;

  // this.biome = GAME_BIOMES;
  // this.floresItems = GAME_ITEMS_FLORE;

  this.zoom = 1;
  this.grain = 16;
  this.seed = "mickey";
  this.init();
}


World.prototype = {

  interfaceMenu: null,
  interfaceMap: null,

  factoryGenerator: null,
  factoryUser : null,
  factoryBuilding : null,

  zoom : 1,
  grain : 2,

  size : 1,
  width : 0,
  height : 0,

  simplex: null,
  waterLvl : 64,
  creatures : [],

  init : function() {
    this.simplex = new SimplexNoise(this.seed);
    this.factoryGenerator = new FactoryGenerator(this);
  },

  appliedGrain : function (v) {
    this.grain *= v;
    if (this.grain <= 1) this.grain = 1;
  },
  appliedZoom : function (v) {
      this.zoom *= v;
  },

  appliedZoomLvl : function (n) {
      this.zoom = n;
  },
  appliedGrainLvl : function (n) {
      this.grain = n;
  },

  getColor : function(x, y, zoom=1, grain=1) {
    return this.factoryGenerator.getColor(x, y, zoom, grain);
  },

  getCellInfo: function (cx, cy) {
    var info = this.factoryGenerator.getCellInfo(cx, cy);

    var cityCenterItem = null;
    this.factoryCity.openList.forEach(e => {
      if (e.x == cx && e.y == cy) {
        cityCenterItem = e
      }
    })
    info['cityCenterItem'] = cityCenterItem; // ? buildingItem.getInfo() : null;

    return info;
  },

  /* ----------------------------------- */


}
/*

  Quand tu te met a rêver, Eris t'appelle... Elle veux que tu deviennent le croccolide 
  qui dévore cette zone de confort qui  pouri ta volonter. Quand tu es éveilé l'absence 
  de présciences t'angoisse, mais dans ton rêve ta volontée s'exprime qu'importe le future. 
  Au réveil, souvient toi de l'appelle de la déese, et vas de l'avant ! q

*/