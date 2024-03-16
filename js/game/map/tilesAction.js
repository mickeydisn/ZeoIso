import { TilesMatrix } from "./tilesMatrix.js";

export class TilesAction {
	constructor(world) {
		this.world = world;
		this.fm = this.world.factoryMap;
		this.init();
	}

	init() {
		this.index = {
			lvl: this.addLvl.bind(this),
			addSquareLvl: this.addSquareLvl.bind(this),
			flateSquareLvl: this.flateSquareLvl.bind(this),
			colorSquare: this.colorSquare.bind(this),
		}
	}
	//--------------------

	itemForceKey(x, y, itemskey) {
		const tile = this.fm.getTile(x, y);
		tile.items.splice(0, tile.items.length)
		tile.items.push({t: 'Svg', key: itemskey, lvl:0})
	}

	// -------------------

	addLvl(x, y, lvl) {
		const tile = this.fm.getTile(x, y);
		tile.lvl += lvl;
	}

	addSquareLvl(x, y, size, lvl) {
		const box = new TilesMatrix(this.world, size, x, y);
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				cellTile.lvl += lvl
			})
		})
	}

	flateSquareLvl(x, y, size) {
		const tile = this.fm.getTile(x, y);
		const box = new TilesMatrix(this.world, size, x, y);
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				cellTile.lvl = tile.lvl
			})
		})

	}

	colorSquare(x, y, size, c) {
		const color = new Uint8Array(c);
		const box = new TilesMatrix(this.world, size, x, y);
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				cellTile.color = color
			})
		})

	}

}
