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

	get lvl () { return this._lvl}
	set lvl(lvl) {
		if (this.buildTile == null) {
			this._lvl = lvl
		}
	}

	lvlGen() {
		const rawLvl = this.fg.getRawLvl(this.x, this.y, TILE_GEN_ZOOM) * 256
		// Ajuste Lvl to be more natural ( less liear )
		if (rawLvl < 70) {
			this._lvl =  0.005 * Math.pow(rawLvl - 70, 3) + 70
		} else {
			this._lvl = 0.01 * Math.pow(rawLvl - 70, 2) + 70
		}
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