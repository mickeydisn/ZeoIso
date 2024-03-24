

function MyGoogleApi() {

  this.init();
}


MyGoogleApi.prototype = {

	worldSSheetId: "1EVQq0I8ShQAUE0a4WZJFUpqtOlZoRSl6EpAXlp0F6yQ",

  biomesFactory : null,
  biomeMatrix : null,
	items : {},
  floresItems : {},

  init: function() {
    this.biomesFactory = new BiomesFactory();
  },


  loadWorld: function(callback) {
    this.biomeMatrix = GAME_BIOMES_MATRIS;
    this.biome = GAME_BIOMES;
    this.items = GAME_ITEMS;
    this.floresItems = GAME_ITEMS_FLORE;

    this.biomesFactory.biome = this.biome;
    /*
    for (var i = 0; i < biomeTable.length; i++) {
      var row = biomeTable[i];
      this.biomesFactory.setFromRow(row);
    }

    for (var i = 0; i < floresItemsTable.length; i++) {
      this.biomesFactory.addFloreConditionFromRow(floresItemsTable[i]);
    }
    */

  },


}


   
      /**
       * Print the names and majors of students in a sample spreadsheet:
       * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
       *
     
      */
