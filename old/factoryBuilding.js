
function FactoryBuilding(world) {
  this.world = world;
  this.world.factoryBuilding = this;

  this.init();
}


FactoryBuilding.prototype = {

  openList: null,

  buildingModels : {
    home : {
      imageData : null,

    },
    depot : {
      imageData : null,

    },
    working : {
      imageData : null,

    },
  },

  init : function (){
    console.log( 'Init Factory Building')
    this.openList = [];

    var image = new Image();
    image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZUlEQVQ4T72TWwoAIAgE9f6HLgqE1azs6VegO+laTIfBA30iIsnjWUkQUIpsIMDNPQP0RsMua43XwciXohGIAjTkibmS5qXbPOg1wJURlDkBD7pbsNtBVmiNKPj7Eu3Yy59p62NnPXMaEaWb09sAAAAASUVORK5CYII=';
    this.buildingModels.home.imageData = image;

    var image = new Image();
    image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZUlEQVQ4T72TWwoAIAgE9f6HLgqE1azs6VegO+laTIfBA30iIsnjWUkQUIpsIMDNPQP0RsMua43XwciXohGIAjTkibmS5qXbPOg1wJURlDkBD7pbsNtBVmiNKPj7Eu3Yy59p62NnPXMaEaWb09sAAAAASUVORK5CYII=';
    this.buildingModels.depot.imageData = image;
    
    var image = new Image();
    image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZUlEQVQ4T72TWwoAIAgE9f6HLgqE1azs6VegO+laTIfBA30iIsnjWUkQUIpsIMDNPQP0RsMua43XwciXohGIAjTkibmS5qXbPOg1wJURlDkBD7pbsNtBVmiNKPj7Eu3Yy59p62NnPXMaEaWb09sAAAAASUVORK5CYII=';
    this.buildingModels.working.imageData = image;
  },


  addBuilding : function (name, cx, cy, imageData=null) {
    console.log('Add Building ')
    var b = this.buildingModels[name];
    if (b == null || b == undefined ) return;
    var infocell = this.world.getCellInfo(cx, cy);
    var build = {
      name: name,
      x: cx,
      y: cy,
      infocell: infocell,
      imageData : (imageData != null) ? imageData : b.imageData,
    }
    this.openList.push(build);
  },

}



/*





*/