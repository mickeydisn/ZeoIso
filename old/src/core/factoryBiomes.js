


function BiomesFactory () {
	this.biomes = {}
}

BiomesFactory.prototype = {

	biomes : {},

	setBiomes : function (name, tire, colorCondition) {
		if (!(name in this.biomes)) {
			this.biomes[name] = new Biome(name, tire);
		}
		this.biomes[name].initColor(colorCondition);
	},

	setFromRow: function (row) {
		var name = row[0];
		var color = '[' + row[2] + ', ' + row[3] + ', ' + row[4] +', 255]';
		var tire = row[5];
		this.setBiomes(name, tire, color)
	},

	addFloreCondition : function (name, floreCondition) {
		if (!(name in this.biomes)) {
			this.biomes[name] = new Biome(name, 0);
		}
		this.biomes[name].appendFloreCondition(floreCondition);
	},

    addFloreConditionFromRow : function (row) {
        var name = row[0];
        var biomes = row[1];
        var mod = row[2];
        var modValue = row[3];
        var min = row[4];
        var max = row[5];
        var minLvl = row[6];
        var maxLvl = row[7];
        // (flore % ${mod} == ${modValue} &&
        var f = `((flore * 1000 | 0) % ${mod} == ${modValue} && flore >= ${min} && flore < ${max} && lvl >= ${minLvl} && lvl < ${maxLvl}) ? '${name}' `
        biomes = biomes.replace(/ /g, '')
        biomes = biomes.split(',');
        for (var j = 0; j < biomes.length; j++) {
          this.addFloreCondition(biomes[j], f)
        }
    },

}

function Biome (name, tire) {

	this.init(name, tire);
	this.floreCondition = ["null"];
	this.initFlore();

}

Biome.prototype = {

	init : function (name, tire) {
		this.name = name;
		this.tire = tire;
		this.initColor('[lvl, lvl, lvl, 255]');
	},

	initColor: function (colorCondition){
	    this.color = eval('(lvl, flore) => ' + colorCondition );
	},

	initFlore: function (){
	    this.flore = eval('(lvl, flore) => ' + this.floreCondition.join(':') );
	},
	appendFloreCondition: function (condition) {
		this.floreCondition.unshift(condition);
		this.initFlore();
	},

}