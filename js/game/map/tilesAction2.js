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
			lvlAvgBorder: this.lvlAvgBorder.bind(this),

			colorSquare: this.colorSquare.bind(this),

			addBoxMD : this.addBoxMD.bind(this),
		}
	}
	//--------------------

	doAction(conf) {
		this.index[conf.func](conf)
	}

	itemForceKey(conf) {
		if (!conf.assetKey) return;
		const tile = this.fm.getTile(conf.x, conf.y);
		tile.items.splice(0, tile.items.length)
		tile.items.push({t: 'Asset', key: conf.assetKey, lvl:0})
	}

	clearItem(conf) {
		const tile = this.fm.getTile(conf.x, conf.y);
		tile.items.splice(0, tile.items.length);
	}

	clearItemSquare(conf) {
		conf.size = conf.size ? conf.size : 1		
		const box = new TilesMatrix(this.world, conf.size, conf.x, conf.y);
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				cellTile.items.splice(0, cellTile.items.length)
			})
		})
	}

	// -------------------

	lvlSet(conf) {
		const tile = this.fm.getTile(conf.x, conf.y);
		tile.lvl = conf.lvl;
	}

	lvlUp(conf) {
		const tile = this.fm.getTile(conf.x, conf.y);
		tile.lvl += conf.lvl;
	}

	lvlUpSquare(conf) {
		const box = new TilesMatrix(this.world, conf.size, conf.x, conf.y);
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				cellTile.lvl += conf.lvl
			})
		})
	}

	lvlFlatSquare(conf) {
		const tile = this.fm.getTile(conf.x, conf.y);
		const box = new TilesMatrix(this.world, conf.size, conf.x, conf.y);
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				cellTile.lvl = tile.lvl
			})
		})
	}

	lvlAvg(conf) {
		const tile = this.fm.getTile(conf.x, conf.y);
		const box = new TilesMatrix(this.world, conf.size, conf.x, conf.y);
		let sumLvl = 0;
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				sumLvl += cellTile.lvl
			})
		})
		const avgLvl = sumLvl / (conf.size * conf.size)
		tile.lvl = avgLvl
	}

	lvlAvgSquare(conf) {
		const box = new TilesMatrix(this.world, conf.size, conf.x, conf.y);
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				this.lvlAvg({x:cellTile.x, y:cellTile.y, size:3})
			})
		})
	}

	lvlAvgBorder(conf) {
		const x = conf.x
		const y = conf.y
		const fCenter = Math.floor(conf.size / 2)
		const rangeX = Array.from({ length: conf.size }, (_, index) => index - fCenter + x );
		const rangeY = Array.from({ length: conf.size }, (_, index) => index - fCenter + y );

		rangeX.forEach(xx => {
			this.lvlAvg({x:xx, y:y - fCenter, size:3});
			this.lvlAvg({x:xx, y:y + (conf.size - fCenter), size:3});
		})
		rangeY.forEach(yy => {
			this.lvlAvg({x:x - fCenter, y:yy, size:3});
			this.lvlAvg({x:x + (conf.size - fCenter), y:yy, size:3});
		})

	}


	color(conf) {
		const c = [...conf.color]
		// add alpha is not exist 
		if (c.length == 3) c.push(255);

		const color = new Uint8Array(c);
		const tile = this.fm.getTile(conf.x, conf.y);

		tile.color = color
	}


	colorSquare(conf) {
		const c = [...conf.color]
		// add alpha is not exist 
		if (c.length == 3) c.push(255);

		const color = new Uint8Array(c);
		const box = new TilesMatrix(this.world, conf.size, conf.x, conf.y);
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				cellTile.color = color
			})
		})

	}

	addBoxMD(conf) {
		const tile = this.fm.getTile(conf.x, conf.y);
		tile.items.push({t:'Box', conf})
	}


}
