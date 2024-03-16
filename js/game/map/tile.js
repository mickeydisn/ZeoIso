export const TILE_GEN_ZOOM = 2

export class Tile {
	constructor(world, x, y) {
		this.world = world;
		this.fg = this.world.factoryGenerator;

		this.x = x; 
		this.y = y;
        this.buildTile = null;

		this.updateLvl();
		this.genColor();
		this.updateItems();

	}

	updateLvl() {
		const lvl = this.fg.getRawLvl(this.x, this.y, TILE_GEN_ZOOM) * 256
		// Ajuste Lvl to be more natural ( less liear )
		if (lvl < 70) {
			this.lvl =  0.005 * Math.pow(lvl-70, 3) + 70
		} else {
			this.lvl = 0.01 * Math.pow(lvl-70, 2) + 70
		}
	}

	genColor() {
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
