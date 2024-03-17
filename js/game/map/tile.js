export const TILE_GEN_ZOOM = 2

export class Tile {
	constructor(world, x, y) {
		this.world = world;
		this.fg = this.world.factoryGenerator;

		this.x = x; 
		this.y = y;
        this.buildTile = null;

		this._lvl = 0;
		this.color = [0, 0, 0, 1]
		this.items = []
		this.lvlGen();
		this.colorGen();
		this.updateItems();

	}

	get isBlock() {
		return this.buildTile != null
	}

	get lvl () { return this._lvl}
	set lvl(lvl) {
		if (this.buildTile == null) {
			this._lvl = lvl
		}
	}

	lvlGen() {
		this._lvl = this.fg.getLvlGen(this.x, this.y, TILE_GEN_ZOOM)
		/*
		let rawLvl = this.fg.getRawLvl() * 256
		// Creta a gap on the water lvl
		if (rawLvl < this.fg.waterLvl) {
			rawLvl -= 1
		}
		// Ajuste Lvl to be more natural ( less liear )
		if (rawLvl < 80) {
			this._lvl =  0.0008 * Math.pow(rawLvl - 80, 3) + 70 // 0.001 => Deep Sea, 0.0001 => Flat Sea
		} else {
			this._lvl = 0.03 * Math.pow(rawLvl - 80, 2) + 70 // 0.01 => Flat Montagne , 0.05 => Hight montagne
		}
		  	*/
	}

	colorGen() {
		this.color = this.fg.getLvlColor(this.x, this.y, TILE_GEN_ZOOM)
	}
    updateColor([r, g, b, a]) {
        this.color = new Uint8Array([r, g, b, a]);
    }

	updateItems() {
		this.items = []
		const itemskey = this.fg.getItem(this.x, this.y, TILE_GEN_ZOOM)
		if (itemskey) {
			this.items.push({t: 'Svg', key: itemskey, lvl:0})
		}

		// this.items.push({t: 'Pyramid', lvl:0})
	}

    getLog() {
        console.log(`   ==================== `);
        console.log(`   | TILE: [${this.x} / ${this.y}]`)
        if (this.buildTile ) {
            console.log("   |  mustBeFill: ", JSON.stringify(this.buildTile.mustBeFill))
            console.log("   |  conf-near: ", this.buildTile.conf ? JSON.stringify(this.buildTile.conf.near) : 'null')
            
        }
        if (this.buildTile ) {
            console.log('   |  filterTileList: ', this.buildTile.filterNearTilesOption(this.buildTile.building.conf.BUILD_TILE_LIST))
            
            console.log('   |  filterTileList: ', this.buildTile.filterNearTilesOptionAdvance(this.buildTile.building.conf.BUILD_TILE_LIST))
        }
        // console.log("   |  mustBeFill: ", this.buildTile.mustBeFill)
        // console.log("   |  mustBeFill: ", this.buildTile.mustBeFill)
        // console.log("   |  near.mustBeFill ", JSON.stringify(this.buildTile.getNearBuildMustBeFill()))
        console.log(`   ==================== `)
    }

}
