import {GAME_BIOMES} from './data/biomes.js'
import { GAME_FLORE_ITEMS } from './data/items.js';


export class FactoryBiomes {
	constructor(world) {
		this.world = world;
		this.biomes = {};
		this.init();
	}

	init() {
		GAME_BIOMES.forEach(biomeConf => {
			this.setBiomes(biomeConf)
		});
		GAME_FLORE_ITEMS.forEach(floreItemsConf => {
			this.addFloreCondition(floreItemsConf)
		})
	}

	setBiomes(biomeConf) {
		if (!(biomeConf.name in this.biomes)) {
			this.biomes[biomeConf.id] = new Biome(biomeConf);
		}
	}

	addFloreCondition(floreItemsConf) {
		const f = floreItemsConf
		const func = `((flore * 1024 | 0) % ${f.flore.mod} == ${f.flore.eq} && flore >= ${f.flore.min} && flore < ${f.flore.max} && lvl >= ${f.l.min} && lvl < ${f.l.max}) ? '${f.key}' `

		floreItemsConf.b.forEach(bid => {
			this.biomes[bid].appendFloreCondition(func);			
		})
	}
/*
    addFloreConditionFromRow(row) {
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
    }
*/
}


export class Biome {
	constructor(biomeConf) {
		this.name = biomeConf.name;
		this.id = biomeConf.id;
		this.rgb = biomeConf.rgb
		this.initColor();
		this.floreCondition = ["null"];
		this.initFlore();
	}

	initColor (){
	    this.color = eval('(lvl, flore) => [' + this.rgb.join(',') +', 255]');
	}

	initFlore (){
	    this.flore = eval('(lvl, flore) => ' + this.floreCondition.join(':') );
	}

	appendFloreCondition (condition) {
		this.floreCondition.unshift(condition);
		this.initFlore();
	}

}