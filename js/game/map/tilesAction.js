import { TilesMatrix } from "./tilesMatrix.js";

export class TilesAction {
	constructor(world) {
		this.world = world;
		this.fm = this.world.factoryMap;
		this.init();
	}

	init() {
		this.index = {
			lvlUp: this.lvlUp.bind(this),
			lvlUpSquare: this.lvlUpSquare.bind(this),
			lvlFlatSquare: this.lvlFlatSquare.bind(this),
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

	lvlSet(x, y, lvl) {
		const tile = this.fm.getTile(x, y);
		tile.lvl = lvl;
	}

	lvlUp(x, y, lvl) {
		const tile = this.fm.getTile(x, y);
		tile.lvl += lvl;
	}

	lvlUpSquare(x, y, size, lvl) {
		const box = new TilesMatrix(this.world, size, x, y);
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				cellTile.lvl += lvl
			})
		})
	}

	lvlFlatSquare(x, y, size) {
		const tile = this.fm.getTile(x, y);
		const box = new TilesMatrix(this.world, size, x, y);
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				cellTile.lvl = tile.lvl
			})
		})
	}

	lvlAvg(x, y, size) {
		const tile = this.fm.getTile(x, y);
		const box = new TilesMatrix(this.world, size, x, y);
		let sumLvl = 0;
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				sumLvl += cellTile.lvl
			})
		})
		const avgLvl = sumLvl / (size * size)
		tile.lvl = avgLvl
	}

	lvlAvgSquare(x, y, size) {
		const tile = this.fm.getTile(x, y);
		const box = new TilesMatrix(this.world, size, x, y);
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				this.lvlAvg(cellTile.x, cellTile.y, 3)
			})
		})
	}


	colorSquare(x, y, size, c) {
		// add alpha is not exist 
		if (c.length == 3) c.push(255);

		const color = new Uint8Array(c);
		const box = new TilesMatrix(this.world, size, x, y);
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				cellTile.color = color
			})
		})

	}

}
