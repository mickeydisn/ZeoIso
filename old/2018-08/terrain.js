
function Terrain(detail, zoom=1) {
  this.zoom = zoom;

  this.waterLvl = 0.25;

  this.size = Math.pow(2, detail) + 1;

  this.width = this.size * this.zoom;
  this.height = this.size * this.zoom;

  this.max = this.size - 1;
  this.map = new Float32Array(this.size * this.size);
  this.mapLvl = new Float32Array(this.size * this.size);
  this.creatures = [];


  this.ctxBack = 0;
  this.ctxCreature = 0;
}


Terrain.prototype = {


  // -----------------------


  applyTime : function(day) {

    var moonDay = 45;
    var YearDay = 180;

    // var moon = Math.sin( (day % moonDay) / moonDay * Math.PI);
    // var fYear =  Math.cos( (day % YearDay) / YearDay * Math.PI) * 2;

    var moon = 0.5;
    var fYear = 0.5;

    d3.select('#moon').text(moon.toFixed(2));
    d3.select('#saison').text(fYear.toFixed(2));


    this.waterLvl = 0.10 + 0.3 * moon;

    for (var i = 0; i < this.size * this.size; i++) {
      var lvl = this.mapLvl[i];
      var food = this.map[i];

      // console.log(lvl);

      if (lvl < this.waterLvl) {
        food = 0;
      } else {
        var fLvl = (1 - lvl) - 0.2 ; // lvl < 0.5 ? -1 : 1   ; // 1 ; // * (1 - lvl);

        food = food + 0.01 * fYear;

        food = food + 0.01 * fLvl;
        food = food > (1 - lvl) ? (1 - lvl) : food;
        food = food < 0 ? 0 : food;


      }

      this.map[i] = food;
    }

  },

  // -----------------------

  loop : function(ctx, day) {

    d3.select('#day').text(day);

    this.applyTime(day);
    this.draw(ctx);
    var t = this;
    if (d3.selectAll('#isrun').node().checked) {
      setTimeout(function () { t.loop(ctx, day + 1); }, 1000 * 0.05);
    } 

  },



  // -----------------------


  initCreature : function (n) {

  	for (var i = 0; i < n; i++)
  	{
  		var x = Math.random() * this.size * 4;
  		var y = Math.random() * this.size * 4;

  		this.creatures[i] = new Creature(this, x, y);
  		this.creatures[i].velocity.random();
  	}

  },

  forEachCreature: function(creature) {

        var x = ~~(creature.location.x / 4) ;
        var y = ~~(creature.location.y / 4) ;

        var input = [
            this.get(x, y),
            this.get(x+1, y),
            this.get(x, y+1),
            this.get(x-1, y),
            this.get(x, y-1)
            ];

        /*
        ,
            this.getLvl(x, y),
            this.getLvl(x+1, y),
            this.getLvl(x, y+1),
            this.getLvl(x-1, y),
            this.getLvl(x, y-1)
        */

        var output = creature.network.activate(input);
        // console.log(input);
        creature.output = output;

        ok = creature.moveTo(output);
        creature.update();

        /*
        // learn
        var target = creature.outTarget(input);
        var learningRate = .3;
        creature.network.propagate(learningRate, target);
        */
    
        creature.draw();

  },


  restoreCtx : function() {

    this.ctxCreature.save();
    this.ctxCreature.globalAlpha = 0.2;
    this.ctxCreature.globalCompositeOperation='destination-out';
    this.ctxCreature.fillStyle= '#FFF';
    this.ctxCreature.fillRect(0,0,this.size * 4, this.size * 4);
    this.ctxCreature.restore();

  },


  cycleCreature : function (cycle, generation){
    var t = this;

    this.creatures.sort(function(a, b) {
        var x = a.life; var y = b.life;
        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    });

    totalLife = 0;
    this.creatures.forEach(function(creature) {
      totalLife += creature.life;
    });

    d3.select('#maxlife').text( 
      totalLife.toFixed(1) + '   ' + 
      this.creatures[0].life.toFixed(1) + '   ' +
      generation + "\n" +
      d3.select('#maxlife').text()
      );

    this.creatures = this.creatures.slice(0, this.creatures.length / 2)

    newCreatures = []
    this.creatures.forEach(function(creature) {
      creature.life = 0;

      newCreature = new Creature(this, 0, 0);
      newCreature.clone(creature);
      newCreature.mutation(50, 0.5);
      newCreatures.push(creature);
      newCreatures.push(newCreature);
    });

    this.creatures = newCreatures

  },    

  drawInfoCreature : function (cycle){
  
    this.creatures.sort(function(a, b) {
        var x = a.life; var y = b.life;
        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    });

    var data = [];
    this.creatures.forEach(function(creature) {
        s = "";
        s += creature.life.toFixed(1);
        s += "    -> " + creature.output.map(x => x.toFixed(3));
        s +=  `   [ ${creature.location.x.toFixed(0)} , ${creature.location.y.toFixed(0)} ]  ` ;
        s +=  `   [ ${creature.velocity.x.toFixed(3)} , ${creature.velocity.y.toFixed(3)} ]  ` ;
        data.push(s);
    });

    mainBox = d3.select('#creatures');
    mainBox.selectAll('div').remove();
    mainBox.selectAll('div')
      .data(data)
      .enter()
      .append('div').text(d => d);


  },

  updateCreature : function (cycle, generation) {

    d3.select('#cycle').text(cycle);

    this.restoreCtx();

    if (cycle != 0 && cycle % 600 == 0) {
      cycle = -1
      d3.select('#generation').text(generation);
      this.cycleCreature(cycle, generation++);
    }

    if (cycle != 0 && cycle % 50 == 0) {
      this.drawInfoCreature(cycle);
    }
    var t = this;
    this.creatures.forEach(function(creature) {
        t.forEachCreature(creature);
    });

    if (d3.selectAll('#isrun').node().checked) {
      setTimeout(function () { t.updateCreature(cycle+1, generation); }, 1000 * 0.01);
    }
  },


}

