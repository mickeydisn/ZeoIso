import { TilesMatrix } from "./tilesMatrix.js";

export class TilesAction2 {
	constructor(world) {
		this.world = world;
		this.fm = this.world.factoryMap;
		this.init();
	}

	init() {
		this.index = {
			itemForceKey: this.itemForceKey.bind(this),

			clearItem: this.clearItem.bind(this),
			clearItemSquare: this.clearItemSquare.bind(this),

			lvlUp: this.lvlUp.bind(this),
			lvlUpSquare: this.lvlUpSquare.bind(this),
			lvlFlatSquare: this.lvlFlatSquare.bind(this),
			lvlAvgSquare: this.lvlAvgSquare.bind(this),

			colorSquare: this.colorSquare.bind(this),
		}
	}
	//--------------------

	doAction(x, y, conf) {
		this.index[conf.func](x, y, conf)
	}

	itemForceKey(x, y, conf) {
		if (!conf.assetKey) return;
		const tile = this.fm.getTile(x, y);
		tile.items.splice(0, tile.items.length)
		tile.items.push({t: 'Asset', key: conf.assetKey, lvl:0})
	}

	clearItem(x, y) {
		const tile = this.fm.getTile(x, y);
		tile.items.splice(0, tile.items.length);
	}

	clearItemSquare(x, y, conf) {
		conf.size = conf.size ? conf.size : 1		
		const box = new TilesMatrix(this.world, conf.size, x, y);
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				cellTile.items.splice(0, cellTile.items.length)
			})
		})
	}

	// -------------------

	lvlSet(x, y, conf) {
		const tile = this.fm.getTile(x, y);
		tile.lvl = conf.lvl;
	}

	lvlUp(x, y, conf) {
		const tile = this.fm.getTile(x, y);
		tile.lvl += conf.lvl;
	}

	lvlUpSquare(x, y, conf) {
		const box = new TilesMatrix(this.world, conf.size, x, y);
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				cellTile.lvl += conf.lvl
			})
		})
	}

	lvlFlatSquare(x, y, conf) {
		const tile = this.fm.getTile(x, y);
		const box = new TilesMatrix(this.world, conf.size, x, y);
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				cellTile.lvl = tile.lvl
			})
		})
	}

	lvlAvg(x, y, conf) {
		const tile = this.fm.getTile(x, y);
		const box = new TilesMatrix(this.world, conf.size, x, y);
		let sumLvl = 0;
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				sumLvl += cellTile.lvl
			})
		})
		const avgLvl = sumLvl / (conf.size * conf.size)
		tile.lvl = avgLvl
	}

	lvlAvgSquare(x, y, conf) {
		const tile = this.fm.getTile(x, y);
		const box = new TilesMatrix(this.world, conf.size, x, y);
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				this.lvlAvg(cellTile.x, cellTile.y, {size:3})
			})
		})
	}


	color(x, y, conf) {
		const c = [...conf.color]
		// add alpha is not exist 
		if (c.length == 3) c.push(255);

		const color = new Uint8Array(c);
		const tile = this.fm.getTile(x, y);

		tile.color = color
	}


	colorSquare(x, y, conf) {
		const c = [...conf.color]
		// add alpha is not exist 
		if (c.length == 3) c.push(255);

		const color = new Uint8Array(c);
		const box = new TilesMatrix(this.world, conf.size, x, y);
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				cellTile.color = color
			})
		})

	}

	addBoxMD(x, y, conf) {
		const tile = this.fm.getTile(x, y);
		tile.items.push({t:'Box', conf})
	}


}
