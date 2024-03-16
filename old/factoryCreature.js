
function FactoryCreature(world) {
  this.world = world;
  this.world.factoryCreature = this;

  this.init();
}


FactoryCreature.prototype = {

  openList: null,

  creatureModels : {
    dot : {
      imageData : null,

    },
  },

  init : function (){
    console.log( 'Init Creature ')
    this.openList = [];

    var image = new Image();
    image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=';
    this.creatureModels.dot.imageData = image;

  },


  addCreature : function (name, x, y, imageData=null) {
    console.log('Add Creature ')
    var b = this.creatureModels[name];
    if (b == null || b == undefined ) return;
    var build = {
      name: name,
      x: cx,
      y: cy,
      imageData : (imageData != null) ? imageData : b.imageData,
    }
    this.openList.push(build);
  },


  initCreatures: function() {

    var creature = new Creature(50, 50, this.world);
    creature.imageData = this.creatureModels.dot.imageData;
    this.openList.push(creature);

    // creature.pathNext(new Node(this.zwidth/2 - 100, this.zheight/2));
    
    // this.openList = [];
    // for (var i = 0; i < 1000; i += 1) {
    //   var x = Math.floor(Math.random() * this.zwidth);
    //   var y = Math.floor(Math.random() * this.zheight);
    //   var creature = new Creature(x, y, this.world);
    //   creature.pathNext(new Node(this.zwidth/2 - 100, this.zheight/2));
    //   this.openList.push(creature);
    // }
  },

  loopCreatures: function() {

    this.creature.tick();

    // for (var i = 0; i < this.openList.length; i += 1) {
    //   this.openList[i].tick();
    // }
  },


}