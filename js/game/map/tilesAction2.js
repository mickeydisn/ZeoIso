import { BuildConf_Base } from "../building/buildConf_base.js";
import { BuildConf_Place } from "../building/buildConf_place.js";
import { FactoryBuilding } from "../building/building.js";
import { TilesMatrix, TilesMatrixSelected } from "./tilesMatrix.js";

export class TilesAction2 {
	constructor(world) {
		this.world = world;
		this.fm = this.world.factoryMap;

		// List to store pointer on Tiles containe temporaty display item (like for selection / preview .. )
		this.listTilesWithTempItems = []
		this.init();
	}

	init() {
		this.index = {
			itemForceKey: this.itemForceKey.bind(this),
			itemAddKey: this.itemAddKey.bind(this),

			clearItem: this.clearItem.bind(this),
			clearItemSquare: this.clearItemSquare.bind(this),
			clearColor: this.clearColor.bind(this),
			clearColorSquare: this.clearColorSquare.bind(this),
			clearLvl: this.clearLvl.bind(this),
			clearLvlSquare: this.clearLvlSquare.bind(this),

			lvlUp: this.lvlUp.bind(this),
			lvlUpSquare: this.lvlUpSquare.bind(this),
			lvlFlatSquare: this.lvlFlatSquare.bind(this),
			lvlAvgSquare: this.lvlAvgSquare.bind(this),
			lvlAvgBorder: this.lvlAvgBorder.bind(this),

			colorSquare: this.colorSquare.bind(this),

			addBoxMD : this.addBoxMD.bind(this),


			buildingBase: this.buildingBase.bind(this),


			selectedCopy : this.selectedCopy.bind(this),
		}
	}
	//--------------------

	doAction(conf) {
		console.log(conf)
		this.index[conf.func](conf)
	}

	// ---------------------
	// Add item to a Tiles 
	// ---------------------

	itemAddKey(conf) {
		if (!conf.assetKey) return;
		const tile = this.fm.getTile(conf.x, conf.y);
		tile.items.push({t: 'Asset', key: conf.assetKey, lvl:0})
	}

	itemForceKey(conf) {
		if (!conf.assetKey) return;
		const tile = this.fm.getTile(conf.x, conf.y);
		tile.clearItem();
		tile.items.push({t: 'Asset', key: conf.assetKey, lvl:0})
	}

	_tileTemporatyItemsForceKey(tile, conf) {
		tile.temporatyItems.splice(0, tile.temporatyItems.length)
		if (conf.t) {
			console.log("PushCon", conf)
			tile.temporatyItems.push(conf)
		} else {
			tile.clearTemporatyItem()
		}
		// Cause is a temps we want to store a link to the tile. 
		this.listTilesWithTempItems.push(tile)
	}

	temporatyItemsForceKey(conf) {
		if (!conf.assetKey && !conf.t) return;
		const tile = this.fm.getTile(conf.x, conf.y);
		this._tileTemporatyItemsForceKey(tile, conf)
	}

	clearAllTemporatyItems(conf=null) {
		this.listTilesWithTempItems.forEach(tile => {
			tile.clearTemporatyItem()
		})
		this.listTilesWithTempItems = []
	}

	clearItem(conf) {
		this.fm.getTile(conf.x, conf.y).clearItem();
	}

	clearItemSquare(conf) {
		conf.size = conf.size ? conf.size : 1		
		const box = new TilesMatrix(this.world, conf.size, conf.x, conf.y);
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				cellTile.clearItem();
			})
		})
	}


	// ---------------------
	// Lvl of Tiles
	// ---------------------


	clearLvl(conf) {
		this.fm.getTile(conf.x, conf.y).lvlGen();
	}

	clearLvlSquare(conf) {
		conf.size = conf.size ? conf.size : 1		
		const box = new TilesMatrix(this.world, conf.size, conf.x, conf.y);
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				cellTile.lvlGen();
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
			this.lvlAvg({x:xx, y:y - fCenter- 1, size:3});
			this.lvlAvg({x:xx, y:y + (conf.size - fCenter), size:3});
		})
		rangeY.forEach(yy => {
			this.lvlAvg({x:x - fCenter - 1, y:yy, size:3});
			this.lvlAvg({x:x + (conf.size - fCenter), y:yy, size:3});
		})

	}

	// ---------------------
	// Color of Tiles
	// ---------------------



	clearColor(conf) {
		this.fm.getTile(conf.x, conf.y).colorGen();
	}

	clearColorSquare(conf) {
		conf.size = conf.size ? conf.size : 1		
		const box = new TilesMatrix(this.world, conf.size, conf.x, conf.y);
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				cellTile.colorGen();
			})
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




	// ---------------------
	// Select And Copy
	// ---------------------

	selectedCopy(conf) {
		if (conf.state == 0) {
			console.log('State.0')
			this.tileSelected1 = conf;
			// Display Selected Start
			this.clearAllTemporatyItems()
			this.temporatyItemsForceKey({...conf, t:'Selected'})
		} else {
			this.tileSelected2 = conf;
			if (this.tileSelected1 && this.tileSelected2) {
				const tilesMatris = new TilesMatrixSelected(this.world, this.tileSelected1.x, this.tileSelected1.y, this.tileSelected2.x, this.tileSelected2.y)
			// Display Selected Arrea
				this.clearAllTemporatyItems()
				tilesMatris.tiles.flat().forEach(tile => {
					this._tileTemporatyItemsForceKey(tile, {t:'Selected'})
				})
				const saveTiles = tilesMatris.toJson()
				const stringSave =  '[\n  ' + saveTiles.map(x =>  JSON.stringify(x)).join(',\n  ') + '\n]'
				console.log('tilesMatris',stringSave)
			}
		}
	}

	// ---------------------
	// Select And Copy
	// ---------------------


	buildingBase(conf) {
		const growLoopCount = conf.growLoopCount ? conf.growLoopCount : 10

		const buildConf = conf.buildType == null ? null :
			conf.buildType.localeCompare("base") == 0 ?  new BuildConf_Base({growLoopCount:growLoopCount}) :
			conf.buildType.localeCompare("place") == 0 ?  new BuildConf_Place({growLoopCount:growLoopCount}) :
			null

		if (buildConf) {
			const factoryBuilding = new FactoryBuilding(this.world, buildConf)
			factoryBuilding.start(conf.x, conf.y);
		}
	}


}
