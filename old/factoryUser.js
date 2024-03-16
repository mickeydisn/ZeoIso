
function FactoryUser(world) {
  this.world = world;
  this.world.factoryUser = this;
  this.init();
}


FactoryUser.prototype = {

  solde: 0,
  
  init : function (){
    console.log( 'Init Factory  User')

    this.solde = 42 * 1000 ;

  },


}



/*





*/