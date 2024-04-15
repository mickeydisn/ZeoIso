export const TILE_GEN_ZOOM = 2



export class RawTile {

	constructor(world, x, y) {
		this.world = world;
		this.x = x; 
		this.y = y;

		const ftrg = this.world.factoryTileRawGenerator;
		Object.assign(this, ftrg.getRawTile(x, y, TILE_GEN_ZOOM));
		Object.assign(this, ftrg.getFuncTile(x, y, TILE_GEN_ZOOM));
	}

}


export class GenTile extends RawTile {
	constructor(world, x, y) {
		super(world, x, y);
		const frg = this.world.factoryTileGenerator;
		Object.assign(this, frg.getGenTile(this))
	}
}


export class Tile extends GenTile {
	constructor(world, x, y) {
		super(world, x, y);

		this._lvl = 0;
		this._waterLvl = 0;

		this._color = [0, 0, 0, 1]
		this.items = []

		this.buildTile = null;
		this.temporatyItems = []

		this.lvlGen();
		this.colorGen();
		this.itemsGen();
	}

	get isBlock() {
		return (
			this.buildTile != null && 
			this.buildTile.conf != null &&
			!this.buildTile.conf.allowMove 
			) // || ( this.items.length > 0 )
	}

	get isFrise() {
		return false || 
			this.buildTile != null ||
			this.isWater
	}

	get waterLvl() {
		if (this.isWater) {
			return this._waterLvl
		}
		return this._lvl
	}
	set waterLvl(lvl) {
		this._waterLvl = lvl
	}

	get lvl () { 
		return this._lvl
	}

	set lvl(lvl) {
		if (this.isFrise) return ;
		if (this.isWater && lvl > this._waterLvl) {
			return;
		}
		this._lvl = lvl // - lvl % .25
	}

	set color(color) {
		if (this.isFrise) return ;
		this._color = color
	}

	get color() {
		return this._color
	}

	updateColor([r, g, b, a]) {
		if (this.buildTile != null || this.isWater) return ;
        this.color = new Uint8Array([r, g, b, a]);
    }


	clearItem() {
		if (this.isFrise) return 
		this.items.splice(0, this.items.length);
	}
	clearTemporatyItem() {
		this.temporatyItems.splice(0, this.temporatyItems.length);
	}


	lvlGen() {
		this._lvl = this.gen2Lvl
		this._waterLvl = this.gen2Lvl
		if (this._lvl != this._waterLvl) {
			this.isWater = true;
		}
	}

	colorGen() {
		this._color = this.genColor
	}

	itemsGen() {
		this.items = this.genItems
		// this.items.push({t: 'Pyramid', lvl:0})
	}


	toJson() {
		return {
			x: this.x,
			y: this.y,
			biome: this.rawBiome,
			FLvl: this.flvl,
			lvl: this._lvl,
			// waterLvl: this._waterLvl,
			color : [...this.color],
			items: this.items,

			genColor: this.genColor,

		}
	}

}
/*
export class Tile2 {
	constructor(world, x, y) {
		this.world = world;
		this.fg = this.world.factoryGenerator;

		this.x = x; 
		this.y = y;
        this.buildTile = null;

		this._lvl = 0;
		this._waterLvl = 0;
		this.color = [0, 0, 0, 1]
		this.items = []
		this.temporatyItems = []
		this.lvlGen();
		this.colorGen();
		this.ItemsGen();

	}

	get isBlock() {
		return (
			this.buildTile != null && 
			this.buildTile.conf != null &&
			!this.buildTile.conf.allowMove 
			) // || ( this.items.length > 0 )
	}

	get isFrise() {
		return false || 
			this.buildTile != null ||
			this.isWater
	}

	get waterLvl() {
		if (this.isWater) {
			return this._waterLvl
		}
		return this._lvl
	}
	set waterLvl(lvl) {
		this._waterLvl = lvl
	}

	get lvl () { 
		return this._lvl
	}

	set lvl(lvl) {
		if (this.isFrise) return ;
		if (this.isWater && lvl > this._waterLvl) {
			return;
		}
		this._lvl = lvl 
	}

	set color(color) {
		if (this.isFrise) return ;
		this._color = color
	}

	get color() {
		return this._color
	}
	
	updateColor([r, g, b, a]) {
		if (this.buildTile != null || this.isWater) return ;
        this.color = new Uint8Array([r, g, b, a]);
    }
	
	
	lvlGen() {
		const [lvl, waterLvl] = this.fg.getLvlGen(this.x, this.y, TILE_GEN_ZOOM)
		this._lvl = lvl
		this._waterLvl = waterLvl
		if (lvl != waterLvl) {
			this.isWater = true;
		}
	}

	colorGen() {
		this._color = this.fg.getLvlColor(this.x, this.y, TILE_GEN_ZOOM)
	}

	ItemsGen() {
		this.items = []
		const itemskey = this.fg.getItem(this.x, this.y, TILE_GEN_ZOOM)
		if (itemskey) {
			this.items.push({t: 'Svg', key: itemskey, lvl:0})
		}

		// this.items.push({t: 'Pyramid', lvl:0})
	}

	clearItem() {
		if (this.isFrise) return 
		this.items.splice(0, this.items.length);
	}
	clearTemporatyItem() {
		this.temporatyItems.splice(0, this.temporatyItems.length);
	}


    getLog() {
        console.log(`   ==================== `);
        console.log(`   | TILE: [${this.x} / ${this.y}]`)
        if (this.buildTile ) {
			console.log("   |  Building Name: ", this.buildTile.conf ? this.buildTile.conf.name : 'notConf')
            console.log("   |  mustBeFill: ", JSON.stringify(this.buildTile.mustBeFill))
            console.log("   |  conf-near: ", this.buildTile.conf ? JSON.stringify(this.buildTile.conf.near) : 'null')
            
        }

        if (this.buildTile ) {
            console.log('   |  filterTileList: ', this.buildTile.filterNearTilesOption(this.buildTile.building.conf.BUILD_TILE_LIST))
            const optionList = this.buildTile.filterNearTilesOptionAdvance(this.buildTile.building.conf.BUILD_TILE_LIST)
			console.log('   |  filterTileList: ', )
			optionList.forEach(o => {
				console.log('   |    - ', o.near.map(x => x.is))
			});

        }
        // console.log("   |  mustBeFill: ", this.buildTile.mustBeFill)
        // console.log("   |  mustBeFill: ", this.buildTile.mustBeFill)
        // console.log("   |  near.mustBeFill ", JSON.stringify(this.buildTile.getNearBuildMustBeFill()))
        console.log(`   ==================== `)
    }


	toJson() {
		return {
			x: this.x,
			y: this.y,
			biome: this.biome,
			lvl: this._lvl,
			// waterLvl: this._waterLvl,
			color : [...this.color],
			items: this.items,
		}
	}

}
*/